'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Three.js interactive background with ssr:false.
// This wrapper is a Client Component, which is required by Next.js when using
// ssr:false with next/dynamic — it cannot be called from a Server Component directly.
const InteractiveBackgroundDynamic = dynamic(
  () => import('@/components/InteractiveBackground'),
  { ssr: false, loading: () => null }
);

export default function InteractiveBackgroundLoader() {
  return <InteractiveBackgroundDynamic />;
}
