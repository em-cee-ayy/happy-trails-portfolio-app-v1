import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function OnboardingOne() {
  const navigate = useNavigate();

  return (
    // Full-bleed photo with a dark gradient and white text overlay (handoff
    // onboarding concept). Copy sits at the bottom; the flex-1 spacer lets it
    // grow upward without overflowing if the text runs long.
    <div className="relative h-full w-full overflow-hidden bg-[var(--color-forest)]">
      <img
        src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
        alt="Sunlit forest trail"
        className="absolute inset-0 w-full h-full object-cover object-center"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-[var(--color-forest)]/45 to-[var(--color-forest)]/95" />

      <div className="relative h-full flex flex-col p-6 text-white">
        {/* Top bar */}
        <div className="flex items-center justify-between pt-4 shrink-0">
          <span className="font-serif italic text-lg">Happy Trails AI</span>
          <button
            onClick={() => navigate("/home")}
            className="text-[13px] font-semibold text-white/75 hover:text-white transition-colors"
          >
            Skip
          </button>
        </div>

        <div className="flex-1 min-h-0" />

        {/* Bottom copy overlay */}
        <div className="shrink-0">
          <h1 className="font-serif text-[32px] leading-tight mb-3">
            Trails for your nervous system,{" "}
            <span className="italic text-white/70">not just your legs.</span>
          </h1>
          <p className="font-sans text-[14px] text-white/85 leading-relaxed mb-6">
            A different way to explore nature. We match trails to your cognitive
            state using Attention Restoration Theory.
          </p>

          {/* Progress dots (2-step onboarding) */}
          <div className="flex gap-1.5 mb-6">
            <span className="h-2 w-7 rounded-full bg-white transition-all" />
            <span className="h-2 w-2 rounded-full bg-white/30 transition-all" />
          </div>

          <button
            onClick={() => navigate("/onboarding-2")}
            className="w-full h-[52px] bg-[var(--color-pine)] text-white rounded-[12px] flex items-center justify-center gap-2 font-bold text-[14px] tracking-wide shadow-lg active:scale-[0.98] transition-transform"
          >
            <span>Continue</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
