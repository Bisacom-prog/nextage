import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div style={{ padding: 40, fontFamily: 'system-ui, sans-serif' }}>
        <h1>Sanity Studio is not configured yet.</h1>
        <p>Add NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to your environment, then restart the app.</p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
