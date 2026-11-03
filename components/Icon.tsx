import { createElement } from 'react';
import type { LucideProps } from 'lucide-react';
import { resolveIcon } from '@/lib/icons';
import type { IconKey } from '@/lib/icon-keys';

/** Renders a CMS-selectable icon by key, with a safe fallback for unknown keys. */
export function Icon({ name, fallback, ...props }: { name?: string | null; fallback?: IconKey } & LucideProps) {
  return createElement(resolveIcon(name, fallback), { 'aria-hidden': true, ...props });
}
