'use client';

import { CheckCircle2, Loader2, TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { type FormEvent, useEffect, useId, useRef, useState } from 'react';

type ProgrammeGroup = { category: string; titles: string[] };
type Status = 'idle' | 'sending' | 'success' | 'error';

export function InquiryForm({
  mode,
  programmeGroups = [],
  defaultProgramme,
}: {
  mode: 'contact' | 'register';
  programmeGroups?: ProgrammeGroup[];
  defaultProgramme?: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const startedAt = useRef(0);
  const id = useId();

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    setStatus('sending');
    setMessage('');

    const payload = { ...Object.fromEntries(new FormData(form).entries()), mode, startedAt: startedAt.current };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) throw new Error(result.message || 'Unable to submit the form. Please try again.');
      setStatus('success');
      setMessage(result.message || 'Thank you. Your message has been received.');
      form.reset();
      startedAt.current = Date.now();
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof DOMException && error.name === 'AbortError'
          ? 'The request timed out. Please check your connection and try again.'
          : error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  const statusId = `${id}-status`;
  const labelClass = 'grid gap-2 text-sm font-bold text-nac-navy';

  return (
    <form
      onSubmit={handleSubmit}
      aria-describedby={message ? statusId : undefined}
      aria-busy={status === 'sending'}
      className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
    >
      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Full name
          <input required minLength={2} maxLength={120} name="name" autoComplete="name" className="field" placeholder="Your name" />
        </label>
        <label className={labelClass}>
          Phone
          <input
            required
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={30}
            pattern="\+?[\d\s\(\)\.\-]{7,20}"
            title="Enter a valid phone number, e.g. 024 342 0016"
            className="field"
            placeholder="e.g. 024 342 0016"
          />
        </label>
      </div>

      <label className={`mt-5 ${labelClass}`}>
        Email
        <input required name="email" type="email" autoComplete="email" maxLength={160} className="field" placeholder="you@example.com" />
      </label>

      {mode === 'register' && (
        <label className={`mt-5 ${labelClass}`}>
          Programme
          <select required name="program" defaultValue={defaultProgramme ?? ''} className="field">
            <option value="" disabled>
              Select a programme
            </option>
            {programmeGroups.map((group) => (
              <optgroup key={group.category} label={`${group.category} skills`}>
                {group.titles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      )}

      <label className={`mt-5 ${labelClass}`}>
        <span>
          {mode === 'register' ? 'Anything we should know?' : 'How can we help?'}{' '}
          <span className="font-normal text-slate-500">(optional)</span>
        </span>
        <textarea
          name="message"
          rows={5}
          maxLength={3000}
          className="field resize-y"
          placeholder={mode === 'register' ? 'Tell us about your learning goals or preferred schedule.' : 'Tell us what you need help with.'}
        />
      </label>

      <button disabled={status === 'sending'} type="submit" className="btn-primary mt-6 w-full py-4 font-black disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0">
        {status === 'sending' && <Loader2 size={18} className="animate-spin" aria-hidden />}
        {status === 'sending' ? 'Sending…' : mode === 'register' ? 'Submit Registration' : 'Send Inquiry'}
      </button>

      <div id={statusId} aria-live="polite" role="status">
        {message && (
          <p
            className={`mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${status === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}
          >
            {status === 'success' ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden /> : <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden />}
            {message}
          </p>
        )}
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        By submitting this form, you agree that NextAge Consult may contact you about your inquiry or registration, and to our{' '}
        <Link href="/terms" className="focus-ring rounded underline hover:text-nac-navy">
          Terms of Use
        </Link>
        . See our{' '}
        <Link href="/privacy" className="focus-ring rounded underline hover:text-nac-navy">
          Privacy Policy
        </Link>{' '}
        for how we handle your information.
      </p>
    </form>
  );
}
