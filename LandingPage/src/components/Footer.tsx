import React from 'react';
import { PawPrint, Heart, Dog, Cat } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { dark } = useTheme();
  const links = [
    { label: 'Protocol', href: '#protocol' },
    { label: 'Privacy',  href: '#trust'    },
    { label: 'Emergency',href: '#emergency'},
    { label: 'Demo',     href: '#demo'     },
  ];

  return (
    <footer style={{ background: dark ? '#0F172A' : '#1a2e35', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 40px 40px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 32, marginBottom: 40 }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'linear-gradient(135deg, #005F63, #8CC63F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PawPrint size={20} color="#fff" />
            </div>
            <div>
              <p className="font-hand" style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1 }}>PetOlife</p>
              <p style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>Unified Pet Identity Infrastructure</p>
            </div>
          </div>

          {/* Pet animation */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', position: 'relative' }}>
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            >
              <Dog size={36} color={dark ? '#8CC63F' : '#005F63'} strokeWidth={1.5} />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.4 }}
            >
              <Cat size={32} color={dark ? '#e2e8f0' : '#8CC63F'} strokeWidth={1.5} />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ position: 'absolute', top: -10, left: 24 }}
            >
              <Heart size={16} fill="#ef4444" color="#ef4444" />
            </motion.div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
            {links.map(link => (
              <a key={link.label} href={link.href}
                style={{ fontSize: 14, color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#8CC63F'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
              >{link.label}</a>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <p style={{ fontSize: 12, color: '#475569' }}>
            © 2026 PetOlife. Built with{' '}
            <Heart size={11} style={{ display: 'inline', verticalAlign: 'middle', color: '#8CC63F' }} />{' '}
            for every pet and their person.
          </p>
          <span style={{
            fontSize: 11, fontFamily: 'monospace', padding: '5px 14px', borderRadius: 999,
            background: 'rgba(140,198,63,0.1)', color: '#8CC63F',
          }}>Built by - <a href="https://irfan.qzz.io" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>irfan.qzz.io</a></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
