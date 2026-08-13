'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, Siren, User, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavEntry {
  label: string;
  href: string;
  icon: LucideIcon;
  accent?: 'primary' | 'danger';
}

const ENTRIES: NavEntry[] = [
  { label: 'Home', href: '/home', icon: Home, accent: 'primary' },
  { label: 'Camera', href: '/camera', icon: Camera, accent: 'primary' },
  { label: 'SOS', href: '/sos', icon: Siren, accent: 'danger' },
  { label: 'Profile', href: '/profile', icon: User, accent: 'primary' },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-auto sticky bottom-0 z-40 mx-auto w-full safe-bottom"
    >
      <div className="glass-strong mx-3 mb-3 flex items-center justify-around rounded-3xl px-2 py-1.5">
        {ENTRIES.map((entry) => {
          const active =
            pathname === entry.href || pathname.startsWith(entry.href + '/');
          const Icon = entry.icon;
          const isDanger = entry.accent === 'danger';

          if (isDanger) {
            return (
              <Link
                key={entry.label}
                href={entry.href}
                aria-label={entry.label}
                aria-current={active ? 'page' : undefined}
                className="group relative -mt-8 flex flex-col items-center"
              >
                <span
                  className={cn(
                    'grid h-16 w-16 place-items-center rounded-full border-4 border-background transition-transform duration-300',
                    'bg-gradient-danger shadow-lg shadow-destructive/40',
                    active ? 'scale-105' : 'group-hover:scale-105 group-active:scale-95',
                  )}
                >
                  <Icon
                    className={cn('h-7 w-7 text-white', active && 'animate-sos-pulse')}
                  />
                </span>
                <span
                  className={cn(
                    'mt-1 text-[11px] font-medium tracking-tight transition-colors',
                    active ? 'text-destructive' : 'text-white/55',
                  )}
                >
                  {entry.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={entry.label}
              href={entry.href}
              aria-label={entry.label}
              aria-current={active ? 'page' : undefined}
              className="group flex flex-1 flex-col items-center gap-1 py-1.5 tap-highlight-none"
            >
              <span
                className={cn(
                  'grid h-9 w-9 place-items-center rounded-xl transition-all duration-300',
                  active
                    ? 'bg-primary/20 text-primary'
                    : 'text-white/55 group-hover:text-white',
                )}
              >
                <Icon className="h-[22px] w-[22px]" />
              </span>
              <span
                className={cn(
                  'text-[11px] font-medium tracking-tight transition-colors',
                  active ? 'text-white' : 'text-white/55',
                )}
              >
                {entry.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
