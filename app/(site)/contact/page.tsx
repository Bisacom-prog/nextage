import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { InquiryForm } from '@/components/InquiryForm';
import { PageHero } from '@/components/PageHero';
import { getSiteSettings } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Ask NextAge Consult about programmes, registration, consulting services or partnerships.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const { contact } = await getSiteSettings();
  const cards = [
    { icon: Phone, label: 'Call us', value: contact.phone, href: contact.phoneHref },
    { icon: Mail, label: 'Email us', value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: 'Training venue', value: contact.venue, href: undefined },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about what you want to achieve."
        body="Ask about programmes, registration, consulting services or partnership opportunities. The NextAge team will get back to you with the right next step."
      />
      <section className="section-pad bg-slate-50" aria-labelledby="contact-details">
        <div className="container-page grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 id="contact-details" className="text-3xl font-extrabold tracking-tight text-nac-navy">
              Contact details
            </h2>
            <p className="mt-3 leading-7 text-slate-600">Reach us directly or use the inquiry form.</p>
            <ul className="mt-8 grid gap-4">
              {cards.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-nac-blue/10 text-nac-blue-ink">
                      <Icon size={21} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</span>
                      <span className="mt-1 block break-words font-bold text-nac-navy">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="focus-ring card flex items-center gap-4 p-5 transition hover:border-nac-blue">
                        {content}
                      </a>
                    ) : (
                      <div className="card flex items-center gap-4 p-5">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <InquiryForm mode="contact" />
        </div>
      </section>
    </>
  );
}
