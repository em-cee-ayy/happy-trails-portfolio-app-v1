import { ReactNode } from "react";

/**
 * Responsive app viewport: a fixed 393x852 device frame on desktop (clamped so it
 * never overflows the browser viewport), the full viewport on mobile.
 * Children position against it (screens scroll inside; nav/sheets pin to it).
 */
export function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-[100dvh] lg:w-[393px] lg:h-[min(852px,calc(100vh-5rem))] bg-[var(--color-paper)] relative lg:border lg:border-[var(--color-forest)]/20 lg:shadow-xl overflow-hidden shrink-0 text-[var(--color-forest)]">
      {children}
    </div>
  );
}
