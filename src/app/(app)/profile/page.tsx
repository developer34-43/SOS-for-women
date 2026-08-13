'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Settings,
  ShieldCheck,
  ChevronRight,
  Star,
  Award,
  Users,
  MapPin,
  Loader2,
  LogOut,
} from 'lucide-react';
import { Header } from '@/components/header';
import { GlassCard } from '@/components/card';
import { PrimaryButton } from '@/components/primary-button';
import { Modal } from '@/components/modal';
import { useAuth } from '@/hooks/use-auth';
import { useProfile } from '@/hooks/use-profile';
import { signOut } from '@/services/auth';
import { EditableProfile } from '@/features/profile/editable-profile';
import type { ProfileUpdate } from '@/types/profile';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { profile, loading, saving, error, save } = useProfile(user?.id);
  const [editOpen, setEditOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  async function handleSave(patch: ProfileUpdate) {
    await save(patch);
    setEditOpen(false);
  }

  async function handleSignOut() {
    await signOut();
    router.replace('/login');
  }

  if (loading) {
    return (
      <>
        <Header title="Profile" />
        <div className="grid flex-1 place-items-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      </>
    );
  }

  const initials = (profile?.name || profile?.email || 'U')
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <>
      <Header
        title="Profile"
        rightSlot={
          <Link
            href="/settings"
            aria-label="Settings"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white transition-colors hover:bg-white/15"
          >
            <Settings className="h-5 w-5" />
          </Link>
        }
      />

      <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-4 no-scrollbar">
        {/* Identity card */}
        <GlassCard className="relative overflow-hidden p-4 animate-fade-in">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
          <div className="relative flex items-center gap-3.5">
            <div className="relative">
              {profile?.profile_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.profile_image}
                  alt={profile.name}
                  className="h-16 w-16 rounded-2xl object-cover"
                />
              ) : (
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-xl font-bold text-white shadow-lg shadow-primary/30">
                  {initials}
                </div>
              )}
              {profile?.email_verified && (
                <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-background bg-success">
                  <ShieldCheck className="h-3.5 w-3.5 text-white" />
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-semibold tracking-tight text-white">
                {profile?.name || 'Your name'}
              </h2>
              <p className="truncate text-sm text-white/55">{profile?.email}</p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary">
                  <Star className="h-3 w-3" /> Pro
                </span>
                {profile?.email_verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-medium text-success">
                    <Award className="h-3 w-3" /> Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-white/[0.04] py-2.5">
            <Stat
              value={String(profile?.emergency_contacts?.length ?? 0)}
              label="Contacts"
            />
            <Stat
              value={profile?.blood_group || '—'}
              label="Blood"
            />
            <Stat value={profile?.language.toUpperCase() || 'EN'} label="Lang" />
          </div>

          <PrimaryButton
            variant="secondary"
            size="sm"
            className="mt-3 w-full"
            onClick={() => setEditOpen(true)}
          >
            Edit profile
          </PrimaryButton>
        </GlassCard>

        {error && (
          <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
            {error}
          </p>
        )}

        {/* Quick links */}
        <div>
          <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-white/45">
            Safety
          </h2>
          <GlassCard className="divide-y divide-white/8 px-4 py-1">
            <LinkRow icon={Users} label="Trusted contacts" value={`${profile?.emergency_contacts?.length ?? 0} contacts`} href="/profile" />
            <LinkRow icon={MapPin} label="Saved locations" value="Coming soon" href="/maps" />
          </GlassCard>
        </div>

        <PrimaryButton
          variant="danger"
          size="block"
          leftIcon={<LogOut className="h-5 w-5" />}
          onClick={() => setSignOutOpen(true)}
        >
          Sign out
        </PrimaryButton>

        <p className="pt-1 text-center text-xs text-white/35">
          Guardian Vision AI · v1.0.0
        </p>
      </div>

      {/* Edit modal */}
      <Modal
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit profile"
        className="max-w-[390px]"
      >
        {profile && (
          <div className="max-h-[70vh] overflow-y-auto pr-1 no-scrollbar">
            <EditableProfile
              profile={profile}
              saving={saving}
              onSave={handleSave}
            />
          </div>
        )}
      </Modal>

      {/* Sign-out confirm */}
      <Modal
        open={signOutOpen}
        onOpenChange={setSignOutOpen}
        title="Sign out?"
        description="You'll need to sign in again to access your safety features."
      >
        <div className="flex gap-3">
          <PrimaryButton
            variant="secondary"
            className="flex-1"
            onClick={() => setSignOutOpen(false)}
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton
            variant="danger"
            className="flex-1"
            onClick={handleSignOut}
          >
            Sign out
          </PrimaryButton>
        </div>
      </Modal>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-base font-bold text-white">{value}</p>
      <p className="text-[11px] text-white/50">{label}</p>
    </div>
  );
}

function LinkRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-3 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/8 text-primary">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-white/45">{value}</p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-white/30" />
    </Link>
  );
}
