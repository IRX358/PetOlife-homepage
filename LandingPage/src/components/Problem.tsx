import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import dogpfp from '../assets/dogpfp.png';

/* ────────────────────────────────────────────────────────────
   Problem section — visually-driven before/after layout
   LEFT:  Scattered chaos  |  CENTER: Arrow  |  RIGHT: Unified
──────────────────────────────────────────────────────────── */

const fragments = [
  { title: 'Vet Clinic A', sub: 'Vaccines only', emoji: '💉', rotate: -6 },
  { title: 'Clinic B',     sub: 'Surgery notes', emoji: '🏥', rotate: 3  },
  { title: 'Owner Diary',  sub: 'Lost papers',   emoji: '📋', rotate: -4 },
  { title: 'Emergency ER', sub: 'No history!',   emoji: '🚨', rotate: 5  },
];

const Problem: React.FC = () => {
  const { dark } = useTheme();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const bg      = dark ? '#0F172A' : '#FAFAF7';
  const cardBg  = dark ? '#1E293B' : '#ffffff';
  const text    = dark ? '#e2e8f0' : '#1a2e35';
  const muted   = dark ? '#64748b' : '#94a3b8';

  return (
    <section id="about" style={{ background: bg, padding: '96px 40px' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#8CC63F', marginBottom: 12 }}
        >The Problem</motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: text, marginBottom: 12 }}
        >
          Pet Care Shouldn't Be <span style={{ color: '#005F63' }}>Scattered.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.15 }}
          style={{ fontSize: 16, lineHeight: 1.7, color: dark ? '#94a3b8' : '#6B7280', maxWidth: 520, marginBottom: 56 }}
        >
          Your pet's health data is fragmented across clinics, papers, and memories.
          Critical information is unreachable when it matters most.
        </motion.p>

        {/* ── Main visual: 3-column layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: 24, alignItems: 'center',
        }}>

          {/* ──── LEFT: Chaos ──── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Label chip */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20,
              padding: '5px 14px', borderRadius: 999,
              background: 'rgba(239,68,68,0.1)', color: '#ef4444',
              fontSize: 12, fontWeight: 700, letterSpacing: 1,
            }}>
              <span style={{ fontSize: 14 }}>⚠️</span> BEFORE PETOLIFE
            </div>

            {/* Scattered cards — overlapping grid */}
            <div style={{ position: 'relative', minHeight: 340, marginBottom: 12 }}>

              {/* Dashed connection lines (SVG behind cards) */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.35 }}>
                <line x1="25%" y1="22%" x2="75%" y2="55%" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4"/>
                <line x1="75%" y1="22%" x2="25%" y2="55%" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4"/>
                <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 5"/>
              </svg>

              {/* 4 scattered fragment cards */}
              {fragments.map((f, i) => {
                const positions = [
                  { top: '4%',  left: '2%',  },
                  { top: '4%',  left: '52%', },
                  { top: '54%', left: '2%',  },
                  { top: '54%', left: '52%', },
                ];
                const pos = positions[i];
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, scale: 0.7, rotate: f.rotate * 2 }}
                    animate={inView ? { opacity: 1, scale: 1, rotate: f.rotate } : {}}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.1, type: 'spring', stiffness: 100 }}
                    style={{
                      position: 'absolute',
                      top: pos.top, left: pos.left, width: '44%',
                      borderRadius: 16, padding: '16px 14px',
                      background: cardBg,
                      border: '1.5px dashed rgba(239,68,68,0.3)',
                      boxShadow: dark
                        ? '0 4px 16px rgba(0,0,0,0.3)'
                        : '0 4px 16px rgba(239,68,68,0.07)',
                    }}
                  >
                    {/* Red X badge */}
                    <div style={{
                      position: 'absolute', top: -8, right: -8,
                      width: 22, height: 22, borderRadius: '50%',
                      background: '#ef4444', color: '#fff',
                      fontSize: 11, fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(239,68,68,0.5)',
                    }}>✕</div>

                    <div style={{ fontSize: 24, marginBottom: 6 }}>{f.emoji}</div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: text, marginBottom: 2 }}>{f.title}</p>
                    <p style={{ fontSize: 11, color: '#ef4444' }}>{f.sub}</p>
                  </motion.div>
                );
              })}

              {/* "No connection" label */}
              <motion.div
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
                style={{
                  position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                  fontSize: 11, fontStyle: 'italic', color: '#ef4444',
                  background: dark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.05)',
                  padding: '4px 12px', borderRadius: 999,
                  border: '1px solid rgba(239,68,68,0.2)', whiteSpace: 'nowrap',
                }}
              >No unified source of truth</motion.div>
            </div>
          </motion.div>

          {/* ──── CENTER: Transform arrow ──── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.6, type: 'spring' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '0 8px' }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg, #005F63, #8CC63F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 28px rgba(0,95,99,0.4)',
              fontSize: 22, color: '#fff', fontWeight: 700,
            }}>→</div>
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
              color: '#8CC63F', textTransform: 'uppercase', textAlign: 'center',
            }}>PetOlife</span>
          </motion.div>

          {/* ──── RIGHT: Unified identity ──── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Label chip */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20,
              padding: '5px 14px', borderRadius: 999,
              background: 'rgba(140,198,63,0.12)', color: '#8CC63F',
              fontSize: 12, fontWeight: 700, letterSpacing: 1,
            }}>
              <span style={{ fontSize: 14 }}>✅</span> WITH PETOLIFE
            </div>

            {/* Unified card */}
            <div style={{
              borderRadius: 24,
              background: dark
                ? 'linear-gradient(145deg, #1E293B, #0a1628)'
                : 'linear-gradient(145deg, #f0fdf4, #ffffff)',
              border: '2px solid rgba(140,198,63,0.4)',
              boxShadow: '0 0 48px rgba(140,198,63,0.15)',
              overflow: 'hidden',
            }}>
              {/* Green header band */}
              <div style={{
                background: 'linear-gradient(90deg, #005F63, #8CC63F)',
                padding: '12px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>🐾 PetOlife Identity</span>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '3px 10px',
                }}>
                  <div className="blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                  <span style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>Live</span>
                </div>
              </div>

              <div style={{ padding: '20px' }}>
                {/* Pet avatar row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, boxShadow: '0 4px 12px rgba(251,191,36,0.3)',
                  }}><img src={dogpfp} alt="Bujji" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} /></div>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 700, color: text, marginBottom: 2 }}>Bujji</p>
                    <p style={{ fontSize: 12, color: muted }}>Golden Retriever · 4 yrs</p>
                    <p style={{ fontSize: 11, color: '#8CC63F', fontWeight: 600 }}>ID: PO-2024-00142</p>
                  </div>
                </div>

                {/* Data rows */}
                {[
                  { icon: '💉', label: 'Vaccines',      value: 'Up to Date',     green: true },
                  { icon: '🩸', label: 'Blood Type',    value: 'DEA 1.1+',       green: false },
                  { icon: '🦷', label: 'Last Checkup',  value: 'Dec 28, 2024',   green: false },
                  { icon: '📞', label: 'Emergency',     value: '+91 98765 43210', green: false },
                  { icon: '🔒', label: 'Security',      value: 'Owner verified',  green: true },
                ].map((row, i) => (
                  <motion.div key={row.label}
                    initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.07 }}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: i < 4 ? `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,95,99,0.06)'}` : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 14 }}>{row.icon}</span>
                      <span style={{ fontSize: 12, color: muted }}>{row.label}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: row.green ? '#8CC63F' : text }}>
                      {row.value}
                    </span>
                  </motion.div>
                ))}

                {/* QR badge */}
                <div style={{
                  marginTop: 14, borderRadius: 14, padding: '10px 14px',
                  background: dark ? 'rgba(140,198,63,0.07)' : 'rgba(140,198,63,0.08)',
                  border: '1px solid rgba(140,198,63,0.25)',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <rect x="1" y="1" width="8" height="8" rx="1" fill="none" stroke="#005F63" strokeWidth="1.5"/>
                      <rect x="3" y="3" width="4" height="4" rx="0.5" fill="#8CC63F"/>
                      <rect x="13" y="1" width="8" height="8" rx="1" fill="none" stroke="#005F63" strokeWidth="1.5"/>
                      <rect x="15" y="3" width="4" height="4" rx="0.5" fill="#8CC63F"/>
                      <rect x="1" y="13" width="8" height="8" rx="1" fill="none" stroke="#005F63" strokeWidth="1.5"/>
                      <rect x="3" y="15" width="4" height="4" rx="0.5" fill="#8CC63F"/>
                      <rect x="13" y="13" width="4" height="4" rx="0.5" fill="#005F63"/>
                      <rect x="18" y="13" width="3" height="3" rx="0.5" fill="#8CC63F"/>
                      <rect x="13" y="18" width="4" height="3" rx="0.5" fill="#005F63"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: text }}>Emergency QR</p>
                    <p style={{ fontSize: 11, color: muted }}>Scan · No login needed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9 }}
          style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0,
            marginTop: 56, borderRadius: 20,
            background: dark ? '#1E293B' : '#fff',
            border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,95,99,0.08)',
            overflow: 'hidden',
          }}
        >
          {[
            { val: '∞', label: 'Data Sources Unified',    col: '#005F63' },
            { val: '1',  label: 'Identity Per Pet',        col: '#8CC63F' },
            { val: '0s', label: 'Emergency Access Delay',  col: '#005F63' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              flex: '1 1 200px', padding: '24px 20px', textAlign: 'center',
              borderRight: i < 2 ? (dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,95,99,0.07)') : 'none',
            }}>
              <p style={{ fontSize: 32, fontWeight: 900, color: stat.col, marginBottom: 4 }}>{stat.val}</p>
              <p style={{ fontSize: 12, color: muted }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
