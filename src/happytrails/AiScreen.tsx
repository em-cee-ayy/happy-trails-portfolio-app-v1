// AI feature screens — Community Alerts (hero), Drop Pin, Bird ID, Plant ID, Live Parking.
// Ported from the handoff screens-ai.jsx.
import { useEffect, useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, P } from './tokens';
import { Icons, type IconComponent } from './icons';
import { Screen, StatusBar, TabBar, Chip, Photo, GlassPill, btnCircle, glassBtn, primaryBtn, secondaryBtn } from './shared';
import { ScanPicker } from './ScanPicker';

const SERIF = '"Instrument Serif", serif';

interface Alert {
  id: number; type: string; category: string; color: string; icon: IconComponent;
  top: string; left: string; title: string; dist: string; when: string; reporter: string; count: number;
}

// ── COMMUNITY ALERTS ─────────────────────────────────────────
export function HTCommunityAlerts() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [scanOpen, setScanOpen] = useState(false);
  const [dropPin, setDropPin] = useState(false);
  const filters = ['All', 'Wildlife', 'Closures', 'Trail hazards', 'Weather'];

  const allAlerts: Alert[] = [
    { id: 1, type: 'bear', category: 'Wildlife', color: T.red, icon: Icons.bear, top: '22%', left: '38%', title: 'Black bear', dist: '1.2 km', when: '2h', reporter: P.avatar1, count: 3 },
    { id: 2, type: 'snake', category: 'Wildlife', color: T.amber, icon: Icons.snake, top: '52%', left: '62%', title: 'Rattlesnake', dist: '0.6 km', when: '4h', reporter: P.avatar3, count: 1 },
    { id: 3, type: 'closure', category: 'Closures', color: T.ink, icon: Icons.barrier, top: '72%', left: '32%', title: 'Trail closed', dist: '3.8 km', when: '1d', reporter: P.avatar4, count: 5 },
    { id: 4, type: 'water', category: 'Trail hazards', color: T.sky, icon: Icons.droplet, top: '38%', left: '72%', title: 'High water', dist: '2.4 km', when: '6h', reporter: P.avatar2, count: 2 },
    { id: 5, type: 'ice', category: 'Weather', color: T.sky, icon: Icons.leaf, top: '30%', left: '22%', title: 'Ice on trail', dist: '3.1 km', when: '1h', reporter: P.avatar5, count: 2 },
    { id: 6, type: 'fallen', category: 'Trail hazards', color: T.moss, icon: Icons.tree, top: '62%', left: '48%', title: 'Fallen tree', dist: '2.0 km', when: '3h', reporter: P.avatar2, count: 1 },
  ];
  const alerts = filter === 'All' ? allAlerts : allAlerts.filter(a => a.category === filter);
  const [selectedId, setSelectedId] = useState(1);
  const selected = alerts.find(a => a.id === selectedId) || alerts[0] || allAlerts[0];
  useEffect(() => { if (alerts.length && !alerts.find(a => a.id === selectedId)) setSelectedId(alerts[0].id); }, [filter]);

  const SelectedIcon = selected.icon;

  return (
    <Screen bg={T.shell}>
      {/* Map — constrained to upper area so pins never overlap the sheet */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 340, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(circle at 30% 20%, ${T.leaf}55 0%, transparent 35%),
            radial-gradient(circle at 80% 60%, ${T.sage}66 0%, transparent 45%),
            radial-gradient(circle at 20% 70%, ${T.forest}33 0%, transparent 40%),
            linear-gradient(135deg, #D8DBC8 0%, #E5E0CE 50%, #C8CDB2 100%)
          `,
        }}/>
        <svg viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.22 }}>
          {[0,1,2,3,4,5,6].map(i => (
            <path key={i} d={`M 0 ${100 + i*80} Q 100 ${60 + i*80} 200 ${100 + i*80} T 400 ${100 + i*80}`} stroke={T.forest} strokeWidth="0.8" fill="none"/>
          ))}
          {[0,1,2,3,4].map(i => (
            <path key={`v${i}`} d={`M ${50 + i*80} 0 Q ${30 + i*80} 200 ${60 + i*80} 400 T ${70 + i*80} 700`} stroke={T.forest} strokeWidth="0.6" fill="none"/>
          ))}
          <path d="M 40 650 Q 130 500 180 400 T 280 200 Q 340 120 360 40" stroke={T.terracotta} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" strokeDasharray="1 4"/>
          <path d="M 60 300 Q 150 280 230 320 T 380 360" stroke={T.forest} strokeWidth="2" fill="none" opacity="0.3"/>
        </svg>

        {/* Alert pins */}
        {alerts.map(a => {
          const IC = a.icon;
          const isSel = selected.id === a.id;
          return (
            <button key={a.id} onClick={() => setSelectedId(a.id)} style={{
              position: 'absolute', top: a.top, left: a.left,
              transform: 'translate(-50%, -100%)', zIndex: 3,
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
            }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: isSel ? 46 : 38, height: isSel ? 46 : 38,
                  borderRadius: '50% 50% 50% 6px', transform: 'rotate(-45deg)',
                  background: a.color, border: '3px solid #fff',
                  boxShadow: `0 4px 14px ${a.color}66, 0 2px 4px rgba(0,0,0,0.2)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all .25s',
                }}>
                  <div style={{ transform: 'rotate(45deg)', color: '#fff', display: 'flex' }}>
                    <IC size={isSel ? 22 : 18} stroke="#fff" sw={2}/>
                  </div>
                </div>
                {a.count > 1 && (
                  <div style={{
                    position: 'absolute', top: -4, right: -4, zIndex: 2,
                    minWidth: 18, height: 18, borderRadius: 999,
                    background: T.forest, color: '#fff',
                    fontFamily: 'Inter', fontSize: 10, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid #fff', padding: '0 4px',
                  }}>{a.count}</div>
                )}
              </div>
            </button>
          );
        })}

        {/* Your location */}
        <div style={{ position: 'absolute', top: '58%', left: '42%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
          <div style={{ width: 52, height: 52, borderRadius: 999, background: `${T.moss}33`, position: 'absolute', top: -12, left: -12, animation: 'ht-pulse 2s ease-out infinite' }}/>
          <div style={{ width: 28, height: 28, borderRadius: 999, background: T.moss, border: '3px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}/>
        </div>
      </div>

      <StatusBar color={T.forest}/>

      {/* Top bar */}
      <div style={{ position: 'relative', padding: '4px 16px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={() => navigate('/ht/home')} style={btnCircle()}><Icons.chevronLeft size={18} stroke={T.forest}/></button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SERIF, fontSize: 22, color: T.forest, lineHeight: '24px' }}>
            Trail <em style={{ color: T.terracotta }}>alerts</em>
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, color: T.ink60 }}>{alerts.length} active near Estes Park</div>
        </div>
        <button style={btnCircle()}><Icons.list size={18} stroke={T.forest}/></button>
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
        background: T.bone, borderRadius: 24, padding: '16px 16px 18px',
        boxShadow: T.shadow.float, border: `1px solid ${T.ink05}`,
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: `${selected.color}20`, color: selected.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><SelectedIcon size={24}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: T.forest }}>{selected.title} reported</div>
            <div style={{ fontFamily: 'Inter', fontSize: 12, color: T.ink60, marginTop: 2 }}>
              {selected.dist} away · {selected.when} ago · {selected.count} {selected.count === 1 ? 'report' : 'reports'}
            </div>
          </div>
          <div style={{
            padding: '4px 10px', borderRadius: 999,
            background: `${selected.color}15`, color: selected.color,
            fontFamily: 'Inter', fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
          }}>Active</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderTop: `1px solid ${T.ink10}`, borderBottom: `1px solid ${T.ink10}`, marginBottom: 12 }}>
          <Photo src={selected.reporter} style={{ width: 28, height: 28, borderRadius: 999 }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Inter', fontSize: 12, color: T.forest, fontWeight: 600 }}>
              <span style={{ color: T.ink60, fontWeight: 400 }}>Reported by</span> Marcus J.
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 10, color: T.ink60 }}>Verified hiker · 47 reports</div>
          </div>
          <button style={{
            fontFamily: 'Inter', fontSize: 11, fontWeight: 600,
            color: T.moss, background: `${T.moss}12`,
            border: 'none', padding: '6px 10px', borderRadius: 999,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <Icons.check size={12} sw={2.5}/> Still there?
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={primaryBtn()}><Icons.route size={14}/> Reroute</button>
          <button style={secondaryBtn()}><Icons.share size={14} stroke={T.forest}/></button>
          <button style={secondaryBtn()}><Icons.bookmark size={14} stroke={T.forest}/></button>
        </div>
      </div>

      {/* Drop pin FAB */}
      <button onClick={() => setDropPin(true)} style={{
        position: 'absolute', right: 16, bottom: 205, zIndex: 5,
        width: 56, height: 56, borderRadius: 18,
        background: T.terracotta, color: '#fff', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: T.shadow.float,
      }}>
        <Icons.plus size={24} sw={2.2}/>
      </button>

      <div style={{ height: 90 }}/>
      <TabBar active="alerts" onScan={() => setScanOpen(true)}/>
      {scanOpen && <ScanPicker onClose={() => setScanOpen(false)}/>}
      {dropPin && <DropPinSheet onClose={() => setDropPin(false)} onConfirm={() => setDropPin(false)}/>}
      <style>{`@keyframes ht-pulse { 0% { transform: scale(0.6); opacity: .8; } 100% { transform: scale(2); opacity: 0; } }`}</style>
    </Screen>
  );
}

