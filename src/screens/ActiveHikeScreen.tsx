import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Navigation, Lock } from "lucide-react";

// Single smooth route curve (reused for the white casing + pine core) so the
// trail reads like a real map line rather than rough squiggles.
const ROUTE =
  "M 120 -20 C 150 110, 70 180, 130 280 C 175 360, 250 380, 232 470 C 216 550, 130 590, 175 690 C 210 770, 300 800, 285 900";

export function ActiveHikeScreen() {
  const navigate = useNavigate();
  const onFinish = () => navigate("/post-hike");
  const [seconds, setSeconds] = useState(1821); // starts at 00:30:21

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const headerTime = `${pad(h)}:${pad(m)}:${pad(s)}`;
  const statTime = h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;

  const stats = [
    { label: "Time", value: statTime },
    { label: "Distance", value: "3.44", unit: "km" },
    { label: "Steps", value: "3,951" },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--color-paper-deep)] relative overflow-hidden font-sans">
      {/* Trail map background (design-system palette + smooth route) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 393 852"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hikeCone" cx="50%" cy="0%" r="90%">
            <stop offset="0%" stopColor="#2E5D4B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2E5D4B" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="393" height="852" fill="#EAE2D0" />

        {/* contour lines */}
        <g fill="none" stroke="#1E3A2F" strokeOpacity="0.1" strokeWidth="1.5">
          <path d="M -20 160 Q 110 90 240 150 T 460 130" />
          <path d="M -20 210 Q 120 130 250 195 T 460 175" />
          <path d="M -20 260 Q 130 175 260 240 T 460 225" />
          <ellipse cx="300" cy="250" rx="70" ry="42" />
          <ellipse cx="300" cy="250" rx="108" ry="66" />
          <ellipse cx="300" cy="250" rx="150" ry="92" />
          <path d="M -20 620 Q 100 560 210 620 T 460 600" />
          <path d="M -20 670 Q 110 600 220 660 T 460 650" />
          <ellipse cx="90" cy="740" rx="80" ry="46" />
          <ellipse cx="90" cy="740" rx="120" ry="72" />
        </g>

        {/* water */}
        <path
          d="M -10 700 Q 70 730 130 800 T 300 860"
          fill="none"
          stroke="#7BA3C4"
          strokeOpacity="0.5"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* route: white casing under a pine core (map-line look) */}
        <path d={ROUTE} fill="none" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="13" strokeLinecap="round" />
        <path d={ROUTE} fill="none" stroke="#2E5D4B" strokeWidth="6" strokeLinecap="round" />

        {/* heading cone + current-position dot */}
        <path d="M 232 470 L 150 585 L 258 600 Z" fill="url(#hikeCone)" />
        <circle cx="232" cy="470" r="12" fill="#FFFFFF" />
        <circle cx="232" cy="470" r="8" fill="#1E3A2F" />
      </svg>

      {/* Header */}
      <header className="px-5 pt-12 pb-4 flex items-center justify-between z-10 relative">
        <button
          onClick={onFinish}
          aria-label="Back"
          className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[var(--color-forest)] shadow-md active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>
        <div className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md">
          <span className="font-mono tabular-nums text-[17px] font-semibold text-[var(--color-forest)]">{headerTime}</span>
        </div>
        <button
          aria-label="Recenter"
          className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[var(--color-forest)] shadow-md active:scale-95 transition-transform"
        >
          <Navigation size={18} strokeWidth={2} />
        </button>
      </header>

      <div className="flex-1" />

      {/* Stats + actions dock */}
      <div className="relative z-10 p-5 space-y-3">
        <div className="bg-[var(--color-forest)] rounded-2xl px-5 py-4 grid grid-cols-3 gap-2 shadow-lg">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-art-comp)]">{stat.label}</span>
              <span className="text-white text-[19px] font-mono tabular-nums leading-none">
                {stat.value}
                {stat.unit && <span className="text-white/60 text-[13px] ml-0.5">{stat.unit}</span>}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="flex-1 h-14 bg-white rounded-2xl text-[var(--color-forest)] font-bold text-[15px] shadow-md active:scale-95 transition-transform">
            Pause
          </button>
          <button
            aria-label="Lock screen"
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[var(--color-forest)] shrink-0 shadow-md active:scale-95 transition-transform"
          >
            <Lock size={20} strokeWidth={2} />
          </button>
          <button
            onClick={onFinish}
            className="flex-1 h-14 bg-[var(--color-pine)] rounded-2xl text-white font-bold text-[15px] shadow-md active:scale-95 transition-transform"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}
