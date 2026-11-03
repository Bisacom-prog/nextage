import type { Metadata } from 'next';
import Image from 'next/image';
import { CTA } from '@/components/CTA';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import learnersImage from '@/public/nac-learners.jpg';

export const metadata: Metadata = {
  title: 'About',
  description: 'NextAge Consult exists to raise solution providers through practical learning, mentorship and opportunity.',
  alternates: { canonical: '/about' },
};

const pillars = [
  ['Learn', 'Build foundational knowledge and confidence.'],
  ['Create', 'Turn knowledge into practical work and ideas.'],
  ['Earn', 'Develop skills that can support income and employment.'],
  ['Impact', 'Use growth and opportunity to strengthen communities.'],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About NextAge"
        title="Building capable people for a changing world."
        body="NextAge Consult exists to raise solution providers — people equipped with the knowledge, practical skills and confidence to create opportunities for themselves and positive impact for others."
        cta={{ label: 'Explore Programmes', href: '/programs' }}
      />
      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Our purpose"
              title="Learn. Create. Earn. Impact."
              body="Our approach connects learning to action. Through the NextAge 360 Equip Hub and our wider consulting services, learners receive practical support across education, employability, entrepreneurship, technology and vocational development."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {pillars.map(([title, body], i) => (
                <li key={title} className="card p-5 transition hover:border-nac-gold">
                  <span aria-hidden className="text-xs font-black text-nac-blue-ink">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 font-extrabold text-nac-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-[2rem] bg-nac-navy p-3 shadow-soft">
            <Image
              src={learnersImage}
              alt="NextAge Consult learners with their mentor"
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[16/10] w-full rounded-[1.45rem] object-cover object-top"
            />
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
