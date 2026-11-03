import type { IconKey } from './icon-keys';

/**
 * Built-in fallback content. The site renders fully from this file when Sanity
 * is not configured or unreachable; published CMS content overrides it.
 */

export type SocialPlatform = 'Facebook' | 'Instagram' | 'TikTok' | 'YouTube' | 'LinkedIn' | 'WhatsApp' | 'X';

export type SocialLink = { platform: SocialPlatform; url: string };

export type ServiceItem = { title: string; description: string; icon: IconKey };

export type ProgramCategory = 'Technical' | 'Vocational' | 'Academic';

export type ProgramItem = { title: string; category: ProgramCategory; description?: string; icon?: IconKey };

export type Stat = { value: string; label: string };

export const defaultSocialLinks: SocialLink[] = [
  { platform: 'Facebook', url: 'https://www.facebook.com/share/19CBVZgpxU/' },
  { platform: 'Instagram', url: 'https://www.instagram.com/mikenhyira86/' },
  { platform: 'TikTok', url: 'https://www.tiktok.com/@nac360equiphub' },
];

export const defaultHero = {
  heroEyebrow: 'Skills for a brighter tomorrow',
  heroTitle: 'Raising Solution Providers',
  heroSubtitle: 'NEXTAGE 360 EQUIP HUB',
  heroTagline: 'Learn • Create • Earn • Impact',
  heroBody:
    'We empower learners with practical, academic, technical and vocational skills to build confidence, create opportunities, earn sustainably and make a positive impact in their communities.',
};

export const defaultStats: Stat[] = [
  { value: '20+', label: 'Programmes' },
  { value: '4', label: 'Learning pathways' },
  { value: '360°', label: 'Practical support' },
  { value: 'Real', label: 'Community impact' },
];

export const defaultContact = {
  phone: '0243 420 016',
  email: 'nextageconsult1@gmail.com',
  venue: 'Great Family Chapel Training Center',
};

export const coreServices: ServiceItem[] = [
  {
    title: 'Counselling & Life Coaching',
    description: 'Personal growth, purpose discovery and practical guidance for a stronger future.',
    icon: 'heart-handshake',
  },
  {
    title: 'Academic Support',
    description: 'Focused support in core subjects to help learners build confidence and excel.',
    icon: 'graduation-cap',
  },
  {
    title: 'Technical Skills Training',
    description: 'In-demand digital and practical skills designed for today’s opportunities.',
    icon: 'laptop',
  },
  {
    title: 'Vocational Skills Training',
    description: 'Hands-on, income-ready skills for self-reliance, employment and entrepreneurship.',
    icon: 'wrench',
  },
];

export const extendedServices: ServiceItem[] = [
  { title: '360 Equip Hub', description: 'Training, resources, mentorship and opportunities in one place.', icon: 'sparkles' },
  { title: 'Financial Advisory', description: 'Practical guidance for personal and business financial growth.', icon: 'hand-coins' },
  { title: 'HR Training & Job Agency', description: 'Capacity building, workplace readiness and job placement support.', icon: 'briefcase' },
  { title: 'Properties – Rental & Sale', description: 'Property solutions for individuals, families and growing businesses.', icon: 'building' },
  { title: 'Transport Services', description: 'Reliable and convenient transport support for people and organisations.', icon: 'bus' },
  { title: 'Cleaning Services', description: 'Professional cleaning support for homes, offices and institutions.', icon: 'spray-can' },
];

const technical = [
  'AI Tools & Productivity',
  'Graphic Design & Branding',
  'Video Editing & Content Creation',
  'Digital Marketing & Sales',
  'Website Design',
  'Introduction to Computing',
  'Phone & Gadget Repairs',
  'Financial Literacy for Business Owners',
  'Entrepreneurship',
];

const vocational = [
  'Bead Making',
  'Fashion Design & Garment',
  'Hair Pomade Production',
  'Cosmetics Production',
  'Liquid Soap Making',
  'Cereal Mix (Tombrown) Production & Packaging',
  'Baking & Pastry',
  'Make-up',
  'Resin Art',
  'Juice, Sobolo & Natural Drinks Production',
];

export const defaultPrograms: Record<ProgramCategory, ProgramItem[]> = {
  Technical: technical.map((title) => ({ title, category: 'Technical' })),
  Vocational: vocational.map((title) => ({ title, category: 'Vocational' })),
  Academic: [
    { title: 'English', category: 'Academic', description: 'Build stronger communication, comprehension and language skills.', icon: 'book-open' },
    { title: 'Maths', category: 'Academic', description: 'Develop problem-solving confidence and practical numerical skills.', icon: 'calculator' },
    { title: 'Science', category: 'Academic', description: 'Understand key concepts and explore how the world around us works.', icon: 'flask' },
  ],
};
