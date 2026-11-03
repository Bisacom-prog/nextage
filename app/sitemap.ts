import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/env';

const routes = ['/', '/about', '/services', '/programs', '/register', '/contact', '/privacy', '/terms'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${siteUrl}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency: path === '/' || path === '/programs' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/programs' || path === '/register' ? 0.9 : 0.7,
  }));
}
