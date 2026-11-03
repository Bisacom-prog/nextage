import { Icon } from './Icon';
import type { ServiceItem } from '@/lib/site-data';

export function ServiceCard({
  service,
  variant = 'core',
  headingLevel: Heading = 'h3',
}: {
  service: ServiceItem;
  variant?: 'core' | 'extended' | 'compact';
  headingLevel?: 'h2' | 'h3';
}) {
  if (variant === 'compact') {
    return (
      <article className="h-full rounded-2xl border border-slate-200 p-5 transition hover:border-nac-gold hover:bg-nac-mist">
        <Icon name={service.icon} className="text-nac-navy" size={25} />
        <Heading className="mt-4 font-extrabold text-nac-navy">{service.title}</Heading>
        <p className="mt-2 text-sm leading-5 text-slate-600">{service.description}</p>
      </article>
    );
  }

  if (variant === 'extended') {
    return (
      <article className="h-full rounded-2xl border border-slate-200 p-7 transition hover:border-nac-gold">
        <Icon name={service.icon} className="text-nac-gold" size={28} />
        <Heading className="mt-5 text-xl font-extrabold text-nac-navy">{service.title}</Heading>
        <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
      </article>
    );
  }

  return (
    <article className="card h-full p-6 shadow-card transition duration-300 motion-safe:hover:-translate-y-1 hover:shadow-soft">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-nac-blue/10 text-nac-blue-ink">
        <Icon name={service.icon} size={24} />
      </div>
      <Heading className="mt-5 text-lg font-extrabold text-nac-navy">{service.title}</Heading>
      <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
    </article>
  );
}
