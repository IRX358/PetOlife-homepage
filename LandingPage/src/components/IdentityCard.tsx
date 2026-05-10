import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, QrCode, Phone, CalendarCheck, BadgeCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { petProfile } from '../data/pets';

interface Props { onClick?: () => void; }

const IdentityCard: React.FC<Props> = ({ onClick }) => {
  const { dark } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const c = cardRef.current; if (!c) return;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    c.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
  };
  const handleMouseLeave = () => {
    const c = cardRef.current; if (!c) return;
    c.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  const cardBg = dark
    ? 'linear-gradient(145deg, #1E293B, #0F172A)'
    : 'linear-gradient(145deg, #ffffff, #f0fdf4)';
  const cardBorder = dark ? '1px solid rgba(140,198,63,0.18)' : '1px solid rgba(0,95,99,0.1)';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      id="identity-card"
      style={{
        position: 'relative', cursor: 'pointer',
        transition: 'transform 0.15s ease',
        transformStyle: 'preserve-3d', willChange: 'transform',
      }}
    >
      {/* Glow backdrop */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 28,
        filter: 'blur(28px)', opacity: 0.28, zIndex: 0,
        background: 'linear-gradient(135deg, #005F63, #8CC63F)',
        transform: 'scale(1.06)',
      }} />

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 1,
        borderRadius: 28, padding: '28px 24px',
        width: 320, background: cardBg, border: cardBorder,
        boxShadow: dark ? '0 24px 60px rgba(0,0,0,0.4)' : '0 24px 60px rgba(0,95,99,0.12)',
      }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'linear-gradient(135deg, #005F63, #8CC63F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>P</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: dark ? '#94a3b8' : '#6B7280' }}>PetOlife ID</span>
          </div>
          <div className="pulse-green" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '4px 12px', borderRadius: 999,
            background: 'rgba(140,198,63,0.14)',
          }}>
            <div className="blink" style={{ width: 7, height: 7, borderRadius: '50%', background: '#8CC63F' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#8CC63F' }}>Verified</span>
          </div>
        </div>

        {/* Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 80, height: 80, borderRadius: 20,
              background: 'linear-gradient(135deg, #fbbf24, #f97316)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40, boxShadow: '0 4px 16px rgba(251,191,36,0.3)',
            }}>🐕</div>
            <div style={{
              position: 'absolute', bottom: -4, right: -4,
              width: 24, height: 24, borderRadius: '50%',
              background: '#8CC63F',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BadgeCheck size={14} color="#fff" />
            </div>
          </div>
        </div>

        {/* Name */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <h3 className="font-hand" style={{
            fontSize: 26, fontWeight: 700,
            color: dark ? '#e2e8f0' : '#005F63', marginBottom: 2,
          }}>{petProfile.name}</h3>
          <p style={{ fontSize: 13, color: dark ? '#94a3b8' : '#6B7280' }}>{petProfile.breed}</p>
        </div>

        {/* Info rows */}
        <div style={{ marginBottom: 20 }}>
          {[
            { icon: <ShieldCheck size={12} />, label: 'Vaccines',     value: petProfile.vaccines,    accent: true },
            { icon: <QrCode size={12} />,      label: 'Blood Type',   value: petProfile.bloodType,   accent: false },
            { icon: <Phone size={12} />,        label: 'Emergency',   value: petProfile.ownerPhone,  accent: false },
            { icon: <CalendarCheck size={12} />,label: 'Last Checkup',value: petProfile.lastCheckup, accent: false },
          ].map(row => (
            <div key={row.label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '7px 0',
              borderBottom: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,95,99,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6B7280' }}>
                {row.icon}
                <span style={{ fontSize: 11 }}>{row.label}</span>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: row.accent ? '#8CC63F' : (dark ? '#e2e8f0' : '#005F63'),
              }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* QR area */}
        <div className="glow-border" style={{
          borderRadius: 16, padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: 12,
          background: dark ? 'rgba(140,198,63,0.05)' : 'rgba(140,198,63,0.06)',
        }}>
          <QrCodeSVG />
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: dark ? '#e2e8f0' : '#005F63', marginBottom: 2 }}>
              Scan for Emergency
            </p>
            <p style={{ fontSize: 11, color: '#6B7280' }}>ID: {petProfile.id}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const QrCodeSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="2" y="2" width="16" height="16" rx="3" fill="none" stroke="#005F63" strokeWidth="2"/>
    <rect x="6" y="6" width="8" height="8" rx="1" fill="#8CC63F"/>
    <rect x="30" y="2" width="16" height="16" rx="3" fill="none" stroke="#005F63" strokeWidth="2"/>
    <rect x="34" y="6" width="8" height="8" rx="1" fill="#8CC63F"/>
    <rect x="2" y="30" width="16" height="16" rx="3" fill="none" stroke="#005F63" strokeWidth="2"/>
    <rect x="6" y="34" width="8" height="8" rx="1" fill="#8CC63F"/>
    <rect x="22" y="2" width="4" height="4" rx="1" fill="#005F63"/>
    <rect x="22" y="8" width="4" height="4" rx="1" fill="#8CC63F"/>
    <rect x="22" y="14" width="4" height="4" rx="1" fill="#005F63"/>
    <rect x="2" y="22" width="4" height="4" rx="1" fill="#8CC63F"/>
    <rect x="8" y="22" width="4" height="4" rx="1" fill="#005F63"/>
    <rect x="14" y="22" width="4" height="4" rx="1" fill="#8CC63F"/>
    <rect x="22" y="22" width="4" height="4" rx="1" fill="#005F63"/>
    <rect x="28" y="22" width="4" height="4" rx="1" fill="#8CC63F"/>
    <rect x="34" y="22" width="4" height="4" rx="1" fill="#005F63"/>
    <rect x="40" y="22" width="4" height="4" rx="1" fill="#8CC63F"/>
    <rect x="28" y="28" width="8" height="8" rx="2" fill="#005F63"/>
    <rect x="38" y="28" width="4" height="4" rx="1" fill="#8CC63F"/>
    <rect x="22" y="36" width="4" height="4" rx="1" fill="#8CC63F"/>
    <rect x="28" y="38" width="4" height="4" rx="1" fill="#005F63"/>
    <rect x="34" y="36" width="8" height="8" rx="1" fill="#8CC63F"/>
  </svg>
);

export default IdentityCard;
