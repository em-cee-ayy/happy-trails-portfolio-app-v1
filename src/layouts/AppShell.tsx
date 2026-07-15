import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Info } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { CameraSheet } from "../components/CameraSheet";
import { DeviceFrame } from "../components/DeviceFrame";
import { SpecSidebar } from "../components/SpecSidebar";

// Full-bleed screens that hide the persistent bottom nav.
const NAV_HIDDEN_PATHS = ["/", "/onboarding-2", "/processing"];

export function AppShell() {
  const { pathname } = useLocation();
  const [isCameraSheetOpen, setIsCameraSheetOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Close overlays whenever the screen changes.
  useEffect(() => {
    setIsCameraSheetOpen(false);
  }, [pathname]);

  // The Happy Trails handoff build is a self-contained sub-app: its screens render
  // their own status bar, tab bar, and scan sheet, so the suite chrome steps aside.
  const isHandoff = pathname.startsWith("/ht");
  const hideNav = isHandoff || NAV_HIDDEN_PATHS.includes(pathname) || pathname.startsWith("/hike/");

  return (
    <div className="w-full min-h-[100dvh] bg-[var(--color-paper)] font-sans antialiased flex text-[var(--color-forest)]">

      {/* LEFT SIDEBAR: Design Specification deck (desktop only) */}
      <div className="hidden lg:block flex-1 max-w-xl xl:max-w-2xl border-r border-[var(--color-forest)]/15 shrink-0">
        <SpecSidebar />
      </div>

      {/* RIGHT PREVIEW: full viewport on mobile, framed device on desktop */}
      <div className="flex-1 flex items-center justify-center lg:px-10 lg:py-5">
        <DeviceFrame>
          {/* Scrollable screen viewport */}
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
            <Outlet />
          </div>

          {isCameraSheetOpen && !isHandoff && <CameraSheet onClose={() => setIsCameraSheetOpen(false)} />}

          {!hideNav && <BottomNav onCameraClick={() => setIsCameraSheetOpen((open) => !open)} />}
        </DeviceFrame>
      </div>

      {/* MOBILE: "About this design" toggle + full-screen spec drawer */}
      <button
        onClick={() => setIsAboutOpen(true)}
        aria-label="About this design"
        className="lg:hidden fixed bottom-[120px] right-3 z-50 w-9 h-9 rounded-full bg-[var(--color-forest)]/85 text-[var(--color-paper)] backdrop-blur-sm flex items-center justify-center shadow-lg active:scale-95 transition-transform"
      >
        <Info size={17} />
      </button>

      {isAboutOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-[var(--color-paper)] overflow-y-auto">
          <SpecSidebar
            onNavigate={() => setIsAboutOpen(false)}
            onClose={() => setIsAboutOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
