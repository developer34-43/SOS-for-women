import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
} as const;

export function Loader({ size = 'md', label, className }: LoaderProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <span
        role="status"
        aria-label={label ?? 'Loading'}
        className={cn(
          'inline-block animate-spin rounded-full border-white/15 border-t-primary',
          sizeMap[size],
        )}
      />
      {label && <p className="text-sm text-white/60">{label}</p>}
    </div>
  );
}

export function FullScreenLoader({ label }: { label?: string }) {
  return (
    <div className="grid h-full w-full place-items-center">
      <Loader size="lg" label={label} />
    </div>
  );
}