// ── DROP PIN SHEET ───────────────────────────────────────────
function DropPinSheet({ onClose, onConfirm }: { onClose: () => void; onConfirm: (id: string) => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const types: { id: string; label: string; icon: IconComponent; color: string }[] = [
    { id: 'bear', label: 'Bear', icon: Icons.bear, color: T.red },
    { id: 'snake', label: 'Snake', icon: Icons.snake, color: T.amber },
    { id: 'moose', label: 'Moose', icon: Icons.alert, color: T.terracotta },
    { id: 'closure', label: 'Closed', icon: Icons.barrier, color: T.ink },
    { id: 'water', label: 'Water', icon: Icons.droplet, color: T.sky },
    { id: 'fallen', label: 'Fallen tree', icon: Icons.tree, color: T.moss },
    { id: 'ice', label: 'Ice / snow', icon: Icons.leaf, color: T.sky },
    { id: 'other', label: 'Other', icon: Icons.flag, color: T.forest },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(30,40,23,0.4)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: T.paper,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: '14px 20px 36px', maxHeight: '88%', overflowY: 'auto',
        animation: 'ht-slideUp .3s cubic-bezier(.2,.9,.3,1)',
      }}>
        <div style={{ width: 38, height: 4, background: T.ink20, borderRadius: 2, margin: '0 auto 16px' }}/>
        <div style={{ fontFamily: SERIF, fontSize: 28, color: T.forest, lineHeight: '30px' }}>
          Drop an <em style={{ color: T.terracotta }}>alert</em>
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: 13, color: T.ink60, marginTop: 4, marginBottom: 18 }}>
          Help other hikers stay safe on this trail
        </div>

        <div style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 700, color: T.ink60, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>What did you see?</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          {types.map(t => {
            const active = picked === t.id;
            const IC = t.icon;
            return (
              <button key={t.id} onClick={() => setPicked(t.id)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                padding: '12px 4px', border: 'none', cursor: 'pointer',
                background: active ? T.forest : T.bone,
                color: active ? T.cream : T.forest,
                borderRadius: 14, transition: 'all .15s',
                boxShadow: T.shadow.card,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: active ? 'rgba(255,255,255,0.15)' : `${t.color}20`,
                  color: active ? '#fff' : t.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><IC size={18}/></div>
                <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600 }}>{t.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 700, color: T.ink60, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Details (optional)</div>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Small black bear with cub, crossed the trail heading south…" style={{
          width: '100%', boxSizing: 'border-box',
          background: T.bone, border: `1px solid ${T.ink10}`,
          borderRadius: 14, padding: 14, fontFamily: 'Inter', fontSize: 13,
          color: T.forest, resize: 'none', outline: 'none',
          minHeight: 80, marginBottom: 14,
        }}/>

        <div style={{
          display: 'flex', gap: 10, padding: '10px 14px',
          background: `${T.moss}12`, borderRadius: 12,
          marginBottom: 18, alignItems: 'center',
        }}>
          <Icons.location size={16} stroke={T.moss}/>
          <div style={{ flex: 1, fontFamily: 'Inter', fontSize: 12, color: T.forest }}>
            <strong>1.2 km into Emerald Lake Loop</strong> · auto-detected
          </div>
        </div>

        <button disabled={!picked} onClick={() => picked && onConfirm(picked)} style={{
          width: '100%', height: 54, borderRadius: 18, border: 'none',
          background: picked ? T.forest : T.ink10,
          color: picked ? T.cream : T.ink40,
          fontFamily: 'Inter', fontSize: 15, fontWeight: 700,
          cursor: picked ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Icons.alert size={16}/> Post alert
        </button>
      </div>
      <style>{`@keyframes ht-slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}

// ── BIRD ID ──────────────────────────────────────────────────
export function HTBirdID() {
  const navigate = useNavigate();
  const [state, setState] = useState<'idle' | 'listening' | 'result'>('idle');
  const [levels, setLevels] = useState<number[]>(Array(40).fill(0.2));

  useEffect(() => {
    if (state !== 'listening') return;
    const id = setInterval(() => {
      setLevels(ls => ls.map(() => 0.2 + Math.random() * 0.8));
    }, 120);
    const done = setTimeout(() => setState('result'), 3800);
    return () => { clearInterval(id); clearTimeout(done); };
  }, [state]);

  return (
    <Screen bg={T.forest}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Photo src={P.pineForest} style={{ width: '100%', height: '100%' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(45,58,31,0.75) 0%, rgba(45,58,31,0.95) 100%)' }}/>
      </div>

      <StatusBar color="#fff"/>
      <div style={{ position: 'relative', padding: '4px 16px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/ht/home')} style={glassBtn()}><Icons.chevronLeft size={18} stroke="#fff"/></button>
        <GlassPill><span style={{ color: '#fff', fontFamily: 'Inter', fontSize: 12, fontWeight: 600 }}>Bird ID</span></GlassPill>
        <button style={glassBtn()}><Icons.settings size={16} stroke="#fff"/></button>
      </div>

      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', color: '#fff' }}>
        {state === 'idle' && (
          <>
            <div style={{ fontFamily: SERIF, fontSize: 38, lineHeight: '42px', textAlign: 'center', marginBottom: 10 }}>
              Listen to<br/>the <em style={{ color: T.coral }}>forest</em>.
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: 14, opacity: 0.8, textAlign: 'center', maxWidth: 280, marginBottom: 50 }}>
              Hold still and tap to record. We'll identify birds within 10 seconds.
            </div>
            <button onClick={() => setState('listening')} style={bigCircleBtn(T.coral)}>
              <Icons.mic size={32} stroke="#fff" sw={2}/>
            </button>
            <div style={{ fontFamily: 'Inter', fontSize: 11, opacity: 0.6, marginTop: 22, letterSpacing: 1, textTransform: 'uppercase' }}>Tap to start</div>
          </>
        )}

        {state === 'listening' && (
          <>
            <div style={{ fontFamily: SERIF, fontSize: 32, textAlign: 'center', marginBottom: 6 }}>Listening…</div>
            <div style={{ fontFamily: 'Inter', fontSize: 13, opacity: 0.7, marginBottom: 40 }}>Analyzing 3 overlapping calls</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 140, marginBottom: 40 }}>
              {levels.map((l, i) => (
                <div key={i} style={{
                  width: 4, borderRadius: 2, height: `${l * 100}%`,
                  background: `linear-gradient(to top, ${T.coral}, ${T.amber})`,
                  transition: 'height .12s',
                }}/>
              ))}
            </div>
            <button onClick={() => setState('idle')} style={bigCircleBtn(T.red)}>
              <Icons.stop size={26}/>
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
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)', border: '4px solid rgba(255,255,255,0.2)',
            }}>
              <Photo src={P.bird} style={{ width: '100%', height: '100%' }}/>
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 32 }}>Mountain Bluebird</div>
            <div style={{ fontFamily: 'Inter', fontSize: 13, fontStyle: 'italic', opacity: 0.65 }}>Sialia currucoides</div>
            <div style={{
              marginTop: 14, padding: '4px 12px', borderRadius: 999,
              background: `${T.leaf}30`, color: T.coral,
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
                background: T.coral, color: '#fff', cursor: 'pointer',
                fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
              }}>Save sighting</button>
            </div>

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

function bigCircleBtn(color: string): CSSProperties {
  return {
    width: 96, height: 96, borderRadius: 999,
    background: color, color: '#fff', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: `0 0 0 10px ${color}22, 0 10px 30px rgba(0,0,0,0.3)`,
  };
}

// ── LIVE PARKING ─────────────────────────────────────────────
export function HTParking() {
  const navigate = useNavigate();
  const lots = [
    { name: 'Bear Lake Trailhead', total: 24, open: 3, dist: '0.4 km', updated: '2m', trend: 'filling' },
    { name: 'Glacier Gorge', total: 60, open: 22, dist: '1.8 km', updated: '4m', trend: 'steady' },
    { name: 'Wild Basin', total: 40, open: 18, dist: '12 km', updated: '6m', trend: 'emptying' },
  ];

  return (
    <Screen bg={T.shell}>
      <StatusBar color={T.forest}/>
      <div style={{ padding: '4px 16px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/ht/home')} style={btnCircle()}><Icons.chevronLeft size={18} stroke={T.forest}/></button>
        <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: T.forest }}>Live parking</div>
        <button style={btnCircle()}><Icons.radar size={18} stroke={T.forest}/></button>
      </div>

      <div style={{ padding: '8px 20px 0' }}>
        <div style={{ fontFamily: SERIF, fontSize: 34, color: T.forest, lineHeight: '36px', marginBottom: 8 }}>
          Know before<br/>you <em style={{ color: T.terracotta }}>arrive</em>.
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: 12, color: T.ink60, marginBottom: 18 }}>
          Based on live anonymized cell-phone pings near trailheads · updated 2 min ago
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 40px' }}>
        {lots.map((l, i) => {
          const pct = l.open / l.total;
          const color = pct < 0.2 ? T.red : pct < 0.5 ? T.amber : T.moss;
          const trendIcon = l.trend === 'filling' ? '↗' : l.trend === 'emptying' ? '↘' : '→';
          return (
            <div key={i} style={{
              background: T.bone, borderRadius: 20, padding: 16, marginBottom: 12,
              boxShadow: T.shadow.card, border: `1px solid ${T.ink05}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: T.forest }}>{l.name}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 11, color: T.ink60, marginTop: 1 }}>{l.dist} · updated {l.updated} ago</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: SERIF, fontSize: 28, color, lineHeight: '30px' }}>
                    {l.open}<span style={{ fontSize: 14, color: T.ink40 }}>/{l.total}</span>
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: 10, color: T.ink60, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>spots open</div>
                </div>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: T.ink05, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{ width: `${pct * 100}%`, height: '100%', background: color, borderRadius: 4 }}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: 'Inter', fontSize: 11, color: T.ink60 }}>
                  {l.trend === 'filling' ? 'Filling up fast' : l.trend === 'emptying' ? 'Emptying' : 'Steady'} <span style={{ color }}>{trendIcon}</span>
                </div>
                <button style={{
                  fontFamily: 'Inter', fontSize: 12, fontWeight: 600,
                  background: 'transparent', color: T.moss, border: `1px solid ${T.moss}44`,
                  padding: '6px 12px', borderRadius: 999, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}>
                  <Icons.route size={12} sw={2}/> Directions
                </button>
              </div>
            </div>
          );
        })}

        <div style={{
          background: T.bone, borderRadius: 20, padding: 16, marginTop: 8,
          boxShadow: T.shadow.card, border: `1px solid ${T.ink05}`,
        }}>
          <div style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: T.forest, marginBottom: 2 }}>When it's busy</div>
          <div style={{ fontFamily: 'Inter', fontSize: 11, color: T.ink60, marginBottom: 14 }}>Bear Lake · typical Saturday</div>
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
          const color = v > 85 ? T.red : v > 60 ? T.amber : T.moss;
          return (
            <div key={i} style={{
              flex: 1, height: `${v}%`,
              background: i === now ? T.terracotta : color,
              borderRadius: 3, opacity: i === now ? 1 : 0.75, position: 'relative',
            }}>
              {i === now && (
                <div style={{
                  position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                  fontFamily: 'Inter', fontSize: 9, fontWeight: 700, color: T.terracotta,
                  whiteSpace: 'nowrap', marginBottom: 3,
                }}>NOW</div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
        {hours.map((h, i) => <div key={i} style={{ flex: 1, fontFamily: 'Inter', fontSize: 9, color: T.ink60, textAlign: 'center' }}>{h}</div>)}
      </div>
    </div>
  );
}
