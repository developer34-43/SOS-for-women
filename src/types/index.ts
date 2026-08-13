import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly icon: LucideIcon;
};
