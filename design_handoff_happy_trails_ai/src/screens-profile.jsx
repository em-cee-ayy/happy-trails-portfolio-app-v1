// Profile, Social, Onboarding screens
const { TOKENS: T5, PHOTOS: P5, Icons: I5 } = window;

// ──────────────────────────────────────────────────────────
// PROFILE
// ──────────────────────────────────────────────────────────
function Profile({ onTab, activeTab = 'profile' }) {
  return (
    <Screen bg={T5.cream}>
      <StatusBar color={T5.forest}/>
      <div style={{ padding: '4px 16px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={btnCircle()}><I5.chevronLeft size={18} stroke={T5.forest}/></button>
        <button style={btnCircle()}><I5.settings size={18} stroke={T5.forest}/></button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '4px 20px 16px' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 12 }}>
            <Photo src={P5.avatar2} style={{ width: 100, height: 100, borderRadius: 999, border: `4px solid ${T5.bone}`, boxShadow: T5.shadow.card }}/>
            <div style={{
              position: 'absolute', bottom: 2, right: 2,
              background: T5.moss, color: '#fff', width: 28, height: 28, borderRadius: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Inter', fontSize: 11, fontWeight: 700,
              border: `3px solid ${T5.cream}`,
            }}>12</div>
          </div>
          <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 28, color: T5.forest, lineHeight: '30px' }}>Sindy Cooper</div>
          <div style={{ fontFamily: 'Inter', fontSize: 12, color: T5.ink60, marginTop: 3, display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
            <I5.location size={12} stroke={T5.ink60}/> Boulder, Colorado
          </div>
        </div>

        {/* Stats */}
        <div style={{ margin: '0 20px 18px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: T5.bone, borderRadius: 20, padding: '16px 8px', boxShadow: T5.shadow.card }}>
          <BigStat value="47" label="Trails" />
          <BigStat value="312" label="Kilometers" border/>
          <BigStat value="8,240" label="Elev. meters" />
        </div>

        {/* Monthly challenge */}
        <div style={{ margin: '0 20px 18px', background: T5.forest, color: T5.cream, borderRadius: 20, padding: 18, position: 'relative', overflow: 'hidden' }}>
          <svg viewBox="0 0 400 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}>
            <path d="M0 160 L60 100 L110 130 L180 60 L250 100 L320 40 L400 90 L400 200 L0 200 Z" fill={T5.leaf}/>
          </svg>
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.7, marginBottom: 6 }}>April Challenge</div>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22, lineHeight: '24px', marginBottom: 14 }}>100 km in the Rockies</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 700 }}>68.4<span style={{ fontSize: 12, opacity: 0.7 }}> / 100 km</span></div>
              <div style={{ fontFamily: 'Inter', fontSize: 11, opacity: 0.7 }}>12 days left</div>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: '68.4%', height: '100%', background: T5.coral, borderRadius: 3 }}/>
            </div>
          </div>
        </div>

        {/* Achievement badges */}
        <div style={{ padding: '0 20px', marginBottom: 6 }}>
          <div style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 700, color: T5.ink60, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Recent badges</div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {[
              { n: 'Early bird', c: T5.amber, IC: I5.sun },
              { n: 'Summit x10', c: T5.terracotta, IC: I5.mountain },
              { n: 'Bird scout', c: T5.sky, IC: I5.ear },
              { n: 'Trail helper', c: T5.moss, IC: I5.alert },
              { n: 'Botanist', c: T5.coral, IC: I5.leaf },
            ].map((b, i) => (
              <div key={i} style={{ flexShrink: 0, width: 86, textAlign: 'center' }}>
                <div style={{
                  width: 72, height: 72, margin: '0 auto',
                  background: T5.bone, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${b.c}33`, color: b.c,
                  boxShadow: T5.shadow.card,
                }}><b.IC size={30}/></div>
                <div style={{ fontFamily: 'Inter', fontSize: 10, color: T5.ink60, fontWeight: 600, marginTop: 6 }}>{b.n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ padding: '14px 20px 0' }}>
          <div style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 700, color: T5.ink60, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Recent activity</div>
          {[
            { n: 'Emerald Lake Loop', d: 'Yesterday · 5.4 km', p: P5.meadow },
            { n: 'Dream Lake', d: 'Apr 12 · 3.4 km', p: P5.river },
            { n: 'Sky Pond Trail', d: 'Apr 9 · 14.6 km', p: P5.alpineLake },
          ].map((x, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, padding: 10, background: T5.bone, borderRadius: 14,
              boxShadow: T5.shadow.card, marginBottom: 8,
            }}>
              <Photo src={x.p} style={{ width: 50, height: 50, borderRadius: 10, flexShrink: 0 }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: T5.forest }}>{x.n}</div>
                <div style={{ fontFamily: 'Inter', fontSize: 11, color: T5.ink60, marginTop: 2 }}>{x.d}</div>
              </div>
              <I5.chevronRight size={16} stroke={T5.ink40} style={{ alignSelf: 'center' }}/>
            </div>
          ))}
        </div>
      </div>

      <TabBar active={activeTab} onTab={onTab}/>
    </Screen>
  );
}

function BigStat({ value, label, border }) {
  return (
    <div style={{ textAlign: 'center', borderLeft: border ? `1px solid ${T5.ink10}` : 'none', borderRight: border ? `1px solid ${T5.ink10}` : 'none' }}>
      <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 26, color: T5.forest, lineHeight: '28px' }}>{value}</div>
      <div style={{ fontFamily: 'Inter', fontSize: 10, color: T5.ink60, letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: 600, marginTop: 3 }}>{label}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// SOCIAL FEED
// ──────────────────────────────────────────────────────────
function Social({ onTab, activeTab = 'social' }) {
  const [tab, setTab] = React.useState('Feed');
  const [liked, setLiked] = React.useState({});
  const [saved, setSaved] = React.useState({});
  const toggle = (setter, i) => setter(s => ({ ...s, [i]: !s[i] }));
  const posts = [
    {
      user: 'Marcus J.', avatar: P5.avatar1, when: '2h ago', trail: 'Emerald Lake Loop',
      photo: P5.social1, caption: 'First frost of the season. The larches are turning.',
      likes: 184, comments: 12, tags: ['#Emerald Lake', '#Fall', '#Bluebird'],
    },
    {
      user: 'Ava Reese', avatar: P5.avatar4, when: '6h ago', trail: 'Sky Pond',
      photo: P5.social2, caption: 'Saw a marmot! Also: pack a warm jacket — wind is brutal at the top.',
      likes: 97, comments: 5, tags: ['#Sky Pond'],
    },
  ];

  return (
    <Screen bg={T5.paper}>
      <StatusBar color={T5.forest}/>
      <div style={{ padding: '4px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 30, color: T5.forest, lineHeight: '32px' }}>
          From the <em style={{ color: T5.terracotta }}>trail</em>
        </div>
        <button style={btnCircle()}><I5.camera size={18} stroke={T5.forest}/></button>
      </div>
      {/* Tabs */}
      <div style={{ padding: '0 20px', display: 'flex', gap: 18, borderBottom: `1px solid ${T5.ink10}`, marginBottom: 14 }}>
        {['Feed', 'Following', 'Nearby'].map(x => (
          <button key={x} onClick={() => setTab(x)} style={{
            border: 'none', background: 'none', cursor: 'pointer',
            fontFamily: 'Inter', fontSize: 14, fontWeight: tab === x ? 700 : 500,
            color: tab === x ? T5.forest : T5.ink60,
            padding: '4px 0 12px', borderBottom: tab === x ? `2px solid ${T5.forest}` : '2px solid transparent',
            marginBottom: -1,
          }}>{x}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 120 }}>
        {/* Story bar */}
        <div style={{ display: 'flex', gap: 12, padding: '0 20px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { u: 'Your story', a: P5.avatar2, add: true },
            { u: 'Marcus', a: P5.avatar1, on: true },
            { u: 'Ava', a: P5.avatar4, on: true },
            { u: 'Noah', a: P5.avatar3, on: true },
            { u: 'Leah', a: P5.avatar5, on: true },
          ].map((s, i) => (
            <div key={i} style={{ flexShrink: 0, textAlign: 'center', width: 64 }}>
              <div style={{
                width: 62, height: 62, borderRadius: 999, padding: 2,
                background: s.on ? `linear-gradient(135deg, ${T5.terracotta}, ${T5.coral})` : T5.ink10,
                position: 'relative',
              }}>
                <Photo src={s.a} style={{ width: '100%', height: '100%', borderRadius: 999, border: `2px solid ${T5.paper}` }}/>
                {s.add && (
                  <div style={{ position: 'absolute', bottom: -2, right: -2, width: 22, height: 22, borderRadius: 999, background: T5.moss, color: '#fff', border: `2px solid ${T5.paper}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <I5.plus size={12} sw={3}/>
                  </div>
                )}
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: 10, color: T5.ink60, marginTop: 4, fontWeight: 500 }}>{s.u}</div>
            </div>
          ))}
        </div>

        {/* Posts */}
        {posts.map((p, i) => (
          <div key={i} style={{ marginBottom: 18, padding: '0 14px' }}>
            <div style={{ background: T5.bone, borderRadius: 22, overflow: 'hidden', boxShadow: T5.shadow.card }}>
              <div style={{ padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
                <Photo src={p.avatar} style={{ width: 38, height: 38, borderRadius: 999 }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: T5.forest }}>{p.user}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: 11, color: T5.ink60, display: 'flex', gap: 6, alignItems: 'center' }}>
                    <I5.location size={10} stroke={T5.ink60}/> {p.trail} · {p.when}
                  </div>
                </div>
                <button style={{ border: 'none', background: 'none', color: T5.ink60, cursor: 'pointer' }}>
                  <svg width="20" height="6" viewBox="0 0 20 6"><circle cx="3" cy="3" r="2" fill="currentColor"/><circle cx="10" cy="3" r="2" fill="currentColor"/><circle cx="17" cy="3" r="2" fill="currentColor"/></svg>
                </button>
              </div>
              <Photo src={p.photo} style={{ width: '100%', height: 320 }}/>
              <div style={{ padding: 14 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 10 }}>
                  <button onClick={() => toggle(setLiked, i)} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', gap: 4, alignItems: 'center', fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: liked[i] ? T5.coral : T5.forest, transition: 'color .15s' }}>
                    <I5.heart size={20} stroke={liked[i] ? T5.coral : T5.forest} fill={liked[i] ? T5.coral : 'none'}/>
                    <span>{(p.likes ? parseInt(p.likes) : 0) + (liked[i] ? 1 : 0)}</span>
                  </button>
                  <ActionIcon icon={I5.comment} value={p.comments}/>
                  <ActionIcon icon={I5.share}/>
                  <div style={{ flex: 1 }}/>
                  <button onClick={() => toggle(setSaved, i)} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: saved[i] ? T5.terracotta : T5.forest, transition: 'color .15s' }}>
                    <I5.bookmark size={20} stroke={saved[i] ? T5.terracotta : T5.forest} fill={saved[i] ? T5.terracotta : 'none'}/>
                  </button>
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: 13, color: T5.forest, lineHeight: 1.5, marginBottom: 8 }}>
                  <strong>{p.user}</strong> {p.caption}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontFamily: 'Inter', fontSize: 11, color: T5.moss, fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TabBar active={activeTab} onTab={onTab}/>
    </Screen>
  );
}

