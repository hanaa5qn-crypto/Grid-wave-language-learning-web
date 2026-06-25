import {Capacitor} from '@capacitor/core';

// Backend origin used when the app runs as a native iOS/Android binary.
// In the browser the app is served from the same origin as the API, so
// relative `/api/...` paths work directly. Inside a Capacitor WebView the
// origin is `capacitor://localhost` (or similar), which has no backend, so we
// rewrite relative `/api/...` requests to the deployed production server.
const NATIVE_API_ORIGIN = 'https://vivid-lingua.vercel.app';

/**
 * On native platforms, patch `fetch` so existing relative `/api/...` calls
 * throughout the app transparently hit the production backend. This avoids
 * editing every call site and keeps the web build unchanged.
 */
export function setupNativeApi(): void {
  if (!Capacitor.isNativePlatform()) return;

  const originalFetch = window.fetch.bind(window);
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    if (typeof input === 'string' && input.startsWith('/api')) {
      return originalFetch(`${NATIVE_API_ORIGIN}${input}`, init);
    }
    if (input instanceof Request && new URL(input.url, NATIVE_API_ORIGIN).pathname.startsWith('/api') && input.url.startsWith('/')) {
      return originalFetch(new Request(`${NATIVE_API_ORIGIN}${input.url}`, input));
    }
    return originalFetch(input, init);
  };
}
