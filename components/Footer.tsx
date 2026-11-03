import { Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import Link from 'next/link';
import type { SiteSettings } from '@/lib/content';
import type { SocialPlatform } from '@/lib/site-data';
import { BrandMark } from './BrandMark';

const socialIcons: Record<SocialPlatform, IconType> = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  YouTube: FaYoutube,
  LinkedIn: FaLinkedinIn,
  WhatsApp: FaWhatsapp,
  X: FaXTwitter,
};

const quickLinks = [
  ['About', '/about'],
  ['Services', '/services'],
  ['Programs', '/programs'],
  ['Register', '/register'],
  ['Contact', '/contact'],
] as const;

export function Footer({ settings }: { settings: SiteSettings }) {
  const { contact, socialLinks } = settings;
  return (
    <footer className="bg-nac-navy text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <BrandMark inverse />
          <p className="max-w-xs text-sm leading-6 text-white/70">Raising solution providers through practical learning, mentorship and opportunity.</p>
        </div>
        <address className="space-y-4 text-sm not-italic text-white/75">
          <h2 className="font-bold text-white">Get in touch</h2>
          <a className="focus-ring flex gap-3 rounded hover:text-white" href={contact.phoneHref}>
            <Phone size={17} aria-hidden className="mt-0.5 shrink-0" />
            {contact.phone}
          </a>
          <a className="focus-ring flex gap-3 break-all rounded hover:text-white" href={`mailto:${contact.email}`}>
            <Mail size={17} aria-hidden className="mt-0.5 shrink-0" />
            {contact.email}
          </a>
          <div className="flex gap-3">
            <MapPin size={17} aria-hidden className="mt-0.5 shrink-0" />
            {contact.venue}
          </div>
        </address>
        <nav aria-label="Footer">
          <h2 className="font-bold">Quick Links</h2>
          <ul className="mt-4 grid gap-2 text-sm text-white/70">
            {quickLinks.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="focus-ring rounded hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-bold">Follow Us</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map(({ platform, url }) => {
              const Icon = socialIcons[platform];
              return (
                <li key={`${platform}-${url}`}>
                  <a
                    href={url}
                    aria-label={`NextAge Consult on ${platform} (opens in a new tab)`}
                    className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-nac-gold hover:text-nac-navy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <span>Learn · Create · Earn · Impact</span>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="focus-ring rounded hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="focus-ring rounded hover:text-white">
              Terms of Use
            </Link>
          </nav>
          <span>© {new Date().getFullYear()} NEXTAGE CONSULT. All rights reserved.</span>
          <span>
            Developed by{' '}
            <a
              href="https://www.bisacom.dev"
              target="_blank"
              rel="noopener"
              aria-label="Bisacom.dev (opens in a new tab)"
              className="focus-ring rounded font-semibold text-white/80 underline-offset-4 hover:text-nac-gold hover:underline"
            >
              Bisacom.dev
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
