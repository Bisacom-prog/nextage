'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'nac-cookie-notice-dismissed';

const listeners = new Set<() => void>();
// Keeps the banner closed for this page view when browser storage is blocked.
let dismissedInMemory = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function isDismissed() {
  if (dismissedInMemory) return true;
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function dismiss() {
  dismissedInMemory = true;
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // Storage unavailable: the in-memory flag still closes the banner.
  }
  listeners.forEach((listener) => listener());
}

/**
 * The site sets no analytics or advertising cookies, so this is a notice rather
 * than a consent prompt. Add real accept/reject controls before introducing any
 * non-essential tracking.
 */
export function CookieBanner() {
  // The server snapshot hides the banner so it never flashes for returning visitors.
  const dismissed = useSyncExternalStore(subscribe, isDismissed, () => true);
  if (dismissed) return null;

  return (
    <section
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:bottom-5 sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-600">
          We don’t use analytics or advertising cookies. We only use what’s needed to run this site securely and to remember that you’ve closed this
          notice. Read our{' '}
          <Link href="/privacy#cookies" className="focus-ring rounded font-bold text-nac-blue-ink underline">
            Privacy Policy
          </Link>
          .
        </p>
        <button type="button" onClick={dismiss} className="btn-primary shrink-0 px-5 py-2.5 text-sm">
          Got it
        </button>
      </div>
    </section>
  );
}
