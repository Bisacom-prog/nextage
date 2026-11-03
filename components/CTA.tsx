import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTA() {
  return (
    <section className="bg-slate-100" aria-labelledby="cta-heading">
      <div className="container-page flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="kicker">Take the next step</p>
          <h2 id="cta-heading" className="mt-2 text-3xl font-extrabold tracking-tight text-nac-navy">
            Ready to build your future?
          </h2>
          <p className="mt-2 text-slate-600">Register for a programme or speak with the NextAge team for guidance.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/register" className="btn-primary">
            Register Now <ArrowRight size={18} aria-hidden />
          </Link>
          <Link href="/contact" className="btn-outline py-3">
            Inquire Now
          </Link>
        </div>
      </div>
    </section>
  );
}
