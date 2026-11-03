import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalList, LegalPage, LegalSection, legalLinkClass } from '@/components/LegalPage';
import { getSiteSettings } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms that apply when you use the NextAge Consult website.',
  alternates: { canonical: '/terms' },
};

export default async function TermsPage() {
  const { contact } = await getSiteSettings();

  return (
    <LegalPage eyebrow="Legal" title="Terms of Use" body="The terms that apply when you use the NextAge Consult website." updated="3 November 2026">
      <LegalSection title="Accepting these terms">
        <p>By using this website, operated by NextAge Consult (“NextAge”, “we”, “us”), you agree to these terms. If you do not agree, please do not use the site.</p>
      </LegalSection>

      <LegalSection title="Programmes and registration">
        <p>
          Submitting the registration form tells us you are interested in a programme. It does not guarantee a place. We will contact you to confirm availability,
          schedule, fees and any other details that apply. Those details may be subject to separate terms, which we will share with you.
        </p>
      </LegalSection>

      <LegalSection title="Your information">
        <p>
          You agree to give accurate information and to submit only your own details, or details you have permission to share. Our{' '}
          <Link href="/privacy" className={legalLinkClass}>
            Privacy Policy
          </Link>{' '}
          explains how we handle them.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>You agree not to:</p>
        <LegalList>
          <li>use the site unlawfully or to harm, harass or mislead anyone;</li>
          <li>send spam, malicious code or automated form submissions; or</li>
          <li>try to gain unauthorised access to the site or interfere with how it works.</li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Website content">
        <p>
          The text, branding, logos and images on this site belong to NextAge or its licensors. You may view and share them for personal, non-commercial purposes, but
          you need our written permission for any other use.
        </p>
        <p>
          We aim to keep the site accurate and up to date, but programme information can change. Content is provided for general information and is not professional
          advice. We do not promise any particular employment, income or other outcome from using the site.
        </p>
      </LegalSection>

      <LegalSection title="Links to other websites">
        <p>This site links to services we do not control, including social media platforms. We are not responsible for their content or practices.</p>
      </LegalSection>

      <LegalSection title="Availability and liability">
        <p>
          The site is provided “as is”, and we cannot guarantee it will always be available or error-free. To the extent the law allows, we are not liable for loss
          arising from your use of the site, or from being unable to use it. Nothing in these terms limits any rights or liability that cannot be limited by law.
        </p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>We may update these terms and will change the date at the top of this page when we do. Continuing to use the site means you accept the updated terms.</p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>These terms are governed by the laws of the Republic of Ghana.</p>
      </LegalSection>

      <LegalSection title="Contact us">
        <p>
          Questions about these terms? Contact us at{' '}
          <a href={`mailto:${contact.email}`} className={legalLinkClass}>
            {contact.email}
          </a>{' '}
          or {contact.phone}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
