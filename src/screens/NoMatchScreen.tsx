import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";

export function NoMatchScreen() {
  const navigate = useNavigate();
  const goHome = () => navigate("/home");

  return (
    <div className="flex flex-col h-full bg-[var(--color-paper)] relative">
      <header className="px-4 pt-10 pb-6 flex items-center gap-6 border-b border-[var(--color-forest)]/10 bg-[var(--color-paper)]/80 backdrop-blur-md sticky top-0 z-10">
        <BackButton to="/home" />
        <h1 className="font-serif italic text-lg text-[var(--color-forest)]">
          no match
        </h1>
      </header>

      {/* top-aligned with a slight cushion (pt-8) so content sits near the top
          and Expand Radius follows the block instead of hugging the nav */}
      <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-24 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--color-alert)]/10 flex items-center justify-center mb-6">
          <span className="text-[24px]">🧭</span>
        </div>
        <h2 className="font-serif text-[22px] text-[var(--color-forest)] mb-3">
          No Match Nearby
        </h2>
        <p className="font-sans text-[14px] text-[var(--color-forest)]/70 mb-8 leading-relaxed">
          The trails currently available within your radius do not strongly
          align with your cognitive state.
        </p>

        <div className="bg-[var(--color-paper-deep)] p-4 rounded-[12px] border border-[var(--color-forest)]/10 text-left w-full">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-forest)]/60 mb-1">
            Closest fit (not a full match)
          </h3>
          <p className="font-sans text-[14px] text-[var(--color-forest)]/80">
            Sky Pond is nearby but requires high exertion, which contradicts
            your depleted state.
          </p>
        </div>

        <button
          onClick={goHome}
          className="mt-8 px-6 py-3 rounded-[8px] bg-[var(--color-pine)] text-white font-bold text-[14px] shadow-lg active:scale-[0.98] transition-transform"
        >
          Expand Radius
        </button>
      </div>
    </div>
  );
}
