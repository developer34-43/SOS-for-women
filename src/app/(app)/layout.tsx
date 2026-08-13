import { AppShell } from '@/components/app-shell';
import { SessionGate } from '@/components/session-gate';

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell showNav>
      <SessionGate>{children}</SessionGate>
    </AppShell>
  );
}
