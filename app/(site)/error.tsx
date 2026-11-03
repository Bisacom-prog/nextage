'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page grid min-h-[60vh] place-content-center py-24 text-center">
      <p className="kicker">Something went wrong</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-nac-navy sm:text-5xl">We couldn’t load this page.</h1>
      <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">Please try again. If the problem continues, contact the NextAge team directly.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button type="button" onClick={reset} className="btn-primary">
          Try again
        </button>
        <Link href="/contact" className="btn-outline py-3">
          Contact us
        </Link>
      </div>
    </section>
  );
}
