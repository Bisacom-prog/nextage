# NextAge Consult Website

Production-ready Next.js + Tailwind CSS + Sanity CMS website based on the approved NextAge Consult / NAC wireframe.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Sanity Studio embedded at `/studio`
- Resend-ready contact and registration forms
- Lucide icons
- Vercel-ready configuration

## 1. Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The website renders with built-in fallback content even before Sanity is configured.

## 2. Configure Sanity

Create a Sanity project and dataset, then copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Add:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-01-01
```

Restart the dev server and visit `/studio`. **Site Settings** is a fixed singleton (hero, stats, phone, email, venue and social links). Add Services and Programs as required — each can pick an icon, and programmes can be hidden with the *Active* toggle. Published CMS content overrides the matching fallback content; an empty category falls back to the built-in list rather than rendering empty.

### Instant content updates (recommended)

Pages are statically generated and cached. Without a webhook, CMS edits appear within ~60 seconds. For instant updates:

1. Set `SANITY_REVALIDATE_SECRET` (e.g. `openssl rand -hex 32`) locally and in Vercel.
2. In sanity.io/manage → API → Webhooks, create a webhook:
   - URL: `https://<your-domain>/api/revalidate`
   - Trigger on: Create, Update, Delete · Filter: `_type in ["siteSettings","service","program"]`
   - Projection: `{_type}` · HTTP method: POST · Secret: the same value as above.

A ready-made seed file is included at `sanity/seed.ndjson`. After the project ID/dataset are configured, you can import the supplied content with:

```bash
npx sanity dataset import sanity/seed.ndjson production --replace
```

## 3. Configure form email delivery

The forms work in development without a Resend key, but they only log the submission server-side. For live email delivery set these environment variables locally and in Vercel:

```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=nextageconsult1@gmail.com
CONTACT_FROM_EMAIL=NextAge Website <website@your-verified-domain.com>
```

For production, verify the sending domain in Resend and replace `CONTACT_FROM_EMAIL` with the verified sender.

## 4. Security

- Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) are set in `next.config.ts`. `/studio` gets a slightly wider CSP for the Sanity API, CDN and fonts.
- `/api/inquiry` enforces same-origin requests, JSON only, a 16 KB body cap, zod validation, a programme allow-list, honeypot + time-trap bot checks and per-IP rate limiting (5 per 10 min).
- The in-memory rate limiter is per serverless instance. For a hard global limit, add a **Vercel Firewall → Rate limiting** rule on `/api/inquiry`.
- In production the form returns a 503 (instead of silently succeeding) if `RESEND_API_KEY` is missing, so leads are never lost unnoticed.

## 5. Deploy to Vercel

1. Push this folder to GitHub/GitLab/Bitbucket.
2. Import the repository into Vercel.
3. Add the Sanity environment variables (plus `SANITY_REVALIDATE_SECRET` and `NEXT_PUBLIC_SITE_URL`).
4. Add the Resend environment variables.
5. Deploy.
6. In Sanity project settings, add both `http://localhost:3000` and the final Vercel/production origin under CORS Origins. Enable credentials for origins that host the embedded Studio so Sanity authentication works correctly.

No special build command is required: Vercel detects Next.js automatically.

## Quality checks

```bash
npm run check   # typecheck + lint
npm run build
```

## Routes

- `/` — Home
- `/about` — About
- `/services` — Services
- `/programs` — Programs
- `/register` — Registration
- `/contact` — Contact
- `/studio` — Sanity Studio (full-screen, noindex)
- `/api/inquiry` — contact/registration form endpoint
- `/api/revalidate` — Sanity webhook endpoint

## Content already included

Technical skills, vocational skills, academic support, core consulting services, extended services, contact details and the two supplied NextAge brand assets are already included as fallback content.

## Notes before production launch

- Set `NEXT_PUBLIC_SITE_URL` if the final domain is not `nextageconsult.com`.
- Social links, phone, email and venue are editable in Sanity → Site Settings (fallbacks live in `lib/site-data.ts`).
- Confirm final venue, programme fees/schedules and legal/privacy content before launch.
- Add analytics/cookie consent if required by your operating jurisdiction and analytics setup.
