import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export function PostHikeScreen() {
  const navigate = useNavigate();
  const [restoration, setRestoration] = useState(4.0);
  const [clarity, setClarity] = useState(3.5);
  const [energyShift, setEnergyShift] = useState(4.5);

  const handleSave = () => navigate("/home");

  return (
    <div className="flex flex-col h-full bg-[var(--color-paper)] relative">
      <header className="px-4 pt-10 pb-4 flex items-center border-b border-[var(--color-forest)]/10 bg-[var(--color-paper)]/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={handleSave} className="p-2 -ml-2 text-[var(--color-forest)]">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-serif italic text-lg text-[var(--color-forest)] ml-2">reflection</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-28">
        <div className="mb-6 space-y-2">
          <h2 className="text-[22px] font-serif text-[var(--color-forest)] leading-tight">How was the trail?</h2>
          <p className="text-[14px] text-[var(--color-forest)]/60 font-sans leading-relaxed">
            this trains your matches. your feedback feeds the pattern engine to refine future restoration recommendations.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 pb-6 border-b border-[#eae1d0]">
            <div className="flex justify-between items-end">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-forest)]">Restoration</span>
              <span className="text-[17px] font-mono tabular-nums text-[var(--color-pine)]">{restoration.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={restoration}
              onChange={(e) => setRestoration(parseFloat(e.target.value))}
              className="w-full h-2 bg-[var(--color-forest)]/10 rounded-full appearance-none cursor-pointer accent-[var(--color-pine)]"
            />
            <div className="flex justify-between text-[12px] text-[var(--color-forest)]/60 font-sans">
              <span>still stressed</span>
              <span>deeply restored</span>
            </div>
          </div>

          <div className="space-y-4 pb-6 border-b border-[#eae1d0]">
            <div className="flex justify-between items-end">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-forest)]">Clarity</span>
              <span className="text-[17px] font-mono tabular-nums text-[var(--color-pine)]">{clarity.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={clarity}
              onChange={(e) => setClarity(parseFloat(e.target.value))}
              className="w-full h-2 bg-[var(--color-forest)]/10 rounded-full appearance-none cursor-pointer accent-[var(--color-pine)]"
            />
            <div className="flex justify-between text-[12px] text-[var(--color-forest)]/60 font-sans">
              <span>foggy</span>
              <span>sharp</span>
            </div>
          </div>

          <div className="space-y-4 pb-6 border-b border-[#eae1d0]">
            <div className="flex justify-between items-end">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-forest)]">Energy Shift</span>
              <span className="text-[17px] font-mono tabular-nums text-[var(--color-pine)]">{energyShift.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={energyShift}
              onChange={(e) => setEnergyShift(parseFloat(e.target.value))}
              className="w-full h-2 bg-[var(--color-forest)]/10 rounded-full appearance-none cursor-pointer accent-[var(--color-pine)]"
            />
            <div className="flex justify-between text-[12px] text-[var(--color-forest)]/60 font-sans">
              <span>drained</span>
              <span>recharged</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-forest)] block">Field Notes (optional)</label>
            <textarea
              placeholder="e.g. the creek was louder than expected..."
              className="w-full bg-[var(--color-paper-deep)] border-none rounded-[8px] p-4 text-[14px] text-[var(--color-forest)] placeholder:text-[var(--color-forest)]/40 focus:ring-2 focus:ring-[var(--color-pine)]/50 resize-none h-24 font-sans"
            />
          </div>
        </div>
      </div>

      {/* bottom-16 clears the persistent bottom nav */}
      <div className="absolute bottom-16 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-paper)] via-[var(--color-paper)] to-transparent">
        <button
          onClick={handleSave}
          className="w-full h-[48px] bg-[var(--color-pine)] text-white rounded-[8px] font-bold text-[14px] tracking-wide shadow-lg active:scale-[0.98] transition-transform"
        >
          Save & Return
        </button>
      </div>
    </div>
  );
}
