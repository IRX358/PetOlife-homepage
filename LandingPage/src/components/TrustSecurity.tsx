import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lock, CheckCircle, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const cards = [
  { id: 'encrypted', Icon: Lock,         num: '1.',color:'#005F63', title:'🔒 Encrypted Records',      sub:"Your pet's data stays secure.", tooltip:"AES-256 encryption at rest. TLS 1.3 in transit. Zero-knowledge architecture means even we can't read your data." },
  { id: 'verified',  Icon: CheckCircle,  num: '2.',color:'#8CC63F', title:'✅ Verified Veterinarians',  sub:'Only trusted professionals can update records.', tooltip:'Every vet partner is license-verified and onboarded through our trust registry before gaining write access.' },
  { id: 'owner',     Icon: User,         num: '3.',color:'#005F63', title:'👤 Owner Controlled',        sub:'You choose what gets shared.', tooltip:'Granular permission controls. Share only what you choose — and revoke access at any time.' },
];

const TrustSecurity: React.FC = () => {
  const { dark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hov, setHov] = useState<string | null>(null);

  const bg   = dark ? '#111827' : '#DFF5E3';
  const text = dark ? '#e2e8f0' : '#1a2e35';
  const sub  = dark ? '#94a3b8' : '#6B7280';

  return (
    <section id="trust" style={{ background: bg, padding: '96px 40px' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#8CC63F', marginBottom: 12 }}>
          High-Fidelity Website
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: text, marginBottom: 56 }}>
          TRUST + <span style={{ color: '#005F63' }}>SECURITY</span>
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {cards.map((c, i) => {
            const { Icon } = c;
            const isH = hov === c.id;
            return (
              <motion.div key={c.id} id={`trust-${c.id}`}
                initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                onMouseEnter={() => setHov(c.id)} onMouseLeave={() => setHov(null)}
                style={{
                  borderRadius: 20, padding: '28px 24px', cursor: 'default',
                  background: dark ? '#1E293B' : '#ffffff',
                  border: isH ? `1.5px solid ${c.color}` : '1.5px solid transparent',
                  boxShadow: isH ? `0 8px 32px ${c.color}18` : '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s ease',
                }}
              >
                <p style={{ fontSize: 11, fontWeight: 700, color: dark ? '#475569' : '#94a3b8', marginBottom: 16 }}>{c.num}</p>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                    background: dark ? `${c.color}18` : `${c.color}10`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={17} color={c.color} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: text, marginBottom: 6 }}>{c.title}</p>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: sub }}>{c.sub}</p>
                  </div>
                </div>
                {isH && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                      marginTop: 16, padding: '12px 14px', borderRadius: 12, fontSize: 12, lineHeight: 1.6,
                      background: dark ? `${c.color}10` : `${c.color}07`,
                      color: c.color, border: `1px solid ${c.color}22`,
                    }}>
                    {c.tooltip}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSecurity;
