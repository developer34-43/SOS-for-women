'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { FullScreenLoader } from '@/components/loader';

/**
 * Root entry. While the session is resolving we show a loader.
 * Once resolved: signed-in users go to /home, others to /splash.
 */
export default function RootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    router.replace(user ? '/home' : '/splash');
  }, [user, loading, router]);

  return <FullScreenLoader label="Loading Guardian…" />;
}
