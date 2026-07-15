// Trail Detail + Live Hike screens
const { TOKENS: T3, PHOTOS: P3, Icons: I3 } = window;

function TrailDetail({ trail, onBack, onStart }) {
  const t = trail || { name: 'Emerald Lake Loop', park: 'Rocky Mountain NP', dist: '5.4 km', time: '1h 30m', diff: 'Easy', rating: 4.5, photo: P3.meadow, elev: '+240m' };
  return (
    <Screen bg={T3.paper}>
      {/* Hero photo */}
      <div style={{ position: 'relative', height: 420, flexShrink: 0 }}>
        <Photo src={t.photo} style={{ width: '100%', height: '100%' }}/>
        {/* long, soft fade from photo into paper so there's no hard cut */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 45%, ${T3.paper}00 55%, ${T3.paper}80 80%, ${T3.paper} 100%)`, pointerEvents: 'none' }}/>
        <div style={{ position: 'relative', zIndex: 3 }}><StatusBar color="#fff"/></div>
        <div style={{ position: 'absolute', top: 54, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', zIndex: 3 }}>
          <button onClick={onBack} style={glassBtn()}><I3.chevronLeft size={18} stroke="#fff"/></button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={glassBtn()}><I3.share size={16} stroke="#fff"/></button>
            <button style={glassBtn()}><I3.bookmark size={16} stroke="#fff"/></button>
          </div>
        </div>
        {/* Floating stat chip */}
        <div style={{
          position: 'absolute', bottom: 130, left: 16, right: 16, zIndex: 3,
          display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 10,
          textShadow: '0 2px 10px rgba(0,0,0,0.35)',
        }}>
          <div style={{ color: '#fff' }}>
            <div style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', opacity: 0.9 }}>{t.park}</div>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 34, lineHeight: '36px', marginTop: 2 }}>{t.name}</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 120px', marginTop: -40, position: 'relative', zIndex: 2 }}>
        {/* Stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          background: T3.bone, borderRadius: 20, padding: '14px 10px',
          boxShadow: T3.shadow.card, position: 'relative',
        }}>
          <StatCell label="Distance" value={t.dist}/>
          <StatCell label="Duration" value={t.time} />
          <StatCell label="Elev." value={t.elev}/>
          <StatCell label="Level" value={t.diff}/>
        </div>

        {/* Rating + reviews */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 4px 6px' }}>
          <Stars value={t.rating} size={14}/>
          <span style={{ fontFamily: 'Inter', fontSize: 13, color: T3.ink60 }}>· 1,284 reviews</span>
          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            {[P3.avatar1, P3.avatar3, P3.avatar4].map((a, i) => (
              <Photo key={i} src={a} style={{ width: 24, height: 24, borderRadius: 999, marginLeft: i ? -8 : 0, border: `2px solid ${T3.paper}` }}/>
            ))}
          </div>
        </div>

        {/* Elevation profile */}
        <div style={{ padding: '16px 0 8px' }}>
          <SectionHeader>Elevation profile</SectionHeader>
          <div style={{ background: T3.bone, borderRadius: 20, padding: 16, boxShadow: T3.shadow.card }}>
            <ElevationChart/>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: 'Inter', fontSize: 10, color: T3.ink60 }}>
              <span>Trailhead · 2,450m</span>
              <span>Peak · 2,690m</span>
              <span>End · 2,450m</span>
            </div>
          </div>
        </div>

        {/* AI alerts on this trail */}
        <SectionHeader>On this trail</SectionHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <AlertChip icon={I3.bear} color={T3.red} title="Bear sighting" meta="Reported 2h ago · 1.2 km in"/>
          <AlertChip icon={I3.droplet} color={T3.sky} title="Creek crossing" meta="Water at ~2.4 km · thigh deep"/>
          <AlertChip icon={I3.car} color={T3.moss} title="Parking" meta="8 of 24 spots open · live"/>
        </div>

        {/* Description */}
        <SectionHeader>About</SectionHeader>
        <div style={{
          fontFamily: 'Inter', fontSize: 14, lineHeight: 1.55, color: T3.ink,
          padding: '0 4px',
        }}>
          A classic Colorado loop through subalpine forest to a glacier-fed lake. Expect wildflowers mid-July through August, and golden aspens in late September. Dogs on leash. Stay on trail — delicate tundra.
        </div>
      </div>

      {/* Sticky start bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
        padding: '12px 16px 28px',
        background: 'linear-gradient(to top, rgba(251,248,241,1) 65%, rgba(251,248,241,0))',
        display: 'flex', gap: 10,
      }}>
        <button style={{
          flex: 1, height: 56, borderRadius: 18, border: 'none', cursor: 'pointer',
          background: T3.forest, color: T3.cream,
          fontFamily: 'Inter', fontSize: 15, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: T3.shadow.float,
        }} onClick={onStart}>
          <I3.play size={16}/> Start hike
        </button>
        <button onClick={onStart} style={{
          width: 56, height: 56, borderRadius: 18, border: `1px solid ${T3.ink10}`,
          background: T3.bone, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} title="Preview route">
          <I3.route size={20} stroke={T3.forest}/>
        </button>
      </div>
    </Screen>
  );
}

function StatCell({ label, value }) {
  return (
    <div style={{ textAlign: 'center', borderRight: `1px solid ${T3.ink10}`, padding: '0 2px' }}>
      <div style={{ fontFamily: 'Inter', fontSize: 10, color: T3.ink60, letterSpacing: 0.6, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
      <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: T3.forest, marginTop: 3 }}>{value}</div>
    </div>
  );
}

function SectionHeader({ children }) {
  return <div style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 700, color: T3.ink60, letterSpacing: 1, textTransform: 'uppercase', margin: '18px 4px 10px' }}>{children}</div>;
}

function AlertChip({ icon: IC, color, title, meta }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px', background: T3.bone, borderRadius: 14,
      boxShadow: T3.shadow.card, border: `1px solid ${T3.ink05}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, background: `${color}20`, color,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}><IC size={18}/></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: T3.forest }}>{title}</div>
        <div style={{ fontFamily: 'Inter', fontSize: 11, color: T3.ink60, marginTop: 1 }}>{meta}</div>
      </div>
      <I3.chevronRight size={16} stroke={T3.ink40}/>
    </div>
  );
}

