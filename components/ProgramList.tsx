import { Icon } from './Icon';
import type { ProgramItem } from '@/lib/site-data';

/** Numbered list of programme titles (technical / vocational). */
export function ProgramList({ items, columns = 3, muted = false }: { items: ProgramItem[]; columns?: 3 | 4; muted?: boolean }) {
  return (
    <ol className={`mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${columns === 4 ? 'xl:grid-cols-4' : ''}`}>
      {items.map((item, index) => (
        <li key={item.title} className="card flex items-start gap-4 p-4 transition hover:border-nac-blue/40">
          <span
            aria-hidden
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-black ${muted ? 'bg-slate-100 text-slate-500' : 'bg-nac-mist text-nac-blue-ink'}`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="pt-1">
            <span className="block font-bold leading-6 text-nac-navy">{item.title}</span>
            {item.description && <span className="mt-1 block text-sm leading-6 text-slate-600">{item.description}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Icon cards for academic programmes. */
export function AcademicCards({ items, layout = 'stacked' }: { items: ProgramItem[]; layout?: 'stacked' | 'inline' }) {
  return (
    <ul className="mt-8 grid gap-5 md:grid-cols-3">
      {items.map((item) => {
        return (
          <li key={item.title} className={`card p-6 ${layout === 'inline' ? 'flex gap-4' : ''}`}>
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-nac-gold/15 text-nac-navy">
              <Icon name={item.icon} fallback="graduation-cap" size={23} />
            </div>
            <div className={layout === 'inline' ? '' : 'mt-4'}>
              <h3 className={`font-extrabold text-nac-navy ${layout === 'inline' ? '' : 'text-xl'}`}>{item.title}</h3>
              {item.description && <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
