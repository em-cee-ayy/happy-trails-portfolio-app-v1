import { CognitiveState, Trail } from "./types";

export const COGNITIVE_STATES: CognitiveState[] = [
  {
    id: "mentally drained",
    label: "mentally drained",
    icon: "Battery",
    tintColor: "bg-[#FEF2F2]", // Warm red tint card
    textColor: "text-[#991B1B]",
    badgeColor: "bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]",
    selectedColor: "border-[#991B1B]"
  },
  {
    id: "anxious + restless",
    label: "anxious + restless",
    icon: "Activity", // Tangled lines
    tintColor: "bg-[#FFFBEB]", // Warm amber tint card
    textColor: "text-[#92400E]",
    badgeColor: "bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]",
    selectedColor: "border-[#92400E]"
  },
  {
    id: "mentally foggy",
    label: "mentally foggy",
    icon: "Cloud", // Cloud
    tintColor: "bg-[#F0F9FF]", // Soft blue-gray tint card
    textColor: "text-[#075985]",
    badgeColor: "bg-[#E0F2FE] text-[#075985] border-[#7DD3FC]",
    selectedColor: "border-[#075985]"
  },
  {
    id: "low energy",
    label: "low energy",
    icon: "Moon", // Half-moon
    tintColor: "bg-[#FAF5FF]", // Soft lavender tint card
    textColor: "text-[#6B21A8]",
    badgeColor: "bg-[#F3E8FF] text-[#6B21A8] border-[#D8B4FE]",
    selectedColor: "border-[#6B21A8]"
  },
  {
    id: "overstimulated",
    label: "overstimulated",
    icon: "Sliders", // Overloaded lines
    tintColor: "bg-[#FFF7ED]", // Warm orange tint card
    textColor: "text-[#C2410C]",
    badgeColor: "bg-[#FFEDD5] text-[#C2410C] border-[#FDBA74]",
    selectedColor: "border-[#C2410C]"
  },
  {
    id: "pretty good, just want to explore",
    label: "pretty good, just want to explore",
    icon: "Compass", // Compass
    tintColor: "bg-[#EBF5EE]", // Forest green tint card
    textColor: "text-[#1E3A27]",
    badgeColor: "bg-[#DDEFE4] text-[#1E3A27] border-[#A9DFBF]",
    selectedColor: "border-[#1E3A27]"
  }
];

export const TRAILS_DATA: Trail[] = [
  {
    id: "boulder_creek",
    name: "Boulder Creek Trail",
    location: "Boulder, CO",
    distance: "4.2 km",
    duration: "1h 15m",
    difficulty: "easy",
    rating: 4.7,
    matchScore: 94,
    photoUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80",
    matchExplanation: "high fascination, low cognitive clutter — fits your depleted → restore goal",
    isRestorative: true,
    conditions: ["creek running high", "soft dirt", "light shade"],
    dimensions: [
      { name: "being away", score: 92, explanation: "physical separation from urban noise" },
      { name: "fascination", score: 88, explanation: "moving water engages involuntary attention" },
      { name: "extent", score: 76, explanation: "coherent natural corridor without complex navigation" },
      { name: "compatibility", score: 95, explanation: "low exertion requirement matches current low energy" }
    ]
  },
  {
    id: "sky_pond",
    name: "Sky Pond",
    location: "Rocky Mountain NP",
    distance: "13.1 km",
    duration: "4h 45m",
    difficulty: "hard",
    rating: 4.9,
    matchScore: 42,
    photoUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    matchExplanation: "high extent, but extreme cognitive clutter — contradicts your depleted state",
    isRestorative: false,
    conditions: ["steep scramble", "windy at lake", "crowded at trailhead"],
    dimensions: [
      { name: "being away", score: 98, explanation: "total immersion in alpine wilderness" },
      { name: "fascination", score: 85, explanation: "dramatic peaks demand attention" },
      { name: "extent", score: 94, explanation: "vast, world-apart scale" },
      { name: "compatibility", score: 20, explanation: "high exertion and navigation stress" }
    ]
  }
];
