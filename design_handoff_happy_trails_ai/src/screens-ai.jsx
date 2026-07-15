// AI feature screens — Community Alerts (hero), Bird ID, Plant ID, Parking
const { TOKENS: T4, PHOTOS: P4, Icons: I4 } = window;

// ──────────────────────────────────────────────────────────
// COMMUNITY ALERTS — hero screen
// ──────────────────────────────────────────────────────────
function CommunityAlerts({ onTab, activeTab = 'alerts', onDropPin }) {
  const [filter, setFilter] = React.useState('All');
  const filters = ['All', 'Wildlife', 'Closures', 'Trail hazards', 'Weather'];

  const allAlerts = [
    { id: 1, type: 'bear', category: 'Wildlife', color: T4.red, icon: I4.bear, top: '22%', left: '38%', title: 'Black bear', dist: '1.2 km', when: '2h', reporter: P4.avatar1, count: 3 },
    { id: 2, type: 'snake', category: 'Wildlife', color: T4.amber, icon: I4.snake, top: '52%', left: '62%', title: 'Rattlesnake', dist: '0.6 km', when: '4h', reporter: P4.avatar3, count: 1 },
    { id: 3, type: 'closure', category: 'Closures', color: T4.ink, icon: I4.barrier, top: '72%', left: '32%', title: 'Trail closed', dist: '3.8 km', when: '1d', reporter: P4.avatar4, count: 5 },
    { id: 4, type: 'water', category: 'Trail hazards', color: T4.sky, icon: I4.droplet, top: '38%', left: '72%', title: 'High water', dist: '2.4 km', when: '6h', reporter: P4.avatar2, count: 2 },
    { id: 5, type: 'ice', category: 'Weather', color: T4.sky, icon: I4.leaf, top: '30%', left: '22%', title: 'Ice on trail', dist: '3.1 km', when: '1h', reporter: P4.avatar5, count: 2 },
    { id: 6, type: 'fallen', category: 'Trail hazards', color: T4.moss, icon: I4.tree, top: '62%', left: '48%', title: 'Fallen tree', dist: '2.0 km', when: '3h', reporter: P4.avatar2, count: 1 },
  ];
  const alerts = filter === 'All' ? allAlerts : allAlerts.filter(a => a.category === filter);
  const [selectedId, setSelectedId] = React.useState(1);
  const selected = alerts.find(a => a.id === selectedId) || alerts[0] || allAlerts[0];
  React.useEffect(() => { if (alerts.length && !alerts.find(a => a.id === selectedId)) setSelectedId(alerts[0].id); }, [filter]);

  return (
    <Screen bg={T4.shell}>
      {/* Map — constrained to upper area only, so pins don't overlap bottom sheet */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 340, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(circle at 30% 20%, ${T4.leaf}55 0%, transparent 35%),
            radial-gradient(circle at 80% 60%, ${T4.sage}66 0%, transparent 45%),
            radial-gradient(circle at 20% 70%, ${T4.forest}33 0%, transparent 40%),
            linear-gradient(135deg, #D8DBC8 0%, #E5E0CE 50%, #C8CDB2 100%)
          `,
        }}/>
        {/* Map texture — contour lines SVG */}
        <svg viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.22 }}>
          {[0,1,2,3,4,5,6].map(i => (
            <path key={i} d={`M 0 ${100 + i*80} Q 100 ${60 + i*80} 200 ${100 + i*80} T 400 ${100 + i*80}`} stroke={T4.forest} strokeWidth="0.8" fill="none"/>
          ))}
          {[0,1,2,3,4].map(i => (
            <path key={`v${i}`} d={`M ${50 + i*80} 0 Q ${30 + i*80} 200 ${60 + i*80} 400 T ${70 + i*80} 700`} stroke={T4.forest} strokeWidth="0.6" fill="none"/>
          ))}
          {/* Trail paths */}
          <path d="M 40 650 Q 130 500 180 400 T 280 200 Q 340 120 360 40" stroke={T4.terracotta} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" strokeDasharray="1 4"/>
          <path d="M 60 300 Q 150 280 230 320 T 380 360" stroke={T4.forest} strokeWidth="2" fill="none" opacity="0.3"/>
        </svg>

        {/* Alert pins */}
        {alerts.map(a => (
          <button key={a.id} onClick={() => setSelectedId(a.id)} style={{
            position: 'absolute', top: a.top, left: a.left,
            transform: 'translate(-50%, -100%)', zIndex: 3,
            border: 'none', background: 'none', cursor: 'pointer', padding: 0,
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: selected.id === a.id ? 46 : 38,
                height: selected.id === a.id ? 46 : 38,
                borderRadius: '50% 50% 50% 6px', transform: 'rotate(-45deg)',
                background: a.color, border: '3px solid #fff',
                boxShadow: `0 4px 14px ${a.color}66, 0 2px 4px rgba(0,0,0,0.2)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .25s',
              }}>
                <div style={{ transform: 'rotate(45deg)', color: '#fff', display: 'flex' }}>
                  <a.icon size={selected.id === a.id ? 22 : 18} stroke="#fff" sw={2}/>
                </div>
              </div>
              {a.count > 1 && (
                <div style={{
                  position: 'absolute', top: -4, right: -4, zIndex: 2,
                  minWidth: 18, height: 18, borderRadius: 999,
                  background: T4.forest, color: '#fff',
                  fontFamily: 'Inter', fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #fff', padding: '0 4px',
                }}>{a.count}</div>
              )}
            </div>
          </button>
        ))}

        {/* Your location */}
        <div style={{ position: 'absolute', top: '58%', left: '42%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
          <div style={{ width: 52, height: 52, borderRadius: 999, background: `${T4.moss}33`, position: 'absolute', top: -12, left: -12, animation: 'pulse 2s ease-out infinite' }}/>
          <div style={{ width: 28, height: 28, borderRadius: 999, background: T4.moss, border: '3px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}/>
        </div>
      </div>

      <StatusBar color={T4.forest}/>

      {/* Top bar */}
      <div style={{ position: 'relative', padding: '4px 16px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <button style={btnCircle()}><I4.chevronLeft size={18} stroke={T4.forest}/></button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22, color: T4.forest, lineHeight: '24px' }}>
            Trail <em style={{ color: T4.terracotta }}>alerts</em>
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, color: T4.ink60 }}>{alerts.length} active near Estes Park</div>
        </div>
        <button style={btnCircle()}><I4.list size={18} stroke={T4.forest}/></button>
      </div>

      {/* Filter chips */}
      <div style={{ position: 'relative', padding: '0 16px 12px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {filters.map(f => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Chip>
        ))}
      </div>

      <div style={{ flex: 1 }}/>

      {/* Selected alert card */}
      <div style={{
        position: 'relative', zIndex: 10, margin: '0 12px 0',
        background: T4.bone, borderRadius: 24, padding: '16px 16px 18px',
        boxShadow: T4.shadow.float, border: `1px solid ${T4.ink05}`,
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: `${selected.color}20`, color: selected.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><selected.icon size={24}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: T4.forest }}>{selected.title} reported</div>
            <div style={{ fontFamily: 'Inter', fontSize: 12, color: T4.ink60, marginTop: 2 }}>
              {selected.dist} away · {selected.when} ago · {selected.count} {selected.count === 1 ? 'report' : 'reports'}
            </div>
          </div>
          <div style={{
            padding: '4px 10px', borderRadius: 999,
            background: `${selected.color}15`, color: selected.color,
            fontFamily: 'Inter', fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
          }}>Active</div>
        </div>
        {/* reporter */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderTop: `1px solid ${T4.ink10}`, borderBottom: `1px solid ${T4.ink10}`, marginBottom: 12 }}>
          <Photo src={selected.reporter} style={{ width: 28, height: 28, borderRadius: 999 }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 12, color: T4.forest, fontWeight: 600 }}>
              <span style={{ color: T4.ink60, fontWeight: 400 }}>Reported by</span> Marcus J.
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 10, color: T4.ink60 }}>Verified hiker · 47 reports</div>
          </div>
          <button style={{
            fontFamily: 'Inter', fontSize: 11, fontWeight: 600,
            color: T4.moss, background: `${T4.moss}12`,
            border: 'none', padding: '6px 10px', borderRadius: 999,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <I4.check size={12} sw={2.5}/> Still there?
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={primaryBtn()}>
            <I4.route size={14}/> Reroute
          </button>
          <button style={secondaryBtn()}>
            <I4.share size={14} stroke={T4.forest}/>
          </button>
          <button style={secondaryBtn()}>
            <I4.bookmark size={14} stroke={T4.forest}/>
          </button>
        </div>
      </div>

      {/* Drop pin FAB */}
      <button onClick={onDropPin} style={{
        position: 'absolute', right: 16, bottom: 205, zIndex: 5,
        width: 56, height: 56, borderRadius: 18,
        background: T4.terracotta, color: '#fff', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: T4.shadow.float,
      }}>
        <I4.plus size={24} sw={2.2}/>
      </button>

      <div style={{ height: 90 }}/>
      <TabBar active={activeTab} onTab={onTab}/>
      <style>{`@keyframes pulse { 0% { transform: scale(0.6); opacity: .8; } 100% { transform: scale(2); opacity: 0; } }`}</style>
    </Screen>
  );
}

