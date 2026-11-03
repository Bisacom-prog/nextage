import type { Metadata } from 'next';
import { CTA } from '@/components/CTA';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { AcademicCards, ProgramList } from '@/components/ProgramList';
import { getPrograms } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Programmes',
  description: 'Technical, vocational and academic programmes at the NextAge 360 Equip Hub — from AI tools and web design to baking, soap making and core subjects.',
  alternates: { canonical: '/programs' },
};

export default async function ProgramsPage() {
  const programs = await getPrograms();
  const academicHasIcons = programs.Academic.some((p) => p.description || p.icon);

  return (
    <>
      <PageHero
        eyebrow="NextAge 360 Equip Hub"
        title="Practical programmes for learning, work and enterprise."
        body="Choose from technical, vocational and academic pathways designed to develop useful, confidence-building skills."
        cta={{ label: 'Register for a Programme', href: '/register' }}
      />
      <nav aria-label="Programme categories" className="sticky top-20 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <ul className="container-page flex gap-2 overflow-x-auto py-3 text-sm font-bold">
          {[
            ['Technical', '#technical'],
            ['Vocational', '#vocational'],
            ['Academic', '#academic'],
          ].map(([label, href]) => (
            <li key={href}>
              <a href={href} className="focus-ring inline-block whitespace-nowrap rounded-full border border-slate-200 px-4 py-1.5 text-nac-navy hover:border-nac-gold hover:bg-nac-mist">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <section id="technical" className="section-pad bg-slate-50" aria-labelledby="technical-heading">
        <div className="container-page">
          <SectionHeading id="technical-heading" eyebrow="Digital & business" title="Technical Skills" />
          <ProgramList items={programs.Technical} />
        </div>
      </section>
      <section id="vocational" className="section-pad" aria-labelledby="vocational-heading">
        <div className="container-page">
          <SectionHeading id="vocational-heading" eyebrow="Hands-on learning" title="Vocational Skills" />
          <ProgramList items={programs.Vocational} />
        </div>
      </section>
      <section id="academic" className="section-pad bg-slate-50" aria-labelledby="academic-heading">
        <div className="container-page">
          <SectionHeading id="academic-heading" eyebrow="Core learning" title="Academic Support" />
          {academicHasIcons ? <AcademicCards items={programs.Academic} /> : <ProgramList items={programs.Academic} />}
        </div>
      </section>
      <CTA />
    </>
  );
}
