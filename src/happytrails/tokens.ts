// Design tokens — Happy Trails AI (ported verbatim from the Claude-design handoff).
// This sub-app is a faithful, self-contained recreation of the handoff prototype,
// so it carries its own palette/type/spacing tokens rather than the suite's ART theme.
export const T = {
  // Palette
  ink: '#1E2817',         // near-black forest
  forest: '#2D3A1F',      // deep forest
  moss: '#4A6B42',        // main brand green
  leaf: '#6B8E4E',        // softer moss
  sage: '#A9B89A',        // muted sage
  cream: '#F4EFE0',       // warm paper
  paper: '#FBF8F1',       // lighter paper
  shell: '#EFEAD8',       // base background
  bone: '#FFFFFF',
  terracotta: '#D97757',
  coral: '#E8A87C',
  amber: '#E8B04A',
  red: '#C84A3C',
  sky: '#8AAED2',
  ink60: 'rgba(30,40,23,0.6)',
  ink40: 'rgba(30,40,23,0.4)',
  ink20: 'rgba(30,40,23,0.2)',
  ink10: 'rgba(30,40,23,0.1)',
  ink05: 'rgba(30,40,23,0.05)',

  // Radii
  r: { xs: 8, sm: 12, md: 16, lg: 20, xl: 28, pill: 9999 },

  // Shadows
  shadow: {
    card: '0 1px 2px rgba(0,0,0,0.04), 0 8px 20px rgba(30,40,23,0.06)',
    float: '0 4px 12px rgba(0,0,0,0.08), 0 18px 40px rgba(30,40,23,0.12)',
    pill: '0 1px 2px rgba(0,0,0,0.06), 0 6px 16px rgba(30,40,23,0.08)',
  },
} as const;

export const SERIF = '"Instrument Serif", Georgia, serif';

// Unsplash photos — curated nature, Colorado Rockies / forests.
// Prototype imagery only (per the handoff README, licensed assets replace these in production).
export const P = {
  // trail heroes
  meadow: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  alpineLake: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  aspens: 'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=800&q=80',
  rockies: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80',
  pineForest: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
  summit: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80',
  river: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
  hikerTrail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
  wildflowers: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&q=80',
  creek: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  canyon: 'https://images.unsplash.com/photo-1580133748298-7bbb31b1e950?w=800&q=80',
  // profile avatars
  avatar1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  avatar2: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80',
  avatar3: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80',
  avatar4: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  avatar5: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&q=80',
  // nature ID specimens
  bird: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80',
  flower: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&q=80',
  // social
  social1: 'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=600&q=80',
  social2: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=600&q=80',
  social3: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
} as const;