// ──────────────────────────────────────────────────────────
// DROP PIN — modal / sheet
// ──────────────────────────────────────────────────────────
function DropPinSheet({ onClose, onConfirm }) {
  const [picked, setPicked] = React.useState(null);
  const [note, setNote] = React.useState('');
  const types = [
    { id: 'bear', label: 'Bear', icon: I4.bear, color: T4.red },
    { id: 'snake', label: 'Snake', icon: I4.snake, color: T4.amber },
    { id: 'moose', label: 'Moose', icon: I4.alert, color: T4.terracotta },
    { id: 'closure', label: 'Closed', icon: I4.barrier, color: T4.ink },
    { id: 'water', label: 'Water', icon: I4.droplet, color: T4.sky },
    { id: 'fallen', label: 'Fallen tree', icon: I4.tree, color: T4.moss },
    { id: 'ice', label: 'Ice / snow', icon: I4.leaf, color: T4.sky },
    { id: 'other', label: 'Other', icon: I4.flag, color: T4.forest },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(30,40,23,0.4)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: T4.paper,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: '14px 20px 36px', maxHeight: '88%', overflowY: 'auto',
        animation: 'slideUp .3s cubic-bezier(.2,.9,.3,1)',
      }}>
        <div style={{ width: 38, height: 4, background: T4.ink20, borderRadius: 2, margin: '0 auto 16px' }}/>
        <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 28, color: T4.forest, lineHeight: '30px' }}>
          Drop an <em style={{ color: T4.terracotta }}>alert</em>
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: 13, color: T4.ink60, marginTop: 4, marginBottom: 18 }}>
          Help other hikers stay safe on this trail
        </div>

        <div style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 700, color: T4.ink60, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>What did you see?</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          {types.map(t => {
            const active = picked === t.id;
            return (
              <button key={t.id} onClick={() => setPicked(t.id)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                padding: '12px 4px', border: 'none', cursor: 'pointer',
                background: active ? T4.forest : T4.bone,
                color: active ? T4.cream : T4.forest,
                borderRadius: 14, transition: 'all .15s',
                boxShadow: T4.shadow.card,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: active ? 'rgba(255,255,255,0.15)' : `${t.color}20`,
                  color: active ? '#fff' : t.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><t.icon size={18}/></div>
                <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600 }}>{t.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 700, color: T4.ink60, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Details (optional)</div>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Small black bear with cub, crossed the trail heading south…" style={{
          width: '100%', boxSizing: 'border-box',
          background: T4.bone, border: `1px solid ${T4.ink10}`,
          borderRadius: 14, padding: 14, fontFamily: 'Inter', fontSize: 13,
          color: T4.forest, resize: 'none', outline: 'none',
          minHeight: 80, marginBottom: 14,
        }}/>

        <div style={{
          display: 'flex', gap: 10, padding: '10px 14px',
          background: `${T4.moss}12`, borderRadius: 12,
          marginBottom: 18, alignItems: 'center',
        }}>
          <I4.location size={16} stroke={T4.moss}/>
          <div style={{ flex: 1, fontFamily: 'Inter', fontSize: 12, color: T4.forest }}>
            <strong>1.2 km into Emerald Lake Loop</strong> · auto-detected
          </div>
        </div>

        <button disabled={!picked} onClick={() => onConfirm?.(picked)} style={{
          width: '100%', height: 54, borderRadius: 18, border: 'none',
          background: picked ? T4.forest : T4.ink10,
          color: picked ? T4.cream : T4.ink40,
          fontFamily: 'Inter', fontSize: 15, fontWeight: 700,
          cursor: picked ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <I4.alert size={16}/> Post alert
        </button>
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// BIRD ID — listening UI with animated waveform
// ──────────────────────────────────────────────────────────
function BirdID({ onBack }) {
  const [state, setState] = React.useState('idle'); // idle, listening, result
  const [levels, setLevels] = React.useState(Array(40).fill(0.2));

  React.useEffect(() => {
    if (state !== 'listening') return;
    const id = setInterval(() => {
      setLevels(ls => ls.map(() => 0.2 + Math.random() * 0.8));
    }, 120);
    const done = setTimeout(() => setState('result'), 3800);
    return () => { clearInterval(id); clearTimeout(done); };
  }, [state]);

  return (
    <Screen bg={T4.forest}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Photo src={P4.pineForest} style={{ width: '100%', height: '100%' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(45,58,31,0.75) 0%, rgba(45,58,31,0.95) 100%)' }}/>
      </div>

      <StatusBar color="#fff"/>
      <div style={{ position: 'relative', padding: '4px 16px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={glassBtn()}><I4.chevronLeft size={18} stroke="#fff"/></button>
        <GlassPill><span style={{ color: '#fff', fontFamily: 'Inter', fontSize: 12, fontWeight: 600 }}>Bird ID</span></GlassPill>
        <button style={glassBtn()}><I4.settings size={16} stroke="#fff"/></button>
      </div>

      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', color: '#fff' }}>
        {state === 'idle' && (
          <>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 38, lineHeight: '42px', textAlign: 'center', marginBottom: 10 }}>
              Listen to<br/>the <em style={{ color: T4.coral }}>forest</em>.
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 14, opacity: 0.8, textAlign: 'center', maxWidth: 280, marginBottom: 50 }}>
              Hold still and tap to record. We'll identify birds within 10 seconds.
            </div>
            <button onClick={() => setState('listening')} style={bigCircleBtn(T4.coral)}>
              <I4.mic size={32} stroke="#fff" sw={2}/>
            </button>
            <div style={{ fontFamily: 'Inter', fontSize: 11, opacity: 0.6, marginTop: 22, letterSpacing: 1, textTransform: 'uppercase' }}>Tap to start</div>
          </>
        )}

        {state === 'listening' && (
          <>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 32, textAlign: 'center', marginBottom: 6 }}>
              Listening…
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 13, opacity: 0.7, marginBottom: 40 }}>Analyzing 3 overlapping calls</div>
            {/* Waveform */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 140, marginBottom: 40 }}>
              {levels.map((l, i) => (
                <div key={i} style={{
                  width: 4, borderRadius: 2,
                  height: `${l * 100}%`,
                  background: `linear-gradient(to top, ${T4.coral}, ${T4.amber})`,
                  transition: 'height .12s',
                }}/>
              ))}
            </div>
            <button onClick={() => setState('idle')} style={bigCircleBtn(T4.red)}>
              <I4.stop size={26}/>
            </button>
            <div style={{ fontFamily: 'Inter', fontSize: 11, opacity: 0.6, marginTop: 18, letterSpacing: 1, textTransform: 'uppercase' }}>Tap to stop</div>
          </>
        )}

        {state === 'result' && (
          <>
            <div style={{ fontFamily: 'Inter', fontSize: 11, opacity: 0.7, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Most confident match</div>
            <div style={{
              position: 'relative', width: 180, height: 180, borderRadius: 999,
              overflow: 'hidden', marginBottom: 20,
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              border: '4px solid rgba(255,255,255,0.2)',
            }}>
              <Photo src={P4.bird} style={{ width: '100%', height: '100%' }}/>
            </div>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 32 }}>Mountain Bluebird</div>
            <div style={{ fontFamily: 'Inter', fontSize: 13, fontStyle: 'italic', opacity: 0.65 }}>Sialia currucoides</div>
            <div style={{
              marginTop: 14, padding: '4px 12px', borderRadius: 999,
              background: `${T4.leaf}30`, color: T4.coral,
              fontFamily: 'Inter', fontSize: 11, fontWeight: 700, letterSpacing: 0.8,
            }}>94% CONFIDENT</div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button onClick={() => setState('idle')} style={{
                padding: '12px 18px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.25)',
                background: 'transparent', color: '#fff', cursor: 'pointer',
                fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
              }}>Listen again</button>
              <button style={{
                padding: '12px 18px', borderRadius: 999, border: 'none',
                background: T4.coral, color: '#fff', cursor: 'pointer',
                fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
              }}>Save sighting</button>
            </div>

            {/* Other matches */}
            <div style={{
              position: 'absolute', bottom: 30, left: 20, right: 20,
              background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)',
              borderRadius: 16, padding: 12, display: 'flex', gap: 10,
              border: '0.5px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600 }}>Western Tanager</div>
                <div style={{ fontFamily: 'Inter', fontSize: 10, opacity: 0.6 }}>4% match</div>
              </div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }}/>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600 }}>Steller's Jay</div>
                <div style={{ fontFamily: 'Inter', fontSize: 10, opacity: 0.6 }}>2% match</div>
              </div>
            </div>
          </>
        )}
      </div>
    </Screen>
  );
}

