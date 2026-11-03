import Link from 'next/link';
import { SiteChrome } from '@/components/SiteChrome';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <SiteChrome>
    <section className="bg-nac-navy bg-hero-glow text-white">
      <div className="container-page grid min-h-[60vh] place-content-center py-24 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-nac-cyan">Error 404</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">This page took a different path.</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/75">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-gold">
            Back to home
          </Link>
          <Link href="/programs" className="btn-ghost-dark">
            Browse programs
          </Link>
        </div>
      </div>
    </section>
    </SiteChrome>
  );
}
