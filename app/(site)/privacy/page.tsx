import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalList, LegalPage, LegalSection, legalLinkClass } from '@/components/LegalPage';
import { getSiteSettings } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How NextAge Consult collects, uses and protects personal information submitted through this website.',
  alternates: { canonical: '/privacy' },
};

export default async function PrivacyPage() {
  const { contact } = await getSiteSettings();
  const email = (
    <a href={`mailto:${contact.email}`} className={legalLinkClass}>
      {contact.email}
    </a>
  );

  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      body="How NextAge Consult handles the personal information you share through this website."
      updated="3 November 2026"
    >
      <LegalSection title="Who we are">
        <p>
          This website is operated by NextAge Consult (“NextAge”, “we”, “us”), a training and consulting organisation in Ghana. If you have a question about
          your information, contact us at {email} or {contact.phone}.
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>When you complete our contact or registration form, we collect:</p>
        <LegalList>
          <li>your full name, phone number and email address;</li>
          <li>the programme you select, if you are registering; and</li>
          <li>anything you choose to include in your message.</li>
        </LegalList>
        <p>
          Our website also processes your IP address when you submit a form, to help limit automated abuse. Our hosting provider may keep basic technical logs
          so it can run and secure the site. Please don’t include sensitive information in your message unless it is necessary for your request.
        </p>
      </LegalSection>

      <LegalSection title="How we use your information">
        <LegalList>
          <li>to respond to your inquiry;</li>
          <li>to process your registration and contact you about the programme you chose; and</li>
          <li>to keep the website secure and prevent spam or misuse.</li>
        </LegalList>
        <p>We use your information because you asked us to contact you or register you, and because we have a legitimate interest in keeping the site secure.</p>
      </LegalSection>

      <LegalSection title="Who we share it with">
        <p>We do not sell your personal information. We share it only with the service providers that help us run this website and respond to you:</p>
        <LegalList>
          <li>Resend, which delivers form submissions to us by email;</li>
          <li>Google, which provides the email inbox where we receive them; and</li>
          <li>Vercel, which hosts this website.</li>
        </LegalList>
        <p>
          These providers may process information outside Ghana. We may also disclose information where the law requires it. Our website content is managed in
          Sanity, but form submissions are not stored there.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          Form submissions reach us by email and are not saved in a database on this website. We keep them only for as long as we need them to respond to you,
          deliver a programme you registered for, or meet our legal obligations.
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="Cookies and browser storage">
        <p>We do not use analytics or advertising cookies, or other tracking technologies, on this website.</p>
        <LegalList>
          <li>
            <strong>Cookie notice:</strong> your browser stores a small setting (<code>nac-cookie-notice-dismissed</code>) so we don’t show you the notice again.
            It stays until you clear your browser data.
          </li>
          <li>
            <strong>Security:</strong> our hosting provider may set a strictly necessary cookie if it needs to check for automated traffic.
          </li>
          <li>
            <strong>Editors:</strong> authorised staff who sign in to our content studio use login storage provided by Sanity. This doesn’t apply to other visitors.
          </li>
        </LegalList>
        <p>You can clear or block cookies and browser storage in your browser settings. The website will still work, though the notice may reappear.</p>
      </LegalSection>

      <LegalSection title="Links to other websites">
        <p>
          Our site links to social media platforms such as Facebook, Instagram and TikTok. They are not connected to this site until you follow a link, and their
          own privacy policies apply once you do.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>Some of our programmes may suit younger learners. If you are under 18, please ask a parent or guardian to contact us or submit the form for you.</p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Subject to Ghana’s Data Protection Act, 2012 (Act 843) and other laws that apply to you, you may ask us for access to your personal information, ask us to
          correct or delete it, or object to how we use it. To make a request, contact us at {email}.
        </p>
        <p>If you are not satisfied with our response, you may complain to the Data Protection Commission of Ghana.</p>
      </LegalSection>

      <LegalSection title="Security">
        <p>We use reasonable measures to protect your information, including encrypted connections to this website. No online service can guarantee complete security.</p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          We may update this policy and will change the date at the top of this page when we do. See also our{' '}
          <Link href="/terms" className={legalLinkClass}>
            Terms of Use
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
