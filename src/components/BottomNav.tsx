import { Link, useLocation } from "react-router-dom";
import { Award, Camera, Compass, Map, User } from "lucide-react";

// Routes that light up the "Trails" tab (the home flow).
const TRAILS_PATHS = ["/home", "/check-in", "/post-hike"];

interface BottomNavProps {
  onCameraClick: () => void;
}

export function BottomNav({ onCameraClick }: BottomNavProps) {
  const { pathname } = useLocation();

  const isTrails = TRAILS_PATHS.includes(pathname) || pathname.startsWith("/trail/");

  const tabClass = (active: boolean) =>
    `flex flex-col items-center gap-1 flex-1 py-1 ${
      active
        ? "text-[var(--color-forest)]"
        : "text-[var(--color-forest)]/40 hover:text-[var(--color-forest)]/60"
    }`;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--color-paper-deep)] border-t border-[var(--color-forest)]/10 px-4 flex items-center justify-between z-20">
      <Link to="/home" className={tabClass(isTrails)}>
        <Compass size={20} strokeWidth={isTrails ? 2.5 : 1.8} />
        <span className="text-[9px] font-bold tracking-wider uppercase leading-none">Trails</span>
      </Link>

      <Link to="/map" className={tabClass(pathname === "/map")}>
        <Map size={20} strokeWidth={pathname === "/map" ? 2.5 : 1.8} />
        <span className="text-[9px] font-bold tracking-wider uppercase leading-none">Map</span>
      </Link>

      {/* PERSISTENT CAMERA FAB */}
      <div className="flex-1 flex justify-center -mt-6 relative">
        <button
          onClick={onCameraClick}
          aria-label="What's around you?"
          className="w-12 h-12 bg-[var(--color-pine)] hover:bg-[var(--color-forest)] text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform shrink-0 border-[3px] border-[var(--color-paper-deep)]"
        >
          <Camera size={20} className="text-[var(--color-art-comp)] stroke-[2.2]" />
        </button>
      </div>

      <Link to="/feed" className={tabClass(pathname === "/feed")}>
        <Award size={20} strokeWidth={pathname === "/feed" ? 2.5 : 1.8} />
        <span className="text-[9px] font-bold tracking-wider uppercase leading-none">Feed</span>
      </Link>

      <Link to="/profile" className={tabClass(pathname === "/profile")}>
        <User size={20} strokeWidth={pathname === "/profile" ? 2.5 : 1.8} />
        <span className="text-[9px] font-bold tracking-wider uppercase leading-none">Profile</span>
      </Link>
    </div>
  );
}
