import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { DEVICE_KICKED_EVENT } from './deviceSession';

// Explains the forced logout when another device claimed the account
// (deviceSession.ts / auth.ts single-active-device rule). Mounted once in
// AuthGate so it survives the signed-in → login-screen transition the kick
// itself causes.
export default function DeviceKickBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);
    window.addEventListener(DEVICE_KICKED_EVENT, show);
    return () => window.removeEventListener(DEVICE_KICKED_EVENT, show);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[300] flex max-w-[92vw] items-center gap-3 rounded-xl border border-ink-line bg-ink-raise px-4 py-3 text-sm text-paper shadow-[0_0_30px_rgba(0,0,0,0.4)]"
    >
      <span>Таны бүртгэлд өөр төхөөрөмжөөс нэвтэрсэн тул энэ төхөөрөмж гарлаа. Үргэлжлүүлэх бол дахин нэвтэрнэ үү.</span>
      <button
        onClick={() => setVisible(false)}
        aria-label="Хаах"
        className="shrink-0 text-paper-3 transition-colors hover:text-paper cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
