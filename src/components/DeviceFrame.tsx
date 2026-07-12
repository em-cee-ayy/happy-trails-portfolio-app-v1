import { ReactNode } from "react";

/**
 * Responsive app viewport. On desktop it's a phone-shaped frame (locked to the
 * 393:852 aspect ratio) sized to nearly fill the viewport height, so every screen
 * renders at the same large, consistent size. On mobile it's the full viewport.
 * Children position against it (screens scroll inside; nav/sheets pin to it).
 */
export function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-[100dvh] lg:w-auto lg:h-[calc(100dvh-2.5rem)] lg:aspect-[393/852] lg:max-w-full bg-[var(--color-paper)] relative lg:border lg:border-[var(--color-forest)]/20 lg:shadow-xl overflow-hidden shrink-0 text-[var(--color-forest)]">
      {children}
    </div>
  );
}
