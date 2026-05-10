import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FinalCTA: React.FC<{ onCreateId: () => void }> = ({ onCreateId }) => {
  const { dark } = useTheme();
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const bg   = dark ? '#111827' : '#DFF5E3';
  const text = dark ? '#e2e8f0' : '#005F63';
  const sub  = dark ? '#94a3b8' : '#6B7280';

  return (
    <section id="cta" style={{ background: bg, padding: '120px 40px' }}>
      <div ref={ref} style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>🐾</div>
          <h2 className="font-hand" style={{ fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 700, color: text, marginBottom: 8, lineHeight: 1.1 }}>
            A Lifetime Of Care
          </h2>
          <h2 className="font-hand" style={{ fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 700, color: '#8CC63F', marginBottom: 24, lineHeight: 1.1 }}>
            Starts With Identity.
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: sub, maxWidth: 480, margin: '0 auto 40px' }}>
            Join the future of trusted pet care. Create your pet's unified digital identity today.
          </p>

          <button id="final-cta-btn" onClick={onCreateId}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '18px 48px', borderRadius: 999, border: 'none', cursor: 'pointer',
              background: '#005F63', color: '#fff',
              fontSize: 18, fontWeight: 600,
              boxShadow: '0 8px 32px rgba(0,95,99,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(0,95,99,0.45)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(0,95,99,0.35)'; }}
          >
            <Sparkles size={20} />
            Create A Pet ID
            <ArrowRight size={20} />
          </button>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 28, marginTop: 40 }}>
            {['🆓 Free to start', '🔒 Secure by design', '⚡ Instant setup', '🌐 Works globally'].map(b => (
              <span key={b} style={{ fontSize: 13, color: sub }}>{b}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
