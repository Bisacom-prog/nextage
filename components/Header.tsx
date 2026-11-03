'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BrandMark } from './BrandMark';

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Programs', '/programs'],
  ['Contact', '/contact'],
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the mobile menu whenever the route changes (derived during render, no effect needed).
  if (open && openedAt !== pathname) setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="container-page flex min-h-20 items-center justify-between gap-6">
        <BrandMark />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className="focus-ring relative rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:text-nac-blue-ink aria-[current=page]:text-nac-navy aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3.5 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-nac-gold"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link href="/register" className="btn bg-nac-navy px-5 py-3 text-sm text-white hover:bg-nac-blue-ink">
            Register Now
          </Link>
        </div>
        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setOpenedAt(pathname);
          }}
          className="focus-ring rounded-lg border border-slate-200 p-2 text-nac-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>
      <div id="mobile-nav" hidden={!open} className="border-t border-slate-100 bg-white lg:hidden">
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={isActive(href) ? 'page' : undefined}
              className="focus-ring rounded-lg px-3 py-3 font-semibold text-slate-700 hover:bg-slate-50 aria-[current=page]:bg-nac-mist aria-[current=page]:text-nac-navy"
            >
              {label}
            </Link>
          ))}
          <Link href="/register" onClick={() => setOpen(false)} className="btn mt-2 bg-nac-navy text-white">
            Register Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