function glassBtn() {
  return {
    width: 36, height: 36, borderRadius: 999, border: 'none', cursor: 'pointer',
    background: 'rgba(30, 40, 23, 0.35)',
    backdropFilter: 'blur(12px) saturate(180%)',
    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };
}

function ElevationChart() {
  // SVG area path
  const w = 320, h = 80;
  const points = [0, 20, 35, 55, 70, 65, 60, 45, 30, 35, 25, 15, 10];
  const max = 80;
  const step = w / (points.length - 1);
  const path = points.map((p, i) => `${i ? 'L' : 'M'} ${i * step} ${h - (p / max) * h}`).join(' ');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 80 }}>
      <defs>
        <linearGradient id="elev-g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={T3.moss} stopOpacity="0.5"/>
          <stop offset="100%" stopColor={T3.moss} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#elev-g)"/>
      <path d={path} fill="none" stroke={T3.moss} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
      {/* marker */}
      <circle cx={step * 4} cy={h - (70 / max) * h} r="5" fill={T3.terracotta} stroke="#fff" strokeWidth="2"/>
    </svg>
  );
}

// ──────────────────────────────────────────────────────────
// LIVE HIKE — map with route, timer, stop
// ──────────────────────────────────────────────────────────
function LiveHike({ onEnd }) {
  const [running, setRunning] = React.useState(true);
  const [seconds, setSeconds] = React.useState(43 * 60 + 12);
  const [dist, setDist] = React.useState(3.2);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds(s => s + 1);
      setDist(d => +(d + 0.0012).toFixed(2));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const fmt = (s) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <Screen bg="#000">
      {/* Realistic topo-style map: aerial mountain photo + subtle contour overlay */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Photo src={'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=900&q=85'} style={{ width: '100%', height: '100%' }}/>
        {/* Soft vignette + slight desat to give satellite/topo feel */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.35) 100%)' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.75) 100%)' }}/>
        {/* Topo-contour overlay */}
        <svg viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15, mixBlendMode: 'screen' }}>
          {[0,1,2,3,4,5,6,7].map(i => (
            <path key={i} d={`M 0 ${80 + i*70} Q 100 ${40 + i*70} 200 ${80 + i*70} T 400 ${80 + i*70}`} stroke="#fff" strokeWidth="0.8" fill="none"/>
          ))}
        </svg>
        {/* Route — soft glow under, solid ribbon on top */}
        <svg viewBox="0 0 400 700" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <filter id="glow"><feGaussianBlur stdDeviation="4"/></filter>
          </defs>
          <path d="M 80 600 Q 130 500 110 420 T 180 280 Q 240 220 220 140 T 310 60"
                stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round"
                strokeDasharray="2 10" opacity="0.5"/>
          <path d="M 80 600 Q 130 500 110 420 T 180 280"
                stroke={T3.coral} strokeWidth="8" fill="none" strokeLinecap="round"
                filter="url(#glow)" opacity="0.7"/>
          <path d="M 80 600 Q 130 500 110 420 T 180 280"
                stroke={T3.coral} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
          <circle cx="80" cy="600" r="8" fill="#fff" stroke={T3.forest} strokeWidth="3"/>
          <circle cx="180" cy="280" r="14" fill={T3.coral} stroke="#fff" strokeWidth="3.5"/>
          <circle cx="180" cy="280" r="26" fill={T3.coral} opacity="0.22"/>
          <circle cx="310" cy="60" r="10" fill={T3.amber} stroke="#fff" strokeWidth="3"/>
          <text x="322" y="64" fill="#fff" fontFamily="Inter" fontSize="11" fontWeight="700">Summit</text>
        </svg>
      </div>

      <StatusBar color="#fff"/>
      <div style={{ position: 'relative', padding: '8px 16px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onEnd} style={glassBtn()}><I3.chevronLeft size={18} stroke="#fff"/></button>
        <GlassPill>
          <div style={{ width: 6, height: 6, borderRadius: 999, background: T3.coral, boxShadow: `0 0 8px ${T3.coral}` }}/>
          <I3.sun size={13} stroke="#fff"/>
          <span style={{ color: '#fff', fontFamily: 'Inter', fontSize: 12, fontWeight: 600 }}>12°C · Clear · 8mph NW</span>
        </GlassPill>
        <button style={glassBtn()}><I3.layers size={16} stroke="#fff"/></button>
      </div>

      <div style={{ flex: 1 }}/>

      {/* Bottom live sheet */}
      <div style={{
        position: 'relative', zIndex: 2, margin: '0 12px 32px',
        background: 'rgba(30, 40, 23, 0.7)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '0.5px solid rgba(255,255,255,0.15)',
        borderRadius: 26, padding: '18px 20px',
        color: '#fff',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.7 }}>Emerald Lake Loop</div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, opacity: 0.7 }}>2.2 km remaining</div>
        </div>
        {/* Big metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
          <Metric value={fmt(seconds)} label="Time" big/>
          <Metric value={dist.toFixed(2)} label="km"/>
          <Metric value="+180m" label="Elev"/>
        </div>
        {/* Progress */}
        <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)', overflow: 'hidden', marginBottom: 14 }}>
          <div style={{ width: '62%', height: '100%', background: T3.coral, borderRadius: 2 }}/>
        </div>
        {/* Controls */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
          <button style={ctrlBtn()}><I3.alert size={18} stroke="#fff"/></button>
          <button onClick={() => setRunning(r => !r)} style={{
            ...ctrlBtn(true), background: T3.coral, width: 68, height: 68,
          }}>
            {running ? <I3.pause size={26}/> : <I3.play size={26}/>}
          </button>
          <button onClick={onEnd} style={ctrlBtn()}><I3.stop size={18} stroke="#fff"/></button>
        </div>
      </div>
    </Screen>
  );
}

