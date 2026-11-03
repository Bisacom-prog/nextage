import { defineField, defineType } from 'sanity';
import { iconOptions } from '../../lib/icon-keys';

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required().max(60) }),
    defineField({ name: 'group', title: 'Group', type: 'string', options: { list: ['Core', 'Extended'], layout: 'radio' }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'shortDescription', title: 'Short description', type: 'text', rows: 3, validation: (Rule) => Rule.required().max(200) }),
    defineField({ name: 'icon', title: 'Icon', type: 'string', options: { list: [...iconOptions] } }),
    defineField({ name: 'order', title: 'Display order', type: 'number', initialValue: 10 }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'group' } },
});
