import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

/**
 * Consistent top-left back control shared across every screen (except onboarding).
 * Mirrors the handoff Trail Detail back button: a 40px circular button with a
 * left chevron. `paper` reads on light chrome; `overlay` (frosted glass) sits
 * over photography / dark backgrounds like the handoff hero.
 */
export function BackButton({
  to = "/home",
  variant = "paper",
  label = "Back to home",
}: {
  to?: string;
  variant?: "paper" | "overlay";
  label?: string;
}) {
  const navigate = useNavigate();
  const base =
    "w-10 h-10 rounded-full flex items-center justify-center shrink-0 active:scale-95 transition-transform";
  const skin =
    variant === "overlay"
      ? "bg-white/20 backdrop-blur-md text-white border border-white/20"
      : "bg-white text-[var(--color-forest)] border border-[var(--color-forest)]/10 shadow-sm hover:bg-[var(--color-paper-deep)]";

  return (
    <button onClick={() => navigate(to)} aria-label={label} className={`${base} ${skin}`}>
      <ChevronLeft size={20} strokeWidth={2} className="-ml-0.5" />
    </button>
  );
}
