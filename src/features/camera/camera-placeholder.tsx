import { Camera, ScanLine, Zap, Sparkles, AlertCircle } from 'lucide-react';

export function CameraPlaceholder() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
      {/* Viewfinder frame */}
      <div className="relative aspect-[3/4] w-full max-w-[300px]">
        {/* Corner brackets */}
        <Bracket className="left-0 top-0 border-l-2 border-t-2 rounded-tl-3xl" />
        <Bracket className="right-0 top-0 border-r-2 border-t-2 rounded-tr-3xl" />
        <Bracket className="left-0 bottom-0 border-l-2 border-b-2 rounded-bl-3xl" />
        <Bracket className="right-0 bottom-0 border-r-2 border-b-2 rounded-br-3xl" />

        <div className="absolute inset-3 overflow-hidden rounded-2xl bg-black/40 backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-destructive/10" />
          {/* Scan line */}
          <div
            className="absolute inset-x-4 top-1/2 h-0.5 bg-primary/80 shadow-[0_0_12px_rgba(37,99,235,0.8)]"
            style={{ animation: 'shimmer 2.4s ease-in-out infinite' }}
          />
          {/* Center icon */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/8 text-primary">
                <Camera className="h-8 w-8" />
              </span>
              <p className="text-sm text-white/60">Camera preview</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-semibold tracking-tight text-white">
        AI threat scanning
      </h2>
      <p className="mt-2 max-w-[260px] text-sm text-white/55">
        Camera access will appear here. Guardian Vision analyzes your
        surroundings in real time to flag potential risks.
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-full bg-amber-400/10 px-4 py-2 text-xs font-medium text-amber-300">
        <AlertCircle className="h-4 w-4" />
        Placeholder · camera not yet active
      </div>

      {/* Mode chips */}
      <div className="mt-8 flex items-center gap-2">
        <ModeChip icon={ScanLine} label="Scan" active />
        <ModeChip icon={Zap} label="Flash" />
        <ModeChip icon={Sparkles} label="Auto" />
      </div>
    </div>
  );
}

function Bracket({ className }: { className: string }) {
  return <span className={`absolute h-10 w-10 border-primary/70 ${className}`} />;
}

function ModeChip({
  icon: Icon,
  label,
  active,
}: {
  icon: typeof Camera;
  label: string;
  active?: boolean;
}) {
  return (
    <span
      className={
        'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ' +
        (active ? 'bg-primary text-white' : 'bg-white/8 text-white/60')
      }
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
