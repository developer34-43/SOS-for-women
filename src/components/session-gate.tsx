'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { FullScreenLoader } from '@/components/loader';

/**
 * Guards a screen so only authenticated users can see it.
 * While the session is being resolved, a loader is shown.
 * Unauthenticated users are redirected to /login.
 */
export function SessionGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return <FullScreenLoader label="Securing your session…" />;
  }

  if (!user) {
    return <FullScreenLoader label="Redirecting to sign in…" />;
  }

  return <>{children}</>;
}
