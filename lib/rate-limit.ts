import 'server-only';

/**
 * Lightweight fixed-window rate limiter.
 *
 * On Vercel each serverless instance keeps its own memory, so this is a
 * best-effort first line of defence that stops scripted bursts against a warm
 * instance. For strict global limits add a Vercel Firewall rate-limit rule on
 * /api/inquiry (no code change needed) or swap this for Upstash/Redis.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5_000;

export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_KEYS) {
      // Evict expired entries; if still full, drop the oldest to bound memory.
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
      if (buckets.size >= MAX_KEYS) buckets.delete(buckets.keys().next().value!);
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

export function clientIp(request: Request) {
  // Vercel sets x-forwarded-for; the first entry is the original client.
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}
