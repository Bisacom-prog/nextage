import { defineField, defineType } from 'sanity';
import { iconOptions } from '../../lib/icon-keys';

export const program = defineType({
  name: 'program',
  title: 'Programs',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required().max(80) }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Technical', 'Vocational', 'Academic'], layout: 'radio' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'shortDescription', title: 'Short description', type: 'text', rows: 3, validation: (Rule) => Rule.max(200) }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Used on Academic programmes.',
      options: { list: [...iconOptions] },
      hidden: ({ document }) => document?.category !== 'Academic',
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 10 }),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true, description: 'Inactive programmes are hidden from the site and registration form.' }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', category: 'category', active: 'active' },
    prepare: ({ title, category, active }) => ({ title, subtitle: `${category ?? '—'}${active === false ? ' · hidden' : ''}` }),
  },
});
