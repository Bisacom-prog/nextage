import { PageHero } from './PageHero';

export const legalLinkClass = 'focus-ring rounded font-bold text-nac-blue-ink underline';

export function LegalPage({
  eyebrow,
  title,
  body,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} body={body} />
      <section className="section-pad bg-slate-50">
        <div className="container-page">
          <div className="card mx-auto max-w-3xl space-y-10 p-6 sm:p-10">
            <p className="text-sm font-bold text-slate-500">Last updated: {updated}</p>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

export function LegalSection({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4 leading-7 text-slate-600">
      <h2 className="text-2xl font-extrabold tracking-tight text-nac-navy">{title}</h2>
      {children}
    </section>
  );
}

export function LegalList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5">{children}</ul>;
}
