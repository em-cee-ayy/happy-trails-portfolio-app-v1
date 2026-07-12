import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface CheckInScreenProps {
  onBack: () => void;
  onSubmit: (state: string) => void;
}

export function CheckInScreen({ onBack, onSubmit }: CheckInScreenProps) {
  const [energy, setEnergy] = useState<number>(3.0);
  const [focus, setFocus] = useState<number>(3.0);
  const [note, setNote] = useState<string>("");

  return (
    <div className="flex flex-col h-full bg-[var(--color-paper)] relative">
      <header className="px-4 pt-10 pb-4 flex items-center justify-between border-b border-[var(--color-forest)]/10 bg-[var(--color-paper)]/80 backdrop-blur-md z-10 sticky top-0">
        <button onClick={onBack} className="p-2 -ml-2 text-[var(--color-forest)]">
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-serif italic text-lg text-[var(--color-forest)]">cognitive state</h1>
        <div className="w-8" />
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="mb-8">
          <h2 className="text-[22px] font-sans font-medium text-[var(--color-forest)] mb-2">How is your mind right now?</h2>
          <p className="text-[14px] text-[var(--color-forest)]/60 font-sans">Slide to indicate your current mental capacity. There's no right answer.</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-forest)]">Energy</span>
              <span className="text-[17px] font-mono tabular-nums text-[var(--color-pine)]">{energy.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={energy}
              onChange={(e) => setEnergy(parseFloat(e.target.value))}
              className="w-full h-2 bg-[var(--color-forest)]/10 rounded-full appearance-none cursor-pointer accent-[var(--color-pine)]"
            />
            <div className="flex justify-between text-[12px] text-[var(--color-forest)]/60 font-sans">
              <span>depleted</span>
              <span>wired</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-forest)]">Focus</span>
              <span className="text-[17px] font-mono tabular-nums text-[var(--color-pine)]">{focus.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={focus}
              onChange={(e) => setFocus(parseFloat(e.target.value))}
              className="w-full h-2 bg-[var(--color-forest)]/10 rounded-full appearance-none cursor-pointer accent-[var(--color-pine)]"
            />
            <div className="flex justify-between text-[12px] text-[var(--color-forest)]/60 font-sans">
              <span>foggy</span>
              <span>sharp</span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <label className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-forest)] block">Context Note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. back-to-back meetings all day..."
              className="w-full bg-[var(--color-paper-deep)] border-none rounded-[8px] p-4 text-[14px] text-[var(--color-forest)] placeholder:text-[var(--color-forest)]/40 focus:ring-2 focus:ring-[var(--color-pine)]/50 resize-none h-24 font-sans"
            />
          </div>
          
          <div className="bg-[var(--color-art-comp)]/10 p-4 rounded-[8px] flex gap-3 items-start border border-[var(--color-art-comp)]/20">
            <div className="w-2 h-2 rounded-full bg-[var(--color-art-comp)] mt-1.5 shrink-0" />
            <p className="text-[12px] text-[var(--color-forest)]/80 leading-relaxed font-sans">
              you're offline — check-in saved locally. matches will sync when connection returns.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-paper)] via-[var(--color-paper)] to-transparent">
        <button
          onClick={() => onSubmit(energy < 2.5 ? "depleted" : "wired")}
          className="w-full h-[48px] bg-[var(--color-pine)] text-white rounded-[8px] font-bold text-[14px] tracking-wide shadow-lg active:scale-[0.98] transition-transform"
        >
          Find My Trail
        </button>
      </div>
    </div>
  );
}
