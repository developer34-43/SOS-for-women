'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  fetchProfile,
  updateProfile,
} from '@/services/profile';
import type { Profile, ProfileUpdate } from '@/types/profile';

interface UseProfileResult {
  profile: Profile | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  save: (patch: ProfileUpdate) => Promise<Profile | null>;
}

export function useProfile(userId: string | undefined): UseProfileResult {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!userId) return;
    try {
      setError(null);
      const p = await fetchProfile(userId);
      setProfile(p);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    refresh();
  }, [userId, refresh]);

  // Keep the profile in sync when the profile row changes (e.g. after save).
  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel(`profiles:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${userId}`,
        },
        () => {
          refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, refresh]);

  const save = useCallback(
    async (patch: ProfileUpdate): Promise<Profile | null> => {
      if (!userId) return null;
      setSaving(true);
      setError(null);
      try {
        const updated = await updateProfile(userId, patch);
        setProfile(updated);
        return updated;
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Failed to save profile';
        setError(msg);
        throw e;
      } finally {
        setSaving(false);
      }
    },
    [userId],
  );

  return { profile, loading, saving, error, refresh, save };
}
