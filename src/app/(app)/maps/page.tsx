import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { MapPlaceholder } from '@/features/maps/map-placeholder';

export const metadata: Metadata = { title: 'Map' };

export default function MapScreen() {
  return (
    <>
      <Header title="Safety Map" subtitle="Live zones & safe routes" transparent />
      <MapPlaceholder />
    </>
  );
}
