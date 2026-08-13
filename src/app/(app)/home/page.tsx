'use client';

import Link from 'next/link';
import {
  MapPin,
  Bell,
  Camera,
  Siren,
  Share2,
  Phone,
  Video,
  ShieldCheck,
} from 'lucide-react';
import { Header } from '@/components/header';
import { GlassCard } from '@/components/card';
import { PrimaryButton } from '@/components/primary-button';
import { SafetyStatus } from '@/features/home/safety-status';
import { useAuth } from '@/hooks/use-auth';
import { useProfile } from '@/hooks/use-profile';

const QUICK_ACTIONS = [
  { label: 'Scan', icon: Camera, href: '/camera', tone: 'primary' },
  { label: 'SOS', icon: Siren, href: '/sos', tone: 'danger' },
  { label: 'Share', icon: Share2, href: '/maps', tone: 'success' },
  { label: 'Call', icon: Phone, href: '/sos', tone: 'primary' },
] as const;

export default function HomeScreen() {
  const { user } = useAuth();
  const { profile } = useProfile(user?.id);

  const firstName = (profile?.name || user?.email || 'there')
    .split(' ')[0]
    .split('@')[0];
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <>
      <Header
        title={greeting}
        subtitle={`${firstName} · Stay aware out there`}
        rightSlot={
          <button
            aria-label="Notifications"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white transition-colors hover:bg-white/15"
          >
            <Bell className="h-5 w-5" />
          </button>
        }
      />

      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-4 no-scrollbar">
        {/* Location pill */}
        <div className="flex items-center gap-2 text-sm text-white/55 animate-fade-in">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="truncate">Location services coming soon</span>
        </div>

        {/* Safety status */}
        <div className="animate-fade-in" style={{ animationDelay: '0.05s' }}>
          <SafetyStatus level="safe" />
        </div>

        {/* Quick actions */}
        <div
          className="grid grid-cols-4 gap-2 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          {QUICK_ACTIONS.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="glass-card flex flex-col items-center gap-1.5 rounded-2xl py-3 transition-all hover:-translate-y-0.5 hover:bg-white/[0.1] active:scale-[0.97]"
            >
              <span
                className={
                  'grid h-10 w-10 place-items-center rounded-xl ' +
                  (a.tone === 'danger'
                    ? 'bg-destructive/15 text-destructive'
                    : a.tone === 'success'
                      ? 'bg-success/15 text-success'
                      : 'bg-primary/15 text-primary')
                }
              >
                <a.icon className="h-[18px] w-[18px]" />
              </span>
              <span className="text-xs font-medium text-white/75">
                {a.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Feature highlight */}
        <div
          className="glass-card relative overflow-hidden rounded-3xl p-4 animate-fade-in"
          style={{ animationDelay: '0.15s' }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/25 blur-2xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
              <Video className="h-3.5 w-3.5" /> AI Vision
            </span>
            <h3 className="mt-2.5 text-base font-semibold tracking-tight text-white">
              Real-time threat detection
            </h3>
            <p className="mt-1 text-sm text-white/55">
              Point your camera to instantly analyze your surroundings for
              potential risks.
            </p>
            <Link href="/camera">
              <PrimaryButton
                size="sm"
                className="mt-3"
                rightIcon={<Camera className="h-4 w-4" />}
              >
                Start scanning
              </PrimaryButton>
            </Link>
          </div>
        </div>

        {/* Account status */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="mb-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-white/45">
            Your account
          </h2>
          <GlassCard className="px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-success/15 text-success">
                <ShieldCheck className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">
                  {profile?.email_verified
                    ? 'Account verified'
                    : 'Welcome to Guardian'}
                </p>
                <p className="truncate text-xs text-white/45">
                  {profile?.emergency_contacts?.length
                    ? `${profile.emergency_contacts.length} emergency contact${profile.emergency_contacts.length > 1 ? 's' : ''} set`
                    : 'Add emergency contacts in your profile'}
                </p>
              </div>
              <Link
                href="/profile"
                className="shrink-0 rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/15"
              >
                Manage
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
