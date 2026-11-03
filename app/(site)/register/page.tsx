import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { InquiryForm } from '@/components/InquiryForm';
import { PageHero } from '@/components/PageHero';
import { getProgrammeOptions } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register for a technical, vocational or academic programme at the NextAge 360 Equip Hub.',
  alternates: { canonical: '/register' },
};

const steps = [
  ['Choose a programme', 'Select the technical, vocational or academic programme you want to join.'],
  ['Submit your details', 'Tell us how to reach you and anything important about your goals.'],
  ['We confirm your place', 'The team follows up with schedule, fees if applicable, venue and preparation details.'],
] as const;

export default async function RegisterPage() {
  const programmeGroups = await getProgrammeOptions();
  return (
    <>
      <PageHero
        eyebrow="New cohort"
        title="Register for NextAge 360 Equip Hub."
        body="Choose the programme that fits your goals and submit your details. The NextAge team will contact you with availability, schedules and the next onboarding step."
      />
      <section className="section-pad bg-slate-50" aria-labelledby="next-steps">
        <div className="container-page grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <h2 id="next-steps" className="text-3xl font-extrabold tracking-tight text-nac-navy">
              What happens next?
            </h2>
            <ol className="mt-7 grid gap-5">
              {steps.map(([title, body]) => (
                <li key={title} className="flex gap-3">
                  <CheckCircle2 className="mt-1 shrink-0 text-nac-blue-ink" size={21} aria-hidden />
                  <div>
                    <h3 className="font-extrabold text-nac-navy">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <InquiryForm mode="register" programmeGroups={programmeGroups} />
        </div>
      </section>
    </>
  );
}
