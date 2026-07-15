// Home screens — three layout variants
const { TOKENS: T2, PHOTOS: P2, Icons: I2 } = window;

// ──────────────────────────────────────────────────────────
// VARIANT A — Editorial (big hero, generous whitespace)
// ──────────────────────────────────────────────────────────
function HomeA({ onOpenTrail, onTab, activeTab = 'home' }) {
  const [filter, setFilter] = React.useState('Nearby');
  const filters = [
    { label: 'Nearby', icon: I2.location },
    { label: 'Mountain', icon: I2.mountain },
    { label: 'Forest', icon: I2.tree },
    { label: 'Water', icon: I2.droplet },
    { label: 'Easy', icon: I2.leaf },
  ];
  const trails = [
    { id: 't1', name: 'Emerald Lake Loop', park: 'Rocky Mountain NP', dist: '5.4 km', time: '1h 30m', diff: 'Easy', rating: 4.5, photo: P2.meadow, elev: '+240m' },
    { id: 't2', name: 'Sky Pond Trail', park: 'Rocky Mountain NP', dist: '14.6 km', time: '6h 10m', diff: 'Hard', rating: 4.8, photo: P2.alpineLake, elev: '+520m' },
    { id: 't3', name: 'Aspen Grove Path', park: 'Maroon Bells', dist: '3.2 km', time: '55m', diff: 'Easy', rating: 4.3, photo: P2.aspens, elev: '+90m' },
  ];

  return (
    <Screen bg={T2.shell}>
      <StatusBar color={T2.forest}/>
      <div style={{ padding: '8px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Photo src={P2.avatar2} style={{ width: 40, height: 40, borderRadius: 999 }}/>
          <div>
            <div style={{ fontSize: 12, color: T2.ink60, fontFamily: 'Inter', fontWeight: 500 }}>Good morning</div>
            <div style={{ fontSize: 15, color: T2.forest, fontFamily: 'Inter', fontWeight: 700 }}>Sindy</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={btnCircle()}><I2.search size={18} stroke={T2.forest}/></button>
          <button style={btnCircle()}>
            <I2.bell size={18} stroke={T2.forest}/>
            <span style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 999, background: T2.terracotta, border: `2px solid ${T2.shell}` }}/>
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>
        {/* editorial headline */}
        <div style={{ padding: '4px 22px 18px' }}>
          <div style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 44, lineHeight: '44px', color: T2.forest,
            letterSpacing: -0.5, fontWeight: 400,
          }}>
            Find new paths<br/><em style={{ fontStyle: 'italic', color: T2.moss }}>around you</em>.
          </div>
        </div>

        {/* filter chips — horizontal scroll */}
        <div style={{ display: 'flex', gap: 8, padding: '0 20px 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <Chip key={f.label} icon={f.icon} active={filter === f.label} onClick={() => setFilter(f.label)}>
              {f.label}
            </Chip>
          ))}
        </div>

        {/* swipeable trail cards */}
        <SwipeCards trails={trails} onOpen={onOpenTrail}/>

        {/* secondary — list of smaller */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 26, color: T2.forest }}>Trending nearby</div>
            <button style={{ border: 'none', background: 'none', color: T2.moss, fontSize: 13, fontWeight: 600, fontFamily: 'Inter' }}>See all</button>
          </div>
          {[
            { n: 'Bear Lake Loop', km: '1.1 km · Easy', r: 4.7, p: P2.rockies },
            { n: 'Dream Lake', km: '3.4 km · Moderate', r: 4.6, p: P2.river },
            { n: 'Wild Basin Trail', km: '8.8 km · Hard', r: 4.4, p: P2.pineForest },
          ].map((x, i) => (
            <div key={i} style={{
              display: 'flex', gap: 14, padding: '12px 0',
              borderBottom: i < 2 ? `1px solid ${T2.ink10}` : 'none',
            }}>
              <Photo src={x.p} style={{ width: 64, height: 64, borderRadius: 14, flexShrink: 0 }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 15, color: T2.forest }}>{x.n}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 12, color: T2.ink60, marginTop: 2 }}>{x.km}</div>
                <div style={{ marginTop: 4 }}><Stars value={x.r} size={11}/></div>
              </div>
              <I2.chevronRight size={18} stroke={T2.ink40} style={{ alignSelf: 'center' }}/>
            </div>
          ))}
        </div>
      </div>

      <TabBar active={activeTab} onTab={onTab}/>
    </Screen>
  );
}

