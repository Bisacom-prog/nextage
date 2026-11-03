import { Footer } from './Footer';
import { Header } from './Header';
import { JsonLd } from './JsonLd';
import { getSiteSettings } from '@/lib/content';
import { siteUrl } from '@/lib/env';

/** Header, footer, skip link and organisation structured data shared by every public page. */
export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-nac-gold px-4 py-2 font-bold text-nac-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer settings={settings} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: 'NextAge Consult',
          alternateName: 'NAC',
          slogan: 'Learn. Create. Earn. Impact.',
          url: siteUrl,
          logo: `${siteUrl}/icon.svg`,
          image: `${siteUrl}/nac-brand.jpg`,
          email: settings.contact.email,
          telephone: settings.contact.phoneHref.replace('tel:', ''),
          location: { '@type': 'Place', name: settings.contact.venue, address: { '@type': 'PostalAddress', addressCountry: 'GH' } },
          sameAs: settings.socialLinks.map((s) => s.url),
        }}
      />
    </>
  );
}
