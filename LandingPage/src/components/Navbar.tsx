import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, PawPrint } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About',     href: '#about' },
  { label: 'Protocol',  href: '#protocol' },
  { label: 'Demo',      href: '#demo' },
  { label: 'Emergency', href: '#emergency' },
];

const Navbar: React.FC = () => {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = ['about','protocol','demo','emergency','trust','ecosystem'];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = scrolled
    ? dark
      ? 'rgba(15,23,42,0.85)'
      : 'rgba(250,250,247,0.85)'
    : 'transparent';

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          background: navBg,
          boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.08)' : 'none',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      >
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 32px', height: 68,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: 'linear-gradient(135deg, #005F63, #8CC63F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PawPrint size={18} color="#fff" />
            </div>
            <span className="font-hand" style={{
              fontSize: 26, fontWeight: 700,
              color: dark ? '#8CC63F' : '#005F63',
            }}>PetOlife</span>
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
            {navLinks.map(link => {
              const id = link.href.slice(1);
              const active = activeSection === id;
              return (
                <a key={link.label} href={link.href} style={{
                  position: 'relative', fontSize: 14, fontWeight: 500,
                  color: active ? (dark ? '#8CC63F' : '#005F63') : (dark ? '#94a3b8' : '#6B7280'),
                  textDecoration: 'none', transition: 'color 0.2s',
                }}>
                  {link.label}
                  <span style={{
                    position: 'absolute', bottom: -4, left: 0, height: 2, borderRadius: 2,
                    width: active ? '100%' : 0,
                    background: '#8CC63F',
                    transition: 'width 0.3s',
                    display: 'block',
                  }} />
                </a>
              );
            })}

            {/* Dark toggle */}
            <button onClick={toggle} id="dark-toggle" aria-label="Toggle dark mode" style={{
              width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
              background: dark ? 'rgba(140,198,63,0.15)' : 'rgba(0,95,99,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', transition: 'transform 0.2s',
            }}>
              <AnimatePresence mode="wait">
                {dark
                  ? <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><Sun size={16} color="#8CC63F" /></motion.div>
                  : <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Moon size={16} color="#005F63" /></motion.div>
                }
              </AnimatePresence>
            </button>

            {/* CTA */}
            <a href="#demo" style={{
              background: '#005F63', color: '#fff', borderRadius: 999,
              padding: '11px 26px', fontWeight: 600, fontSize: 14,
              textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'inline-block',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,95,99,0.35)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
            >Create Pet ID</a>
          </div>

          {/* Hamburger */}
          <button style={{ display: 'none', cursor: 'pointer' }} className="mobile-menu-btn"
            onClick={() => setMenuOpen(o => !o)} id="mobile-menu-btn">
            {menuOpen ? <X size={24} color={dark ? '#8CC63F' : '#005F63'} /> : <Menu size={24} color={dark ? '#8CC63F' : '#005F63'} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.45)' }} />
            <motion.div key="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, bottom: 0, right: 0, width: 280, zIndex: 45,
                padding: '80px 32px 32px',
                background: dark ? 'rgba(15,23,42,0.97)' : 'rgba(250,250,247,0.97)',
                backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', gap: 28,
              }}>
              {navLinks.map(link => (
                <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                  style={{ fontSize: 20, fontWeight: 600, color: dark ? '#e2e8f0' : '#1a2e35', textDecoration: 'none' }}>
                  {link.label}
                </a>
              ))}
              <button onClick={toggle} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#8CC63F', cursor: 'pointer' }}>
                {dark ? <Sun size={16} /> : <Moon size={16} />} {dark ? 'Light Mode' : 'Dark Mode'}
              </button>
              <a href="#demo" onClick={() => setMenuOpen(false)} style={{
                background: '#005F63', color: '#fff', borderRadius: 999, padding: '13px 28px',
                fontWeight: 600, fontSize: 15, textDecoration: 'none', textAlign: 'center',
              }}>Create Pet ID</a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; align-items: center; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
