import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview deployments out of search results.
  const isProduction = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production';
  return {
    rules: isProduction ? [{ userAgent: '*', allow: '/', disallow: ['/studio', '/api/'] }] : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
