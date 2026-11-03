'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { SINGLETON_TYPES, structure } from './sanity/structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-01-01';

const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'default',
  title: 'NextAge Consult CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    // GROQ playground only in development; editors don't need it in production.
    ...(process.env.NODE_ENV === 'development' ? [visionTool({ defaultApiVersion: apiVersion })] : []),
  ],
  schema: {
    types: schemaTypes,
    // Hide singletons from the global "Create new" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    // Singletons can't be duplicated or deleted.
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType) ? input.filter(({ action }) => action && SINGLETON_ACTIONS.has(action)) : input,
  },
});
