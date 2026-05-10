import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Share2, AlertTriangle, QrCode, Download, CheckCircle, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { petProfile } from '../data/pets';
import { timeline } from '../data/timeline';
import dogpfp from '../assets/dogpfp.png';

const typeColor: Record<string, string> = {
  vaccine: '#8CC63F', checkup: '#005F63', treatment: '#0891b2',
  emergency: '#ef4444', grooming: '#a855f7',
};
const typeLabel: Record<string, string> = {
  vaccine: '💉 Vaccine', checkup: '🩺 Checkup', treatment: '🦷 Treatment',
  emergency: '🚨 Emergency', grooming: '✂️ Grooming',
};

const LiveDemo: React.FC = () => {
  const { dark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [toast, setToast]     = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3200); };

  const bg        = dark ? '#111827' : '#DFF5E3';
  const panelBg   = dark ? '#1E293B' : '#ffffff';
  const textMain  = dark ? '#e2e8f0' : '#1a2e35';
  const textSub   = dark ? '#94a3b8' : '#6B7280';
  const divider   = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,95,99,0.07)';
  const panelBorder = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,95,99,0.08)';

  const actions = [
    { id: 'share',    Icon: Share2,        label: 'Share Records',    toast: '📤 Secure record link copied!', accent: false },
    { id: 'emergency',Icon: AlertTriangle, label: 'Emergency Mode',   toast: '🚨 Emergency profile activated!', accent: true },
    { id: 'qr',       Icon: QrCode,        label: 'Generate QR',      toast: '✅ QR code generated!', accent: false },
    { id: 'download', Icon: Download,      label: 'Download Passport', toast: '📄 Passport downloaded!', accent: false },
  ];

  const panel = (children: React.ReactNode) => (
    <div style={{
      borderRadius: 24, padding: '28px 24px',
      background: panelBg,
      border: `1px solid ${panelBorder}`,
      boxShadow: dark ? '0 4px 24px rgba(0,0,0,0.2)' : '0 4px 24px rgba(0,95,99,0.06)',
    }}>{children}</div>
  );

  return (
    <section id="demo" style={{ background: bg, padding: '96px 40px' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#8CC63F', marginBottom: 12 }}>
          Live Demo
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: textMain, marginBottom: 48 }}>
          A Real Pet <span style={{ color: '#005F63' }}>Profile.</span>
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {/* LEFT — Identity Summary */}
          <motion.div initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.15 }}>
            {panel(<>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div className="blink" style={{ width: 8, height: 8, borderRadius: '50%', background: '#8CC63F' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#8CC63F' }}>Identity Active</span>
              </div>
              <div style={{
                width: 72, height: 72, borderRadius: 18, background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 16,
              }}><img src={dogpfp} alt="Bujji" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} /></div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: textMain, marginBottom: 2 }}>{petProfile.name}</h3>
              <p style={{ fontSize: 13, color: textSub, marginBottom: 20 }}>{petProfile.breed} · {petProfile.age}</p>
              {[
                { label: 'Pet ID',      value: petProfile.id },
                { label: 'Blood Type',  value: petProfile.bloodType },
                { label: 'Microchip',   value: petProfile.microchip.slice(0, 10) + '…' },
                { label: 'Vaccination', value: petProfile.vaccines, green: true },
                { label: 'Owner',       value: petProfile.ownerName },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0', borderBottom: `1px solid ${divider}`,
                }}>
                  <span style={{ fontSize: 12, color: textSub }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: row.green ? '#8CC63F' : textMain }}>{row.value}</span>
                </div>
              ))}
            </>)}
          </motion.div>

          {/* CENTER — Timeline */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.25 }}>
            {panel(<>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: textMain, marginBottom: 20 }}>Medical Timeline</h3>
              <div style={{ overflowY: 'auto', maxHeight: 360 }}>
                {timeline.map((ev, i) => (
                  <motion.div key={ev.id}
                    initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.06 }}
                    onMouseEnter={() => setHovered(ev.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      position: 'relative', paddingLeft: 22, paddingBottom: 20, cursor: 'pointer',
                      borderLeft: `2px solid ${ev.status === 'upcoming' ? '#e2e8f0' : typeColor[ev.type]}40`,
                    }}
                  >
                    <div style={{
                      position: 'absolute', left: -6, top: 4,
                      width: 12, height: 12, borderRadius: '50%',
                      background: ev.status === 'upcoming' ? '#e2e8f0' : typeColor[ev.type],
                      transition: 'box-shadow 0.2s',
                      boxShadow: hovered === ev.id ? `0 0 12px ${typeColor[ev.type]}60` : 'none',
                    }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: typeColor[ev.type] }}>{typeLabel[ev.type]}</span>
                      {ev.status === 'upcoming' && (
                        <span style={{
                          fontSize: 10, padding: '2px 8px', borderRadius: 999,
                          background: 'rgba(234,179,8,0.12)', color: '#ca8a04', fontWeight: 600,
                        }}>upcoming</span>
                      )}
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: textMain, marginBottom: 1 }}>{ev.title}</p>
                    <p style={{ fontSize: 11, color: textSub }}>{ev.date} · {ev.vet}</p>
                    <AnimatePresence>
                      {hovered === ev.id && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          style={{ fontSize: 11, color: textSub, lineHeight: 1.55, marginTop: 4, overflow: 'hidden' }}>
                          {ev.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </>)}
          </motion.div>

          {/* RIGHT — Quick Actions */}
          <motion.div initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, delay: 0.35 }}>
            {panel(<>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: textMain, marginBottom: 20 }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {actions.map(a => {
                  const { Icon } = a;
                  return (
                    <motion.button key={a.id} id={`action-${a.id}`}
                      whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
                      onClick={() => showToast(a.toast)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '14px 18px', borderRadius: 16, cursor: 'pointer',
                        border: 'none', textAlign: 'left', fontSize: 14, fontWeight: 600,
                        background: a.accent
                          ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                          : (dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,95,99,0.05)'),
                        color: a.accent ? '#fff' : textMain,
                        outline: a.accent ? 'none' : `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,95,99,0.08)'}`,
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: a.accent ? 'rgba(255,255,255,0.16)' : (dark ? 'rgba(140,198,63,0.12)' : 'rgba(0,95,99,0.09)'),
                      }}>
                        <Icon size={16} color={a.accent ? '#fff' : (dark ? '#8CC63F' : '#005F63')} />
                      </div>
                      {a.label}
                    </motion.button>
                  );
                })}
              </div>
              <div style={{
                marginTop: 20, borderRadius: 14, padding: '14px 16px',
                background: dark ? 'rgba(140,198,63,0.06)' : 'rgba(0,95,99,0.04)',
                border: '1px dashed rgba(140,198,63,0.3)',
              }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#8CC63F', marginBottom: 4 }}>🔒 Owner Verified</p>
                <p style={{ fontSize: 11, lineHeight: 1.55, color: textSub }}>
                  This identity is cryptographically linked to {petProfile.ownerName}
                </p>
              </div>
            </>)}
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
            style={{
              position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 100,
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px',
              borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              background: dark ? '#1E293B' : '#fff',
              border: '1px solid rgba(140,198,63,0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            <CheckCircle size={16} color="#8CC63F" />
            <span style={{ fontSize: 14, fontWeight: 600, color: textMain }}>{toast}</span>
            <button onClick={() => setToast(null)} style={{ cursor: 'pointer', marginLeft: 4 }}>
              <X size={14} color={textSub} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LiveDemo;
