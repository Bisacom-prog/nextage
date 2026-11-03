import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export const runtime = 'nodejs';

const ALLOWED_TYPES = new Set(['siteSettings', 'program', 'service']);

/**
 * Sanity → Vercel on-demand revalidation.
 * Configure a GROQ webhook in sanity.io/manage pointing to /api/revalidate with
 * projection `{_type}` and the same secret as SANITY_REVALIDATE_SECRET.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: 'Revalidation is not configured.' }, { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret, true);

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature.' }, { status: 401 });
    }
    if (!body?._type || !ALLOWED_TYPES.has(body._type)) {
      return NextResponse.json({ message: 'Ignored: unknown document type.' }, { status: 400 });
    }

    // expire: 0 → the next request gets fresh content instead of a stale-while-revalidate copy.
    revalidateTag(body._type, { expire: 0 });
    return NextResponse.json({ revalidated: true, tag: body._type, now: Date.now() });
  } catch (error) {
    console.error('[revalidate] failed', error instanceof Error ? error.message : error);
    return NextResponse.json({ message: 'Revalidation failed.' }, { status: 500 });
  }
}
