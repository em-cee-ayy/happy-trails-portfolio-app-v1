import React, { useState } from "react";
import { Search, Bell, Heart, Star, ChevronRight, Brain, Compass, TreePine, Mountain, Droplets } from "lucide-react";
import { Trail } from "../types";
import { TRAILS_DATA } from "../data";

interface HomeScreenProps {
  onFindTrail: () => void;
  onSelectTrail: (trailId: string) => void;
  onNavigateTab: (tabId: string) => void;
  activeTab: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onFindTrail,
  onSelectTrail,
  onNavigateTab,
  activeTab,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("Nearby");

  const filters = [
    { id: "Nearby", label: "Nearby", icon: Compass },
    { id: "Mountain", label: "Mountain", icon: Mountain },
    { id: "Forest", label: "Forest", icon: TreePine },
    { id: "Water", label: "Water", icon: Droplets },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#F0E8DC] text-[#2B4A35] select-none overflow-y-auto pb-24">
      {/* Top Profile Header */}
      <div className="px-6 pt-5 pb-3 flex justify-between items-center bg-transparent">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="User avatar"
            className="w-10 h-10 rounded-full border border-[#2B4A35]/25 object-cover"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="text-[11px] text-[#2B4A35]/65 leading-none mb-0.5">Good morning</p>
            <p className="text-sm font-bold font-sans tracking-tight">Sindy</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#2B4A35] shadow-xs hover:bg-[#FAF8F5] transition">
            <Search size={16} />
          </button>
          <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#2B4A35] relative shadow-xs hover:bg-[#FAF8F5] transition">
            <Bell size={16} />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-[#D4A084]" />
          </button>
        </div>
      </div>

      {/* Main Headline */}
      <div className="px-6 py-3">
        <h2 className="font-serif text-[32px] font-normal leading-[1.1] tracking-tight text-[#2B4A35]">
          Find new paths <br />
          <span className="italic text-[#D4A084]">around you.</span>
        </h2>
      </div>

      {/* PERSISTENT AI RESTORATION TRIGGER: The neuroscience gateway */}
      <div 
        onClick={onFindTrail}
        className="mx-6 my-3 p-4 rounded-2xl bg-[#2B4A35] text-[#FAFAF8] shadow-md relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold tracking-widest text-[#D4A084] uppercase">
                Attention Restoration Theory
              </span>
              <span className="px-1.5 py-0.5 rounded-sm bg-amber-500/10 text-[#D4A084] text-[8px] font-bold tracking-wide uppercase border border-[#D4A084]/20">
                Cognitive AI
              </span>
            </div>
            <h3 className="font-serif text-lg font-normal tracking-wide mt-1 text-white">
              Cognitive State Check-In
            </h3>
            <p className="font-sans text-xs text-neutral-200/90 leading-relaxed font-light mt-1 max-w-[220px]">
              Feeling drained, foggy, or anxious? Match your cognitive state with nature's restorative dimensions.
            </p>
            <div className="mt-3 px-4 py-2 bg-[#D4A084] text-[#2B4A35] rounded-full text-xs font-bold leading-none inline-flex items-center gap-1.5 transition shadow-sm">
              <span>Restore My Mind</span>
              <ArrowRightMini />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto px-6 py-3 scrollbar-none">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isSelected = selectedFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? "bg-[#2B4A35] border-[#2B4A35] text-white shadow-sm"
                  : "bg-white border-white/50 text-[#2B4A35]/80 hover:border-neutral-300"
              }`}
            >
              <Icon size={13} />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>

      {/* Feature Trail Cards */}
      <div className="grid grid-cols-2 gap-3 px-6 py-2">
        {/* Emerald Lake Loop */}
        <div
          onClick={() => onSelectTrail("emerald_lake_loop")}
          className="relative rounded-[20px] overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col group h-[160px]"
        >
          <img
            src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=500&q=80"
            alt="Emerald Lake Loop"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          <div className="absolute top-2 left-2 bg-white/95 text-[#1E3A27] text-[9px] font-bold py-0.5 px-2 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm">
            Easy
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-black/20 transition-colors shadow-sm"
          >
            <Heart size={12} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-3 pt-6 text-white">
            <h4 className="font-serif text-[15px] font-semibold leading-tight">Emerald Lake Loop</h4>
            <p className="text-[10px] text-white/80 mt-0.5">Rocky Mountain NP</p>
            <div className="flex justify-between items-center mt-2 text-[9px] pt-2 border-t border-white/20">
              <div className="flex items-center gap-1 text-white">
                <Star size={10} fill="currentColor" className="text-[#D4A084]" />
                <span className="font-bold">4.5</span>
              </div>
              <span className="text-white/90 font-medium">5.4 km · 1h 30m</span>
            </div>
          </div>
        </div>

        {/* Sky Pond Trail */}
        <div className="relative rounded-[20px] overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col group h-[160px]">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80"
            alt="Sky Pond Trail"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          <div className="absolute top-2 left-2 bg-[#fef2f2]/95 text-[#991B1B] text-[9px] font-bold py-0.5 px-2 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm">
            Hard
          </div>
          <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-black/20 transition-colors shadow-sm">
            <Heart size={12} className="fill-white text-white" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-3 pt-6 text-white">
            <h4 className="font-serif text-[15px] font-semibold leading-tight">Sky Pond Trail</h4>
            <p className="text-[10px] text-white/80 mt-0.5">Rocky Mountain NP</p>
            <div className="flex justify-between items-center mt-2 text-[9px] pt-2 border-t border-white/20">
              <div className="flex items-center gap-1 text-white">
                <Star size={10} fill="currentColor" className="text-[#D4A084]" />
                <span className="font-bold">4.8</span>
              </div>
              <span className="text-white/90 font-medium">13.1 km · 4h 45m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Nearby Section */}
      <div className="px-6 mt-4 mb-2 flex justify-between items-center">
        <h3 className="font-serif text-xl font-normal tracking-wide text-[#2B4A35]">Trending nearby</h3>
        <button className="text-xs font-semibold text-[#D4A084] hover:underline">See all</button>
      </div>

      <div className="px-6 flex flex-col gap-3">
        {/* Bear Lake Loop */}
        <div className="p-3 bg-white rounded-2xl flex items-center gap-3 hover:shadow-xs transition duration-200">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80"
            alt="Bear Lake"
            className="w-14 h-14 rounded-xl object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1">
            <h4 className="font-sans text-sm font-bold text-[#2B4A35]">Bear Lake Loop</h4>
            <p className="text-xs text-[#2B4A35]/65">1.1 km · Easy</p>
            <div className="flex items-center gap-1 text-[#D4A084] mt-0.5">
              <Star size={11} fill="currentColor" />
              <span className="text-xs font-bold text-[#2B4A35] leading-none">4.7</span>
            </div>
          </div>
          <ChevronRight size={16} className="text-[#2B4A35]/40" />
        </div>

        {/* Dream Lake */}
        <div
          onClick={() => onSelectTrail("boulder_creek_trail")}
          className="p-3 bg-white rounded-2xl flex items-center gap-3 hover:shadow-xs cursor-pointer transition duration-200"
        >
          <img
            src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=150&q=80"
            alt="Dream Lake"
            className="w-14 h-14 rounded-xl object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1">
            <h4 className="font-sans text-sm font-bold text-[#2B4A35]">Dream Creek Trail</h4>
            <p className="text-xs text-[#2B4A35]/65">4.2 km · Easy · 94% Match</p>
            <div className="flex items-center gap-1 text-[#D4A084] mt-0.5">
              <Star size={11} fill="currentColor" />
              <span className="text-xs font-bold text-[#2B4A35] leading-none">4.7</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-sm bg-[#EBF5EE] text-[#1E3A27] text-[8px] font-bold">RESTORATIVE</span>
            </div>
          </div>
          <ChevronRight size={16} className="text-[#2B4A35]/40" />
        </div>
      </div>
    </div>
  );
};

/* Micro icon helper */
const ArrowRightMini = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);
