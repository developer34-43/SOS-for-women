'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { BottomNavigation } from '@/components/bottom-navigation';

interface AppShellProps {
  children: React.ReactNode;
  showNav?: boolean;
  className?: string;
}

/**
 * Centered 430px mobile frame with ambient aurora background.
 * Optional bottom navigation for primary app screens.
 */
export function AppShell({ children, showNav = true, className }: AppShellProps) {
  return (
    <div className="relative min-h-[100dvh] w-full bg-background text-foreground">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 app-aurora" />

      {/* Centered mobile frame */}
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-app flex-col">
        <main
          className={cn(
            'relative flex flex-1 flex-col overflow-hidden',
            showNav && 'pb-28',
            className,
          )}
        >
          {children}
        </main>
        {showNav && <BottomNavigation />}
      </div>
    </div>
  );
}
