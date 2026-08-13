import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { CameraPlaceholder } from '@/features/camera/camera-placeholder';

export const metadata: Metadata = { title: 'Camera' };

export default function CameraScreen() {
  return (
    <>
      <Header title="AI Camera" subtitle="Threat detection · live preview" transparent />
      <CameraPlaceholder />
    </>
  );
}
