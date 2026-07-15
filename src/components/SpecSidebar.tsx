import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Layers, Smartphone, X } from "lucide-react";

// One unified deck — the merged app's screens listed together, no separation.
const SCREEN_LINKS = [
  { path: "/", label: "Onboarding 1: Value Prop" },
  { path: "/onboarding-2", label: "Onboarding 2: Data Story" },
  { path: "/home", label: "Trails Home" },
  { path: "/check-in", label: "Cognitive Check-In" },
  { path: "/processing?trail=boulder_creek", label: "AI Processing" },
  { path: "/trail/boulder_creek", label: "Trail Detail: Hero & Breakdown" },
  { path: "/hike/boulder_creek", label: "Active Hike" },
  { path: "/post-hike", label: "Post-Hike Reflection" },
  { path: "/map", label: "Trail Map" },
  { path: "/feed", label: "Community Feed" },
  { path: "/profile", label: "Profile" },
  { path: "/insights", label: "Insights & Patterns" },
  { path: "/no-match", label: "No-Match Honest State" },
  { path: "/components", label: "Components Sheet" },
];

interface SpecSidebarProps {
  /** Called when a navigator link is clicked (used to close the mobile drawer). */
  onNavigate?: () => void;
  /** When set, renders a close button (mobile drawer mode). */
  onClose?: () => void;
}

export function SpecSidebar({ onNavigate, onClose }: SpecSidebarProps) {
  const location = useLocation();
  const [timeStr, setTimeStr] = useState(
    new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(
        new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 lg:p-10 flex flex-col justify-between h-full bg-[var(--color-paper)]">
      <div className="flex flex-col gap-6">
        {/* HIGH DENSITY THEME HEADER */}
        <header className="mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-[var(--color-forest)]/20 pb-4 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold italic text-[var(--color-forest)] tracking-tight">
              Happy Trails AI
            </h1>
            <p className="text-[10px] tracking-widest uppercase font-semibold text-[var(--color-art-comp)] mt-0.5">
              NEUROSCIENCE-LED RESTORATION FRAMEWORK
            </p>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-[9px] font-bold uppercase tracking-widest text-[var(--color-forest)]/60">
            <span className="border-b border-[var(--color-art-comp)]">
              Design Specification
            </span>
            {onClose && (
              <button
                onClick={onClose}
                aria-label="Close design specification"
                className="p-2 -m-2 text-[var(--color-forest)]"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </header>

        {/* Description summary of the design goals */}
        <div className="text-xs text-[var(--color-forest)]/90 leading-relaxed font-light flex flex-col gap-3">
          <p className="font-serif text-[17px] font-normal text-[var(--color-forest)] leading-snug">
            This interactive mockup suite highlights the AI + Attention
            Restoration Theory (ART) layer that distinguishes Happy Trails AI.
          </p>
          <p>
            In involuntary attention restoration (Kaplan & Kaplan, 1989),
            natural environments containing soft sensory movement (e.g., wind
            rustling forest branches, rushing water currents) downregulate the
            prefrontal cortex-enabling the executive mental control loops to
            fully recover.
          </p>
        </div>

        {/* ATTENTION RESTORATION THEORY DIMENSIONS BOARD */}
        <div className="bg-[var(--color-paper-deep)] rounded-xl p-4 border border-[var(--color-forest)]/10 flex flex-col gap-3">
          <h3 className="font-serif text-sm font-semibold text-[var(--color-forest)] flex items-center gap-1.5">
            <BookOpen size={14} className="text-[var(--color-art-comp)]" />
            <span>Scientific Core (The 4 ART Dimensions)</span>
          </h3>
          <div className="grid grid-cols-2 gap-2.5 text-[11px] leading-relaxed">
            <div className="bg-[var(--color-paper)] p-2.5 rounded-lg border border-[var(--color-forest)]/10">
              <span className="font-bold block text-[var(--color-forest)]">
                Being Away
              </span>
              <span className="font-light text-[var(--color-forest)]/75 text-[10.5px]">
                Psychological distance from ordinary, fatiguing daily urban
                stress.
              </span>
            </div>
            <div className="bg-[var(--color-paper)] p-2.5 rounded-lg border border-[var(--color-forest)]/10">
              <span className="font-bold block text-[var(--color-forest)]">
                Fascination
              </span>
              <span className="font-light text-[var(--color-forest)]/75 text-[10.5px]">
                Involuntary attraction triggers passive mental ease & recovery.
              </span>
            </div>
            <div className="bg-[var(--color-paper)] p-2.5 rounded-lg border border-[var(--color-forest)]/10">
              <span className="font-bold block text-[var(--color-forest)]">
                Extent
              </span>
              <span className="font-light text-[var(--color-forest)]/75 text-[10.5px]">
                Immersion in a rich, coherent world apart from standard focus
                demands.
              </span>
            </div>
            <div className="bg-[var(--color-paper)] p-2.5 rounded-lg border border-[var(--color-forest)]/10">
              <span className="font-bold block text-[var(--color-forest)]">
                Compatibility
              </span>
              <span className="font-light text-[var(--color-forest)]/75 text-[10.5px]">
                Perfect fit between your current cognitive state and
                surroundings.
              </span>
            </div>
          </div>
        </div>

        {/* ACTIVE SCREEN NAVIGATOR PANEL */}
        <div className="my-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#2B4A35]/70 mb-3 flex items-center gap-1.5">
            <Layers size={13} />
            <span>Direct Screen Preset Deck</span>
          </h3>
          <div className="flex flex-col gap-1.5 max-h-[260px] overflow-y-auto pr-2">
            {SCREEN_LINKS.map((screen) => {
              const isSelected =
                screen.path.split("?")[0] === location.pathname;
              return (
                <Link
                  key={screen.path}
                  to={screen.path}
                  onClick={onNavigate}
                  className={`p-2.5 w-full text-left rounded-xl text-xs font-medium flex items-center justify-between border cursor-pointer transition ${
                    isSelected
                      ? "bg-[#1E3A2F] border-[#1E3A2F] text-white shadow-md font-bold"
                      : "bg-white hover:bg-[var(--color-paper-deep)] border-[var(--color-forest)]/10 text-[var(--color-forest)]/85"
                  }`}
                >
                  <span>{screen.label}</span>
                </Link>
              );
            })}
          </div>
          <p className="text-[10px] text-[#2B4A35]/65 italic mt-2">
            ⚠️ Tip: Switch screens instantly using this navigator panel or
            directly interact with the preview device!
          </p>
        </div>
      </div>

      {/* Local time and compliance guidelines */}
      <div className="mt-6 pt-4 border-t border-[#2B4A35]/15 flex items-center justify-between text-[11px] text-[#2B4A35]/60">
        <span>
          Sindy's Device Clock: <span className="font-bold">{timeStr}</span>
        </span>
        <div className="flex items-center gap-1">
          <Smartphone size={12} />
          <span>High Density Frame Ratio</span>
        </div>
      </div>
    </div>
  );
}
