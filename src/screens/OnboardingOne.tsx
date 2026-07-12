import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function OnboardingOne() {
  const navigate = useNavigate();

  return (
    // Fits in one screen: the image flexes to fill leftover height while the
    // text and Continue button sit below it in normal flow (no scroll).
    <div className="flex flex-col h-full bg-[var(--color-paper)] p-6 overflow-hidden">
      <div className="flex-1 min-h-0 w-full bg-[var(--color-paper-deep)] rounded-[12px] mb-6 overflow-hidden border border-[var(--color-forest)]/10 shadow-sm">
        <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80" alt="Forest" className="w-full h-full object-cover" />
      </div>
      <h1 className="font-serif text-[32px] text-[var(--color-forest)] leading-tight mb-3 shrink-0">
        trails for your nervous system, <span className="italic opacity-70">not just your legs.</span>
      </h1>
      <p className="font-sans text-[14px] text-[var(--color-forest)]/70 leading-relaxed mb-6 shrink-0">
        A beautifully modernized field guide driven by a scientific instrument. We match trails to your cognitive state using Attention Restoration Theory.
      </p>
      <button
        onClick={() => navigate("/onboarding-2")}
        className="shrink-0 w-full h-[48px] bg-[var(--color-pine)] text-white rounded-[8px] flex items-center justify-center gap-2 font-bold text-[14px] tracking-wide shadow-lg active:scale-[0.98] transition-transform"
      >
        <span>Continue</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
