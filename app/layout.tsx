import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { siteUrl } from '@/lib/env';

const sans = localFont({
  src: './fonts/PlusJakartaSans-Variable.woff2',
  variable: '--font-sans',
  weight: '200 800',
  display: 'swap',
});

const description =
  'NextAge Consult equips learners with academic, technical, vocational and life skills through the NextAge 360 Equip Hub.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NextAge Consult | Raising Solution Providers',
    template: '%s | NextAge Consult',
  },
  description,
  applicationName: 'NextAge Consult',
  keywords: ['NextAge Consult', '360 Equip Hub', 'skills training Ghana', 'vocational training', 'digital skills', 'academic support'],
  openGraph: {
    title: 'NextAge Consult | Raising Solution Providers',
    description: 'Learn. Create. Earn. Impact.',
    type: 'website',
    siteName: 'NextAge Consult',
    locale: 'en_GH',
  },
  twitter: { card: 'summary_large_image', title: 'NextAge Consult', description: 'Learn. Create. Earn. Impact.' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#03142B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GH" className={sans.variable}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
