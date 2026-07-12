import { CognitiveState, FeedItem, ProfileStats, Trail } from "./types";

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
    category: "Water",
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
    ],
    mapPos: { x: 28, y: 68 }
  },
  {
    id: "sky_pond",
    name: "Sky Pond",
    location: "Rocky Mountain NP",
    distance: "13.1 km",
    duration: "4h 45m",
    difficulty: "hard",
    category: "Mountain",
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
    ],
    mapPos: { x: 62, y: 22 }
  },
  {
    id: "emerald_lake",
    name: "Emerald Lake Loop",
    location: "Rocky Mountain NP",
    distance: "5.4 km",
    duration: "1h 30m",
    difficulty: "easy",
    category: "Forest",
    rating: 4.5,
    matchScore: 81,
    photoUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
    matchExplanation: "steady tree cover and gentle grade — solid restorative fit with mild novelty",
    isRestorative: true,
    conditions: ["packed snow near lake", "sheltered from wind", "moderate foot traffic"],
    dimensions: [
      { name: "being away", score: 84, explanation: "dense pine corridor screens out the built world" },
      { name: "fascination", score: 79, explanation: "glacial lake color shifts hold soft attention" },
      { name: "extent", score: 82, explanation: "linked lake basins read as one coherent landscape" },
      { name: "compatibility", score: 78, explanation: "short climbs suit moderate energy reserves" }
    ],
    mapPos: { x: 46, y: 38 }
  },
  {
    id: "bear_lake",
    name: "Bear Lake Loop",
    location: "Rocky Mountain NP",
    distance: "1.1 km",
    duration: "25m",
    difficulty: "easy",
    category: "Water",
    rating: 4.7,
    matchScore: 73,
    photoUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    matchExplanation: "minimal exertion and a flat shoreline circuit — restorative, though popularity dents the sense of being away",
    isRestorative: true,
    conditions: ["paved sections", "busy mornings", "full sun exposure"],
    dimensions: [
      { name: "being away", score: 58, explanation: "close to the trailhead hub and often crowded" },
      { name: "fascination", score: 74, explanation: "still-water reflections invite effortless gazing" },
      { name: "extent", score: 52, explanation: "short loop limits immersion" },
      { name: "compatibility", score: 90, explanation: "nearly effortless — fits any energy level" }
    ],
    mapPos: { x: 74, y: 54 }
  }
];

export const FEED_ITEMS: FeedItem[] = [
  {
    id: "feed_1",
    userName: "Maya R.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    timeAgo: "2h ago",
    trailId: "boulder_creek",
    note: "went in foggy after back-to-back calls. the creek did the work — head is quiet again.",
    restorationDelta: 34,
    photoUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80",
    kudos: 18
  },
  {
    id: "feed_2",
    userName: "Devon K.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    timeAgo: "5h ago",
    trailId: "emerald_lake",
    note: "match said 81 and it earned it. pine corridor is basically noise-cancelling for your brain.",
    restorationDelta: 27,
    kudos: 11
  },
  {
    id: "feed_3",
    userName: "Priya S.",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    timeAgo: "yesterday",
    trailId: "sky_pond",
    note: "ignored the 42 match on a low-energy day. app was right — spectacular but I came back more tired.",
    restorationDelta: -8,
    photoUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80",
    kudos: 24
  },
  {
    id: "feed_4",
    userName: "Tom W.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    timeAgo: "2d ago",
    trailId: "bear_lake",
    note: "25 quiet minutes before work. small loop, big reset.",
    restorationDelta: 19,
    kudos: 7
  }
];

export const PROFILE_STATS: ProfileStats = {
  hikes: 23,
  distanceKm: 91.4,
  restorativeHours: 31,
  avgRestoration: 76,
  streakWeeks: 6
};
