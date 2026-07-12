export type CognitiveStateId = 
  | "mentally drained"
  | "anxious + restless"
  | "mentally foggy"
  | "low energy"
  | "overstimulated"
  | "pretty good, just want to explore";

export interface CognitiveState {
  id: CognitiveStateId;
  label: string;
  icon: string; // Lucide icon name
  tintColor: string; // Tailwind hex or descriptive color theme background
  textColor: string;
  badgeColor: string;
  selectedColor: string;
}

export interface ArtDimension {
  name: "being away" | "fascination" | "extent" | "compatibility";
  score: number; // 0-100
  explanation: string;
}

export interface Trail {
  id: string;
  name: string;
  location: string;
  distance: string; // e.g. "4.2 km"
  duration: string; // e.g. "1h 15m"
  difficulty: "easy" | "moderate" | "hard";
  rating: number;
  matchScore: number;
  photoUrl: string;
  matchExplanation: string;
  isRestorative: boolean;
  dimensions: ArtDimension[];
  conditions: string[];
}

export type ScreenId = 
  | "ONBOARDING_1"
  | "ONBOARDING_2"
  | "HOME"
  | "CHECK_IN"
  | "PROCESSING"
  | "TRAIL_DETAIL"
  | "ACTIVE_HIKE"
  | "POST_HIKE"
  | "INSIGHTS"
  | "NO_MATCH"
  | "COMPONENTS";
