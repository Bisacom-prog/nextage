import Link from 'next/link';

export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-lg" aria-label="NextAge Consult – home">
      <span
        aria-hidden
        className={`grid h-11 w-[72px] place-items-center rounded-lg border-2 font-black tracking-tight ${inverse ? 'border-white/50 bg-white text-nac-navy' : 'border-nac-gold bg-nac-navy text-white'}`}
      >
        <span className="text-lg">
          <span className="text-nac-gold">N</span>AC
        </span>
      </span>
      <span className="leading-tight">
        <span className={`block font-extrabold tracking-tight ${inverse ? 'text-white' : 'text-nac-navy'}`}>NEXTAGE CONSULT</span>
        <span className={`mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] ${inverse ? 'block text-white/70' : 'hidden text-slate-500 sm:block'}`}>
          Learn · Create · Earn · Impact
        </span>
      </span>
    </Link>
  );
}
