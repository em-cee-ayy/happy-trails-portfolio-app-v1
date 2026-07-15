// Line icons — 1.75 stroke, rounded. Ported from the handoff icon set.
import type { CSSProperties, ReactElement, ReactNode } from 'react';

export interface IconProps {
  size?: number;
  stroke?: string;
  fill?: string;
  /** stroke-width */
  sw?: number;
  style?: CSSProperties;
}

interface BaseProps extends IconProps {
  d?: string;
  children?: ReactNode;
}

const Icon = ({ d, size = 22, stroke = 'currentColor', fill = 'none', sw = 1.75, style, children }: BaseProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    {d ? <path d={d} /> : children}
  </svg>
);

export type IconComponent = (p: IconProps) => ReactElement;

export const Icons: Record<string, IconComponent> = {
  home: (p) => <Icon {...p}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></Icon>,
  compass: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></Icon>,
  camera: (p) => <Icon {...p}><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></Icon>,
  ear: (p) => <Icon {...p}><path d="M8 3a6 6 0 0 1 6 6c0 2-1 3-2 4s-1 2 0 3a3 3 0 0 1-5 2"/><circle cx="9" cy="9" r="1.5"/></Icon>,
  alert: (p) => <Icon {...p}><path d="M12 2L2 20h20z"/><path d="M12 9v5"/><circle cx="12" cy="17.5" r=".7" fill="currentColor" stroke="none"/></Icon>,
  heart: (p) => <Icon {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></Icon>,
  bookmark: (p) => <Icon {...p}><path d="M6 3h12v18l-6-4-6 4z"/></Icon>,
  user: (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></Icon>,
  search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/></Icon>,
  bell: (p) => <Icon {...p}><path d="M6 16V10a6 6 0 0 1 12 0v6l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></Icon>,
  chevronLeft: (p) => <Icon {...p}><path d="M15 6l-6 6 6 6"/></Icon>,
  chevronRight: (p) => <Icon {...p}><path d="M9 6l6 6-6 6"/></Icon>,
  chevronDown: (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>,
  plus: (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  close: (p) => <Icon {...p}><path d="M6 6l12 12M18 6L6 18"/></Icon>,
  play: (p) => <Icon {...p} fill="currentColor"><path d="M7 5l12 7-12 7z" stroke="none"/></Icon>,
  pause: (p) => <Icon {...p} fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" stroke="none"/><rect x="14" y="5" width="4" height="14" rx="1" stroke="none"/></Icon>,
  location: (p) => <Icon {...p}><path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="10" r="3"/></Icon>,
  mountain: (p) => <Icon {...p}><path d="M2 20l7-12 4 7 3-5 6 10z"/></Icon>,
  tree: (p) => <Icon {...p}><path d="M12 3l5 7h-3l4 6h-4v5h-4v-5H6l4-6H7z"/></Icon>,
  leaf: (p) => <Icon {...p}><path d="M20 4c-8 0-14 4-14 12a6 6 0 0 0 12 0c0-4 2-8 2-12z"/><path d="M14 10L6 18"/></Icon>,
  car: (p) => <Icon {...p}><path d="M4 13l2-6h12l2 6v5H4z"/><circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/></Icon>,
  clock: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>,
  route: (p) => <Icon {...p}><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h7a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h7"/></Icon>,
  elevation: (p) => <Icon {...p}><path d="M3 18l5-9 4 5 3-3 6 7"/></Icon>,
  thermometer: (p) => <Icon {...p}><path d="M12 3a2 2 0 0 0-2 2v9a4 4 0 1 0 4 0V5a2 2 0 0 0-2-2z"/></Icon>,
  wind: (p) => <Icon {...p}><path d="M3 8h13a3 3 0 1 0-3-3"/><path d="M3 14h17a3 3 0 1 1-3 3"/></Icon>,
  sun: (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></Icon>,
  droplet: (p) => <Icon {...p}><path d="M12 3l6 9a6 6 0 1 1-12 0z"/></Icon>,
  share: (p) => <Icon {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></Icon>,
  comment: (p) => <Icon {...p}><path d="M4 5h16v12H9l-5 4z"/></Icon>,
  filter: (p) => <Icon {...p}><path d="M3 5h18l-7 9v6l-4-2v-4z"/></Icon>,
  settings: (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></Icon>,
  mic: (p) => <Icon {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></Icon>,
  snake: (p) => <Icon {...p}><path d="M4 6c2-2 5-2 7 0s5 2 7 0-2 6-4 7-4-2-6-1-4 4-4 2 0-6 0-8z"/><circle cx="18" cy="6" r=".7" fill="currentColor" stroke="none"/></Icon>,
  bear: (p) => <Icon {...p}><circle cx="12" cy="13" r="7"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="7" r="2"/><circle cx="10" cy="12" r=".7" fill="currentColor" stroke="none"/><circle cx="14" cy="12" r=".7" fill="currentColor" stroke="none"/><path d="M10 16c.5 1 3.5 1 4 0"/></Icon>,
  barrier: (p) => <Icon {...p}><path d="M3 8h18v6H3zM6 8v6M12 8v6M18 8v6M3 14v5M21 14v5"/></Icon>,
  flag: (p) => <Icon {...p}><path d="M5 22V3h12l-2 4 2 4H5"/></Icon>,
  target: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></Icon>,
  check: (p) => <Icon {...p}><path d="M4 12l5 5L20 6"/></Icon>,
  arrowRight: (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>,
  arrowUp: (p) => <Icon {...p}><path d="M12 19V5M6 11l6-6 6 6"/></Icon>,
  layers: (p) => <Icon {...p}><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5M3 17l9 5 9-5"/></Icon>,
  stop: (p) => <Icon {...p} fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2" stroke="none"/></Icon>,
  grid: (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></Icon>,
  list: (p) => <Icon {...p}><path d="M8 6h13M8 12h13M8 18h13M4 6h.01M4 12h.01M4 18h.01"/></Icon>,
  radar: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12L20 5"/></Icon>,
  wave: (p) => <Icon {...p}><path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/></Icon>,
};
