import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  strong?: boolean;
  interactive?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, strong, interactive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          strong ? 'glass-strong' : 'glass-card',
          'transition-all duration-300',
          interactive &&
            'cursor-pointer hover:-translate-y-0.5 hover:bg-white/[0.1] active:scale-[0.99]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
GlassCard.displayName = 'GlassCard';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function Card({
  title,
  description,
  action,
  icon,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <GlassCard className={cn('p-5', className)} {...props}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/8 text-primary">
                {icon}
              </span>
            )}
            <div>
              {title && (
                <h3 className="text-base font-semibold tracking-tight text-white">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-0.5 text-sm text-white/55">{description}</p>
              )}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </GlassCard>
  );
}
