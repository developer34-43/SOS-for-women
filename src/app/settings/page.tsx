'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Shield,
  MapPin,
  Eye,
  Volume2,
  Moon,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { Header } from '@/components/header';
import { GlassCard } from '@/components/card';
import { PrimaryButton } from '@/components/primary-button';
import { useAuth } from '@/hooks/use-auth';
import { signOut } from '@/services/auth';
import { cn } from '@/lib/utils';

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
      router.replace('/login');
    } catch {
      setSigningOut(false);
    }
  }

  return (
    <>
      <Header title="Settings" subtitle={user?.email ?? 'Preferences & privacy'} onBack={() => router.back()} />

      <div className="flex-1 space-y-5 overflow-y-auto px-4 pb-10 no-scrollbar">
        <Group title="Alerts">
          <ToggleRow icon={Bell} tone="primary" title="Push notifications" subtitle="Threat & SOS alerts" defaultOn />
          <ToggleRow icon={Volume2} tone="primary" title="Sound alerts" subtitle="Audible warnings" defaultOn />
          <ToggleRow icon={Eye} tone="primary" title="Visual alerts" subtitle="On-screen warnings" defaultOn />
        </Group>

        <Group title="Safety">
          <ToggleRow icon={Shield} tone="success" title="Auto threat detection" subtitle="Scan continuously" defaultOn />
          <ToggleRow icon={MapPin} tone="success" title="Share live location" subtitle="With trusted contacts" />
          <LinkRow icon={Globe} tone="primary" title="Emergency region" subtitle="India · 112" />
        </Group>

        <Group title="Appearance">
          <ToggleRow icon={Moon} tone="primary" title="Dark mode" subtitle="Always on" defaultOn />
        </Group>

        <Group title="Support">
          <LinkRow icon={HelpCircle} tone="primary" title="Help center" subtitle="Guides & FAQs" />
          <LinkRow icon={Shield} tone="success" title="Privacy policy" subtitle="How we handle data" />
        </Group>

        <PrimaryButton
          variant="danger"
          size="block"
          loading={signingOut}
          leftIcon={!signingOut ? <LogOut className="h-5 w-5" /> : undefined}
          onClick={handleSignOut}
        >
          Sign out
        </PrimaryButton>

        <p className="text-center text-xs text-white/35">Guardian Vision AI · v1.0.0</p>
      </div>
    </>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-white/45">
        {title}
      </h2>
      <GlassCard className="divide-y divide-white/8 px-4 py-1">{children}</GlassCard>
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  tone,
  title,
  subtitle,
  defaultOn,
}: {
  icon: LucideIcon;
  tone: 'primary' | 'success' | 'danger';
  title: string;
  subtitle: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center gap-3 py-3">
      <span
        className={cn(
          'grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/8',
          tone === 'danger' ? 'text-destructive' : tone === 'success' ? 'text-success' : 'text-primary',
        )}
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{title}</p>
        <p className="truncate text-xs text-white/45">{subtitle}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300',
          on ? 'bg-primary' : 'bg-white/15',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300',
            on ? 'translate-x-[22px]' : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  );
}

function LinkRow({
  icon: Icon,
  tone,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  tone: 'primary' | 'success' | 'danger';
  title: string;
  subtitle: string;
}) {
  return (
    <button type="button" className="flex w-full items-center gap-3 py-3 text-left">
      <span
        className={cn(
          'grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/8',
          tone === 'danger' ? 'text-destructive' : tone === 'success' ? 'text-success' : 'text-primary',
        )}
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{title}</p>
        <p className="truncate text-xs text-white/45">{subtitle}</p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-white/30" />
    </button>
  );
}
