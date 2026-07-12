import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, TrendingDown, TrendingUp } from "lucide-react";
import { FEED_ITEMS, TRAILS_DATA } from "../data";

export function FeedScreen() {
  const [kudosed, setKudosed] = useState<Record<string, boolean>>({});

  const toggleKudos = (id: string) =>
    setKudosed((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-col h-full bg-[var(--color-paper)] relative">
      <header className="px-4 pt-10 pb-4 flex items-center justify-between border-b border-[var(--color-forest)]/10 bg-[var(--color-paper)]/80 backdrop-blur-md sticky top-0 z-10">
        <h1 className="font-serif italic text-lg text-[var(--color-forest)]">community feed</h1>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-forest)]/50">
          restoration stories
        </span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
        {FEED_ITEMS.map((item) => {
          const trail = TRAILS_DATA.find((t) => t.id === item.trailId);
          const hasKudos = !!kudosed[item.id];
          const positive = item.restorationDelta >= 0;

          return (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-[var(--color-forest)]/10 overflow-hidden"
            >
              <div className="p-4 pb-3 flex items-center gap-3">
                <img
                  src={item.avatarUrl}
                  alt={item.userName}
                  className="w-9 h-9 rounded-full object-cover border border-[var(--color-forest)]/15"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#2B4A35] leading-tight">{item.userName}</p>
                  <p className="text-[11px] text-[#2B4A35]/60 truncate">
                    hiked{" "}
                    {trail ? (
                      <Link to={`/trail/${trail.id}`} className="font-semibold underline decoration-[var(--color-art-comp)]/60 underline-offset-2">
                        {trail.name}
                      </Link>
                    ) : (
                      "a trail"
                    )}{" "}
                    · {item.timeAgo}
                  </p>
                </div>
                <span
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                    positive
                      ? "bg-[var(--color-restorative)]/10 text-[var(--color-restorative)]"
                      : "bg-[var(--color-alert)]/10 text-[var(--color-alert)]"
                  }`}
                >
                  {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {positive ? "+" : ""}{item.restorationDelta} restoration
                </span>
              </div>

              {item.photoUrl && (
                <img
                  src={item.photoUrl}
                  alt=""
                  className="w-full h-40 object-cover"
                  referrerPolicy="no-referrer"
                />
              )}

              <div className="p-4 pt-3 space-y-3">
                <p className="font-serif text-[15px] text-[var(--color-forest)] leading-snug">
                  {item.note}
                </p>
                <button
                  onClick={() => toggleKudos(item.id)}
                  className={`flex items-center gap-1.5 text-xs font-bold transition ${
                    hasKudos ? "text-[var(--color-compat)]" : "text-[#2B4A35]/50 hover:text-[#2B4A35]/70"
                  }`}
                >
                  <Heart size={14} fill={hasKudos ? "currentColor" : "transparent"} />
                  <span className="tabular-nums">{item.kudos + (hasKudos ? 1 : 0)} kudos</span>
                </button>
              </div>
            </article>
          );
        })}

        <p className="text-center text-[11px] text-[var(--color-forest)]/40 italic pt-2">
          you're all caught up — go touch some moss 🌿
        </p>
      </div>
    </div>
  );
}