// ──────────────────────────────────────────────────────────
// PLANT ID — camera viewfinder with scan animation
// ──────────────────────────────────────────────────────────
function PlantID({ onBack }) {
  const [state, setState] = React.useState('idle'); // idle, scanning, result

  return (
    <Screen bg="#000">
      <div style={{ position: 'absolute', inset: 0 }}>
        <Photo src={P4.flower} style={{ width: '100%', height: '100%' }}/>
        {state !== 'result' && <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 80%)' }}/>}
      </div>

      <StatusBar color="#fff"/>
      <div style={{ position: 'relative', padding: '4px 16px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={glassBtn()}><I4.chevronLeft size={18} stroke="#fff"/></button>
        <GlassPill><span style={{ color: '#fff', fontFamily: 'Inter', fontSize: 12, fontWeight: 600 }}>Plant ID</span></GlassPill>
        <button style={glassBtn()}><I4.camera size={16} stroke="#fff"/></button>
      </div>

      {state === 'idle' && (
        <>
          {/* Reticle */}
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 240, height: 240, position: 'relative' }}>
              {['tl', 'tr', 'bl', 'br'].map(c => (
                <div key={c} style={{
                  position: 'absolute', width: 30, height: 30,
                  borderTop: c.startsWith('t') ? '3px solid #fff' : 'none',
                  borderBottom: c.startsWith('b') ? '3px solid #fff' : 'none',
                  borderLeft: c.endsWith('l') ? '3px solid #fff' : 'none',
                  borderRight: c.endsWith('r') ? '3px solid #fff' : 'none',
                  top: c.startsWith('t') ? 0 : 'auto',
                  bottom: c.startsWith('b') ? 0 : 'auto',
                  left: c.endsWith('l') ? 0 : 'auto',
                  right: c.endsWith('r') ? 0 : 'auto',
                  borderRadius: '4px',
                }}/>
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, padding: '0 24px', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 24, marginBottom: 4 }}>Point at a leaf or flower</div>
            <div style={{ fontFamily: 'Inter', fontSize: 12, opacity: 0.7 }}>Keep it centered & well-lit</div>
          </div>
          <div style={{ position: 'relative', zIndex: 5, padding: '16px 16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
            <button style={glassBtn()}><I4.grid size={18} stroke="#fff"/></button>
            <button onClick={() => setState('scanning')} style={{
              width: 72, height: 72, borderRadius: 999,
              background: '#fff', border: '4px solid rgba(255,255,255,0.4)', cursor: 'pointer',
              boxShadow: '0 8px 22px rgba(0,0,0,0.3)',
            }}/>
            <button style={glassBtn()}><I4.layers size={18} stroke="#fff"/></button>
          </div>
        </>
      )}

      {state === 'scanning' && (
        <>
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: 240, height: 240, position: 'relative',
              border: `2px solid ${T4.leaf}`, borderRadius: 14,
              boxShadow: `0 0 0 4000px rgba(0,0,0,0.5)`,
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${T4.coral}, transparent)`,
                boxShadow: `0 0 12px ${T4.coral}`,
                animation: 'scan 1.6s linear infinite',
              }}/>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, color: '#fff', textAlign: 'center' }}>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 24, marginBottom: 6 }}>Identifying…</div>
            <div style={{ fontFamily: 'Inter', fontSize: 12, opacity: 0.75, display: 'flex', gap: 18, justifyContent: 'center' }}>
              <span style={{ color: T4.leaf }}>✓ Leaf shape</span>
              <span style={{ color: T4.leaf }}>✓ Petals</span>
              <span>· Veins</span>
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 5, padding: '16px 16px 40px', display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => setState('result')} style={{
              padding: '10px 22px', borderRadius: 999, border: 'none',
              background: 'rgba(255,255,255,0.92)', color: T4.forest,
              fontFamily: 'Inter', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}>Skip to result</button>
          </div>
          <style>{`@keyframes scan { 0% { top: 0 } 50% { top: 100% } 100% { top: 0 } }`}</style>
        </>
      )}

      {state === 'result' && (
        <>
          <div style={{ flex: 1 }}/>
          <div style={{
            position: 'relative', margin: '0 12px 30px', zIndex: 3,
            background: T4.paper, borderRadius: 26, padding: '18px 20px 20px',
            boxShadow: T4.shadow.float,
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
              <Photo src={P4.flower} style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0 }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 24, color: T4.forest, lineHeight: '26px' }}>Colorado Blue Columbine</div>
                <div style={{ fontFamily: 'Inter', fontSize: 12, fontStyle: 'italic', color: T4.ink60, marginTop: 2 }}>Aquilegia coerulea</div>
              </div>
              <div style={{ padding: '4px 10px', borderRadius: 999, background: `${T4.moss}18`, color: T4.moss, fontFamily: 'Inter', fontSize: 10, fontWeight: 700 }}>97%</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <InfoTag>State flower · CO</InfoTag>
              <InfoTag color={T4.moss}>Native</InfoTag>
              <InfoTag color={T4.amber}>Do not pick</InfoTag>
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 13, color: T4.ink, lineHeight: 1.55, marginBottom: 14 }}>
              Blooms June–August in subalpine meadows. Protected as Colorado's state flower — picking is prohibited in national forests.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={primaryBtn()}>Save to journal</button>
              <button style={secondaryBtn()}><I4.share size={14} stroke={T4.forest}/></button>
              <button onClick={() => setState('idle')} style={secondaryBtn()}><I4.close size={16} stroke={T4.forest}/></button>
            </div>
          </div>
        </>
      )}
    </Screen>
  );
}

function InfoTag({ children, color = T4.ink60 }) {
  return (
    <div style={{
      padding: '4px 10px', borderRadius: 999,
      background: `${color}12`, color,
      fontFamily: 'Inter', fontSize: 11, fontWeight: 600,
    }}>{children}</div>
  );
}

// ──────────────────────────────────────────────────────────
// LIVE PARKING
// ──────────────────────────────────────────────────────────
function ParkingScreen({ onBack }) {
  const lots = [
    { name: 'Bear Lake Trailhead', total: 24, open: 3, dist: '0.4 km', updated: '2m', trend: 'filling' },
    { name: 'Glacier Gorge', total: 60, open: 22, dist: '1.8 km', updated: '4m', trend: 'steady' },
    { name: 'Wild Basin', total: 40, open: 18, dist: '12 km', updated: '6m', trend: 'emptying' },
  ];

  return (
    <Screen bg={T4.shell}>
      <StatusBar color={T4.forest}/>
      <div style={{ padding: '4px 16px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={btnCircle()}><I4.chevronLeft size={18} stroke={T4.forest}/></button>
        <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: T4.forest }}>Live parking</div>
        <button style={btnCircle()}><I4.radar size={18} stroke={T4.forest}/></button>
      </div>

      <div style={{ padding: '8px 20px 0' }}>
        <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 34, color: T4.forest, lineHeight: '36px', marginBottom: 8 }}>
          Know before<br/>you <em style={{ color: T4.terracotta }}>arrive</em>.
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: 12, color: T4.ink60, marginBottom: 18 }}>
          Based on live anonymized cell-phone pings near trailheads · updated 2 min ago
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 40px' }}>
        {lots.map((l, i) => {
          const pct = l.open / l.total;
          const color = pct < 0.2 ? T4.red : pct < 0.5 ? T4.amber : T4.moss;
          const trendIcon = l.trend === 'filling' ? '↗' : l.trend === 'emptying' ? '↘' : '→';
          return (
            <div key={i} style={{
              background: T4.bone, borderRadius: 20, padding: 16, marginBottom: 12,
              boxShadow: T4.shadow.card, border: `1px solid ${T4.ink05}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: T4.forest }}>{l.name}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 11, color: T4.ink60, marginTop: 1 }}>{l.dist} · updated {l.updated} ago</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 28, color, lineHeight: '30px' }}>
                    {l.open}<span style={{ fontSize: 14, color: T4.ink40 }}>/{l.total}</span>
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: 10, color: T4.ink60, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>spots open</div>
                </div>
              </div>
              {/* Bar */}
              <div style={{ height: 8, borderRadius: 4, background: T4.ink05, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ width: `${pct * 100}%`, height: '100%', background: color, borderRadius: 4 }}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: 'Inter', fontSize: 11, color: T4.ink60 }}>
                  {l.trend === 'filling' ? 'Filling up fast' : l.trend === 'emptying' ? 'Emptying' : 'Steady'} <span style={{ color }}>{trendIcon}</span>
                </div>
                <button style={{
                  fontFamily: 'Inter', fontSize: 12, fontWeight: 600,
                  background: 'transparent', color: T4.moss, border: `1px solid ${T4.moss}44`,
                  padding: '6px 12px', borderRadius: 999, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}>
                  <I4.route size={12} sw={2}/> Directions
                </button>
              </div>
            </div>
          );
        })}

        {/* Chart — hourly fill pattern */}
        <div style={{
          background: T4.bone, borderRadius: 20, padding: 16, marginTop: 8,
          boxShadow: T4.shadow.card, border: `1px solid ${T4.ink05}`,
        }}>
          <div style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: T4.forest, marginBottom: 2 }}>When it's busy</div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, color: T4.ink60, marginBottom: 14 }}>Bear Lake · typical Saturday</div>
          <HourlyChart/>
        </div>
      </div>
    </Screen>
  );
}

