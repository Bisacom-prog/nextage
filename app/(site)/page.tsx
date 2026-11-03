import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CTA } from '@/components/CTA';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { AcademicCards, ProgramList } from '@/components/ProgramList';
import { getPrograms, getServices, getSiteSettings } from '@/lib/content';
import cohortPoster from '@/public/cohort-poster.jpg';
import brandImage from '@/public/nac-brand.jpg';

export const metadata = { alternates: { canonical: '/' } };

export default async function HomePage() {
  const [{ hero, stats }, programs, services] = await Promise.all([getSiteSettings(), getPrograms(), getServices()]);

  return (
    <>
      <section className="relative overflow-hidden bg-nac-navy bg-hero-glow text-white" aria-labelledby="hero-heading">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
        <div className="container-page relative grid items-center gap-12 py-16 lg:min-h-[650px] lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="relative z-10 motion-safe:animate-fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-nac-cyan">{hero.eyebrow}</p>
            <h1 id="hero-heading" className="mt-5 max-w-3xl text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-5 text-xl font-extrabold text-nac-gold sm:text-2xl">{hero.subtitle}</p>
            <p className="mt-2 font-bold tracking-[0.16em] text-white/80">{hero.tagline}</p>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-white/75 sm:text-lg">{hero.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/programs" className="btn-gold py-4">
                Explore Programs <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/contact" className="btn-ghost-dark py-4">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative">
            <div aria-hidden className="absolute -left-7 top-10 h-32 w-32 rounded-full bg-nac-gold/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
              <Image
                src={cohortPoster}
                alt="NextAge 360 Equip Hub training cohort poster"
                preload
                placeholder="blur"
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full rounded-[1.45rem] object-cover object-top"
              />
              <ul className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-nac-navy/90 p-4 backdrop-blur sm:grid-cols-4">
                {['Skills', 'People', 'Opportunities', 'Impact'].map((item) => (
                  <li key={item} className="text-center text-xs font-bold text-white/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-slate-50" aria-labelledby="core-services">
        <div className="container-page">
          <SectionHeading id="core-services" eyebrow="What we do" title="Core Services" body="Supporting individuals and communities through training, consulting and practical solutions." center />
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.core.slice(0, 4).map((service) => (
              <li key={service.title}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="extended-services">
        <div className="container-page">
          <SectionHeading
            id="extended-services"
            eyebrow="Our extended solutions"
            title="Services under NEXTAGE CONSULT"
            body="Beyond training, we provide a broader range of practical services designed to help people learn, grow, work and thrive."
            center
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {services.extended.slice(0, 6).map((service) => (
              <li key={service.title}>
                <ServiceCard service={service} variant="compact" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-nac-navy text-white" aria-labelledby="featured-program">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <figure className="relative overflow-hidden rounded-[2rem] bg-white/5">
            <Image
              src={brandImage}
              alt="NAC NextAge 360 Equip Hub brand identity"
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-video w-full object-cover"
            />
          </figure>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-nac-cyan">Featured program</p>
            <h2 id="featured-program" className="mt-3 text-4xl font-extrabold tracking-tight">
              NEXTAGE 360 EQUIP HUB
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-white/75">
              A focused hub for practical learning, mentorship and empowerment. We combine academic support, technical skills, vocational training and life development to help learners move from knowledge to opportunity.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse rounded-xl border border-white/10 bg-white/5 p-4">
                  <dt className="mt-1 text-xs text-white/70">{stat.label}</dt>
                  <dd className="text-2xl font-extrabold text-nac-gold">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/register" className="btn-gold mt-8">
              Join the next cohort <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="technical-skills">
        <div className="container-page">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading id="technical-skills" eyebrow="Our programs" title="Technical Skills" />
            <Link href="/programs#technical" className="focus-ring hidden rounded text-sm font-bold text-nac-blue-ink hover:text-nac-navy sm:block">
              View all <span aria-hidden>→</span>
              <span className="sr-only"> technical skills</span>
            </Link>
          </div>
          <ProgramList items={programs.Technical} muted />

          <div className="mt-16 flex items-end justify-between gap-6">
            <SectionHeading title="Vocational Skills" />
            <Link href="/programs#vocational" className="focus-ring hidden rounded text-sm font-bold text-nac-blue-ink hover:text-nac-navy sm:block">
              View all <span aria-hidden>→</span>
              <span className="sr-only"> vocational skills</span>
            </Link>
          </div>
          <ProgramList items={programs.Vocational} columns={4} muted />

          <div className="mt-16">
            <SectionHeading title="Academic Support" />
          </div>
          <AcademicCards items={programs.Academic} layout="inline" />
        </div>
      </section>

      <section className="bg-nac-mist" aria-label="Why NextAge">
        <ul className="container-page grid gap-8 py-12 sm:grid-cols-3">
          {[
            ['Practical learning', 'Build useful skills through hands-on training.'],
            ['Opportunity focused', 'Connect learning to work, income and enterprise.'],
            ['Community impact', 'Use your skills to create value for others.'],
          ].map(([title, body]) => (
            <li key={title} className="flex gap-3">
              <CheckCircle2 className="mt-1 shrink-0 text-nac-blue-ink" size={20} aria-hidden />
              <div>
                <h3 className="font-extrabold text-nac-navy">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <CTA />
    </>
  );
}
