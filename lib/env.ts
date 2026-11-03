/**
 * Centralised, typed access to public environment configuration.
 * Server-only secrets are read where they are used (API routes) so they
 * can never be pulled into a client bundle by accident.
 */

function normaliseUrl(value: string | undefined): string | null {
  if (!value) return null;
  const withProtocol = value.startsWith('http') ? value : `https://${value}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

/**
 * Canonical site origin. Prefer an explicit NEXT_PUBLIC_SITE_URL; fall back to
 * Vercel's production URL, then to the intended production domain.
 */
export const siteUrl =
  normaliseUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  normaliseUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  'https://nextageconsult.com';

export const sanityEnv = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-01',
};

export const isSanityConfigured = /^[a-z0-9-]+$/.test(sanityEnv.projectId);
