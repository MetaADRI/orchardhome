import {
  Apple,
  Flower2,
  Leaf,
  ShoppingBasket,
  Sprout,
  Sun,
  Trophy,
  type LucideIcon
} from 'lucide-react';
import type { PathNode } from '../data/lessons';

const icons: Record<PathNode['icon'], LucideIcon> = {
  seed: Sprout,
  tomato: Sun,
  pot: Flower2,
  mint: Leaf,
  quiz: Trophy,
  growth: Sprout,
  kale: Leaf,
  plum: Apple,
  apple: Apple,
  basket: ShoppingBasket
};

export default function PathIcon({ icon, size = 24 }: { icon: PathNode['icon']; size?: number }) {
  const Icon = icons[icon];
  return <Icon size={size} strokeWidth={2.2} aria-hidden="true" />;
}