function ActionIcon({ icon: IC, value }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', color: T5.forest, fontFamily: 'Inter', fontSize: 12, fontWeight: 600 }}>
      <IC size={19} stroke={T5.forest}/>
      {value !== undefined && <span>{value}</span>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// ONBOARDING (3 steps)
// ──────────────────────────────────────────────────────────
function Onboarding({ onFinish }) {
  const [step, setStep] = React.useState(0);
  const slides = [
    {
      title: 'Find your next\ntrail.',
      body: 'Discover thousands of hikes across the Americas — from the Rockies to the Andes.',
      photo: P5.meadow,
    },
    {
      title: 'Nature, named.',
      body: 'Identify birds by sound and plants by sight. Build your own trail journal.',
      photo: P5.pineForest,
    },
    {
      title: 'Hike safely,\ntogether.',
      body: 'Live alerts for wildlife, closures and parking — crowdsourced by real hikers.',
      photo: P5.summit,
    },
  ];
  const s = slides[step];

  return (
    <Screen bg="#000">
      <div style={{ position: 'absolute', inset: 0 }}>
        <Photo src={s.photo} style={{ width: '100%', height: '100%', transition: 'opacity .4s' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(30,40,23,0.3) 40%, rgba(30,40,23,0.95) 100%)' }}/>
      </div>

      <StatusBar color="#fff"/>
      <div style={{ position: 'relative', padding: '4px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 18, color: '#fff' }}>happy trails</div>
        <button onClick={onFinish} style={{ border: 'none', background: 'none', color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter', fontSize: 13, fontWeight: 600 }}>Skip</button>
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{ position: 'relative', padding: '0 28px 40px', color: '#fff' }}>
        <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 50, lineHeight: '52px', whiteSpace: 'pre-line', marginBottom: 14, letterSpacing: -0.5 }}>
          {s.title}
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: 15, lineHeight: 1.5, opacity: 0.85, maxWidth: 320, marginBottom: 32 }}>
          {s.body}
        </div>
        {/* dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              width: i === step ? 28 : 8, height: 8, borderRadius: 4,
              background: i === step ? '#fff' : 'rgba(255,255,255,0.3)', transition: 'all .25s',
            }}/>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => step < slides.length - 1 ? setStep(step + 1) : onFinish?.()} style={{
            flex: 1, height: 56, borderRadius: 18, border: 'none', cursor: 'pointer',
            background: T5.coral, color: '#fff',
            fontFamily: 'Inter', fontSize: 15, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: `0 8px 24px ${T5.coral}66`,
          }}>
            {step < slides.length - 1 ? 'Continue' : 'Get started'}
            <I5.arrowRight size={16}/>
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
          Already have an account? <span style={{ color: '#fff', fontWeight: 600 }}>Sign in</span>
        </div>
      </div>
    </Screen>
  );
}

Object.assign(window, { Profile, Social, Onboarding, BigStat, ActionIcon });
