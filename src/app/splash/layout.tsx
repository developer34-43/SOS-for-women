import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome',
};

export default function SplashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
