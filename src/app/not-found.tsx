import Link from 'next/link';
import { PrimaryButton } from '@/components/primary-button';

export default function NotFound() {
  return (
    <div className="relative grid min-h-[100dvh] place-items-center bg-background px-6 text-center">
      <div className="pointer-events-none absolute inset-0 app-aurora" />
      <div className="relative z-10">
        <p className="text-6xl font-bold tracking-tight text-white">404</p>
        <p className="mt-3 text-sm text-white/55">This page wandered off the map.</p>
        <Link href="/home" className="mt-6 inline-block">
          <PrimaryButton>Back to safety</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
