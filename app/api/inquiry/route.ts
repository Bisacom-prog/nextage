import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getProgrammeOptions } from '@/lib/content';
import { inquirySchema } from '@/lib/inquiry-schema';
import { clientIp, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_MS = 2_500;
const NO_STORE = { 'Cache-Control': 'no-store' };

const json = (message: string, status = 200, extra: Record<string, string> = {}) =>
  NextResponse.json({ message }, { status, headers: { ...NO_STORE, ...extra } });

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/** Reject cross-site form posts: the Origin must match the host serving this request. */
function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json('Forbidden.', 403);

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json('Unsupported content type.', 415);
  }

  const limit = rateLimit(`inquiry:${clientIp(request)}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.ok) {
    return json('Too many submissions. Please wait a few minutes and try again.', 429, {
      'Retry-After': String(limit.retryAfter),
    });
  }

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return json('Submission is too large.', 413);

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json('Submission is too large.', 413);
    raw = JSON.parse(text);
  } catch {
    return json('Invalid form submission.', 400);
  }

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return json(parsed.error.issues[0]?.message ?? 'Please check the form and try again.', 400);
  }
  const data = parsed.data;

  // Bots: honeypot filled or form submitted implausibly fast. Pretend success so they don't adapt.
  const tooFast = data.startedAt !== undefined && Date.now() - data.startedAt < MIN_FILL_MS;
  if (data.website || tooFast) return json('Thanks. Your submission has been received.');

  if (data.mode === 'register') {
    const allowed = (await getProgrammeOptions()).flatMap((g) => g.titles);
    if (!allowed.includes(data.program)) return json('Please select a programme from the list.', 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'nextageconsult1@gmail.com';
  const from = process.env.CONTACT_FROM_EMAIL || 'NextAge Website <onboarding@resend.dev>';

  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      // Don't silently swallow real leads in production – surface the misconfiguration.
      console.error('[inquiry] RESEND_API_KEY is not set; submission could not be delivered.');
      return json('We could not send your form right now. Please call or email us directly.', 503);
    }
    console.info('[inquiry] dev mode – email delivery not configured:', { ...data, website: undefined });
    return json('Development mode: submission logged on the server (RESEND_API_KEY not set).');
  }

  const subject =
    data.mode === 'register' ? `New NextAge registration: ${data.name}` : `New NextAge website inquiry: ${data.name}`;

  const rows: [string, string][] = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ...(data.program ? ([['Programme', data.program]] as [string, string][]) : []),
    ...(data.message ? ([['Message', data.message]] as [string, string][]) : []),
  ];

  const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#0D1B2A"><h2 style="margin:0 0 16px">${escapeHtml(subject)}</h2>${rows
    .map(([k, v]) => `<p style="margin:0 0 12px"><strong>${k}:</strong><br/>${escapeHtml(v).replace(/\n/g, '<br/>')}</p>`)
    .join('')}</div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n\n');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to, replyTo: data.email, subject, html, text });
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error('[inquiry] email delivery failed:', error instanceof Error ? error.message : error);
    return json('We could not send your form right now. Please try again or contact us directly.', 502);
  }

  return json(
    data.mode === 'register'
      ? 'Registration received. The NextAge team will contact you shortly.'
      : 'Thanks for getting in touch. The NextAge team will respond shortly.',
  );
}
