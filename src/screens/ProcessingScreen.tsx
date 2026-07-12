import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function ProcessingScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trailId = searchParams.get("trail") ?? "boulder_creek";
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "." : prev + ".");
    }, 400);

    // replace: back button should skip the transient processing screen
    const completeTimeout = setTimeout(() => {
      navigate(`/trail/${trailId}`, { replace: true });
    }, 2800);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(completeTimeout);
    };
  }, [navigate, trailId]);

  return (
    <div className="flex flex-col h-full bg-[var(--color-forest)] text-[var(--color-paper)] relative justify-center p-6">
      <div className="space-y-6">
        <h2 className="text-[22px] font-serif italic text-[var(--color-paper)]">analyzing cognitive state{dots}</h2>

        <div className="space-y-2 text-[14px] font-sans opacity-70">
          <p>scanning 2,400 trail profiles...</p>
          <p>calculating attention restoration factors...</p>
        </div>
      </div>

      <div className="absolute bottom-12 left-6 right-6">
        <p className="text-[12px] font-mono tabular-nums opacity-40 uppercase tracking-widest">
          est. wait 3s
        </p>
      </div>
    </div>
  );
}
