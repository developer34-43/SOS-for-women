'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { LogoMark } from '@/components/logo';
import { APP_CONFIG } from '@/lib/constants';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

export default function SplashScreen() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Once the session resolves, route to the right place immediately.
    if (loading) return;
    const navTimer = setTimeout(
      () => router.replace(user ? '/home' : '/login'),
      600,
    );
    const leaveTimer = setTimeout(() => setLeaving(true), 300);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(navTimer);
    };
  }, [router, user, loading]);

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Ambient aurora */}
      <div className="pointer-events-none absolute inset-0 app-aurora" />

      {/* Floating accent orbs */}
      <div className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-destructive/15 blur-3xl" />

      <div
        className={cn(
          'relative z-10 flex flex-col items-center transition-all duration-500',
          leaving ? 'scale-95 opacity-0' : 'opacity-100',
        )}
      >
        {/* Logo with pulsing rings */}
        <div className="relative mb-8">
          <span className="absolute inset-0 animate-pulse-ring rounded-3xl bg-primary/40" />
          <span
            className="absolute inset-0 animate-pulse-ring rounded-3xl bg-primary/30"
            style={{ animationDelay: '0.8s' }}
          />
          <div className="relative animate-fade-in-scale">
            <LogoMark size={96} className="rounded-[28px]" />
          </div>
        </div>

        <div className="animate-slide-up text-center" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Guardian Vision AI
          </h1>
          <p className="mt-2 text-sm font-medium text-white/60">
            {APP_CONFIG.tagline}
          </p>
        </div>

        <div
          className="mt-10 flex animate-fade-in items-center gap-2 text-xs text-white/40"
          style={{ animationDelay: '0.6s' }}
        >
          <ShieldCheck className="h-4 w-4 text-success" />
          <span>Secured · Encrypted · Always-on</span>
        </div>
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-12 left-1/2 h-1 w-40 -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-primary"
          style={{
            animation: 'shimmer 2.4s ease-in-out forwards',
            transformOrigin: 'left',
          }}
        />
      </div>
    </div>
  );
}
