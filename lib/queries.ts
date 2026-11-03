import { defineQuery } from 'next-sanity';

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  heroEyebrow,
  heroTitle,
  heroSubtitle,
  heroTagline,
  heroBody,
  stats[]{value, label},
  phone,
  email,
  venue,
  socialLinks[]{platform, url}
}`);

export const programsQuery = defineQuery(`*[_type == "program" && active != false && defined(title)] | order(order asc, title asc){
  _id,
  title,
  category,
  shortDescription,
  icon
}`);

export const servicesQuery = defineQuery(`*[_type == "service" && defined(title)] | order(order asc, title asc){
  _id,
  title,
  shortDescription,
  group,
  icon
}`);
