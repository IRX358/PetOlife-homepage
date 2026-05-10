import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Props { open: boolean; onClose: () => void; }

const steps = ['Pet Details', 'Health Info', 'Get Your ID'];

const Modal: React.FC<Props> = ({ open, onClose }) => {
  const { dark } = useTheme();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', species: 'Dog', breed: '', age: '', owner: '' });

  const handleNext = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else setDone(true);
  };
  const handleClose = () => { setStep(0); setDone(false); onClose(); };

  const bg       = dark ? '#1E293B' : '#ffffff';
  const text     = dark ? '#e2e8f0' : '#1a2e35';
  const sub      = dark ? '#94a3b8' : '#6B7280';
  const inBg     = dark ? '#0F172A' : '#f8fafc';
  const inBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,95,99,0.15)';

  const inputStyle = (focus: boolean): React.CSSProperties => ({
    width: '100%', borderRadius: 14, padding: '13px 16px',
    fontSize: 14, outline: 'none',
    background: inBg, color: text,
    border: `1.5px solid ${focus ? '#8CC63F' : inBorder}`,
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }} />

          {/* Modal */}
          <div style={{
            position: 'fixed', inset: 0, zIndex: 210,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
            pointerEvents: 'none',
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 28 }}
              transition={{ type: 'spring', damping: 26 }}
              style={{
                width: '100%', maxWidth: 440, borderRadius: 28, padding: 36,
                background: bg,
                border: dark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,95,99,0.08)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
                position: 'relative', pointerEvents: 'auto',
              }}
            >
              {/* Close */}
              <button id="modal-close" onClick={handleClose}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 32, height: 32, borderRadius: '50%', cursor: 'pointer',
                  background: dark ? '#0F172A' : '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none',
                }}>
                <X size={14} color="#6B7280" />
              </button>

              {!done ? (
                <>
                  {/* Progress stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
                    {steps.map((s, i) => (
                      <React.Fragment key={s}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{
                            width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 12, fontWeight: 700,
                            background: i <= step ? '#005F63' : (dark ? '#1E293B' : '#f1f5f9'),
                            color: i <= step ? '#fff' : '#6B7280',
                            border: i <= step ? 'none' : '1.5px solid #e2e8f0',
                          }}>{i + 1}</div>
                          <span style={{
                            fontSize: 12, fontWeight: 500, display: window.innerWidth < 400 ? 'none' : undefined,
                            color: i === step ? text : sub,
                          }}>{s}</span>
                        </div>
                        {i < steps.length - 1 && (
                          <div style={{
                            flex: 1, height: 1, margin: '0 8px',
                            background: i < step ? '#8CC63F' : (dark ? '#334155' : '#e2e8f0'),
                          }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <h2 className="font-hand" style={{ fontSize: 26, fontWeight: 700, color: text, marginBottom: 24 }}>
                    {step === 0 && '🐾 Tell us about your pet'}
                    {step === 1 && '🩺 Basic health information'}
                    {step === 2 && '✨ Almost done!'}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {step === 0 && <>
                      <FInput label="Pet Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="e.g. Bujji" style={inputStyle} />
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: sub, marginBottom: 8 }}>Species</label>
                        <select value={form.species} onChange={e => setForm(f => ({ ...f, species: e.target.value }))}
                          style={{ ...inputStyle(false), appearance: 'none' }}>
                          {['Dog','Cat','Bird','Rabbit','Other'].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <FInput label="Breed" value={form.breed} onChange={v => setForm(f => ({ ...f, breed: v }))} placeholder="e.g. Golden Retriever" style={inputStyle} />
                    </>}
                    {step === 1 && <>
                      <FInput label="Age" value={form.age} onChange={v => setForm(f => ({ ...f, age: v }))} placeholder="e.g. 4 years" style={inputStyle} />
                      <div style={{
                        borderRadius: 16, padding: '16px 18px',
                        background: dark ? 'rgba(140,198,63,0.06)' : 'rgba(140,198,63,0.08)',
                        border: '1px dashed rgba(140,198,63,0.35)',
                      }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#8CC63F', marginBottom: 4 }}>📋 Vaccination records?</p>
                        <p style={{ fontSize: 12, color: sub }}>You can add vet records after creating the identity profile.</p>
                      </div>
                      <FInput label="Owner Name" value={form.owner} onChange={v => setForm(f => ({ ...f, owner: v }))} placeholder="Your full name" style={inputStyle} />
                    </>}
                    {step === 2 && (
                      <div style={{
                        borderRadius: 20, padding: '28px 20px', textAlign: 'center',
                        background: dark ? '#0F172A' : '#f0fdf4',
                        border: '1.5px solid rgba(140,198,63,0.3)',
                      }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
                        <p style={{ fontSize: 16, fontWeight: 700, color: text, marginBottom: 4 }}>
                          {form.name || 'Your Pet'}'s ID is ready!
                        </p>
                        <p style={{ fontSize: 13, color: sub, marginBottom: 16 }}>
                          {form.species} · {form.breed || 'Unknown breed'} · {form.age || 'Age not set'}
                        </p>
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          padding: '6px 16px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                          background: 'rgba(140,198,63,0.14)', color: '#8CC63F',
                        }}>
                          <div className="blink" style={{ width: 6, height: 6, borderRadius: '50%', background: '#8CC63F' }} />
                          Identity Created
                        </div>
                      </div>
                    )}
                  </div>

                  <button id="modal-next" onClick={handleNext}
                    style={{
                      width: '100%', marginTop: 24, padding: '15px', borderRadius: 999,
                      border: 'none', cursor: 'pointer', background: '#005F63', color: '#fff',
                      fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 24px rgba(0,95,99,0.35)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = ''; }}
                  >
                    {step < steps.length - 1 ? 'Continue' : 'Create Pet Identity'}
                    <ChevronRight size={16} />
                  </button>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '16px 0' }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                    <CheckCircle size={64} color="#8CC63F" style={{ margin: '0 auto 16px' }} />
                  </motion.div>
                  <h2 className="font-hand" style={{ fontSize: 28, fontWeight: 700, color: text, marginBottom: 8 }}>
                    {form.name || 'Your Pet'} is on PetOlife! 🎉
                  </h2>
                  <p style={{ fontSize: 14, color: sub, marginBottom: 24, lineHeight: 1.65 }}>
                    A unified digital identity has been created. Your QR code and pet passport are being generated.
                  </p>
                  <div style={{ fontSize: 40, marginBottom: 24 }}>🐾</div>
                  <button onClick={handleClose}
                    style={{
                      padding: '14px 36px', borderRadius: 999, border: 'none',
                      background: '#005F63', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                    }}>Done</button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

const FInput: React.FC<{
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; style: (f: boolean) => React.CSSProperties;
}> = ({ label, value, onChange, placeholder, style }) => {
  const [focus, setFocus] = React.useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6B7280', marginBottom: 8 }}>{label}</label>
      <input
        value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={style(focus)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      />
    </div>
  );
};

export default Modal;
