import { useNavigate } from "react-router-dom";

export function OnboardingTwo() {
  const navigate = useNavigate();

  return (
    // Full-bleed photo + dark gradient + white text overlay (handoff concept).
    // Copy, permissions box, and CTA sit at the bottom over the image.
    <div className="relative h-full w-full overflow-hidden bg-[var(--color-forest)]">
      <img
        src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80"
        alt="Alpine mountain lake"
        className="absolute inset-0 w-full h-full object-cover object-center"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-[var(--color-forest)]/50 to-[var(--color-forest)]/95" />

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
            An honest data story
          </h1>
          <p className="font-sans text-[14px] text-white/85 leading-relaxed mb-4">
            Your cognitive check-ins, location data, and restoration history
            remain entirely local to your device.
          </p>

          {/* Permissions box — translucent over the photo */}
          <div className="p-4 bg-white/10 rounded-[12px] border border-white/20 backdrop-blur-md mb-6">
            <h3 className="font-bold text-[11px] uppercase tracking-wider text-white/90 mb-2">
              Permissions Needed
            </h3>
            <ul className="space-y-2 text-[13px] text-white/85 font-sans">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-art-comp)] shrink-0" />{" "}
                Location (for active hike routing)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-art-comp)] shrink-0" />{" "}
                Local Storage (for check-ins)
              </li>
            </ul>
          </div>

          {/* Progress dots (2-step onboarding) */}
          <div className="flex gap-1.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-white/30 transition-all" />
            <span className="h-2 w-7 rounded-full bg-white transition-all" />
          </div>

          <button
            onClick={() => navigate("/home")}
            className="w-full h-[52px] bg-[var(--color-pine)] text-white rounded-[12px] flex items-center justify-center gap-2 font-bold text-[14px] tracking-wide shadow-lg active:scale-[0.98] transition-transform"
          >
            <span>Allow &amp; Start</span>
          </button>
        </div>
      </div>
    </div>
  );
}
