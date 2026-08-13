import { ShieldCheck, AlertTriangle, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusLevel = 'safe' | 'caution' | 'alert';

const STATUS: Record<
  StatusLevel,
  { label: string; desc: string; ring: string; icon: LucideIcon; iconColor: string }
> = {
  safe: {
    label: 'You are safe',
    desc: 'No threats detected nearby',
    ring: 'border-success/40 bg-success/10',
    icon: ShieldCheck,
    iconColor: 'text-success',
  },
  caution: {
    label: 'Stay alert',
    desc: 'Low-risk area detected ahead',
    ring: 'border-amber-400/40 bg-amber-400/10',
    icon: AlertTriangle,
    iconColor: 'text-amber-400',
  },
  alert: {
    label: 'Threat detected',
    desc: 'Move to a safe location now',
    ring: 'border-destructive/40 bg-destructive/10',
    icon: AlertTriangle,
    iconColor: 'text-destructive',
  },
};

export function SafetyStatus({ level = 'safe' }: { level?: StatusLevel }) {
  const s = STATUS[level];
  const Icon = s.icon;
  return (
    <div
      className={cn(
        'flex items-center gap-3.5 rounded-2xl border p-3.5',
        s.ring,
      )}
    >
      <span
        className={cn(
          'grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10',
          s.iconColor,
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[15px] font-semibold text-white">{s.label}</p>
        <p className="truncate text-sm text-white/55">{s.desc}</p>
      </div>
    </div>
  );
}
