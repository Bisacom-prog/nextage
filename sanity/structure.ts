import type { StructureResolver } from 'sanity/structure';

/** Site Settings is a singleton: one fixed document, no duplicates. */
export const SINGLETON_TYPES = new Set(['siteSettings']);

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('program').title('Programmes'),
    ]);
