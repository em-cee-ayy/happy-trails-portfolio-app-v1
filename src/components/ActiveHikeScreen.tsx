import React, { useState, useEffect } from "react";
import { ArrowLeft, Download, Lock } from "lucide-react";
import { Trail } from "../types";

export function ActiveHikeScreen({ trail, onFinish }: { trail: Trail, onFinish: () => void }) {
  const [seconds, setSeconds] = useState(1821); // Starts at 00:30:21

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatTimeHeader = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-[#E5EFE7] relative overflow-hidden font-sans">
      {/* Topo Map Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Synthetic Topo Lines generated with SVG */}
        <svg className="w-[150%] h-[150%] absolute -top-1/4 -left-1/4 stroke-[#C2CCDC]/50 pointer-events-none" fill="none" strokeWidth="2">
          {/* Several overlapping wavy paths to simulate topo */}
          <path d="M 0 200 Q 150 150 300 300 T 600 400 T 900 200 T 1200 400" />
          <path d="M 0 250 Q 160 190 320 330 T 620 420 T 920 230 T 1200 450" />
          <path d="M 0 300 Q 170 230 340 360 T 640 440 T 940 260 T 1200 500" />
          
          <path d="M 0 400 Q 100 350 200 450 T 400 500 T 700 300 T 1000 600 T 1200 550" />
          <path d="M 0 450 Q 110 390 220 480 T 420 520 T 720 330 T 1020 620 T 1200 600" />
          <path d="M 0 500 Q 120 430 240 510 T 440 540 T 740 360 T 1040 640 T 1200 650" />

          <path d="M 200 0 Q 300 200 150 400 T 250 600 T 100 800 T 300 1000" />
          <path d="M 250 0 Q 350 220 180 430 T 280 620 T 130 820 T 330 1020" />
          <path d="M 300 0 Q 400 240 210 460 T 310 640 T 160 840 T 360 1040" />
          
          {/* Circular topo near the blue dot to simulate elevation */}
          <circle cx="270" cy="400" r="100" />
          <circle cx="270" cy="400" r="150" />
          <circle cx="270" cy="400" r="200" />
          <circle cx="270" cy="400" r="250" />
          <circle cx="270" cy="400" r="300" />
        </svg>

        {/* Thick Black Route SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 393 852" preserveAspectRatio="none">
          {/* Main route line matching the screenshot roughly */}
          <path 
            d="M -10 120 Q 80 120 90 200 T 50 300 T 100 350 Q 120 320 180 260 T 300 260 T 320 400 T 250 430 T 220 540 T 280 640 T 350 660 T 400 630" 
            fill="none" 
            stroke="#0C130D" 
            strokeWidth="12" 
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* You Are Here Indicator */}
        <div className="absolute top-[430px] left-[250px] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center pointer-events-none">
          {/* Vision Cone (Gradient) */}
          <div className="absolute -top-[50px] -right-[40px] w-24 h-24 bg-gradient-to-tr from-[#1A66FF]/60 to-transparent blur-[6px] transform rotate-[35deg] origin-bottom-left" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)"}} />
          
          {/* Blue Dot with White Border */}
          <div className="w-[26px] h-[26px] bg-[#1A66FF] rounded-full border-[3px] border-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] relative z-10" />
        </div>
      </div>

      {/* Top Header UI */}
      <header className="px-6 pt-14 pb-4 flex items-center justify-between z-10 relative pointer-events-none">
        <button onClick={onFinish} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-sm pointer-events-auto active:scale-95 transition-transform">
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
        
        <div className="text-[19px] font-medium tracking-tight text-black">
          {formatTimeHeader(seconds)}
        </div>

        <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-sm pointer-events-auto active:scale-95 transition-transform">
          <Download size={20} strokeWidth={2} />
        </button>
      </header>

      {/* Stats Floating Dashboard */}
      <div className="absolute left-6 top-[400px] bg-[#0C130D] rounded-[32px] p-6 w-[120px] shadow-lg flex flex-col gap-5 z-20 pointer-events-auto">
        <div className="flex flex-col gap-1">
          <span className="text-[#C1CD44] text-[13px] font-medium tracking-wide">Time</span>
          <span className="text-white text-[19px] font-semibold">{formatTime(seconds)}<span className="text-white/70 text-[14px]">s</span></span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#C1CD44] text-[13px] font-medium tracking-wide">Distance</span>
          <span className="text-white text-[19px] font-semibold">3,44<span className="text-white/70 text-[14px] ml-0.5">km</span></span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[#C1CD44] text-[13px] font-medium tracking-wide">Steps</span>
          <span className="text-white text-[19px] font-semibold">3951</span>
        </div>
      </div>

      {/* Bottom Actions Menu */}
      <div className="absolute bottom-10 left-6 right-6 flex items-center justify-between gap-4 z-20 pointer-events-auto">
        <button className="flex-1 h-16 bg-white rounded-3xl text-black font-bold text-[18px] shadow-sm active:scale-95 transition-transform">
          Pause
        </button>
        <button className="w-16 h-16 bg-[#000000]/30 backdrop-blur-md rounded-full flex items-center justify-center text-white shrink-0 shadow-sm active:scale-95 transition-transform">
          <Lock size={22} strokeWidth={2.5} />
        </button>
        <button onClick={onFinish} className="flex-1 h-16 bg-white rounded-3xl text-black font-bold text-[18px] shadow-sm active:scale-95 transition-transform">
          Finish
        </button>
      </div>

    </div>
  );
}
