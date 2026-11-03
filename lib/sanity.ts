import 'server-only';
import { createClient, type QueryParams } from 'next-sanity';
import { isSanityConfigured, sanityEnv } from './env';

/**
 * Content is cached by Next.js and invalidated on demand by the Sanity webhook
 * (see app/api/revalidate). The Sanity CDN is bypassed because Next's data
 * cache already sits in front of it, and the CDN can serve stale content right
 * after a webhook fires.
 */
const client = isSanityConfigured
  ? createClient({
      projectId: sanityEnv.projectId,
      dataset: sanityEnv.dataset,
      apiVersion: sanityEnv.apiVersion,
      useCdn: false,
      perspective: 'published',
    })
  : null;

/**
 * Fallback revalidation window. With the webhook configured, content updates
 * instantly and this is only a safety net; without it, edits appear within a minute.
 */
const REVALIDATE_SECONDS = process.env.SANITY_REVALIDATE_SECRET ? 3600 : 60;

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS, tags },
    });
  } catch (error) {
    // Never break the page because the CMS is unreachable; fallback content renders instead.
    console.error('[sanity] fetch failed', error instanceof Error ? error.message : error);
    return null;
  }
}
