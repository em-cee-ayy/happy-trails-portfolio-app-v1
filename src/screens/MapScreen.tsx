import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Star } from "lucide-react";
import { TRAILS_DATA } from "../data";
import { BackButton } from "../components/BackButton";

export function MapScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = TRAILS_DATA.find((t) => t.id === selectedId);

  return (
    <div className="flex flex-col h-full bg-[var(--color-paper)] relative overflow-hidden">
      <header className="px-4 pt-10 pb-4 flex items-center justify-between border-b border-[var(--color-forest)]/10 bg-[var(--color-paper)]/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <BackButton to="/home" />
          <h1 className="font-serif italic text-lg text-[var(--color-forest)]">trail map</h1>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-forest)]/50">
          {TRAILS_DATA.length} trails nearby
        </span>
      </header>

      {/* Stylized topo map */}
      <div className="flex-1 relative" onClick={() => setSelectedId(null)}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 393 640"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* paper wash */}
          <rect width="393" height="640" fill="#EAE2D0" />

          {/* contour lines */}
          <g fill="none" stroke="#1E3A2F" strokeOpacity="0.12" strokeWidth="1.5">
            <path d="M -20 120 Q 90 60 200 110 T 420 90" />
            <path d="M -20 160 Q 100 95 210 145 T 420 130" />
            <path d="M -20 200 Q 110 130 220 180 T 420 170" />
            <ellipse cx="250" cy="150" rx="60" ry="34" />
            <ellipse cx="250" cy="150" rx="92" ry="56" />
            <ellipse cx="250" cy="150" rx="126" ry="80" />
            <path d="M -20 420 Q 80 360 180 420 T 420 400" />
            <path d="M -20 460 Q 90 395 190 455 T 420 445" />
            <path d="M -20 500 Q 100 430 200 490 T 420 490" />
            <ellipse cx="110" cy="560" rx="70" ry="40" />
            <ellipse cx="110" cy="560" rx="105" ry="64" />
          </g>

          {/* water: creek + lakes */}
          <path
            d="M -10 470 Q 60 500 110 560 T 240 620 T 400 600"
            fill="none"
            stroke="#7BA3C4"
            strokeOpacity="0.55"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <ellipse cx="248" cy="152" rx="26" ry="14" fill="#7BA3C4" fillOpacity="0.5" />
          <ellipse cx="296" cy="352" rx="20" ry="11" fill="#7BA3C4" fillOpacity="0.5" />

          {/* dashed trail routes: each starts at a pin (mapPos) and flows
              smoothly off a distinct edge, like trails continuing past the map */}
          <g fill="none" stroke="#2E5D4B" strokeOpacity="0.55" strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round">
            <path d="M 110 435 C 100 510, 130 565, 96 660" />
            <path d="M 181 243 C 140 278, 85 288, -10 268" />
            <path d="M 244 141 C 236 90, 220 45, 262 -14" />
            <path d="M 291 346 C 326 408, 300 486, 352 600" />
          </g>

          {/* tree marks */}
          <g fill="#2E5D4B" fillOpacity="0.35">
            <path d="M 60 300 l 6 12 h -12 z" />
            <path d="M 84 320 l 6 12 h -12 z" />
            <path d="M 48 340 l 6 12 h -12 z" />
            <path d="M 330 520 l 6 12 h -12 z" />
            <path d="M 352 545 l 6 12 h -12 z" />
            <path d="M 150 90 l 6 12 h -12 z" />
            <path d="M 128 70 l 6 12 h -12 z" />
          </g>
        </svg>

        {/* Trail pins */}
        {TRAILS_DATA.map((trail) => {
          const isSelected = trail.id === selectedId;
          return (
            <button
              key={trail.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(trail.id);
              }}
              aria-label={trail.name}
              className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center transition-transform"
              style={{ left: `${trail.mapPos.x}%`, top: `${trail.mapPos.y}%` }}
            >
              <span
                className={`flex items-center justify-center rounded-full border-2 border-white shadow-md transition-all ${
                  isSelected
                    ? "w-10 h-10 bg-[var(--color-forest)] text-[var(--color-art-comp)]"
                    : "w-8 h-8 bg-[var(--color-pine)] text-white"
                }`}
              >
                <MapPin size={isSelected ? 18 : 14} />
              </span>
              <span className="mt-1 px-1.5 py-0.5 rounded-sm bg-white/90 text-[9px] font-bold text-[var(--color-forest)] shadow-sm whitespace-nowrap">
                {trail.name}
              </span>
            </button>
          );
        })}

        {/* Selected trail card */}
        {selected && (
          <Link
            to={`/trail/${selected.id}`}
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-20 left-4 right-4 bg-white rounded-2xl p-3 flex items-center gap-3 shadow-xl border border-[var(--color-forest)]/10 animate-slide-up"
          >
            <img
              src={selected.photoUrl}
              alt={selected.name}
              className="w-14 h-14 rounded-xl object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-sans text-sm font-bold text-[#2B4A35] truncate">{selected.name}</h4>
              <p className="text-xs text-[#2B4A35]/65">
                {selected.distance} · {selected.duration} · {selected.difficulty}
              </p>
              <div className="flex items-center gap-1 text-[#D4A084] mt-0.5">
                <Star size={11} fill="currentColor" />
                <span className="text-xs font-bold text-[#2B4A35] leading-none">{selected.rating}</span>
                <span className="ml-1 px-1.5 rounded-sm bg-[var(--color-art-comp)]/15 text-[var(--color-art-comp)] text-[9px] font-bold">
                  ART {selected.matchScore}
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#2B4A35]/40 shrink-0" />
          </Link>
        )}
      </div>
    </div>
  );
}
