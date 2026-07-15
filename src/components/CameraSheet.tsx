import { useEffect, useState } from "react";
import {
  Activity,
  Camera,
  ChevronLeft,
  ShieldAlert,
  Volume2,
} from "lucide-react";

type OptionId = "listen" | "capture" | "alert" | "parking";

interface SheetOption {
  id: OptionId;
  label: string;
  sub: string;
  icon: typeof Volume2;
  cardClass: string;
  iconClass: string;
  workingText: string;
  resultTitle: string;
  resultBody: string;
}

const OPTIONS: SheetOption[] = [
  {
    id: "listen",
    label: "Listen",
    sub: "AI Bird ID Scan",
    icon: Volume2,
    cardClass: "bg-amber-50 border-[#D4A084]/20 hover:bg-amber-100/40",
    iconClass: "bg-[#D4A084]/15 text-[#D4A084]",
    workingText: "listening for songs & calls…",
    resultTitle: "Swainson's Thrush",
    resultBody:
      "spiraling flute-like song · 94% confidence · common along shaded creek corridors",
  },
  {
    id: "capture",
    label: "Capture",
    sub: "AI Plant ID Scan",
    icon: Camera,
    cardClass: "bg-emerald-50 border-emerald-100 hover:bg-emerald-100/40",
    iconClass: "bg-[#2B4A35]/10 text-[#2B4A35]",
    workingText: "matching leaf & bark patterns…",
    resultTitle: "Quaking Aspen",
    resultBody:
      "populus tremuloides · 89% confidence · fluttering leaves are a classic soft-fascination source",
  },
  {
    id: "alert",
    label: "Alert",
    sub: "Drop wildlife pin",
    icon: ShieldAlert,
    cardClass: "bg-[#FEF2F2] border-[#FCA5A5]/30 hover:bg-[#FEF2F2]/80",
    iconClass: "bg-[#991B1B]/10 text-[#991B1B]",
    workingText: "pinning your location…",
    resultTitle: "Wildlife pin dropped",
    resultBody:
      "nearby hikers on this trail will see your alert for the next 4 hours",
  },
  {
    id: "parking",
    label: "Parking",
    sub: "Check occupancy",
    icon: Activity,
    cardClass: "bg-blue-50 border-blue-100 hover:bg-blue-100/40",
    iconClass: "bg-blue-600/10 text-blue-700",
    workingText: "reading live trailhead pings…",
    resultTitle: "Trailhead lot: 62% full",
    resultBody: "filling fast - typically at capacity by 10:00 am on weekends",
  },
];

/** "What's around you?" bottom sheet with mocked AI scan results. */
export function CameraSheet({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState<SheetOption | null>(null);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (!active) return;
    setWorking(true);
    const t = setTimeout(() => setWorking(false), 900);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div
      className="absolute inset-0 bg-black/60 z-30 transition-opacity duration-300 flex items-end"
      onClick={onClose}
    >
      <div
        className="w-full bg-[#FAFAF8] rounded-t-[32px] p-5 pb-8 flex flex-col gap-4 text-[#2B4A35] shadow-2xl relative z-40 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pull handle */}
        <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto" />

        {active ? (
          /* Mock scan result state */
          <div className="flex flex-col gap-4 min-h-[180px]">
            <button
              onClick={() => setActive(null)}
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#2B4A35]/60 -ml-1 w-fit"
            >
              <ChevronLeft size={14} />
              <span>Back</span>
            </button>

            {working ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 py-6">
                <div
                  className={`p-3 rounded-xl ${active.iconClass} animate-pulse`}
                >
                  <active.icon size={24} />
                </div>
                <p className="font-serif italic text-[15px] text-[#2B4A35]/70">
                  {active.workingText}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 py-2">
                <div className={`p-2.5 rounded-xl w-fit ${active.iconClass}`}>
                  <active.icon size={20} />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#2B4A35]">
                  {active.resultTitle}
                </h3>
                <p className="font-sans text-xs text-[#2B4A35]/65 leading-relaxed">
                  {active.resultBody}
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 w-full h-[44px] bg-[var(--color-pine)] text-white rounded-[8px] font-bold text-[13px] tracking-wide active:scale-[0.98] transition-transform"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Drawer Header */}
            <div>
              <h3 className="font-serif text-xl font-normal text-[#2B4A35] mt-1">
                What's around you?
              </h3>
              <p className="font-sans text-xs text-[#2B4A35]/65 mt-0.5">
                Identify landmarks, wildlife, or log local trail information
                instantly.
              </p>
            </div>

            {/* 4 options grid */}
            <div className="grid grid-cols-2 gap-3 mt-1.5">
              {OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActive(option)}
                  className={`p-3 h-24 border rounded-2xl flex flex-col justify-between items-start cursor-pointer transition text-left ${option.cardClass}`}
                >
                  <div className={`p-2 rounded-lg ${option.iconClass}`}>
                    <option.icon size={18} />
                  </div>
                  <div>
                    <span className="font-sans text-xs font-bold block uppercase leading-none text-[#2B4A35]">
                      {option.label}
                    </span>
                    <span className="text-[10px] text-[#2B4A35]/65 mt-1 block">
                      {option.sub}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
