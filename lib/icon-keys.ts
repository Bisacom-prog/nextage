/**
 * Icon keys editors can choose in Sanity. Kept free of React imports so the
 * schema can use it without pulling icon components into the Studio bundle.
 */
export const iconOptions = [
  { title: 'Heart & handshake', value: 'heart-handshake' },
  { title: 'Graduation cap', value: 'graduation-cap' },
  { title: 'Laptop', value: 'laptop' },
  { title: 'Wrench', value: 'wrench' },
  { title: 'Sparkles', value: 'sparkles' },
  { title: 'Coins', value: 'hand-coins' },
  { title: 'Briefcase', value: 'briefcase' },
  { title: 'Building', value: 'building' },
  { title: 'Bus', value: 'bus' },
  { title: 'Brush / cleaning', value: 'spray-can' },
  { title: 'Brain', value: 'brain' },
  { title: 'Book', value: 'book-open' },
  { title: 'Flask / science', value: 'flask' },
  { title: 'Calculator', value: 'calculator' },
] as const;

export type IconKey = (typeof iconOptions)[number]['value'];
