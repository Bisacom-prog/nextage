export function SectionHeading({
  eyebrow,
  title,
  body,
  center = false,
  id,
  as: Heading = 'h2',
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  center?: boolean;
  id?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className="kicker">{eyebrow}</p>}
      <Heading id={id} className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-nac-navy sm:text-4xl">
        {title}
      </Heading>
      {body && <p className="mt-4 text-pretty leading-7 text-slate-600">{body}</p>}
    </div>
  );
}
