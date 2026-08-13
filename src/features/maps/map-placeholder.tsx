import { MapPin, Navigation, Search, Layers, Plus, Minus, ShieldCheck } from 'lucide-react';

export function MapPlaceholder() {
  return (
    <div className="relative flex flex-1 flex-col">
      {/* Map canvas (placeholder) */}
      <div className="relative flex-1 overflow-hidden bg-[#0c1626]">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(37,99,235,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.5) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        {/* Faux roads */}
        <div className="absolute left-0 top-1/3 h-2 w-full -rotate-3 bg-white/8" />
        <div className="absolute left-1/4 top-0 h-full w-2 rotate-6 bg-white/8" />
        <div className="absolute left-2/3 top-0 h-full w-1.5 bg-white/6" />

        {/* Glowing zones */}
        <Zone className="left-[22%] top-[28%]" tone="success" label="Safe zone" />
        <Zone className="left-[60%] top-[40%]" tone="danger" label="High-risk area" />
        <Zone className="left-[45%] top-[68%]" tone="primary" label="Your location" pulse />

        {/* Search bar */}
        <div className="absolute inset-x-4 top-4 z-10">
          <div className="glass-strong flex h-12 items-center gap-3 rounded-2xl px-4">
            <Search className="h-5 w-5 text-white/45" />
            <span className="text-sm text-white/40">Search a destination or safe place…</span>
          </div>
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-6 right-4 z-10 flex flex-col gap-2">
          <MapBtn icon={Plus} label="Zoom in" />
          <MapBtn icon={Minus} label="Zoom out" />
          <MapBtn icon={Layers} label="Map layers" />
        </div>

        {/* Recenter */}
        <div className="absolute bottom-6 left-4 z-10">
          <MapBtn icon={Navigation} label="Recenter" />
        </div>
      </div>

      {/* Bottom info sheet */}
      <div className="relative z-10 -mt-6 rounded-t-3xl border border-b-0 border-white/10 bg-background/80 p-5 backdrop-blur-xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-success/15 text-success">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">3 safe zones nearby</p>
            <p className="text-xs text-white/50">Within 2 km of your location</p>
          </div>
          <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-white/70">
            <MapPin className="mr-1 inline h-3 w-3" />
            2 km
          </span>
        </div>
        <p className="mt-4 text-center text-xs text-white/40">
          Live map integration coming soon · placeholder view
        </p>
      </div>
    </div>
  );
}

function Zone({
  className,
  tone,
  label,
  pulse,
}: {
  className: string;
  tone: 'success' | 'danger' | 'primary';
  label: string;
  pulse?: boolean;
}) {
  const colors = {
    success: 'bg-success/25 ring-success/50',
    danger: 'bg-destructive/25 ring-destructive/50',
    primary: 'bg-primary/30 ring-primary/60',
  } as const;
  return (
    <div className={`absolute ${className}`}>
      <span
        className={`relative grid h-12 w-12 place-items-center rounded-full ring-2 ${colors[tone]} ${pulse ? 'animate-pulse-ring' : ''}`}
      >
        <span className={`h-3 w-3 rounded-full ${tone === 'danger' ? 'bg-destructive' : tone === 'success' ? 'bg-success' : 'bg-primary'}`} />
      </span>
      <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}

function MapBtn({ icon: Icon, label }: { icon: typeof Plus; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-background/80 text-white backdrop-blur-xl transition-colors hover:bg-white/15 active:scale-95"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
