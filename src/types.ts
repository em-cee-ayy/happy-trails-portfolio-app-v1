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

export type TrailCategory = "Mountain" | "Forest" | "Water";

export interface Trail {
  id: string;
  name: string;
  location: string;
  distance: string; // e.g. "4.2 km"
  duration: string; // e.g. "1h 15m"
  difficulty: "easy" | "moderate" | "hard";
  category: TrailCategory;
  rating: number;
  matchScore: number;
  photoUrl: string;
  matchExplanation: string;
  isRestorative: boolean;
  dimensions: ArtDimension[];
  conditions: string[];
  mapPos: { x: number; y: number }; // percentage position on the stylized map
}

export interface FeedItem {
  id: string;
  userName: string;
  avatarUrl: string;
  timeAgo: string;
  trailId: string;
  note: string;
  restorationDelta: number; // post-hike change in self-reported restoration, 0-100
  photoUrl?: string;
  kudos: number;
}

export interface ProfileStats {
  hikes: number;
  distanceKm: number;
  restorativeHours: number;
  avgRestoration: number; // 0-100
  streakWeeks: number;
}