function HourlyChart() {
  const data = [10, 15, 25, 50, 80, 95, 92, 85, 70, 55, 40, 28, 20];
  const hours = ['5a', '6', '7', '8', '9', '10', '11', '12p', '1', '2', '3', '4', '5'];
  const now = 6;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90 }}>
        {data.map((v, i) => {
          const color = v > 85 ? T4.red : v > 60 ? T4.amber : T4.moss;
          return (
            <div key={i} style={{
              flex: 1, height: `${v}%`,
              background: i === now ? T4.terracotta : color,
              borderRadius: 3, opacity: i === now ? 1 : 0.75,
              position: 'relative',
            }}>
              {i === now && (
                <div style={{
                  position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                  fontFamily: 'Inter', fontSize: 9, fontWeight: 700, color: T4.terracotta,
                  whiteSpace: 'nowrap', marginBottom: 3,
                }}>NOW</div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
        {hours.map((h, i) => <div key={i} style={{ flex: 1, fontFamily: 'Inter', fontSize: 9, color: T4.ink60, textAlign: 'center' }}>{h}</div>)}
      </div>
    </div>
  );
}

function primaryBtn() {
  return {
    flex: 1, height: 44, borderRadius: 12, border: 'none', cursor: 'pointer',
    background: T4.forest, color: T4.cream,
    fontFamily: 'Inter', fontSize: 13, fontWeight: 700,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  };
}
function secondaryBtn() {
  return {
    width: 44, height: 44, borderRadius: 12, border: `1px solid ${T4.ink10}`,
    background: T4.bone, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  };
}
function bigCircleBtn(color) {
  return {
    width: 96, height: 96, borderRadius: 999,
    background: color, color: '#fff', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: `0 0 0 10px ${color}22, 0 10px 30px rgba(0,0,0,0.3)`,
  };
}

Object.assign(window, { CommunityAlerts, DropPinSheet, BirdID, PlantID, ParkingScreen, primaryBtn, secondaryBtn, InfoTag, HourlyChart, bigCircleBtn });
