import { z } from 'zod';

/** Strip control characters (incl. CR/LF) from single-line fields to prevent header/subject injection. */
const singleLine = (max: number) =>
  z
    .string()
    .transform((v) => v.replace(/[\u0000-\u001F\u007F]+/g, ' ').replace(/\s+/g, ' ').trim())
    .pipe(z.string().max(max));

export const inquirySchema = z.object({
  mode: z.enum(['contact', 'register']).catch('contact'),
  name: singleLine(120).pipe(z.string().min(2, 'Please enter your full name.')),
  email: singleLine(160).pipe(z.email('Please enter a valid email address.')),
  phone: singleLine(30).pipe(
    z.string().regex(/^\+?[\d\s().-]{7,20}$/, 'Please enter a valid phone number.'),
  ),
  program: singleLine(180).optional().default(''),
  message: z
    .string()
    .optional()
    .default('')
    .transform((v) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim())
    .pipe(z.string().max(3000, 'Your message is too long (3,000 characters max).')),
  /** Honeypot – must be empty. */
  website: z.string().optional().default(''),
  /** Milliseconds the visitor spent on the form, measured client-side so device clock skew can't matter. */
  elapsedMs: z.coerce.number().optional(),
});

export type Inquiry = z.infer<typeof inquirySchema>;
