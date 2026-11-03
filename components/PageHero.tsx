import Link from 'next/link';

export function PageHero({
  eyebrow,
  title,
  body,
  cta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-nac-navy bg-hero-glow text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-page relative py-20 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-nac-cyan motion-safe:animate-fade-up">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-balance text-4xl font-extrabold tracking-tight motion-safe:animate-fade-up sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-white/75 motion-safe:animate-fade-up">{body}</p>
        {cta && (
          <Link href={cta.href} className="btn-gold mt-8">
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
