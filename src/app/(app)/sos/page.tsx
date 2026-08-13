import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { SosPlaceholder } from '@/features/sos/sos-placeholder';

export const metadata: Metadata = { title: 'SOS' };

export default function SosScreen() {
  return (
    <>
      <Header title="Emergency SOS" subtitle="One tap to alert your circle" transparent />
      <SosPlaceholder />
    </>
  );
}
