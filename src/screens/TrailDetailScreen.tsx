import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Share, MapPin, Heart } from "lucide-react";
import { TRAILS_DATA } from "../data";
import { BackButton } from "../components/BackButton";

export function TrailDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [liked, setLiked] = useState(false);

  const trail = TRAILS_DATA.find((t) => t.id === id);
  if (!trail) {
    return <Navigate to="/no-match" replace />;
  }

  return (
    <div className="flex flex-col h-full bg-[var(--color-paper)] relative">
      <header className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <BackButton to="/home" variant="overlay" />
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
            <Share size={18} strokeWidth={2} />
          </button>
          <button onClick={() => setLiked(!liked)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
            <Heart size={18} strokeWidth={2} fill={liked ? "white" : "transparent"} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Hero Photo - 16:9 */}
        <div className="w-full aspect-[16/9] bg-neutral-200 relative">
          <img src={trail.photoUrl} alt={trail.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)]/60 via-transparent to-transparent" />
        </div>

        <div className="p-4 -mt-4 relative bg-[var(--color-paper)] rounded-t-[12px] space-y-8">

          <div className="space-y-3">
            <div className="flex gap-2 text-[12px] uppercase font-bold tracking-wider text-[var(--color-forest)]/60">
              <span className="flex items-center gap-1"><MapPin size={12} /> {trail.location}</span>
            </div>
            <h1 className="font-serif text-[22px] leading-tight text-[var(--color-forest)]">{trail.name}</h1>

            {/* Meta row */}
            <div className="flex items-center gap-3 text-[14px] font-sans text-[var(--color-forest)]">
              <span className="font-mono tabular-nums">{trail.distance}</span>
              <span className="opacity-40">•</span>
              <span className="font-mono tabular-nums">{trail.duration}</span>
              <span className="opacity-40">•</span>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-[var(--color-art-comp)]/15 rounded-full text-[var(--color-art-comp)]">
                <span className="text-[12px] font-bold">ART {trail.matchScore}</span>
              </div>
            </div>

            {trail.isRestorative && (
              <div className="inline-block mt-2 px-2.5 py-1 bg-[var(--color-restorative)] rounded-full">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">Restorative</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-[14px] font-bold text-[var(--color-forest)] uppercase tracking-wider">Match Explanation</h3>
            <p className="text-[14px] leading-relaxed text-[var(--color-forest)]/80 font-sans">
              {trail.matchExplanation}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-[var(--color-forest)] uppercase tracking-wider">ART Breakdown</h3>
            <div className="space-y-3">
              {trail.dimensions.map((dim) => {
                let colorClass = "";
                if (dim.name === "fascination") colorClass = "bg-[var(--color-fascination)]";
                else if (dim.name === "extent") colorClass = "bg-[var(--color-extent)]";
                else if (dim.name === "being away") colorClass = "bg-[var(--color-away)]";
                else if (dim.name === "compatibility") colorClass = "bg-[var(--color-compat)]";

                return (
                  <div key={dim.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="font-bold text-[var(--color-forest)]">{dim.name}</span>
                      <span className="font-mono tabular-nums text-[var(--color-forest)]/60">{dim.score}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--color-forest)]/10 rounded-none overflow-hidden">
                      <div className={`h-full ${colorClass}`} style={{ width: `${dim.score}%` }} />
                    </div>
                    <p className="text-[12px] font-sans text-[var(--color-forest)]/60">{dim.explanation}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {trail.conditions.length > 0 && (
            <div className="space-y-2 pb-6">
              <h3 className="text-[14px] font-bold text-[var(--color-forest)] uppercase tracking-wider">Dynamic Conditions</h3>
              <div className="flex flex-wrap gap-2">
                {trail.conditions.map(cond => (
                  <span key={cond} className="px-3 py-1.5 rounded-[8px] bg-[var(--color-paper-deep)] text-[12px] text-[var(--color-forest)]">
                    {cond}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* bottom-16 clears the persistent bottom nav */}
      <div className="absolute bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-paper)] via-[var(--color-paper)] to-transparent">
        <button
          onClick={() => navigate(`/hike/${trail.id}`)}
          className="w-full h-[48px] bg-[var(--color-pine)] text-white rounded-[8px] font-bold text-[14px] tracking-wide shadow-lg active:scale-[0.98] transition-transform"
        >
          Begin Trail
        </button>
      </div>
    </div>
  );
}
