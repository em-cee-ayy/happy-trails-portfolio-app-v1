// Home — Variant A (Editorial). Ported from the handoff HomeA.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { T, P, SERIF } from './tokens';
import { Icons, type IconComponent } from './icons';
import { Screen, StatusBar, TabBar, Chip, Photo, Stars, btnCircle } from './shared';
import { ScanPicker } from './ScanPicker';
import { HT_TRAILS, type HTTrail } from './data';

export function HTHome() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Nearby');
  const [scanOpen, setScanOpen] = useState(false);
  const filters: { label: string; icon: IconComponent }[] = [
    { label: 'Nearby', icon: Icons.location },
    { label: 'Mountain', icon: Icons.mountain },
    { label: 'Forest', icon: Icons.tree },
    { label: 'Water', icon: Icons.droplet },
    { label: 'Easy', icon: Icons.leaf },
  ];
  const trending = [
    { n: 'Bear Lake Loop', km: '1.1 km · Easy', r: 4.7, p: P.rockies },
    { n: 'Dream Lake', km: '3.4 km · Moderate', r: 4.6, p: P.river },
    { n: 'Wild Basin Trail', km: '8.8 km · Hard', r: 4.4, p: P.pineForest },
  ];

  return (
    <Screen bg={T.shell}>
      <StatusBar color={T.forest}/>
      <div style={{ padding: '8px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Photo src={P.avatar2} style={{ width: 40, height: 40, borderRadius: 999 }}/>
          <div>
            <div style={{ fontSize: 12, color: T.ink60, fontFamily: 'Inter', fontWeight: 500 }}>Good morning</div>
            <div style={{ fontSize: 15, color: T.forest, fontFamily: 'Inter', fontWeight: 700 }}>Sindy</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={btnCircle()}><Icons.search size={18} stroke={T.forest}/></button>
          <button style={btnCircle()}>
            <Icons.bell size={18} stroke={T.forest}/>
            <span style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 999, background: T.terracotta, border: `2px solid ${T.shell}` }}/>
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>
        {/* editorial headline */}
        <div style={{ padding: '4px 22px 18px' }}>
          <div style={{ fontFamily: SERIF, fontSize: 44, lineHeight: '44px', color: T.forest, letterSpacing: -0.5, fontWeight: 400 }}>
            Find new paths<br/><em style={{ fontStyle: 'italic', color: T.moss }}>around you</em>.
          </div>
        </div>

        {/* filter chips */}
        <div style={{ display: 'flex', gap: 8, padding: '0 20px 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <Chip key={f.label} icon={f.icon} active={filter === f.label} onClick={() => setFilter(f.label)}>
              {f.label}
            </Chip>
          ))}
        </div>

        {/* swipeable trail cards */}
        <SwipeCards trails={HT_TRAILS} onOpen={(t) => navigate(`/ht/trail/${t.id}`)}/>

        {/* secondary list */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div style={{ fontFamily: SERIF, fontSize: 26, color: T.forest }}>Trending nearby</div>
            <button style={{ border: 'none', background: 'none', color: T.moss, fontSize: 13, fontWeight: 600, fontFamily: 'Inter', cursor: 'pointer' }}>See all</button>
          </div>
          {trending.map((x, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: i < 2 ? `1px solid ${T.ink10}` : 'none' }}>
              <Photo src={x.p} style={{ width: 64, height: 64, borderRadius: 14, flexShrink: 0 }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 15, color: T.forest }}>{x.n}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 12, color: T.ink60, marginTop: 2 }}>{x.km}</div>
                <div style={{ marginTop: 4 }}><Stars value={x.r} size={11}/></div>
              </div>
              <Icons.chevronRight size={18} stroke={T.ink40} style={{ alignSelf: 'center' }}/>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="home" onScan={() => setScanOpen(true)}/>
      {scanOpen && <ScanPicker onClose={() => setScanOpen(false)}/>}
    </Screen>
  );
}

// Swipeable featured cards
function SwipeCards({ trails, onOpen }: { trails: HTTrail[]; onOpen: (t: HTTrail) => void }) {
  return (
    <div style={{
      display: 'flex', gap: 14, padding: '0 20px 4px',
      overflowX: 'auto', scrollSnapType: 'x mandatory',
      scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
    }}>
      {trails.map(t => (
        <div key={t.id} onClick={() => onOpen(t)} style={{
          width: 270, flexShrink: 0, scrollSnapAlign: 'start',
          background: T.bone, borderRadius: 22, overflow: 'hidden',
          boxShadow: T.shadow.card, cursor: 'pointer',
        }}>
          <div style={{ position: 'relative' }}>
            <Photo src={t.photo} style={{ width: '100%', height: 170 }}/>
            <button style={{
              position: 'absolute', top: 12, right: 12,
              width: 34, height: 34, borderRadius: 999,
              background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icons.heart size={16} stroke={T.forest}/>
            </button>
            <div style={{
              position: 'absolute', bottom: 10, left: 10,
              background: 'rgba(30,40,23,0.75)', color: '#fff',
              padding: '3px 9px', borderRadius: 999,
              fontFamily: 'Inter', fontSize: 10, fontWeight: 700,
              backdropFilter: 'blur(8px)', letterSpacing: 0.3, textTransform: 'uppercase',
            }}>{t.diff}</div>
          </div>
          <div style={{ padding: '12px 14px 16px' }}>
            <div style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: T.forest }}>{t.name}</div>
            <div style={{ fontFamily: 'Inter', fontSize: 11, color: T.ink60, margin: '2px 0 8px' }}>{t.park}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stars value={t.rating} size={11}/>
              <div style={{ display: 'flex', gap: 8, fontFamily: 'Inter', fontSize: 11, color: T.ink60 }}>
                <span>{t.dist}</span><span>·</span><span>{t.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
