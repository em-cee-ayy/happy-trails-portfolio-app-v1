import { useState } from "react";
import { Heart } from "lucide-react";
import { BackButton } from "../components/BackButton";

export function ComponentsScreen() {
  const [sliderVal, setSliderVal] = useState(3.0);

  return (
    <div className="flex flex-col h-full bg-[var(--color-paper)] relative">
      <header className="px-4 pt-10 pb-4 flex items-center gap-2 border-b border-[var(--color-forest)]/10 bg-[var(--color-paper)]/80 backdrop-blur-md sticky top-0 z-10">
        <BackButton to="/home" />
        <h1 className="font-serif italic text-lg text-[var(--color-forest)]">components spec</h1>
      </header>

      <div className="flex-1 p-4 pb-28 space-y-12">

        {/* 1. ART Badges */}
        <section className="space-y-4">
          <h2 className="text-[14px] font-bold uppercase tracking-wider text-[var(--color-forest)] border-b border-[var(--color-forest)]/10 pb-2">1. ART Badges</h2>
          <div className="flex gap-4 items-end bg-[var(--color-paper-deep)] p-4 rounded-[12px] border border-[var(--color-forest)]/10">
            <div className="space-y-1 text-center">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--color-art-comp)]/15 rounded-full text-[var(--color-art-comp)]">
                <span className="text-[10px] font-bold">ART 94</span>
              </div>
              <p className="text-[9px] uppercase tracking-wider text-[var(--color-forest)]/60">Small</p>
            </div>
            
            <div className="space-y-1 text-center">
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-art-comp)]/15 rounded-full text-[var(--color-art-comp)]">
                <span className="text-[12px] font-bold">ART 94</span>
              </div>
              <p className="text-[9px] uppercase tracking-wider text-[var(--color-forest)]/60">Medium</p>
            </div>

            <div className="space-y-1 text-center">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[var(--color-art-comp)]/15 rounded-full text-[var(--color-art-comp)]">
                <span className="text-[16px] font-bold">ART 94</span>
              </div>
              <p className="text-[9px] uppercase tracking-wider text-[var(--color-forest)]/60">Large</p>
            </div>
          </div>
          <p className="text-[12px] font-sans text-[var(--color-forest)]/60">Tokens: #D08B5B text on 14% fill, radius 999px.</p>
        </section>

        {/* 2. ART Breakdown Bars */}
        <section className="space-y-4">
          <h2 className="text-[14px] font-bold uppercase tracking-wider text-[var(--color-forest)] border-b border-[var(--color-forest)]/10 pb-2">2. Breakdown Bars</h2>
          <div className="bg-[var(--color-paper-deep)] p-4 rounded-[12px] border border-[var(--color-forest)]/10 space-y-4">
            
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-bold text-[var(--color-forest)]">fascination</span>
                <span className="font-mono tabular-nums text-[var(--color-forest)]/60">88</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--color-forest)]/10 rounded-none overflow-hidden">
                <div className="h-full bg-[var(--color-fascination)]" style={{ width: '88%' }} />
              </div>
              <p className="text-[10px] font-sans text-[var(--color-forest)]/60 pt-1">moving water engages involuntary attention</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-bold text-[var(--color-forest)]">extent</span>
                <span className="font-mono tabular-nums text-[var(--color-forest)]/60">76</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--color-forest)]/10 rounded-none overflow-hidden">
                <div className="h-full bg-[var(--color-extent)]" style={{ width: '76%' }} />
              </div>
              <p className="text-[10px] font-sans text-[var(--color-forest)]/60 pt-1">coherent natural corridor without complex navigation</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-bold text-[var(--color-forest)]">being away</span>
                <span className="font-mono tabular-nums text-[var(--color-forest)]/60">92</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--color-forest)]/10 rounded-none overflow-hidden">
                <div className="h-full bg-[var(--color-away)]" style={{ width: '92%' }} />
              </div>
              <p className="text-[10px] font-sans text-[var(--color-forest)]/60 pt-1">physical separation from urban noise</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-bold text-[var(--color-forest)]">compatibility</span>
                <span className="font-mono tabular-nums text-[var(--color-forest)]/60">95</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--color-forest)]/10 rounded-none overflow-hidden">
                <div className="h-full bg-[var(--color-compat)]" style={{ width: '95%' }} />
              </div>
              <p className="text-[10px] font-sans text-[var(--color-forest)]/60 pt-1">low exertion requirement matches current low energy</p>
            </div>

          </div>
          <p className="text-[12px] font-sans text-[var(--color-forest)]/60">Tokens: 4 specific hues, 0px radius, lowercase labels.</p>
        </section>

        {/* 3. Slider Anatomy */}
        <section className="space-y-4">
          <h2 className="text-[14px] font-bold uppercase tracking-wider text-[var(--color-forest)] border-b border-[var(--color-forest)]/10 pb-2">3. Slider Anatomy</h2>
          <div className="bg-[var(--color-paper-deep)] p-6 rounded-[12px] border border-[var(--color-forest)]/10">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-forest)]">Energy</span>
                <span className="text-[17px] font-mono tabular-nums text-[var(--color-pine)]">{sliderVal.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.1"
                value={sliderVal}
                onChange={(e) => setSliderVal(parseFloat(e.target.value))}
                className="w-full h-2 bg-[var(--color-forest)]/10 rounded-full appearance-none cursor-pointer accent-[var(--color-pine)]"
              />
              <div className="flex justify-between text-[12px] text-[var(--color-forest)]/60 font-sans">
                <span>depleted</span>
                <span>wired</span>
              </div>
            </div>
          </div>
          <p className="text-[12px] font-sans text-[var(--color-forest)]/60">Rules: 1-5 scale, one decimal, lowercase endpoints, tabular data.</p>
        </section>

        {/* 4. Trail Card Anatomy */}
        <section className="space-y-4">
          <h2 className="text-[14px] font-bold uppercase tracking-wider text-[var(--color-forest)] border-b border-[var(--color-forest)]/10 pb-2">4. Trail Card Anatomy</h2>
          
          <div className="w-[240px] h-[180px] relative rounded-[24px] overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col group mx-auto">
            <img
              src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=500&q=80"
              alt="Emerald Lake Loop"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute top-3 left-3 bg-white/95 text-[#1E3A27] text-[10px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm">
              Easy
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-sm">
              <Heart size={14} fill="white" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 pt-10 text-white">
              <h4 className="font-serif text-[18px] font-semibold leading-snug">Emerald Lake Loop</h4>
              <p className="text-[12px] text-white/80 mt-0.5">Rocky Mountain NP</p>
              <div className="flex justify-between items-center mt-2.5 text-[11px] pt-2.5 border-t border-white/20">
                <div className="flex items-center gap-1.5 text-white">
                  <span className="text-[#D4A084]">★</span>
                  <span className="font-bold">4.5</span>
                </div>
                <span className="text-white/90 font-medium">5.4 km · 1h 30m</span>
              </div>
            </div>
          </div>
          <p className="text-[12px] font-sans text-[var(--color-forest)]/60">Rules: Full image background, gradient overlay, pill badges.</p>
        </section>

      </div>
    </div>
  );
}
