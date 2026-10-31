import { lazy } from 'react';

// 3D scenes are loaded on demand so three.js doesn't slow down the first page load.
// Render them inside <Suspense fallback={null}>.
export const HeroScene = lazy(() => import('./HeroScene'));
export const DeviceScene = lazy(() => import('./DeviceScene'));
export const AmbientScene = lazy(() => import('./AmbientScene'));
