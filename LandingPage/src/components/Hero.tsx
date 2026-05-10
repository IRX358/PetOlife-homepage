import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import IdentityCard from './IdentityCard';

const Leaf: React.FC<{ style?: React.CSSProperties; className?: string }> = ({ style, className }) => (
  <svg width="30" height="30" viewBox="0 0 32 32" fill="none" className={className} style={style}>
    <path d="M4 28 C4 28 8 12 28 4 C28 4 20 24 4 28Z" fill="#8CC63F" opacity="0.5"/>
    <path d="M4 28 L28 4" stroke="#8CC63F" strokeWidth="1" opacity="0.4"/>
  </svg>
);

const Hero: React.FC<{ onCreateId: () => void }> = ({ onCreateId }) => {
  const { dark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const heroBg = dark
    ? 'linear-gradient(160deg, #0F172A 0%, #111827 60%, #0F172A 100%)'
    : 'linear-gradient(160deg, #FAFAF7 0%, #DFF5E3 50%, #FAFAF7 100%)';

  const handlePawClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'paw-ripple';
    ripple.style.left = `${e.clientX - rect.left - 10}px`;
    ripple.style.top  = `${e.clientY - rect.top - 10}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
    onCreateId();
  };

  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden', paddingTop: 80,
      background: heroBg,
    }}>
      {/* Background blobs */}
      <div style={{
        position: 'absolute', width: 500, height: 500,
        top: -120, left: -120, borderRadius: '50%',
        filter: 'blur(80px)', opacity: 0.18,
        background: dark ? '#005F63' : '#8CC63F',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 380, height: 380,
        bottom: -80, right: 60, borderRadius: '50%',
        filter: 'blur(80px)', opacity: 0.15,
        background: dark ? '#8CC63F' : '#005F63',
        pointerEvents: 'none',
      }} />

      {/* Floating leaves */}
      <Leaf className="float-a" style={{ position: 'absolute', top: '14%', left: '6%', opacity: 0.55 }} />
      <Leaf className="float-b" style={{ position: 'absolute', top: '62%', left: '4%', opacity: 0.38, transform: 'rotate(40deg)' }} />
      <Leaf className="float-a" style={{ position: 'absolute', top: '22%', right: '10%', opacity: 0.45, transform: 'rotate(-30deg)' }} />
      <Leaf className="float-b" style={{ position: 'absolute', bottom: '18%', right: '7%', opacity: 0.32, transform: 'rotate(15deg)' }} />

      {/* Connected nodes decoration */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }}>
        <circle cx="12%" cy="28%" r="5" fill="#005F63" />
        <circle cx="32%" cy="72%" r="4" fill="#8CC63F" />
        <circle cx="82%" cy="18%" r="5" fill="#005F63" />
        <circle cx="88%" cy="68%" r="4" fill="#8CC63F" />
        <line x1="12%" y1="28%" x2="32%" y2="72%" stroke="#005F63" strokeWidth="1" strokeDasharray="5 5"/>
        <line x1="82%" y1="18%" x2="88%" y2="68%" stroke="#8CC63F" strokeWidth="1" strokeDasharray="5 5"/>
      </svg>

      {/* Main content */}
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 64, alignItems: 'center',
        }}>
          {/* LEFT */}
          <div style={{ zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '7px 18px', borderRadius: 999, marginBottom: 28,
                background: dark ? 'rgba(140,198,63,0.14)' : 'rgba(0,95,99,0.08)',
                color: dark ? '#8CC63F' : '#005F63',
                fontSize: 13, fontWeight: 600,
              }}
            >
              <Sparkles size={13} />
              Unified Pet Identity Protocol
            </motion.div>

            <motion.h1
              className="font-hand"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: 'clamp(44px, 6vw, 72px)',
                fontWeight: 700, lineHeight: 1.1, marginBottom: 24,
                color: dark ? '#e2e8f0' : '#005F63',
              }}
            >
              Every Pet Deserves{' '}
              <span style={{ color: '#8CC63F' }}>an Identity.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: 18, lineHeight: 1.7, marginBottom: 36,
                color: dark ? '#94a3b8' : '#4a5568', maxWidth: 480,
              }}
            >
              A unified digital identity connecting pets, parents, and veterinarians
              through trusted data — accessible anywhere, anytime.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 44 }}
            >
              <button
                id="hero-create-id"
                onClick={handlePawClick}
                style={{
                  position: 'relative', overflow: 'hidden',
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: '#005F63', color: '#fff', border: 'none',
                  borderRadius: 999, padding: '15px 34px',
                  fontSize: 16, fontWeight: 600, cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(0,95,99,0.35)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = ''; }}
              >
                Create Pet ID <ArrowRight size={16} />
              </button>
              <a href="#protocol" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: dark ? '#8CC63F' : '#005F63',
                border: `2px solid ${dark ? '#8CC63F' : '#005F63'}`,
                borderRadius: 999, padding: '13px 32px',
                fontSize: 16, fontWeight: 600, textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = dark ? '#8CC63F' : '#005F63'; el.style.color = dark ? '#0F172A' : '#fff'; el.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = dark ? '#8CC63F' : '#005F63'; el.style.transform = ''; }}
              >
                See How It Works
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}
            >
              {[
                { icon: '🔒', label: 'Healthcare-Grade Security' },
                { icon: '⚡', label: 'Instant Emergency Access' },
                { icon: '🌐', label: 'Connected Ecosystem' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: dark ? '#64748b' : '#6B7280' }}>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Identity Card */}
          <div style={{ display: 'flex', justifyContent: 'center', zIndex: 2 }}>
            <IdentityCard onClick={onCreateId} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}
      >
        <span style={{ fontSize: 11, color: '#6B7280', letterSpacing: 1 }}>SCROLL</span>
        <div style={{
          width: 1, height: 40, borderRadius: 1,
          background: 'linear-gradient(to bottom, #8CC63F, transparent)',
        }} />
      </motion.div>
    </section>
  );
};

export default Hero;
