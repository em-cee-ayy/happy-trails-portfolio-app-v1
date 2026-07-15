import { Link } from "react-router-dom";
import { Brain, ChevronRight, Flame, Star } from "lucide-react";
import { PROFILE_STATS, TRAILS_DATA } from "../data";
import { BackButton } from "../components/BackButton";

export function ProfileScreen() {
  const stats = [
    { label: "hikes", value: String(PROFILE_STATS.hikes) },
    { label: "distance", value: `${PROFILE_STATS.distanceKm} km` },
    { label: "restorative hrs", value: String(PROFILE_STATS.restorativeHours) },
    { label: "avg restoration", value: String(PROFILE_STATS.avgRestoration) },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--color-paper)] relative">
      <header className="px-4 pt-10 pb-4 flex items-center justify-between border-b border-[var(--color-forest)]/10 bg-[var(--color-paper)]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <BackButton to="/home" />
          <h1 className="font-serif italic text-lg text-[var(--color-forest)]">profile</h1>
        </div>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--color-art-comp)]/15 text-[var(--color-art-comp)] text-[10px] font-bold shrink-0">
          <Flame size={11} />
          {PROFILE_STATS.streakWeeks}-week streak
        </span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-6">
        {/* Identity */}
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Sindy's avatar"
            className="w-16 h-16 rounded-full border-2 border-[var(--color-art-comp)]/40 object-cover"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="font-serif text-[22px] text-[var(--color-forest)] leading-tight">Sindy</h2>
            <p className="text-[12px] text-[var(--color-forest)]/60 font-sans">
              restoring since march 2026 · Boulder, CO
            </p>
          </div>
        </div>

        {/* Stats grid — 2 columns give each figure room so values never
            overflow; values clip with ellipsis and labels wrap if longer. */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--color-paper-deep)] rounded-[12px] border border-[var(--color-forest)]/10 p-3.5 min-w-0"
            >
              <p className="font-mono tabular-nums text-[18px] text-[var(--color-forest)] leading-none truncate">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-wide font-bold text-[var(--color-forest)]/55 mt-1.5 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Restoration patterns link */}
        <Link
          to="/insights"
          className="flex items-center gap-3 p-4 bg-[#2B4A35] text-[#FAFAF8] rounded-2xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="p-2 bg-white/10 rounded-lg text-[#D4A084]">
            <Brain size={18} />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-[15px] text-white leading-tight">Restoration patterns</h3>
            <p className="text-[11px] text-neutral-200/80 font-light mt-0.5">
              what your check-ins reveal about how you recover
            </p>
          </div>
          <ChevronRight size={16} className="text-white/60" />
        </Link>

        {/* Saved trails */}
        <div className="space-y-3">
          <h3 className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-forest)]">Saved Trails</h3>
          {TRAILS_DATA.map((trail) => (
            <Link
              key={trail.id}
              to={`/trail/${trail.id}`}
              className="p-3 bg-white rounded-2xl flex items-center gap-3 hover:shadow-xs transition duration-200"
            >
              <img
                src={trail.photoUrl}
                alt={trail.name}
                className="w-14 h-14 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-sans text-sm font-bold text-[#2B4A35] truncate">{trail.name}</h4>
                <p className="text-xs text-[#2B4A35]/65">
                  {trail.distance} · {trail.difficulty}
                  {trail.isRestorative ? " · restorative" : ""}
                </p>
                <div className="flex items-center gap-1 text-[#D4A084] mt-0.5">
                  <Star size={11} fill="currentColor" />
                  <span className="text-xs font-bold text-[#2B4A35] leading-none">{trail.rating}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#2B4A35]/40 shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
