import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Clock, Zap, Network } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const cards = [
  {
    id: 'timeline', Icon: Clock, color: '#005F63', bgLight: '#DFF5E3',
    title: 'Medical Timeline',
    subtitle: 'Every vaccine, checkup, and treatment in one secure timeline.',
    visual: (
      <div style={{ marginTop: 20 }}>
        {[
          { dot: '#8CC63F', label: 'Vaccines',    size: 12 },
          { dot: '#005F63', label: 'Checkups',    size: 10 },
          { dot: '#94a3b8', label: 'Treatments',  size: 8  },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 12 }}>
              <div style={{ width: item.size, height: item.size, borderRadius: '50%', background: item.dot }} />
              {i < 2 && <div style={{ width: 1, height: 12, background: `${item.dot}50`, marginTop: 2 }} />}
            </div>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#1a2e35' }}>{item.label}</span>
          </div>
        ))}
      </div>
    ),
    detail: "Your pet's complete health story — from first vaccine to latest checkup — in one chronological, secure record.",
  },
  {
    id: 'emergency', Icon: Zap, color: '#8CC63F', bgLight: '#f0fdf4',
    title: 'Emergency Access',
    subtitle: 'Critical information accessible instantly during emergencies.',
    visual: (
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 60, height: 96, borderRadius: 20,
            background: 'linear-gradient(145deg, #005F63, #8CC63F)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 8, boxShadow: '0 8px 24px rgba(0,95,99,0.3)',
          }}>
            <span style={{ fontSize: 24 }}>📱</span>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, color: '#fff', fontWeight: 700,
            }}>QR</div>
          </div>
          <div style={{
            position: 'absolute', top: -4, right: -4, width: 20, height: 20,
            borderRadius: '50%', background: '#8CC63F',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10,
          }}>⚡</div>
        </div>
      </div>
    ),
    detail: 'Scan a QR code and instantly see allergies, medications, blood type, and emergency contacts — no app login needed.',
  },
  {
    id: 'ecosystem', Icon: Network, color: '#005F63', bgLight: '#DFF5E3',
    title: 'Trusted Ecosystem',
    subtitle: 'Connected across veterinarians, shelters, and caregivers.',
    visual: (
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        <svg width="130" height="90" viewBox="0 0 130 90">
          <circle cx="65" cy="45" r="16" fill="#8CC63F" opacity="0.9"/>
          <text x="65" y="50" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">🐾</text>
          {[{x:18,y:22,e:'🏥'},{x:112,y:22,e:'🏠'},{x:18,y:68,e:'💊'},{x:112,y:68,e:'👤'}].map((n,i)=>(
            <g key={i}>
              <line x1="65" y1="45" x2={n.x} y2={n.y} stroke="#005F63" strokeWidth="1.2" opacity="0.35" strokeDasharray="3 3"/>
              <circle cx={n.x} cy={n.y} r="12" fill="#DFF5E3" stroke="#005F63" strokeWidth="1.5"/>
              <text x={n.x} y={n.y+5} textAnchor="middle" fontSize="10">{n.e}</text>
            </g>
          ))}
        </svg>
      </div>
    ),
    detail: 'PetOlife is infrastructure — connecting vets, shelters, insurance, groomers, and pharmacies through one trusted identity layer.',
  },
];

const WhatIsIdentity: React.FC = () => {
  const { dark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [expanded, setExpanded] = useState<string | null>(null);

  const bg   = dark ? '#111827' : '#DFF5E3';
  const text = dark ? '#e2e8f0' : '#1a2e35';
  const sub  = dark ? '#94a3b8' : '#6B7280';

  return (
    <section id="protocol" style={{ background: bg, padding: '96px 40px' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#8CC63F', marginBottom: 12 }}>
          What is a Pet Identity?
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: text, marginBottom: 16 }}>
          What is a Pet <span style={{ color: '#005F63' }}>IDENTITY?</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          style={{ fontSize: 16, lineHeight: 1.7, color: sub, maxWidth: 500, marginBottom: 56 }}>
          Think of it as a passport, health record, and emergency card — all in one. Click a card to learn more.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {cards.map((card, i) => {
            const { Icon } = card;
            const open = expanded === card.id;
            return (
              <motion.div
                key={card.id}
                id={`card-${card.id}`}
                initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                onClick={() => setExpanded(open ? null : card.id)}
                style={{
                  borderRadius: 24, padding: '28px 24px', cursor: 'pointer',
                  background: dark ? (open ? 'rgba(0,95,99,0.18)' : 'rgba(255,255,255,0.04)') : '#ffffff',
                  border: open ? `2px solid ${card.color}` : `1.5px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,95,99,0.07)'}`,
                  boxShadow: open ? `0 0 28px ${card.color}20` : '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s ease',
                }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,95,99,0.12)' } as never}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 14, marginBottom: 18,
                  background: dark ? `${card.color}20` : card.bgLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} color={card.color} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: text, marginBottom: 10 }}>{card.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: sub }}>{card.subtitle}</p>
                {card.visual}
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: 'hidden', marginTop: 16, paddingTop: 16, borderTop: `1px solid ${card.color}30` }}
                    >
                      <p style={{ fontSize: 14, lineHeight: 1.65, fontWeight: 500, color: card.color }}>{card.detail}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIsIdentity;
