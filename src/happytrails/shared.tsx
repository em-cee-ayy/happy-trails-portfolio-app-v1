// Shared phone UI — status bar, tab bar, common card bits.
// Ported from the handoff `shared.jsx`; TabBar is wired to react-router.
import type { CSSProperties, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { T } from './tokens';
import { Icons, type IconComponent } from './icons';

// Slim status bar rendered inside a screen so it can tint over paper or photography.
export function StatusBar({ color = '#000', time = '9:41' }: { color?: string; time?: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '16px 28px 4px', height: 44, boxSizing: 'border-box',
      color, position: 'relative', zIndex: 30, flexShrink: 0,
      fontFamily: '-apple-system, "SF Pro", system-ui',
    }}>
      <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: 0.2 }}>{time}</div>
      <div style={{ width: 120 }}/>{/* island gap */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><path d="M1 8v2M5 6v4M9 4v6M13 2v8" stroke={color} strokeWidth="1.7" strokeLinecap="round"/></svg>
        <svg width="16" height="11" viewBox="0 0 16 11"><path d="M8 2a9 9 0 0 1 6 2.5M8 5a6 6 0 0 1 4 1.5M8 8a3 3 0 0 1 1.5 .5" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round"/><circle cx="8" cy="10" r="1" fill={color}/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke={color} strokeOpacity=".5" fill="none"/><rect x="2" y="2" width="17" height="8" rx="1.5" fill={color}/><rect x="23" y="4" width="1.5" height="4" rx="0.5" fill={color} opacity=".5"/></svg>
      </div>
    </div>
  );
}

const TAB_ROUTE: Record<string, string> = {
  home: '/ht/home',
  alerts: '/ht/alerts',
  social: '/ht/social',
  profile: '/ht/profile',
};

// Bottom tab bar — 5 slots (Trails / Alerts / center Scan FAB / Feed / Profile).
export function TabBar({ active = 'home', onScan }: { active?: string; onScan?: () => void }) {
  const navigate = useNavigate();
  const tabs: { id: string; icon: IconComponent; label: string | null }[] = [
    { id: 'home', icon: Icons.home, label: 'Trails' },
    { id: 'alerts', icon: Icons.alert, label: 'Alerts' },
    { id: 'scan', icon: Icons.camera, label: null }, // center FAB
    { id: 'social', icon: Icons.heart, label: 'Feed' },
    { id: 'profile', icon: Icons.user, label: 'Profile' },
  ];
  const handle = (id: string) => {
    if (id === 'scan') { onScan?.(); return; }
    navigate(TAB_ROUTE[id]);
  };
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
      paddingBottom: 24, paddingTop: 10,
      background: 'linear-gradient(to top, rgba(244,239,224,0.98) 60%, rgba(244,239,224,0))',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        const IC = t.icon;
        if (t.id === 'scan') {
          return (
            <button key={t.id} onClick={() => handle(t.id)} style={{
              border: 'none', background: T.forest, color: T.cream,
              width: 54, height: 54, borderRadius: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: T.shadow.float, marginTop: -14, cursor: 'pointer',
            }}>
              <IC size={24} sw={1.8}/>
            </button>
          );
        }
        return (
          <button key={t.id} onClick={() => handle(t.id)} style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            color: isActive ? T.forest : T.ink40, padding: '4px 10px',
          }}>
            <IC size={22} sw={isActive ? 2 : 1.75}/>
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 500, letterSpacing: 0.2 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Pill chip
export function Chip({ icon: IC, children, active = false, onClick, dark = false, style = {} }: {
  icon?: IconComponent;
  children?: ReactNode;
  active?: boolean;
  onClick?: () => void;
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '8px 14px', borderRadius: 999,
      border: 'none', cursor: 'pointer',
      background: active ? T.forest : (dark ? 'rgba(255,255,255,0.2)' : T.bone),
      color: active ? T.cream : (dark ? '#fff' : T.forest),
      fontFamily: 'Inter, system-ui', fontSize: 13, fontWeight: 500,
      boxShadow: dark ? 'none' : (active ? T.shadow.pill : '0 1px 3px rgba(0,0,0,0.06)'),
      backdropFilter: dark ? 'blur(10px)' : 'none',
      whiteSpace: 'nowrap', flexShrink: 0,
      ...style,
    }}>
      {IC && <IC size={14} sw={2}/>}
      <span>{children}</span>
    </button>
  );
}

// Photo placeholder with graceful gradient fallback
export function Photo({ src, style = {}, children }: { src: string; alt?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${T.leaf}, ${T.forest}) center/cover`,
      backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center',
      ...style,
    }}>{children}</div>
  );
}

// Star rating
export function Stars({ value = 4.5, size = 12, color = T.amber }: { value?: number; size?: number; color?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color }}>
      <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor"><path d="M10 1l2.5 6 6.5.5-5 4.5 1.5 6.5L10 15l-5.5 3.5L6 12 1 7.5l6.5-.5z"/></svg>
      <span style={{ fontWeight: 600, fontSize: size + 1, color: T.forest, fontFamily: 'Inter' }}>{value}</span>
    </span>
  );
}

// Screen frame — fills the device viewport
export function Screen({ children, bg = T.shell, style = {} }: { children?: ReactNode; bg?: string; style?: CSSProperties }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: bg, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      ...style,
    }}>
      {children}
    </div>
  );
}

// Frosted-glass pill (over photography)
export function GlassPill({ children, circle = false, small = false }: { children?: ReactNode; circle?: boolean; small?: boolean }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: circle ? 36 : (small ? 28 : 36), minWidth: circle ? 36 : 'auto',
      padding: circle ? 0 : '0 12px',
      borderRadius: 999,
      background: 'rgba(30, 40, 23, 0.35)',
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      border: '0.5px solid rgba(255,255,255,0.2)',
      justifyContent: 'center',
    }}>{children}</div>
  );
}

// ── Shared button style helpers ──────────────────────────────
export function btnCircle(): CSSProperties {
  return {
    width: 40, height: 40, borderRadius: 999,
    background: T.bone, border: 'none', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
    position: 'relative',
  };
}

export function glassBtn(): CSSProperties {
  return {
    width: 36, height: 36, borderRadius: 999, border: 'none', cursor: 'pointer',
    background: 'rgba(30, 40, 23, 0.35)',
    backdropFilter: 'blur(12px) saturate(180%)',
    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };
}

export function primaryBtn(): CSSProperties {
  return {
    flex: 1, height: 44, borderRadius: 12, border: 'none', cursor: 'pointer',
    background: T.forest, color: T.cream,
    fontFamily: 'Inter', fontSize: 13, fontWeight: 700,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  };
}

export function secondaryBtn(): CSSProperties {
  return {
    width: 44, height: 44, borderRadius: 12, border: `1px solid ${T.ink10}`,
    background: T.bone, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  };
}
