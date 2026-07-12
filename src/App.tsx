import React, { useState, useEffect } from "react";
import { 
  Compass, Map, Award, Camera, BookOpen, Brain, 
  Layers, Smartphone, Volume2, ShieldAlert, Activity
} from "lucide-react";
import { ScreenId, Trail } from "./types";
import { TRAILS_DATA } from "./data";
import { HomeScreen } from "./components/HomeScreen";
import { CheckInScreen } from "./components/CheckInScreen";
import { ProcessingScreen } from "./components/ProcessingScreen";
import { TrailDetailScreen } from "./components/TrailDetailScreen";
import { PostHikeScreen } from "./components/PostHikeScreen";
import { Onboarding1Screen, Onboarding2Screen } from "./components/OnboardingScreens";
import { ActiveHikeScreen } from "./components/ActiveHikeScreen";
import { InsightsScreen, NoMatchScreen } from "./components/MiscScreens";
import { ComponentsScreen } from "./components/ComponentsScreen";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("ONBOARDING_1");
  const [selectedTrail, setSelectedTrail] = useState<Trail>(TRAILS_DATA[0]);
  const [isCameraSheetOpen, setIsCameraSheetOpen] = useState(false);
  const [timeStr, setTimeStr] = useState(
    new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Sync state mapping on Screen A submission
  const handleCheckInSubmit = (state: string) => {
    // Choose appropriate trail mockup based on state
    if (state === "wired") {
      setSelectedTrail(TRAILS_DATA[1]); // Sky pond - high energy
    } else {
      setSelectedTrail(TRAILS_DATA[0]); // Boulder Creek - depleted
    }
    
    setActiveScreen("PROCESSING");
  };

  const handlePostHikeSave = () => {
    setActiveScreen("HOME");
  };

  return (
    <div className="w-full min-h-screen bg-[var(--color-paper)] font-sans antialiased flex flex-col lg:flex-row text-[var(--color-forest)]">
      
      {/* LEFT SIDEBAR: Professional Product Design Deck (Scholarly Context & Navigation) */}
      <div className="flex-1 p-6 lg:p-10 flex flex-col justify-between max-w-full lg:max-w-xl xl:max-w-2xl bg-[var(--color-paper)] border-b lg:border-b-0 lg:border-r border-[var(--color-forest)]/15 shrink-0">
        <div className="flex flex-col gap-6">
          
          {/* HIGH DENSITY THEME HEADER */}
          <header className="mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-[var(--color-forest)]/20 pb-4 gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold italic text-[var(--color-forest)] tracking-tight">
                happy trails AI
              </h1>
              <p className="text-[10px] tracking-widest uppercase font-semibold text-[var(--color-art-comp)] mt-0.5">
                NEUROSCIENCE-LED RESTORATION FRAMEWORK
              </p>
            </div>
            <div className="flex gap-4 sm:gap-6 text-[9px] font-bold uppercase tracking-widest text-[var(--color-forest)]/60">
              <span className="border-b border-[var(--color-art-comp)]">Design Specification</span>
            </div>
          </header>

          {/* Description summary of the design goals */}
          <div className="text-xs text-[var(--color-forest)]/90 leading-relaxed font-light flex flex-col gap-3">
            <p className="font-serif text-[17px] font-normal text-[var(--color-forest)] leading-snug">
              This interactive mockup suite highlights the AI + Attention Restoration Theory (ART) layer that distinguishes Happy Trails AI.
            </p>
            <p>
              In involuntary attention restoration (Kaplan & Kaplan, 1989), natural environments containing soft sensory movement (e.g., wind rustling forest branches, bubbling water currents) downregulate the prefrontal cortex—enabling the executive mental control loops to fully recover.
            </p>
          </div>

          {/* ATTENTION RESTORATION THEORY DIMENSIONS BOARD */}
          <div className="bg-[var(--color-paper-deep)] rounded-xl p-4 border border-[var(--color-forest)]/10 flex flex-col gap-3">
            <h3 className="font-serif text-sm font-semibold text-[var(--color-forest)] flex items-center gap-1.5">
              <BookOpen size={14} className="text-[var(--color-art-comp)]" />
              <span>Scientific Core (The 4 ART Dimensions)</span>
            </h3>
            <div className="grid grid-cols-2 gap-2.5 text-[11px] leading-relaxed">
              <div className="bg-[var(--color-paper)] p-2.5 rounded-lg border border-[var(--color-forest)]/10">
                <span className="font-bold block text-[var(--color-forest)]">🏡 Being Away</span>
                <span className="font-light text-[var(--color-forest)]/75 text-[10.5px]">Psychological distance from ordinary, fatiguing daily urban stress.</span>
              </div>
              <div className="bg-[var(--color-paper)] p-2.5 rounded-lg border border-[var(--color-forest)]/10">
                <span className="font-bold block text-[var(--color-forest)]">✨ Fascination</span>
                <span className="font-light text-[var(--color-forest)]/75 text-[10.5px]">Involuntary attraction triggers passive mental ease & recovery.</span>
              </div>
              <div className="bg-[var(--color-paper)] p-2.5 rounded-lg border border-[var(--color-forest)]/10">
                <span className="font-bold block text-[var(--color-forest)]">🌍 Extent</span>
                <span className="font-light text-[var(--color-forest)]/75 text-[10.5px]">Immersion in a rich, coherent world apart from standard focus demands.</span>
              </div>
              <div className="bg-[var(--color-paper)] p-2.5 rounded-lg border border-[var(--color-forest)]/10">
                <span className="font-bold block text-[var(--color-forest)]">❤️ Compatibility</span>
                <span className="font-light text-[var(--color-forest)]/75 text-[10.5px]">Perfect fit between your current cognitive state and surroundings.</span>
              </div>
            </div>
          </div>

          {/* ACTIVE SCREEN NAVIGATOR PANEL */}
          <div className="my-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#2B4A35]/70 mb-3 flex items-center gap-1.5">
              <Layers size={13} />
              <span>Direct Screen Preset Deck</span>
            </h3>
            <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-2">
              {[
                { id: "ONBOARDING_1", label: "Onboarding 1 — Value Prop" },
                { id: "ONBOARDING_2", label: "Onboarding 2 — Data Story" },
                { id: "CHECK_IN", label: "Cognitive Check-In" },
                { id: "PROCESSING", label: "AI Processing" },
                { id: "HOME", label: "Trails Home" },
                { id: "TRAIL_DETAIL", label: "Trail Detail — Hero & Breakdown" },
                { id: "ACTIVE_HIKE", label: "Active Hike" },
                { id: "POST_HIKE", label: "Post-Hike Reflection" },
                { id: "INSIGHTS", label: "Insights & Patterns" },
                { id: "NO_MATCH", label: "No-Match Honest State" },
                { id: "COMPONENTS", label: "Components Sheet" },
              ].map((screen) => {
                const isSelected = activeScreen === screen.id;
                return (
                  <button
                    key={screen.id}
                    onClick={() => {
                      setActiveScreen(screen.id as ScreenId);
                      setIsCameraSheetOpen(false);
                    }}
                    className={`p-2.5 w-full text-left rounded-xl text-xs font-medium flex items-center justify-between border cursor-pointer transition ${
                      isSelected
                        ? "bg-[#1E3A2F] border-[#1E3A2F] text-white shadow-md font-bold"
                        : "bg-white hover:bg-[var(--color-paper-deep)] border-[var(--color-forest)]/10 text-[var(--color-forest)]/85"
                    }`}
                  >
                    <span>{screen.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-[#2B4A35]/65 italic mt-2">
              ⚠️ Tip: Switch screens instantly using this navigator panel or interact with the preview device!
            </p>
          </div>

        </div>

        {/* Local time and compliance guidelines */}
        <div className="mt-6 pt-4 border-t border-[#2B4A35]/15 flex items-center justify-between text-[11px] text-[#2B4A35]/60">
          <span>Sindy's Device Clock: <span className="font-bold">{timeStr}</span></span>
          <div className="flex items-center gap-1">
            <Smartphone size={12} />
            <span>High Density Frame Ratio</span>
          </div>
        </div>

      </div>

      {/* RIGHT PREVIEW: Flat frame device mockup view with High-Density colors */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-10 bg-[var(--color-paper)]">
        
        {/* Sleek Mobile Device Frame Container (393px width, 852px height) styled with Field Guide Naturalism */}
        <div className="w-[393px] h-[852px] bg-[var(--color-paper)] relative border border-[var(--color-forest)]/20 shadow-xl flex flex-col overflow-hidden shrink-0">
          
          {/* INNER VIEWPORT SCREEN ENVELOPE */}
          <div className="flex-1 w-full h-full relative overflow-y-auto overflow-x-hidden bg-[var(--color-paper)] text-[var(--color-forest)]">
            
            {/* Transition Engine Mapper */}
            {activeScreen === "ONBOARDING_1" && (
              <Onboarding1Screen onNext={() => setActiveScreen("ONBOARDING_2")} />
            )}

            {activeScreen === "ONBOARDING_2" && (
              <Onboarding2Screen onStart={() => setActiveScreen("HOME")} />
            )}

            {activeScreen === "HOME" && (
              <HomeScreen
                onFindTrail={() => setActiveScreen("CHECK_IN")}
                onSelectTrail={(trailId) => {
                  const tr = TRAILS_DATA.find((t) => t.id === trailId);
                  if (tr) setSelectedTrail(tr);
                  setActiveScreen("TRAIL_DETAIL");
                }}
                activeTab="Trails"
              />
            )}

            {activeScreen === "CHECK_IN" && (
              <CheckInScreen
                onBack={() => setActiveScreen("HOME")}
                onSubmit={handleCheckInSubmit}
              />
            )}

            {activeScreen === "PROCESSING" && (
              <ProcessingScreen
                onComplete={() => setActiveScreen("TRAIL_DETAIL")}
              />
            )}

            {activeScreen === "TRAIL_DETAIL" && (
              <TrailDetailScreen
                trail={selectedTrail}
                onBack={() => setActiveScreen("HOME")}
                onStartHike={() => setActiveScreen("ACTIVE_HIKE")}
              />
            )}

            {activeScreen === "ACTIVE_HIKE" && (
              <ActiveHikeScreen trail={selectedTrail} onFinish={() => setActiveScreen("POST_HIKE")} />
            )}

            {activeScreen === "POST_HIKE" && (
              <PostHikeScreen
                onSave={handlePostHikeSave}
              />
            )}

            {activeScreen === "INSIGHTS" && (
              <InsightsScreen onBack={() => setActiveScreen("HOME")} />
            )}

            {activeScreen === "NO_MATCH" && (
              <NoMatchScreen onBack={() => setActiveScreen("HOME")} />
            )}

            {activeScreen === "COMPONENTS" && (
              <ComponentsScreen onBack={() => setActiveScreen("HOME")} />
            )}

            {/* WHAT'S AROUND YOU Bottom Sheet Drawer (Camera FAB sheet trigger) */}
            {isCameraSheetOpen && (
              <div 
                className="absolute inset-0 bg-black/60 z-30 transition-opacity duration-300 flex items-end"
                onClick={() => setIsCameraSheetOpen(false)}
              >
                <div 
                  className="w-full bg-[#FAFAF8] rounded-t-[32px] p-5 pb-8 flex flex-col gap-4 text-[#2B4A35] shadow-2xl relative z-40 animate-slide-up"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Pull handle */}
                  <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto" />
                  
                  {/* Drawer Header */}
                  <div>
                    <h3 className="font-serif text-xl font-normal text-[#2B4A35] mt-1">
                      What's around you?
                    </h3>
                    <p className="font-sans text-xs text-[#2B4A35]/65 mt-0.5">
                      Identify landmarks, wildlife, or log local trail information instantly.
                    </p>
                  </div>

                  {/* 4 options list */}
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    {/* Option 1: Listen (Bird ID) */}
                    <div className="p-3 bg-amber-50 h-24 border border-[#D4A084]/20 rounded-2xl flex flex-col justify-between items-start cursor-pointer hover:bg-amber-100/40 transition">
                      <div className="p-2 bg-[#D4A084]/15 text-[#D4A084] rounded-lg">
                        <Volume2 size={18} />
                      </div>
                      <div>
                        <span className="font-sans text-xs font-bold block uppercase leading-none text-[#2B4A35]">
                          Listen
                        </span>
                        <span className="text-[10px] text-[#2B4A35]/65 mt-1 block">
                          AI Bird ID Scan
                        </span>
                      </div>
                    </div>

                    {/* Option 2: Capture (Plant ID) */}
                    <div className="p-3 bg-emerald-50 h-24 border border-emerald-100 rounded-2xl flex flex-col justify-between items-start cursor-pointer hover:bg-emerald-100/40 transition">
                      <div className="p-2 bg-[#2B4A35]/10 text-[#2B4A35] rounded-lg">
                        <Camera size={18} />
                      </div>
                      <div>
                        <span className="font-sans text-xs font-bold block uppercase leading-none text-[#2B4A35]">
                          Capture
                        </span>
                        <span className="text-[10px] text-[#2B4A35]/65 mt-1 block">
                          AI Plant ID Scan
                        </span>
                      </div>
                    </div>

                    {/* Option 3: Alert (Drop pin) */}
                    <div className="p-3 bg-[#FEF2F2] h-24 border border-[#FCA5A5]/30 rounded-2xl flex flex-col justify-between items-start cursor-pointer hover:bg-[#FEF2F2]/80 transition">
                      <div className="p-2 bg-[#991B1B]/10 text-[#991B1B] rounded-lg">
                        <ShieldAlert size={18} />
                      </div>
                      <div>
                        <span className="font-sans text-xs font-bold block uppercase leading-none text-[#2B4A35]">
                          Alert
                        </span>
                        <span className="text-[10px] text-[#2B4A35]/65 mt-1 block">
                          Drop wildlife pin
                        </span>
                      </div>
                    </div>

                    {/* Option 4: Parking (Live pings) */}
                    <div className="p-3 bg-blue-50 h-24 border border-blue-100 rounded-2xl flex flex-col justify-between items-start cursor-pointer hover:bg-blue-100/40 transition">
                      <div className="p-2 bg-blue-600/10 text-blue-700 rounded-lg">
                        <Activity size={18} />
                      </div>
                      <div>
                        <span className="font-sans text-xs font-bold block uppercase leading-none text-[#2B4A35]">
                          Parking
                        </span>
                        <span className="text-[10px] text-[#2B4A35]/65 mt-1 block">
                          Check occupancy
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* PERSISTENT BOTTOM NAVIGATION BAR (Visible inside app only, hidden on onboarding/processing/active_hike) */}
            {activeScreen !== "ONBOARDING_1" && 
             activeScreen !== "ONBOARDING_2" && 
             activeScreen !== "PROCESSING" && 
             activeScreen !== "ACTIVE_HIKE" && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--color-paper-deep)] border-t border-[var(--color-forest)]/10 px-4 flex items-center justify-between z-20">
                {/* Tab 1: Trails */}
                <button
                  onClick={() => {
                    setActiveScreen("HOME");
                    setIsCameraSheetOpen(false);
                  }}
                  className={`flex flex-col items-center gap-1 flex-1 py-1 ${
                    activeScreen === "HOME" || activeScreen === "CHECK_IN" || activeScreen === "TRAIL_DETAIL" || activeScreen === "POST_HIKE"
                      ? "text-[var(--color-forest)]"
                      : "text-[var(--color-forest)]/40 hover:text-[var(--color-forest)]/60"
                  }`}
                >
                  <Compass size={20} className={activeScreen === "HOME" ? "stroke-[2.5]" : "stroke-[1.8]"} />
                  <span className="text-[9px] font-bold tracking-wider uppercase leading-none">Trails</span>
                </button>

                {/* Tab 2: Map */}
                <button
                  onClick={() => {
                    alert("Map view coming soon");
                  }}
                  className={`flex flex-col items-center gap-1 flex-1 py-1 text-[var(--color-forest)]/40 hover:text-[var(--color-forest)]/60`}
                >
                  <Map size={20} strokeWidth={1.8} />
                  <span className="text-[9px] font-bold tracking-wider uppercase leading-none">Map</span>
                </button>

                {/* Tab 3: PERSISTENT CAMERA FAB */}
                <div className="flex-1 flex justify-center -mt-6 relative">
                  <button
                    onClick={() => setIsCameraSheetOpen(!isCameraSheetOpen)}
                    className="w-12 h-12 bg-[var(--color-pine)] hover:bg-[var(--color-forest)] text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform shrink-0 border-[3px] border-[var(--color-paper-deep)]"
                  >
                    <Camera size={20} className="text-[var(--color-art-comp)] stroke-[2.2]" />
                  </button>
                </div>

                {/* Tab 4: Feed */}
                <button
                  onClick={() => {
                    alert("Feed timeline lists Sindy's synced community trails progress. Visual mockup template maps this route stably.");
                  }}
                  className="flex flex-col items-center gap-1 flex-1 py-1 text-[var(--color-forest)]/40 hover:text-[var(--color-forest)]/60"
                >
                  <Award size={20} strokeWidth={1.8} />
                  <span className="text-[9px] font-bold tracking-wider uppercase leading-none">Feed</span>
                </button>

                {/* Tab 5: Profile */}
                <button
                  onClick={() => {
                    alert("Profile coming soon");
                  }}
                  className={`flex flex-col items-center gap-1 flex-1 py-1 text-[var(--color-forest)]/40 hover:text-[var(--color-forest)]/60`}
                >
                  <svg
                    className={`w-5 h-5 stroke-[1.8]`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <span className="text-[9px] font-bold tracking-wider uppercase leading-none">Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
