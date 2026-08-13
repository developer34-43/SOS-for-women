import { supabase } from '@/lib/supabase';
import { ensureProfile } from '@/services/profile';

function redirectTo(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/home`;
  }
  return '/home';
}

/** Sign up with email + password, then create a profile row. */
export async function signUpWithEmail(
  name: string,
  email: string,
  password: string,
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });

  if (error) throw error;

  // When email confirmation is OFF, a session + user are returned immediately.
  // When ON, the user must verify before a session exists.
  const user = data.user;
  if (user) {
    await ensureProfile(user.id, email, name);
  }
  return data;
}

/** Sign in with email + password. */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Keep profile's last_login + denormalized email fresh.
  if (data.user) {
    const name =
      (data.user.user_metadata?.full_name as string | undefined) ?? '';
    await ensureProfile(data.user.id, email, name);
  }
  return data;
}

/** Send a password-reset email. */
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo(),
  });
  if (error) throw error;
}

/** Resend the email verification link to the current session user. */
export async function sendEmailVerification(email: string) {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });
  if (error) throw error;
}

/** Sign in with Google OAuth (opens provider popup/redirect). */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: redirectTo() },
  });

  if (error) throw error;
  return data;
}

/** Sign out the current user. */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/** Map Supabase auth errors to friendly, user-facing messages. */
export function authErrorMessage(error: unknown): string {
  const msg =
    error instanceof Error ? error.message : 'Something went wrong. Please try again.';

  const map: Record<string, string> = {
    'Invalid login credentials': 'Incorrect email or password.',
    'User already registered': 'An account with this email already exists.',
    'Password should be at least 6 characters.':
      'Password must be at least 6 characters.',
    'Unable to send password reset email':
      'Could not send a reset email. Check the address and try again.',
  };

  return map[msg] ?? msg;
}
