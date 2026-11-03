import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Homepage hero', default: true },
    { name: 'contact', title: 'Contact & social' },
  ],
  fields: [
    defineField({ name: 'heroEyebrow', title: 'Hero eyebrow', type: 'string', group: 'hero', validation: (Rule) => Rule.max(60) }),
    defineField({ name: 'heroTitle', title: 'Hero title', type: 'string', group: 'hero', validation: (Rule) => Rule.max(80) }),
    defineField({ name: 'heroSubtitle', title: 'Hero subtitle', type: 'string', group: 'hero', validation: (Rule) => Rule.max(80) }),
    defineField({ name: 'heroTagline', title: 'Hero tagline', type: 'string', group: 'hero', validation: (Rule) => Rule.max(80) }),
    defineField({ name: 'heroBody', title: 'Hero body', type: 'text', rows: 4, group: 'hero', validation: (Rule) => Rule.max(400) }),
    defineField({
      name: 'stats',
      title: 'Featured stats',
      type: 'array',
      group: 'hero',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required().max(10) }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required().max(30) }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact', description: 'Shown in the footer and contact page, e.g. 0243 420 016' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact', validation: (Rule) => Rule.email() }),
    defineField({ name: 'venue', title: 'Training venue', type: 'string', group: 'contact' }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: { list: ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'WhatsApp', 'X'] },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
            }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Website content' }) },
});
