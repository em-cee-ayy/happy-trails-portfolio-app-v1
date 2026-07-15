// Shared phone UI — status bar (in-screen), tab bar, common card bits
const { TOKENS: T, PHOTOS: P, Icons: I } = window;

// Slim status bar that SITS INSIDE a screen (since our frame's bar may be absolute).
// We render our own so it can tint on photo backgrounds.
function StatusBar({ color = '#000', time = '9:41' }) {
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

// Tab bar — sits at bottom of each main screen
function TabBar({ active = 'home', onTab }) {
  const tabs = [
    { id: 'home', icon: I.home, label: 'Trails' },
    { id: 'alerts', icon: I.alert, label: 'Alerts' },
    { id: 'scan', icon: I.camera, label: null }, // center FAB
    { id: 'social', icon: I.heart, label: 'Feed' },
    { id: 'profile', icon: I.user, label: 'Profile' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
      paddingBottom: 24, paddingTop: 10,
      background: 'linear-gradient(to top, rgba(244,239,224,0.98) 60%, rgba(244,239,224,0))',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        if (t.id === 'scan') {
          return (
            <button key={t.id} onClick={() => onTab?.(t.id)} style={{
              border: 'none', background: T.forest, color: T.cream,
              width: 54, height: 54, borderRadius: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: T.shadow.float, marginTop: -14, cursor: 'pointer',
            }}>
              <t.icon size={24} sw={1.8}/>
            </button>
          );
        }
        return (
          <button key={t.id} onClick={() => onTab?.(t.id)} style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            color: isActive ? T.forest : T.ink40, padding: '4px 10px',
          }}>
            <t.icon size={22} sw={isActive ? 2 : 1.75}/>
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 500, letterSpacing: 0.2 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Pill chip
function Chip({ icon: IC, children, active = false, onClick, dark = false, style = {} }) {
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

// Photo placeholder with graceful fallback
function Photo({ src, alt = '', style = {}, children }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${T.leaf}, ${T.forest}) center/cover`,
      backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center',
      ...style,
    }}>{children}</div>
  );
}

// Star rating (outdoor / trail)
function Stars({ value = 4.5, size = 12, color = T.amber }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color }}>
      <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor"><path d="M10 1l2.5 6 6.5.5-5 4.5 1.5 6.5L10 15l-5.5 3.5L6 12 1 7.5l6.5-.5z"/></svg>
      <span style={{ fontWeight: 600, fontSize: size + 1, color: T.forest, fontFamily: 'Inter' }}>{value}</span>
    </span>
  );
}

// Screen frame — fills iOS device
function Screen({ children, bg = T.shell, style = {} }) {
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

Object.assign(window, { StatusBar, TabBar, Chip, Photo, Stars, Screen });
