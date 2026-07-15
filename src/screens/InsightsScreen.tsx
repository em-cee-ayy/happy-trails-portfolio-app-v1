import { BackButton } from "../components/BackButton";

export function InsightsScreen() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-paper)] relative">
      <header className="px-4 pt-10 pb-6 flex items-center gap-6 border-b border-[var(--color-forest)]/10 bg-[var(--color-paper)]/80 backdrop-blur-md sticky top-0 z-10">
        <BackButton to="/home" />
        <h1 className="font-serif italic text-lg text-[var(--color-forest)]">
          patterns
        </h1>
      </header>

      <div className="flex-1 p-4 space-y-6">
        <div className="bg-[var(--color-paper-deep)] p-2 rounded-[8px] border border-[var(--color-forest)]/10">
          <h2 className="font-serif text-[20px] text-[var(--color-forest)] leading-tight mb-2">
            Restoration Profile
          </h2>
          <p className="font-sans text-[14px] text-[var(--color-forest)]/80 leading-relaxed">
            you regulate best on morning trails with natural sun light.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-forest)]">
            Key Factors
          </h3>
          <ul className="space-y-4 font-sans text-[14px] text-[var(--color-forest)]/80">
            <li className="flex gap-3 items-start">
              <span className="w-2 h-2 rounded-full bg-[var(--color-pine)] mt-1.5 shrink-0" />
              <div>
                <span className="font-semibold block text-[var(--color-forest)]">
                  Morning light exposure (8am - 10am)
                </span>
                <span className="text-[12px] block mt-0.5 leading-relaxed">
                  Early light exposure anchors circadian rhythm, optimizing
                  cortisol awakening response to stabilize mood and energy.
                </span>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-2 h-2 rounded-full bg-[var(--color-fascination)] mt-1.5 shrink-0" />
              <div>
                <span className="font-semibold block text-[var(--color-forest)]">
                  Moving water (fascination)
                </span>
                <span className="text-[12px] block mt-0.5 leading-relaxed">
                  Gentle sensory movement (e.g. bubbling currents) engages
                  involuntary attention, resting the prefrontal cortex.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
