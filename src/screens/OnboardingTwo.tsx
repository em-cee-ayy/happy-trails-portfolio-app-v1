import { useNavigate } from "react-router-dom";

export function OnboardingTwo() {
  const navigate = useNavigate();

  return (
    // Fits in one screen: the image flexes to fill leftover height while the
    // text, permissions box, and button sit below it in flow (no scroll).
    <div className="flex flex-col h-full bg-[var(--color-paper)] p-6 overflow-hidden">
      <div className="flex-1 min-h-0 w-full bg-[var(--color-paper-deep)] rounded-[12px] mb-6 overflow-hidden border border-[var(--color-forest)]/10 shadow-sm">
        <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80" alt="Mountain Lake" className="w-full h-full object-cover" />
      </div>
      <h1 className="font-serif text-[32px] text-[var(--color-forest)] leading-tight mb-3 shrink-0">
        an honest data story
      </h1>
      <p className="font-sans text-[14px] text-[var(--color-forest)]/70 leading-relaxed mb-4 shrink-0">
        Your cognitive check-ins, location data, and restoration history remain entirely local to your device.
      </p>
      <div className="p-4 bg-[var(--color-paper-deep)] rounded-[8px] border border-[var(--color-forest)]/10 mb-6 shrink-0">
        <h3 className="font-bold text-[12px] uppercase tracking-wider text-[var(--color-forest)] mb-2">Permissions Needed</h3>
        <ul className="space-y-2 text-[14px] text-[var(--color-forest)]/80 font-sans">
          <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-pine)]" /> Location (for active hike routing)</li>
          <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-pine)]" /> Local Storage (for your check-ins)</li>
        </ul>
      </div>
      <button
        onClick={() => navigate("/home")}
        className="shrink-0 w-full h-[48px] bg-[var(--color-pine)] text-white rounded-[8px] flex items-center justify-center gap-2 font-bold text-[14px] tracking-wide shadow-lg active:scale-[0.98] transition-transform"
      >
        <span>Allow & Start</span>
      </button>
    </div>
  );
}
