import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Content Security Policy.
 * Next.js inlines small bootstrapping scripts, so 'unsafe-inline' is required
 * for script-src unless every page is rendered dynamically with a nonce, which
 * would cost static rendering and CDN caching. The policy still blocks
 * third-party scripts, plugins, framing and form posts to other origins.
 */
function csp(extra: { img?: string; connect?: string; script?: string; frame?: string; font?: string } = {}) {
  return [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}${extra.script ? ` ${extra.script}` : ''}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https://cdn.sanity.io${extra.img ? ` ${extra.img}` : ''}`,
    `font-src 'self' data:${extra.font ? ` ${extra.font}` : ''}`,
    `connect-src 'self'${isDev ? ' ws:' : ''}${extra.connect ? ` ${extra.connect}` : ''}`,
    `frame-src ${extra.frame ?? `'none'`}`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `worker-src 'self' blob:`,
    `manifest-src 'self'`,
    ...(isDev ? [] : ['upgrade-insecure-requests']),
  ].join('; ');
}

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [...securityHeaders, { key: 'Content-Security-Policy', value: csp() }],
      },
      {
        // The embedded Studio talks to the Sanity API, loads user avatars and opens auth popups.
        source: '/studio/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp({
              img: 'https:',
              script: 'https://core.sanity-cdn.com',
              font: 'https://*.sanity.io',
              connect: 'https://*.sanity.io wss://*.sanity.io https://*.apicdn.sanity.io https://*.sanity-cdn.com',
              frame: 'https://*.sanity.io',
            }),
          },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex' },
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      {
        source: '/:file(.*\\.(?:jpg|jpeg|png|webp|avif|svg|woff2))',
        // /public files are not content-hashed, so avoid `immutable` – replacing a file must still roll out.
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ];
  },
};

export default nextConfig;
