import 'server-only';
import { cache } from 'react';
import { programsQuery, servicesQuery, siteSettingsQuery } from './queries';
import { sanityFetch } from './sanity';
import type { IconKey } from './icon-keys';
import {
  coreServices,
  defaultContact,
  defaultHero,
  defaultPrograms,
  defaultSocialLinks,
  defaultStats,
  extendedServices,
  type ProgramCategory,
  type ProgramItem,
  type ServiceItem,
  type SocialLink,
  type SocialPlatform,
  type Stat,
} from './site-data';

/**
 * Single place where CMS content is fetched and merged with fallbacks.
 * Pages never talk to Sanity directly, so behaviour stays consistent and every
 * request for the same data within a render is de-duplicated by React `cache`.
 */

type CmsSettings = {
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroTagline?: string | null;
  heroBody?: string | null;
  stats?: Stat[] | null;
  phone?: string | null;
  email?: string | null;
  venue?: string | null;
  socialLinks?: { platform?: string | null; url?: string | null }[] | null;
} | null;

type CmsProgram = { _id: string; title: string; category?: string | null; shortDescription?: string | null; icon?: string | null };
type CmsService = { _id: string; title: string; group?: string | null; shortDescription?: string | null; icon?: string | null };

const pick = (value: string | null | undefined, fallback: string) => (value && value.trim()) || fallback;

const SOCIAL_PLATFORMS: SocialPlatform[] = ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'WhatsApp', 'X'];

function isSafeHttpsUrl(url: string) {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

export const getSiteSettings = cache(async () => {
  const cms = await sanityFetch<CmsSettings>({ query: siteSettingsQuery, tags: ['siteSettings'] });

  const socialLinks: SocialLink[] =
    cms?.socialLinks
      ?.filter((s): s is SocialLink => Boolean(s.platform && s.url && SOCIAL_PLATFORMS.includes(s.platform as SocialPlatform) && isSafeHttpsUrl(s.url)))
      .map(({ platform, url }) => ({ platform, url })) ?? [];

  const phone = pick(cms?.phone, defaultContact.phone);
  const stats = cms?.stats?.filter((s) => s?.value && s?.label).slice(0, 4) ?? [];

  return {
    hero: {
      eyebrow: pick(cms?.heroEyebrow, defaultHero.heroEyebrow),
      title: pick(cms?.heroTitle, defaultHero.heroTitle),
      subtitle: pick(cms?.heroSubtitle, defaultHero.heroSubtitle),
      tagline: pick(cms?.heroTagline, defaultHero.heroTagline),
      body: pick(cms?.heroBody, defaultHero.heroBody),
    },
    stats: stats.length ? stats : defaultStats,
    contact: {
      phone,
      phoneHref: toTelHref(phone),
      email: pick(cms?.email, defaultContact.email),
      venue: pick(cms?.venue, defaultContact.venue),
    },
    socialLinks: socialLinks.length ? socialLinks : defaultSocialLinks,
  };
});

export type SiteSettings = Awaited<ReturnType<typeof getSiteSettings>>;

export const getPrograms = cache(async (): Promise<Record<ProgramCategory, ProgramItem[]>> => {
  const cms = await sanityFetch<CmsProgram[]>({ query: programsQuery, tags: ['program'] });

  const byCategory = (category: ProgramCategory): ProgramItem[] => {
    const fromCms =
      cms
        ?.filter((p) => p.category === category)
        .map((p) => ({
          title: p.title,
          category,
          description: p.shortDescription ?? undefined,
          icon: (p.icon as IconKey | null) ?? undefined,
        })) ?? [];
    // An empty category in the CMS falls back to built-in content instead of rendering an empty section.
    return fromCms.length ? fromCms : defaultPrograms[category];
  };

  return { Technical: byCategory('Technical'), Vocational: byCategory('Vocational'), Academic: byCategory('Academic') };
});

export const getServices = cache(async (): Promise<{ core: ServiceItem[]; extended: ServiceItem[] }> => {
  const cms = await sanityFetch<CmsService[]>({ query: servicesQuery, tags: ['service'] });

  const byGroup = (group: 'Core' | 'Extended', fallback: ServiceItem[]): ServiceItem[] => {
    const fromCms =
      cms
        ?.filter((s) => s.group === group)
        .map((s, index) => {
          const match = fallback.find((f) => f.title.toLowerCase() === s.title.toLowerCase());
          return {
            title: s.title,
            description: s.shortDescription || match?.description || '',
            icon: ((s.icon as IconKey | null) ?? match?.icon ?? fallback[index % fallback.length].icon) as IconKey,
          };
        }) ?? [];
    return fromCms.length ? fromCms : fallback;
  };

  return { core: byGroup('Core', coreServices), extended: byGroup('Extended', extendedServices) };
});

/** Flat list of programme titles, used for the registration select and server-side allow-listing. */
export async function getProgrammeOptions() {
  const programs = await getPrograms();
  return (Object.keys(programs) as ProgramCategory[]).map((category) => ({
    category,
    titles: programs[category].map((p) => p.title),
  }));
}

/** Ghana numbers like "0243 420 016" → "tel:+233243420016" so links work from abroad and on all devices. */
export function toTelHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return `tel:${digits}`;
  if (digits.startsWith('0')) return `tel:+233${digits.slice(1)}`;
  return `tel:${digits}`;
}
