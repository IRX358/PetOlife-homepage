import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const fragments = [
  { title: 'Vet Clinic A',  sub: '→ Vaccines',     emoji: '💉' },
  { title: 'Clinic B',      sub: '→ Surgery',       emoji: '🏥' },
  { title: 'Owner',         sub: '→ Lost records',  emoji: '📋' },
  { title: 'Emergency',     sub: '→ No history',    emoji: '🚨' },
];

const Problem: React.FC = () => {
  const { dark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const bg     = dark ? '#0F172A' : '#FAFAF7';
  const cardBg = dark ? '#1E293B' : '#f1f5f9';
  const text   = dark ? '#e2e8f0' : '#1a2e35';
  const sub    = dark ? '#64748b' : '#94a3b8';
  const dashed = dark ? '#334155' : '#cbd5e1';

  return (
    <section id="about" style={{ background: bg, padding: '96px 40px' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#8CC63F', marginBottom: 12 }}>
          The Problem
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: text, marginBottom: 16 }}>
          Pet Care Shouldn't Be <span style={{ color: '#005F63' }}>Scattered.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
          style={{ fontSize: 16, lineHeight: 1.7, color: dark ? '#94a3b8' : '#6B7280', maxWidth: 520, marginBottom: 64 }}>
          Today, your pet's health data is fragmented across clinics, papers, and memories.
          Critical information is unreachable when it matters most.
        </motion.p>

        {/* Visual */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
          {/* Fragment cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 16, flex: '1 1 340px', minWidth: 280,
          }}>
            {fragments.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, scale: 0.85, rotate: i % 2 === 0 ? -2 : 2 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: i % 2 === 0 ? -0.8 : 0.8 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                style={{
                  position: 'relative', borderRadius: 16, padding: '20px 18px',
                  background: cardBg, border: `1.5px dashed ${dashed}`,
                }}
              >
                <div style={{
                  position: 'absolute', top: -8, right: -8, width: 20, height: 20,
                  borderRadius: '50%', background: '#ef4444',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: '#fff', fontWeight: 700,
                }}>✕</div>
                <div style={{ fontSize: 26, marginBottom: 6 }}>{f.emoji}</div>
                <p style={{ fontWeight: 600, fontSize: 14, color: text, marginBottom: 2 }}>{f.title}</p>
                <p style={{ fontSize: 12, color: sub }}>{f.sub}</p>
              </motion.div>
            ))}
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
              style={{ gridColumn: '1/-1', textAlign: 'center', fontSize: 11, color: sub, fontStyle: 'italic' }}>
              disconnected data.
            </motion.p>
          </div>

          {/* Arrow */}
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.55 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'linear-gradient(135deg, #005F63, #8CC63F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, color: '#fff', boxShadow: '0 4px 20px rgba(0,95,99,0.3)',
            }}>→</div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#8CC63F', letterSpacing: 1 }}>PETOLIFE</span>
          </motion.div>

          {/* Unified card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              flex: '0 0 auto', borderRadius: 28, padding: '40px 36px', textAlign: 'center',
              background: dark ? 'linear-gradient(145deg, #1E293B, #0F172A)' : 'linear-gradient(145deg, #f0fdf4, #fff)',
              border: '2px solid rgba(140,198,63,0.45)',
              boxShadow: '0 0 48px rgba(140,198,63,0.14)',
              minWidth: 200,
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(140,198,63,0.14)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, margin: '0 auto 16px',
            }}>✅</div>
            <p style={{ fontWeight: 700, fontSize: 18, color: text, marginBottom: 4 }}>One Pet,</p>
            <p style={{ fontWeight: 700, fontSize: 18, color: text, marginBottom: 4 }}>One Identity,</p>
            <p style={{ fontWeight: 700, fontSize: 18, color: '#8CC63F' }}>One Trusted Timeline</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
