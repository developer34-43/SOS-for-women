import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export function LogoMark({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <div
      className={cn(
        'relative grid place-items-center rounded-2xl bg-gradient-primary shadow-lg shadow-primary/30',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.58}
        height={size * 0.58}
        fill="none"
        aria-hidden="true"
      >
        {/* Shield outline */}
        <path
          d="M12 2.5 4.5 5.5v6c0 4.6 3.2 8.4 7.5 9.6 4.3-1.2 7.5-5 7.5-9.6v-6L12 2.5Z"
          fill="white"
          fillOpacity="0.18"
          stroke="white"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* Eye / vision iris */}
        <circle cx="12" cy="11" r="3.1" fill="white" />
        <circle cx="12" cy="11" r="1.25" fill="#2563EB" />
      </svg>
    </div>
  );
}

export function Logo({ className, size = 48, showWordmark = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <LogoMark size={size} />
      {showWordmark && (
        <div className="leading-tight">
          <p className="text-base font-semibold tracking-tight text-white">
            Guardian
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
            Vision AI
          </p>
        </div>
      )}
    </div>
  );
}
