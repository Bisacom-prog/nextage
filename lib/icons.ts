import {
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  BusFront,
  Calculator,
  FlaskConical,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Laptop,
  Sparkles,
  SprayCan,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { IconKey } from './icon-keys';

export const icons: Record<IconKey, LucideIcon> = {
  'heart-handshake': HeartHandshake,
  'graduation-cap': GraduationCap,
  laptop: Laptop,
  wrench: Wrench,
  sparkles: Sparkles,
  'hand-coins': HandCoins,
  briefcase: BriefcaseBusiness,
  building: Building2,
  bus: BusFront,
  'spray-can': SprayCan,
  brain: BrainCircuit,
  'book-open': BookOpen,
  flask: FlaskConical,
  calculator: Calculator,
};

export function resolveIcon(key: string | null | undefined, fallback: IconKey = 'sparkles'): LucideIcon {
  return (key && icons[key as IconKey]) || icons[fallback];
}
