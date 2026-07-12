import React from "react";
import { ChevronRight } from "lucide-react";

export function Onboarding1Screen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[var(--color-paper)] relative">
      <div className="flex-1 flex flex-col justify-end p-6 pb-32">
        <div className="w-full aspect-[4/5] bg-[var(--color-paper-deep)] rounded-[12px] mb-8 relative overflow-hidden border border-[var(--color-forest)]/10 shadow-sm">
          <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80" alt="Forest" className="w-full h-full object-cover" />
        </div>
        <h1 className="font-serif text-[32px] text-[var(--color-forest)] leading-tight mb-4">
          trails for your nervous system, <span className="italic opacity-70">not just your legs.</span>
        </h1>
        <p className="font-sans text-[14px] text-[var(--color-forest)]/70 leading-relaxed mb-8">
          A beautifully modernized field guide driven by a scientific instrument. We match trails to your cognitive state using Attention Restoration Theory.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-paper)] via-[var(--color-paper)] to-transparent">
        <button
          onClick={onNext}
          className="w-full h-[48px] bg-[var(--color-pine)] text-white rounded-[8px] flex items-center justify-center gap-2 font-bold text-[14px] tracking-wide shadow-lg active:scale-[0.98] transition-transform"
        >
          <span>Continue</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export function Onboarding2Screen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[var(--color-paper)] relative">
      <div className="flex-1 flex flex-col justify-end p-6 pb-32">
        <div className="w-full aspect-[4/5] bg-[var(--color-paper-deep)] rounded-[12px] mb-8 relative overflow-hidden border border-[var(--color-forest)]/10 shadow-sm">
          <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80" alt="Mountain Lake" className="w-full h-full object-cover" />
        </div>
        <h1 className="font-serif text-[32px] text-[var(--color-forest)] leading-tight mb-4">
          an honest data story
        </h1>
        <div className="space-y-6 mb-8">
          <p className="font-sans text-[14px] text-[var(--color-forest)]/70 leading-relaxed">
            Your cognitive check-ins, location data, and restoration history remain entirely local to your device.
          </p>
          <div className="p-4 bg-[var(--color-paper-deep)] rounded-[8px] border border-[var(--color-forest)]/10">
            <h3 className="font-bold text-[12px] uppercase tracking-wider text-[var(--color-forest)] mb-2">Permissions Needed</h3>
            <ul className="space-y-2 text-[14px] text-[var(--color-forest)]/80 font-sans">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-pine)]" /> Location (for active hike routing)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-pine)]" /> Local Storage (for your check-ins)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-paper)] via-[var(--color-paper)] to-transparent">
        <button
          onClick={onStart}
          className="w-full h-[48px] bg-[var(--color-pine)] text-white rounded-[8px] flex items-center justify-center gap-2 font-bold text-[14px] tracking-wide shadow-lg active:scale-[0.98] transition-transform"
        >
          <span>Allow & Start</span>
        </button>
      </div>
    </div>
  );
}
