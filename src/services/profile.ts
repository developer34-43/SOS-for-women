import { supabase } from '@/lib/supabase';
import {
  DEFAULT_PROFILE,
  normalizeProfile,
  type Profile,
  type ProfileUpdate,
} from '@/types/profile';

/**
 * Fetch the profile row for the given user id.
 * Returns null when no profile exists yet.
 */
export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return normalizeProfile(data as Profile | null);
}

/**
 * Create a profile row for a newly signed-up user.
 * Fails if a row already exists (PK collision) — use upsertProfile for the
 * safe general path.
 */
export async function createProfile(
  userId: string,
  email: string,
  name: string,
): Promise<Profile> {
  const row = {
    ...DEFAULT_PROFILE,
    id: userId,
    email,
    name,
  };

  const { data, error } = await supabase
    .from('profiles')
    .insert(row)
    .select()
    .single();

  if (error) throw error;
  return normalizeProfile(data as Profile) as Profile;
}

/**
 * Create the profile if it doesn't exist, otherwise update name/email.
 * Safe to call on every login.
 */
export async function ensureProfile(
  userId: string,
  email: string,
  name: string,
): Promise<Profile> {
  const existing = await fetchProfile(userId);
  if (existing) {
    // Refresh denormalized email/name + last_login on each login.
    const { data, error } = await supabase
      .from('profiles')
      .update({ email, name, last_login: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return normalizeProfile(data as Profile) as Profile;
  }
  return createProfile(userId, email, name);
}

/**
 * Patch the current user's profile fields. Returns the updated row.
 */
export async function updateProfile(
  userId: string,
  patch: ProfileUpdate,
): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .update(patch)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return normalizeProfile(data as Profile) as Profile;
}