function Metric({ value, label, big = false }) {
  return (
    <div>
      <div style={{
        fontFamily: big ? '"Instrument Serif", serif' : 'Inter',
        fontSize: big ? 30 : 22, fontWeight: big ? 400 : 700, lineHeight: '30px',
        color: '#fff', letterSpacing: big ? -0.3 : -0.2,
      }}>{value}</div>
      <div style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 500, opacity: 0.65, letterSpacing: 0.6, textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function ctrlBtn(primary = false) {
  return {
    width: 48, height: 48, borderRadius: 999, border: 'none', cursor: 'pointer',
    background: primary ? T3.coral : 'rgba(255,255,255,0.15)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backdropFilter: 'blur(10px)',
    boxShadow: primary ? T3.shadow.float : 'none',
  };
}

function ConditionPill({ icon: IC, label }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '7px 11px', borderRadius: 999,
      background: 'rgba(30,40,23,0.45)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      border: '0.5px solid rgba(255,255,255,0.15)',
      color: '#fff', fontFamily: 'Inter', fontSize: 11, fontWeight: 600,
    }}>
      <IC size={13} stroke="#fff"/>{label}
    </div>
  );
}

Object.assign(window, { TrailDetail, LiveHike, StatCell, SectionHeader, AlertChip, glassBtn, Metric, ElevationChart, ConditionPill, ctrlBtn });
