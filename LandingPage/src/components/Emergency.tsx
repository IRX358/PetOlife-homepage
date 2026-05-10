import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { emergencyData } from '../data/pets';
import dogpfp from '../assets/dogpfp.png';

const Emergency: React.FC = () => {
  const { dark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [activated, setActivated] = useState(false);

  const bg   = dark ? '#0F172A' : '#FAFAF7';
  const text = dark ? '#e2e8f0' : '#1a2e35';
  const sub  = dark ? '#94a3b8' : '#6B7280';

  return (
    <section id="emergency" style={{ background: bg, padding: '96px 40px' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 64, alignItems: 'center',
        }}>
          {/* LEFT — Copy */}
          <div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#ef4444', marginBottom: 12 }}>
              Emergency Mode
            </motion.p>
            <motion.h2 className="font-hand" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: text, marginBottom: 20, lineHeight: 1.1 }}>
              Because Emergencies<br />
              <span style={{ color: '#ef4444' }}>Don't Wait.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
              style={{ fontSize: 16, lineHeight: 1.7, color: sub, maxWidth: 440, marginBottom: 24 }}>
              When every second matters, trusted information saves lives.
              A single QR scan gives any veterinarian immediate access to
              critical medical data — even without app login.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.28 }}>
              <div style={{
                display: 'inline-block', padding: '10px 18px', borderRadius: 14, marginBottom: 32,
                background: 'rgba(239,68,68,0.08)', color: '#ef4444',
                border: '1px solid rgba(239,68,68,0.2)', fontSize: 13, fontWeight: 600,
              }}>
                ⚡ Accessible even during emergencies — no login required.
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.35 }}>
              <button id="activate-emergency" onClick={() => setActivated(a => !a)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '15px 32px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  fontSize: 16, fontWeight: 600, color: '#fff',
                  background: activated ? '#b91c1c' : 'linear-gradient(135deg, #ef4444, #dc2626)',
                  boxShadow: activated ? '0 0 28px rgba(239,68,68,0.5)' : '0 4px 20px rgba(239,68,68,0.3)',
                  transition: 'all 0.3s',
                }}>
                {activated ? '✓ Emergency Active' : 'Activate Emergency Access'}
              </button>
            </motion.div>
          </div>

          {/* RIGHT — Phone mockup */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              {/* Pulse rings */}
              {activated && (
                <>
                  <div className="ping" style={{
                    position: 'absolute', inset: 0, borderRadius: 48,
                    background: 'rgba(239,68,68,0.15)',
                  }} />
                  <div className="ping" style={{
                    position: 'absolute', inset: 0, borderRadius: 48,
                    background: 'rgba(239,68,68,0.08)',
                    animationDelay: '0.6s',
                  }} />
                </>
              )}

              {/* Phone body */}
              <div style={{
                position: 'relative', width: 280, borderRadius: 48,
                padding: 8, boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
                background: dark ? '#1E293B' : '#1a2e35',
                border: activated ? '3px solid #ef4444' : '3px solid #334155',
                transition: 'border-color 0.3s',
              }}>
                {/* Notch */}
                <div style={{
                  height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 0,
                }}>
                  <div style={{
                    width: 80, height: 16, borderRadius: '0 0 16px 16px',
                    background: dark ? '#0F172A' : '#111827',
                  }} />
                </div>

                {/* Screen */}
                <div style={{
                  borderRadius: 40, overflow: 'hidden', padding: '20px 18px',
                  background: dark ? '#0F172A' : '#f8fafc',
                  minHeight: 460,
                }}>
                  {/* Status bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: activated ? '#ef4444' : '#8CC63F' }}>
                      {activated ? '🚨 EMERGENCY' : '🐾 PetOlife ID'}
                    </span>
                    <span style={{ fontSize: 11, color: '#6B7280' }}>9:41</span>
                  </div>

                  {/* Pet info */}
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{
                      width: 60, height: 60, borderRadius: 18, marginBottom: 10, margin: '0 auto 10px',
                      background: activated ? 'rgba(239,68,68,0.12)' : 'rgba(140,198,63,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30,
                    }}><img src={dogpfp} alt="Bujji" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} /></div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: dark ? '#e2e8f0' : '#1a2e35', marginBottom: 2 }}>Bujji</h3>
                    <p style={{ fontSize: 12, color: '#6B7280' }}>Golden Retriever · DEA 1.1+</p>
                  </div>

                  <AnimatePresence mode="wait">
                    {!activated ? (
                      <motion.div key="qr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div style={{
                          display: 'flex', justifyContent: 'center', marginBottom: 12,
                        }}>
                          <div className="glow-border" style={{
                            width: 100, height: 100, borderRadius: 16,
                            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                              <rect x="4" y="4" width="22" height="22" rx="3" fill="none" stroke="#005F63" strokeWidth="2"/>
                              <rect x="9" y="9" width="12" height="12" rx="1" fill="#8CC63F"/>
                              <rect x="46" y="4" width="22" height="22" rx="3" fill="none" stroke="#005F63" strokeWidth="2"/>
                              <rect x="51" y="9" width="12" height="12" rx="1" fill="#8CC63F"/>
                              <rect x="4" y="46" width="22" height="22" rx="3" fill="none" stroke="#005F63" strokeWidth="2"/>
                              <rect x="9" y="51" width="12" height="12" rx="1" fill="#8CC63F"/>
                              <rect x="32" y="4" width="6" height="6" rx="1" fill="#005F63"/>
                              <rect x="32" y="12" width="6" height="6" rx="1" fill="#8CC63F"/>
                              <rect x="32" y="32" width="6" height="6" rx="1" fill="#005F63"/>
                              <rect x="40" y="32" width="6" height="6" rx="1" fill="#8CC63F"/>
                              <rect x="48" y="32" width="6" height="6" rx="1" fill="#005F63"/>
                              <rect x="40" y="46" width="14" height="14" rx="2" fill="#005F63"/>
                              <rect x="58" y="46" width="6" height="6" rx="1" fill="#8CC63F"/>
                              <rect x="32" y="58" width="6" height="6" rx="1" fill="#8CC63F"/>
                            </svg>
                          </div>
                        </div>
                        <p style={{ textAlign: 'center', fontSize: 11, color: '#6B7280' }}>Scan for emergency access</p>
                      </motion.div>
                    ) : (
                      <motion.div key="info" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <ERow label="⚠️ ALLERGIES"   value={emergencyData.allergies.join(', ')}   critical />
                          <ERow label="💊 MEDICATIONS"  value={emergencyData.medications[0]}          />
                          <ERow label="🩸 BLOOD TYPE"   value={emergencyData.bloodType}               />
                          <ERow label="📞 OWNER"        value={emergencyData.emergencyContact.phone}  />
                          <ERow label="🏥 CLINIC"       value={emergencyData.clinic.phone}            />
                          <div style={{
                            borderRadius: 12, padding: '10px 12px', fontSize: 10, lineHeight: 1.5,
                            background: 'rgba(239,68,68,0.09)', color: '#ef4444',
                            border: '1px solid rgba(239,68,68,0.2)',
                          }}>
                            ⛔ {emergencyData.criticalNotes}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ERow: React.FC<{ label: string; value: string; critical?: boolean }> = ({ label, value, critical }) => (
  <div style={{
    borderRadius: 12, padding: '10px 12px',
    background: critical ? 'rgba(239,68,68,0.07)' : 'rgba(255,255,255,0.05)',
    border: `1px solid ${critical ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.07)'}`,
  }}>
    <p style={{ fontSize: 10, fontWeight: 700, color: critical ? '#ef4444' : '#8CC63F', marginBottom: 2 }}>{label}</p>
    <p style={{ fontSize: 11, fontWeight: 600, color: '#e2e8f0' }}>{value}</p>
  </div>
);

export default Emergency;
