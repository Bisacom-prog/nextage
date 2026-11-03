import type { Metadata } from 'next';
import { CTA } from '@/components/CTA';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { getServices } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Counselling, academic support, technical and vocational training, plus financial advisory, HR, property, transport and cleaning services.',
  alternates: { canonical: '/services' },
};

export default async function ServicesPage() {
  const { core, extended } = await getServices();
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Training and practical support under one brand."
        body="NextAge Consult combines learning, advisory and support services so individuals and organisations can access more of what they need to progress."
      />
      <section className="section-pad bg-slate-50" aria-labelledby="core">
        <div className="container-page">
          <SectionHeading id="core" eyebrow="Learning & development" title="Core Services" />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {core.map((service) => (
              <li key={service.title}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section-pad" aria-labelledby="extended">
        <div className="container-page">
          <SectionHeading id="extended" eyebrow="Extended solutions" title="Services under NEXTAGE CONSULT" />
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {extended.map((service) => (
              <li key={service.title}>
                <ServiceCard service={service} variant="extended" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTA />
    </>
  );
}