// ──────────────────────────────────────────────────────────
// VARIANT B — Map-first (Komoot-style, live conditions)
// ──────────────────────────────────────────────────────────
function HomeB({ onOpenTrail, onTab, activeTab = 'home' }) {
  return (
    <Screen bg={T2.shell}>
      <StatusBar color="#fff"/>
      {/* Map photo background */}
      <div style={{ position: 'absolute', inset: 0, height: '56%' }}>
        <Photo src={P2.summit} style={{ width: '100%', height: '100%' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(30,40,23,0.3), rgba(30,40,23,0) 40%, rgba(244,239,224,0.9) 95%, #F4EFE0)' }}/>
        {/* map pins */}
        <MapPin top="32%" left="28%" color={T2.terracotta} label="Trailhead"/>
        <MapPin top="44%" left="60%" color={T2.moss} label="You"/>
        <MapPin top="22%" left="72%" color={T2.amber}/>
      </div>

      <div style={{ position: 'relative', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <GlassPill>
          <I2.location size={14} stroke="#fff"/>
          <span style={{ color: '#fff', fontFamily: 'Inter', fontSize: 12, fontWeight: 600 }}>Estes Park, CO</span>
          <I2.chevronDown size={12} stroke="#fff"/>
        </GlassPill>
        <div style={{ display: 'flex', gap: 8 }}>
          <GlassPill circle><I2.layers size={16} stroke="#fff"/></GlassPill>
          <GlassPill circle><I2.target size={16} stroke="#fff"/></GlassPill>
        </div>
      </div>

      <div style={{ flex: 1 }}/>

      {/* Bottom sheet */}
      <div style={{
        position: 'relative', zIndex: 2,
        background: T2.paper, borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: '14px 0 120px', boxShadow: '0 -8px 24px rgba(0,0,0,0.08)',
      }}>
        <div style={{ width: 38, height: 4, background: T2.ink20, borderRadius: 2, margin: '0 auto 14px' }}/>
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 28, color: T2.forest, lineHeight: '30px' }}>
              3 trails <em style={{ color: T2.moss }}>near you</em>
            </div>
            <Chip icon={I2.filter}>Filter</Chip>
          </div>
          {/* Live conditions row */}
          <div style={{
            display: 'flex', gap: 10, padding: '12px 14px', marginBottom: 14,
            background: T2.shell, borderRadius: 16, alignItems: 'center',
          }}>
            <Stat icon={I2.sun} value="64°" label="Clear"/>
            <Divider/>
            <Stat icon={I2.wind} value="8mph" label="NW"/>
            <Divider/>
            <Stat icon={I2.car} value="12/24" label="Parking"/>
          </div>
          {[
            { n: 'Emerald Lake Loop', d: '5.4 km · 1h 30m', r: 4.5, p: P2.meadow, tag: '8 spots' },
            { n: 'Sky Pond Trail', d: '14.6 km · 6h 10m', r: 4.8, p: P2.alpineLake, tag: '3 spots' },
          ].map((x, i) => (
            <div key={i} onClick={() => onOpenTrail?.(x)} style={{
              display: 'flex', gap: 12, marginBottom: 10, padding: 10,
              background: T2.bone, borderRadius: 18, boxShadow: T2.shadow.card, cursor: 'pointer',
            }}>
              <Photo src={x.p} style={{ width: 72, height: 72, borderRadius: 12, flexShrink: 0 }}/>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: T2.forest }}>{x.n}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 12, color: T2.ink60, margin: '2px 0 4px' }}>{x.d}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Stars value={x.r} size={11}/>
                  <span style={{
                    fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: T2.moss,
                    background: `${T2.moss}1a`, padding: '2px 7px', borderRadius: 6,
                  }}>{x.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active={activeTab} onTab={onTab}/>
    </Screen>
  );
}

// ──────────────────────────────────────────────────────────
// VARIANT C — Gallery (immersive, magazine-style grid)
// ──────────────────────────────────────────────────────────
function HomeC({ onOpenTrail, onTab, activeTab = 'home' }) {
  return (
    <Screen bg={T2.cream}>
      <StatusBar color={T2.forest}/>
      <div style={{ padding: '24px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 34, color: T2.forest, lineHeight: '36px' }}>happy trails</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={btnCircle()}><I2.search size={18} stroke={T2.forest}/></button>
          <Photo src={P2.avatar2} style={{ width: 36, height: 36, borderRadius: 999 }}/>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>
        {/* Full-bleed hero */}
        <div style={{ padding: '4px 20px 14px' }}>
          <div onClick={() => onOpenTrail?.({ n: 'Emerald Lake Loop' })} style={{
            position: 'relative', height: 380, borderRadius: 24, overflow: 'hidden',
            boxShadow: T2.shadow.float, cursor: 'pointer',
          }}>
            <Photo src={P2.meadow} style={{ width: '100%', height: '100%' }}/>
            {/* top-left tag */}
            <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
              <GlassPill small>
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: 'Inter', letterSpacing: 0.8, textTransform: 'uppercase' }}>Editor's pick</span>
              </GlassPill>
            </div>
            {/* bottom gradient + info */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,40,23,0.85) 0%, rgba(0,0,0,0) 50%)' }}/>
            <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18, color: '#fff' }}>
              <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 32, lineHeight: '34px', marginBottom: 6 }}>
                Emerald Lake <em>Loop</em>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: 12, opacity: 0.9, display: 'flex', gap: 10, alignItems: 'center' }}>
                <span>Rocky Mountain NP</span>
                <span style={{ width: 3, height: 3, borderRadius: 999, background: '#fff', opacity: 0.6 }}/>
                <span>5.4 km</span>
                <span style={{ width: 3, height: 3, borderRadius: 999, background: '#fff', opacity: 0.6 }}/>
                <span>Easy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section — 2-col grid */}
        <div style={{ padding: '8px 20px 0' }}>
          <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 24, color: T2.forest, marginBottom: 10 }}>
            Curated for <em style={{ color: T2.moss }}>autumn</em>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { n: 'Aspen Grove', p: P2.aspens, h: 180 },
              { n: 'Sky Pond', p: P2.alpineLake, h: 220 },
              { n: 'Pine Creek', p: P2.creek, h: 220 },
              { n: 'Canyon Rim', p: P2.canyon, h: 180 },
            ].map((x, i) => (
              <div key={i} style={{
                position: 'relative', height: x.h, borderRadius: 16, overflow: 'hidden',
                boxShadow: T2.shadow.card, cursor: 'pointer',
              }}>
                <Photo src={x.p} style={{ width: '100%', height: '100%' }}/>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 50%)' }}/>
                <div style={{ position: 'absolute', bottom: 10, left: 12, color: '#fff', fontFamily: 'Inter', fontSize: 13, fontWeight: 600 }}>{x.n}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 20 }}/>
      </div>
      <TabBar active={activeTab} onTab={onTab}/>
    </Screen>
  );
}

