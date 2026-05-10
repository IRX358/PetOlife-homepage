import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PawPrint, Stethoscope, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const steps = [
  { num: 1, Icon: PawPrint,    color: '#005F63', accent: '#8CC63F', title: 'Create Identity', sub: "Upload a photo, enter your pet's name, breed, and species in seconds." },
  { num: 2, Icon: Stethoscope, color: '#8CC63F', accent: '#005F63', title: 'Connect Care',     sub: 'Sync vet records, vaccinations, and medical history automatically.' },
  { num: 3, Icon: Globe,       color: '#005F63', accent: '#8CC63F', title: 'Access Anywhere',  sub: 'Emergency-ready digital identity. Scan QR for instant access.' },
];

const HowItWorks: React.FC = () => {
  const { dark } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const bg   = dark ? '#0F172A' : '#FAFAF7';
  const text = dark ? '#e2e8f0' : '#1a2e35';
  const sub  = dark ? '#94a3b8' : '#6B7280';

  return (
    <section id="how" style={{ background: bg, padding: '96px 40px' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#8CC63F', marginBottom: 12 }}>
            How It Works
          </motion.p>
          <motion.h2 className="font-hand" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.1 }}
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: text }}>
            Built To Be <span style={{ color: '#8CC63F' }}>Effortless.</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="how-it-works-flex" style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: 16, position: 'relative',
        }}>
          {steps.map((step, i) => {
            const { Icon } = step;
            return (
              <React.Fragment key={step.num}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.15 + i * 0.15 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}
                >
                  {/* Circle */}
                  <div style={{ position: 'relative', marginBottom: 28 }}>
                    <div style={{
                      width: 110, height: 110, borderRadius: '50%',
                      background: dark ? `${step.color}14` : `${step.color}0C`,
                      border: `2px solid ${step.color}28`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{
                        width: 80, height: 80, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${step.color}, ${step.accent})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 8px 24px ${step.color}40`,
                      }}>
                        <Icon size={30} color="#fff" />
                      </div>
                    </div>
                    {/* Badge */}
                    <div style={{
                      position: 'absolute', top: 0, right: 0,
                      width: 28, height: 28, borderRadius: '50%',
                      background: step.color, color: '#fff',
                      fontSize: 12, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{step.num}</div>
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 700, color: text, marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: sub, maxWidth: 260 }}>{step.sub}</p>
                </motion.div>

                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 + i * 0.15 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 28, color: '#8CC63F', flexShrink: 0,
                      marginTop: 40,
                    }} className="step-arrow"
                  >→</motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .how-it-works-flex { flex-direction: column; align-items: center !important; gap: 40px !important; }
          .step-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
