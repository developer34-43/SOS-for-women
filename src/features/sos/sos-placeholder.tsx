import { Siren, Phone, Share2, MapPin, ShieldAlert, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SosPlaceholder() {
  return (
    <div className="relative flex flex-1 flex-col items-center px-6 pb-6 pt-6">
      {/* Status banner */}
      <div className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success">
          <ShieldAlert className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">SOS is armed</p>
          <p className="text-xs text-white/50">Press and hold to trigger an emergency alert</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Ready
        </span>
      </div>

      {/* Big SOS button */}
      <div className="relative mt-12 flex flex-col items-center">
        {/* Pulsing rings */}
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-destructive/40" />
        <span
          className="absolute inset-0 animate-pulse-ring rounded-full bg-destructive/30"
          style={{ animationDelay: '1s' }}
        />
        <span
          className="absolute inset-0 animate-pulse-ring rounded-full bg-destructive/20"
          style={{ animationDelay: '2s' }}
        />
        <button
          type="button"
          aria-label="Trigger SOS"
          className="relative grid h-56 w-56 place-items-center rounded-full bg-gradient-danger shadow-2xl shadow-destructive/40 transition-transform duration-300 active:scale-95"
        >
          <div className="flex flex-col items-center">
            <Siren className="h-12 w-12 text-white" />
            <span className="mt-3 text-3xl font-bold tracking-wider text-white">SOS</span>
            <span className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              Hold to alert
            </span>
          </div>
        </button>
      </div>

      {/* Countdown hint */}
      <div className="mt-10 flex items-center gap-2 text-sm text-white/50">
        <Clock className="h-4 w-4" />
        <span>5-second cancel window after activation</span>
      </div>

      {/* Quick actions */}
      <div className="mt-auto w-full space-y-3 pt-10">
        <SosAction
          icon={Phone}
          title="Call emergency services"
          subtitle="Direct line to local police"
          tone="danger"
        />
        <SosAction
          icon={Share2}
          title="Share live location"
          subtitle="Send to trusted contacts"
          tone="primary"
        />
        <SosAction
          icon={MapPin}
          title="Navigate to safe zone"
          subtitle="Nearest verified safe location"
          tone="success"
        />
      </div>
    </div>
  );
}

function SosAction({
  icon: Icon,
  title,
  subtitle,
  tone,
}: {
  icon: typeof Phone;
  title: string;
  subtitle: string;
  tone: 'danger' | 'primary' | 'success';
}) {
  return (
    <button
      type="button"
      className={cn(
        'glass-card flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all hover:bg-white/[0.1] active:scale-[0.99]',
      )}
    >
      <span
        className={cn(
          'grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/8',
          tone === 'danger' && 'text-destructive',
          tone === 'primary' && 'text-primary',
          tone === 'success' && 'text-success',
        )}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/50">{subtitle}</p>
      </div>
    </button>
  );
}
