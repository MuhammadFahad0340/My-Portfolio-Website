'use client';

import { useState, useEffect } from 'react';

export interface DeviceCapability {
  /** True when the device is likely a low-end phone/tablet or low-powered laptop */
  isLowEnd: boolean;
  /** True when the primary input is touch and viewport width < 768px */
  isMobile: boolean;
  /** True when the OS / browser has prefers-reduced-motion enabled */
  prefersReducedMotion: boolean;
  /** True on very small screens (< 640px) — treat these as no-WebGL devices */
  isSmallScreen: boolean;
}

/** SSR-safe defaults — assume capable until we detect otherwise on the client */
const DEFAULT: DeviceCapability = {
  isLowEnd: false,
  isMobile: false,
  prefersReducedMotion: false,
  isSmallScreen: false,
};

function detect(): DeviceCapability {
  if (typeof window === 'undefined') return DEFAULT;

  // --- CPU cores ---
  // navigator.hardwareConcurrency is undefined in some older browsers → treat as capable
  const cores = navigator.hardwareConcurrency ?? 8;

  // --- RAM (GB) — only available in Chromium-based browsers ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memory: number = (navigator as any).deviceMemory ?? 8;

  // --- Touch / mobile ---
  const isMobile =
    navigator.maxTouchPoints > 0 && window.innerWidth < 768;

  // --- Small screen (no WebGL fallback) ---
  const isSmallScreen = window.innerWidth < 640;

  // --- Reduced motion ---
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // --- Low-end heuristic ---
  // Low-end if: ≤ 4 CPU cores OR < 4 GB RAM OR OS accessibility setting is on
  const isLowEnd = cores <= 4 || memory < 4 || prefersReducedMotion || isSmallScreen;

  return { isLowEnd, isMobile, prefersReducedMotion, isSmallScreen };
}

/**
 * Returns static device capability flags.
 * Evaluated once on the client after hydration — never triggers re-renders after mount.
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>(DEFAULT);

  useEffect(() => {
    setCapability(detect());
  }, []);

  return capability;
}