// Helpers
function btnCircle() {
  return {
    width: 40, height: 40, borderRadius: 999,
    background: T2.bone, border: 'none', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
    position: 'relative',
  };
}

function GlassPill({ children, circle = false, small = false }) {
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

function MapPin({ top, left, color, label }) {
  return (
    <div style={{ position: 'absolute', top, left, transform: 'translate(-50%, -100%)', zIndex: 2 }}>
      {label && (
        <div style={{
          fontFamily: 'Inter', fontSize: 10, fontWeight: 700, color: '#fff',
          background: color, padding: '3px 8px', borderRadius: 6,
          marginBottom: 4, textAlign: 'center', whiteSpace: 'nowrap',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }}>{label}</div>
      )}
      <div style={{
        width: 20, height: 20, borderRadius: 999, background: color,
        border: '3px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
        margin: '0 auto',
      }}/>
    </div>
  );
}

function Stat({ icon: IC, value, label }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <IC size={16} stroke={T2.moss}/>
      <div style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: T2.forest }}>{value}</div>
      <div style={{ fontFamily: 'Inter', fontSize: 10, color: T2.ink60 }}>{label}</div>
    </div>
  );
}

function Divider() { return <div style={{ width: 1, height: 32, background: T2.ink10 }}/>; }

// Swipeable cards
function SwipeCards({ trails, onOpen }) {
  const ref = React.useRef();
  return (
    <div ref={ref} style={{
      display: 'flex', gap: 14, padding: '0 20px 4px',
      overflowX: 'auto', scrollSnapType: 'x mandatory',
      scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
    }}>
      {trails.map(t => (
        <div key={t.id} onClick={() => onOpen?.(t)} style={{
          width: 270, flexShrink: 0, scrollSnapAlign: 'start',
          background: T2.bone, borderRadius: 22, overflow: 'hidden',
          boxShadow: T2.shadow.card, cursor: 'pointer',
        }}>
          <div style={{ position: 'relative' }}>
            <Photo src={t.photo} style={{ width: '100%', height: 170 }}/>
            <button style={{
              position: 'absolute', top: 12, right: 12,
              width: 34, height: 34, borderRadius: 999,
              background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <I2.heart size={16} stroke={T2.forest}/>
            </button>
            <div style={{
              position: 'absolute', bottom: 10, left: 10,
              background: 'rgba(30,40,23,0.75)', color: '#fff',
              padding: '3px 9px', borderRadius: 999,
              fontFamily: 'Inter', fontSize: 10, fontWeight: 700,
              backdropFilter: 'blur(8px)',
              letterSpacing: 0.3, textTransform: 'uppercase',
            }}>{t.diff}</div>
          </div>
          <div style={{ padding: '12px 14px 16px' }}>
            <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: T2.forest }}>{t.name}</div>
            <div style={{ fontFamily: 'Inter', fontSize: 11, color: T2.ink60, margin: '2px 0 8px' }}>{t.park}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stars value={t.rating} size={11}/>
              <div style={{ display: 'flex', gap: 8, fontFamily: 'Inter', fontSize: 11, color: T2.ink60 }}>
                <span>{t.dist}</span>
                <span>·</span>
                <span>{t.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { HomeA, HomeB, HomeC, GlassPill, MapPin, Stat, Divider, SwipeCards, btnCircle });
