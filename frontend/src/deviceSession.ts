// Single-active-device enforcement, client side.
//
// Each browser gets one stable random id (localStorage). On every auth event
// the signed-in device claims the account by writing `activeDeviceId` onto
// users/{uid}; every other device sees the claim arrive through the live
// profile snapshot (auth.ts) and signs itself out. Newest login always wins —
// logging back in on the kicked device reclaims the slot and kicks the other.
//
// ponytail: client-enforced only — a tampered client could ignore the kick.
// Good enough to stop casual password sharing; move the claim into a backend
// route with revokeRefreshTokens if that ever matters.

const DEVICE_ID_KEY = 'vivid-lingua-device-id';

let cachedId: string | null = null;

export function getDeviceId(): string {
  if (cachedId) return cachedId;
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    cachedId = id;
  } catch {
    // Storage unavailable (private mode) — per-page-load id. Two tabs then
    // count as two devices, but the session still works.
    cachedId = crypto.randomUUID();
  }
  return cachedId;
}

// Fired when this device was signed out because another device claimed the
// account. DeviceKickBanner listens and explains the logout to the user.
export const DEVICE_KICKED_EVENT = 'vl-device-kicked';
export function notifyDeviceKicked(): void {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(DEVICE_KICKED_EVENT));
}
