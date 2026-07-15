// Main app — routes between screens, holds global state, Tweaks
const { TOKENS: T6, PHOTOS: P6, Icons: I6 } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "homeVariant": "A",
  "accent": "terracotta",
  "headline": "serif",
  "darkMode": false
}/*EDITMODE-END*/;

function App() {
  // persistent route
  const [route, setRoute] = React.useState(() => localStorage.getItem('ht_route') || 'home');
  const [trail, setTrail] = React.useState(null);
  const [dropPin, setDropPin] = React.useState(false);
  const [scanOpen, setScanOpen] = React.useState(false);
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [tweakOpen, setTweakOpen] = React.useState(false);

  React.useEffect(() => { localStorage.setItem('ht_route', route); }, [route]);

  // Edit mode (Tweaks toggle)
  React.useEffect(() => {
    const onMsg = (e) => {
      if (e?.data?.type === '__activate_edit_mode') setTweakOpen(true);
      if (e?.data?.type === '__deactivate_edit_mode') setTweakOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const setTweak = (k, v) => {
    setTweaks(t => {
      const next = { ...t, [k]: v };
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
      return next;
    });
  };

  const handleTab = (id) => {
    if (id === 'scan') { setScanOpen(true); return; }
    setRoute(id);
  };

  // Route the screens
  let content;
  switch (route) {
    case 'onboarding':
      content = <Onboarding onFinish={() => setRoute('home')}/>; break;
    case 'trail':
      content = <TrailDetail trail={trail} onBack={() => setRoute('home')} onStart={() => setRoute('live')}/>; break;
    case 'live':
      content = <LiveHike onEnd={() => setRoute('home')}/>; break;
    case 'alerts':
      content = <CommunityAlerts activeTab="alerts" onTab={handleTab} onDropPin={() => setDropPin(true)}/>; break;
    case 'bird':
      content = <BirdID onBack={() => setRoute('home')}/>; break;
    case 'plant':
      content = <PlantID onBack={() => setRoute('home')}/>; break;
    case 'parking':
      content = <ParkingScreen onBack={() => setRoute('home')}/>; break;
    case 'social':
      content = <Social activeTab="social" onTab={handleTab}/>; break;
    case 'profile':
      content = <Profile activeTab="profile" onTab={handleTab}/>; break;
    case 'home':
    default: {
      const commonProps = {
        onOpenTrail: (t) => { setTrail(t); setRoute('trail'); },
        onTab: handleTab,
        activeTab: 'home',
      };
      content = tweaks.homeVariant === 'B' ? <HomeB {...commonProps}/>
              : tweaks.homeVariant === 'C' ? <HomeC {...commonProps}/>
              : <HomeA {...commonProps}/>;
    }
  }

  return (
    <div style={{
      minHeight: '100vh', width: '100vw',
      background: `radial-gradient(ellipse at top, #E8DFC9 0%, #D9C7A8 40%, #B8A080 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 40, boxSizing: 'border-box',
      fontFamily: 'Inter, system-ui',
    }}>
      <IOSDevice width={402} height={874}>
        <div style={{ height: '100%', position: 'relative' }}>
          {content}
          {scanOpen && <ScanPicker onClose={() => setScanOpen(false)} onPick={(t) => { setScanOpen(false); setRoute(t); }}/>}
          {dropPin && <DropPinSheet onClose={() => setDropPin(false)} onConfirm={() => setDropPin(false)}/>}
        </div>
      </IOSDevice>

      {/* Navigator — small dev map, always visible outside frame */}
      <Navigator route={route} setRoute={setRoute}/>

      {tweakOpen && <TweaksPanel tweaks={tweaks} setTweak={setTweak} onClose={() => setTweakOpen(false)}/>}
    </div>
  );
}

// Quick scan type picker (when user taps center FAB)
function ScanPicker({ onClose, onPick }) {
  const opts = [
    { id: 'bird', label: 'Listen', sub: 'Bird ID', icon: I6.ear, c: T6.sky },
    { id: 'plant', label: 'Capture', sub: 'Plant ID', icon: I6.leaf, c: T6.moss },
    { id: 'alerts', label: 'Alert', sub: 'Drop pin', icon: I6.alert, c: T6.terracotta },
    { id: 'parking', label: 'Parking', sub: 'Live pings', icon: I6.car, c: T6.amber },
  ];
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 90,
      background: 'rgba(30,40,23,0.5)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      paddingBottom: 90,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: T6.paper, borderRadius: 28, padding: 18,
        width: 'calc(100% - 32px)', boxShadow: T6.shadow.float,
        animation: 'pop .25s cubic-bezier(.2,1.4,.4,1)',
      }}>
        <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22, color: T6.forest, padding: '2px 4px 14px' }}>
          What's around you?
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {opts.map(o => (
            <button key={o.id} onClick={() => onPick(o.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 14, border: 'none', cursor: 'pointer',
              background: T6.bone, borderRadius: 16, textAlign: 'left',
              boxShadow: T6.shadow.card,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: `${o.c}22`, color: o.c,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><o.icon size={20}/></div>
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 700, color: T6.forest }}>{o.label}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 11, color: T6.ink60 }}>{o.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <style>{`@keyframes pop { from { transform: translateY(30px) scale(.96); opacity: 0 } to { transform: translateY(0) scale(1); opacity: 1 } }`}</style>
    </div>
  );
}

// Navigator — always visible (outside phone) for quick screen switching
function Navigator({ route, setRoute }) {
  const [open, setOpen] = React.useState(false);
  const screens = [
    { id: 'onboarding', label: 'Onboarding', group: 'Flow' },
    { id: 'home', label: 'Home', group: 'Main' },
    { id: 'trail', label: 'Trail Detail', group: 'Main' },
    { id: 'live', label: 'Live Hike', group: 'Main' },
    { id: 'alerts', label: 'Community Alerts ★', group: 'AI' },
    { id: 'bird', label: 'Bird ID', group: 'AI' },
    { id: 'plant', label: 'Plant ID', group: 'AI' },
    { id: 'parking', label: 'Live Parking', group: 'AI' },
    { id: 'social', label: 'Social Feed', group: 'Main' },
    { id: 'profile', label: 'Profile', group: 'Main' },
  ];
  const groups = [...new Set(screens.map(s => s.group))];

  return (
    <>
      <button onClick={() => setOpen(o => !o)} style={{
        position: 'fixed', left: 16, top: 16, zIndex: 200,
        padding: '8px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
        background: T6.forest, color: T6.cream,
        fontFamily: 'Inter', fontSize: 12, fontWeight: 600,
        boxShadow: T6.shadow.float, display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <I6.grid size={13} sw={2.2}/> Screens
      </button>
      {open && (
        <div style={{
          position: 'fixed', left: 16, top: 56, zIndex: 200,
          background: T6.paper, borderRadius: 16, padding: 12,
          boxShadow: T6.shadow.float, width: 220,
          maxHeight: 'calc(100vh - 80px)', overflowY: 'auto',
        }}>
          {groups.map(g => (
            <div key={g} style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 700, color: T6.ink60, letterSpacing: 1, textTransform: 'uppercase', padding: '2px 8px 6px' }}>{g}</div>
              {screens.filter(s => s.group === g).map(s => (
                <button key={s.id} onClick={() => setRoute(s.id)} style={{
                  width: '100%', textAlign: 'left',
                  padding: '8px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: route === s.id ? T6.forest : 'transparent',
                  color: route === s.id ? T6.cream : T6.forest,
                  fontFamily: 'Inter', fontSize: 12, fontWeight: 500,
                }}>{s.label}</button>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// Tweaks panel
function TweaksPanel({ tweaks, setTweak, onClose }) {
  return (
    <div style={{
      position: 'fixed', right: 16, bottom: 16, zIndex: 300,
      width: 280, background: T6.paper, borderRadius: 20,
      boxShadow: T6.shadow.float, padding: 18,
      fontFamily: 'Inter', color: T6.forest,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22 }}>Tweaks</div>
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: T6.ink60 }}>
          <I6.close size={18} stroke={T6.ink60}/>
        </button>
      </div>

      <Label>Home layout</Label>
      <SegmentedControl
        value={tweaks.homeVariant}
        options={[{ v: 'A', l: 'Editorial' }, { v: 'B', l: 'Map-first' }, { v: 'C', l: 'Gallery' }]}
        onChange={(v) => setTweak('homeVariant', v)}
      />

      <Label>Accent color</Label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {[
          { v: 'terracotta', c: T6.terracotta },
          { v: 'coral', c: T6.coral },
          { v: 'amber', c: T6.amber },
          { v: 'moss', c: T6.moss },
        ].map(x => (
          <button key={x.v} onClick={() => setTweak('accent', x.v)} style={{
            width: 36, height: 36, borderRadius: 999, border: tweaks.accent === x.v ? `2px solid ${T6.forest}` : '2px solid transparent',
            background: x.c, cursor: 'pointer', padding: 0,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}/>
        ))}
      </div>

      <Label>Headline font</Label>
      <SegmentedControl
        value={tweaks.headline}
        options={[{ v: 'serif', l: 'Serif' }, { v: 'sans', l: 'Sans' }]}
        onChange={(v) => setTweak('headline', v)}
      />
      <div style={{ fontFamily: 'Inter', fontSize: 10, color: T6.ink60, marginTop: 4 }}>
        Toggle between Instrument Serif and clean sans for display text.
      </div>
    </div>
  );
}

function Label({ children }) {
  return <div style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 700, color: T6.ink60, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, marginTop: 6 }}>{children}</div>;
}

function SegmentedControl({ value, options, onChange }) {
  return (
    <div style={{ display: 'flex', background: T6.ink05, borderRadius: 10, padding: 3, marginBottom: 10 }}>
      {options.map(o => (
        <button key={o.v} onClick={() => onChange(o.v)} style={{
          flex: 1, padding: '7px 4px', border: 'none', cursor: 'pointer',
          background: value === o.v ? T6.bone : 'transparent',
          color: value === o.v ? T6.forest : T6.ink60,
          fontFamily: 'Inter', fontSize: 11, fontWeight: 600,
          borderRadius: 8,
          boxShadow: value === o.v ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
        }}>{o.l}</button>
      ))}
    </div>
  );
}

// Apply headline font tweak globally via CSS var override
function ApplyTweaks({ tweaks }) {
  React.useEffect(() => {
    const style = document.getElementById('tweak-css') || (() => {
      const s = document.createElement('style'); s.id = 'tweak-css'; document.head.appendChild(s); return s;
    })();

    const accentMap = {
      terracotta: T6.terracotta,
      coral: T6.coral,
      amber: T6.amber,
      moss: T6.moss,
    };
    const accent = accentMap[tweaks.accent] || T6.terracotta;

    style.textContent = `
      em { color: ${accent} !important; font-style: italic; }
      ${tweaks.headline === 'sans' ? `
        *[style*="Instrument Serif"] {
          font-family: Inter, system-ui !important;
          font-style: normal !important;
          font-weight: 800 !important;
          letter-spacing: -0.5px !important;
        }
      ` : ''}
    `;
  }, [tweaks]);
  return null;
}

// Wrap App in tweak applier
function RootApp() {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  React.useEffect(() => {
    const onMsg = (e) => {
      if (e?.data?.type === '__edit_mode_set_keys' && e.data.edits) {
        setTweaks(t => ({ ...t, ...e.data.edits }));
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);
  // Hack: poll inner App's setTweak via custom event (simpler: just re-apply current localStorage)
  return <><ApplyTweaks tweaks={tweaks}/><App/></>;
}

Object.assign(window, { App, RootApp, ScanPicker, Navigator, TweaksPanel, ApplyTweaks });
