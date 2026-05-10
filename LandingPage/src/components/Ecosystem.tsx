import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const nodes = [
  { id: 'vets',       label: 'Vets',       emoji: '🏥', cx: 50, cy: 8,  desc: 'Licensed veterinary partners with verified write access to medical records.' },
  { id: 'shelters',   label: 'Shelters',   emoji: '🏠', cx: 8,  cy: 42, desc: 'Animal shelters can link rescued pets to existing owner profiles instantly.' },
  { id: 'insurance',  label: 'Insurance',  emoji: '🛡️', cx: 92, cy: 42, desc: 'Pet insurance providers auto-access verified health records for claims.' },
  { id: 'groomers',   label: 'Groomers',   emoji: '✂️', cx: 20, cy: 84, desc: 'Groomers see vaccination status and allergy alerts before every appointment.' },
  { id: 'pharmacies', label: 'Pharmacies', emoji: '💊', cx: 80, cy: 84, desc: "Pharmacies verify prescriptions against the pet's medication timeline." },
];

const Ecosystem: React.FC = () => {
  const { dark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [activeId, setActive] = useState<string | null>(null);

  const bg   = dark ? '#0F172A' : '#FAFAF7';
  const text = dark ? '#e2e8f0' : '#1a2e35';
  const sub  = dark ? '#94a3b8' : '#6B7280';
  const active = nodes.find(n => n.id === activeId);

  const SVG_SIZE = 300;

  return (
    <section id="ecosystem" style={{ background: bg, padding: '96px 40px' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#8CC63F', marginBottom: 12 }}>
          The Future Ecosystem
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: text, marginBottom: 16 }}>
          Building The Future Of<br />
          <span style={{ color: '#005F63' }}>Connected Pet Care.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ fontSize: 16, lineHeight: 1.7, color: sub, maxWidth: 500, marginBottom: 64 }}>
          Hover any node to see how PetOlife infrastructure connects every aspect of your pet's care ecosystem.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 64, alignItems: 'center',
        }}>
          {/* Network graph */}
          <div style={{ position: 'relative', width: SVG_SIZE, height: SVG_SIZE, margin: '0 auto' }}>
            {/* SVG Lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 100 100">
              {nodes.map(n => (
                <line key={n.id}
                  x1="50" y1="50" x2={n.cx} y2={n.cy}
                  stroke={activeId === n.id ? '#8CC63F' : (dark ? '#334155' : '#c7f0d0')}
                  strokeWidth={activeId === n.id ? 0.9 : 0.5}
                  strokeDasharray={activeId === n.id ? 'none' : '2 2'}
                  style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                />
              ))}
            </svg>

            {/* Center paw node */}
            <motion.div
              initial={{ scale: 0, x: '-50%', y: '-50%' }} animate={inView ? { scale: 1, x: '-50%', y: '-50%' } : {}} transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                position: 'absolute',
                left: '50%', top: '50%',
                width: 60, height: 60, borderRadius: '50%', zIndex: 2,
                background: 'linear-gradient(135deg, #005F63, #8CC63F)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, boxShadow: '0 4px 20px rgba(0,95,99,0.4)',
              }}
            >🐾</motion.div>

            {/* Outer nodes */}
            {nodes.map((n, i) => {
              const isA = activeId === n.id;
              const posLeft = `${n.cx}%`;
              const posTop  = `${n.cy}%`;
              return (
                <motion.button key={n.id} id={`node-${n.id}`}
                  initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }} animate={inView ? { scale: 1, opacity: 1, x: '-50%', y: '-50%' } : {}} transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  onMouseEnter={() => setActive(n.id)} onMouseLeave={() => setActive(null)}
                  aria-label={n.label}
                  style={{
                    position: 'absolute', left: posLeft, top: posTop,
                    zIndex: 3,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    cursor: 'pointer', border: 'none', background: 'transparent',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%', fontSize: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isA ? 'linear-gradient(135deg, #005F63, #8CC63F)' : (dark ? '#1E293B' : '#fff'),
                    border: isA ? 'none' : `2px solid ${dark ? '#334155' : '#c7f0d0'}`,
                    boxShadow: isA ? '0 4px 16px rgba(0,95,99,0.35)' : '0 2px 8px rgba(0,0,0,0.06)',
                    transform: isA ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.25s ease',
                  }}>{n.emoji}</div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
                    color: isA ? '#8CC63F' : (dark ? '#64748b' : '#6B7280'),
                    transition: 'color 0.25s',
                  }}>{n.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right side — description + stats */}
          <div>
            <motion.div
              key={activeId ?? 'empty'}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              style={{
                borderRadius: 24, padding: '32px 28px', marginBottom: 32,
                background: dark ? '#1E293B' : '#fff',
                border: active ? '1.5px solid rgba(140,198,63,0.35)' : `1.5px dashed ${dark ? '#334155' : 'rgba(0,95,99,0.14)'}`,
                boxShadow: active ? '0 0 40px rgba(140,198,63,0.1)' : 'none',
                minHeight: 140,
              }}
            >
              {active ? (
                <>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>{active.emoji}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: text, marginBottom: 10 }}>{active.label}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: sub }}>{active.desc}</p>
                </>
              ) : (
                <>
                  <p style={{ fontSize: 15, fontWeight: 600, color: text, marginBottom: 8 }}>Protocol vision — network map</p>
                  <p style={{ fontSize: 14, color: sub }}>Hover any connected node to explore how PetOlife scales into infrastructure.</p>
                </>
              )}
            </motion.div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { value: '5+', label: 'Ecosystem Partners' },
                { value: '∞',  label: 'Scalable Nodes'    },
                { value: '1',  label: 'Unified Protocol'  },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 28, fontWeight: 800, color: '#8CC63F', marginBottom: 4 }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: sub }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
