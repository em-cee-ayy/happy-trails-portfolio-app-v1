// Center-FAB "Scan" action sheet — "What's around you?"
// Ported from the handoff app.jsx ScanPicker; picks route via react-router.
import { useNavigate } from 'react-router-dom';
import { T, SERIF } from './tokens';
import { Icons, type IconComponent } from './icons';

export function ScanPicker({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const opts: { to: string; label: string; sub: string; icon: IconComponent; c: string }[] = [
    { to: '/ht/bird', label: 'Listen', sub: 'Bird ID', icon: Icons.ear, c: T.sky },
    { to: '/ht/alerts', label: 'Alert', sub: 'Drop pin', icon: Icons.alert, c: T.terracotta },
    { to: '/ht/parking', label: 'Parking', sub: 'Live pings', icon: Icons.car, c: T.amber },
  ];
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 90,
      background: 'rgba(30,40,23,0.5)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      paddingBottom: 90,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: T.paper, borderRadius: 28, padding: 18,
        width: 'calc(100% - 32px)', boxShadow: T.shadow.float,
        animation: 'ht-pop .25s cubic-bezier(.2,1.4,.4,1)',
      }}>
        <div style={{ fontFamily: SERIF, fontSize: 22, color: T.forest, padding: '2px 4px 14px' }}>
          What's around you?
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {opts.map(o => {
            const IC = o.icon;
            return (
              <button key={o.to} onClick={() => { onClose(); navigate(o.to); }} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 14, border: 'none', cursor: 'pointer',
                background: T.bone, borderRadius: 16, textAlign: 'left',
                boxShadow: T.shadow.card,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: `${o.c}22`, color: o.c,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><IC size={20}/></div>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 700, color: T.forest }}>{o.label}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 11, color: T.ink60 }}>{o.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <style>{`@keyframes ht-pop { from { transform: translateY(30px) scale(.96); opacity: 0 } to { transform: translateY(0) scale(1); opacity: 1 } }`}</style>
    </div>
  );
}
