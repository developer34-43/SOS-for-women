'use client';

import * as React from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
  transparent?: boolean;
}

export function Header({
  title,
  subtitle,
  onBack,
  onAction,
  actionIcon,
  rightSlot,
  className,
  transparent,
}: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex items-center gap-3 px-5 pb-3 pt-5 safe-top',
        !transparent && 'glass border-x-0 border-t-0',
        className,
      )}
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/8 text-white transition-colors hover:bg-white/15 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-semibold tracking-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="truncate text-sm text-white/55">{subtitle}</p>
        )}
      </div>
      {rightSlot}
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          aria-label="More options"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/8 text-white transition-colors hover:bg-white/15 active:scale-95"
        >
          {actionIcon ?? <MoreHorizontal className="h-5 w-5" />}
        </button>
      )}
    </header>
  );
}
