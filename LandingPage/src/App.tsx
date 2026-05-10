import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import Problem       from './components/Problem';
import WhatIsIdentity from './components/WhatIsIdentity';
import HowItWorks    from './components/HowItWorks';
import LiveDemo      from './components/LiveDemo';
import Emergency     from './components/Emergency';
import TrustSecurity from './components/TrustSecurity';
import Ecosystem     from './components/Ecosystem';
import FinalCTA      from './components/FinalCTA';
import Footer        from './components/Footer';
import Modal         from './components/Modal';

function AppInner() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);

  return (
    <>
      <Navbar />
      <main>
        <Hero          onCreateId={open} />
        <Problem />
        <WhatIsIdentity />
        <HowItWorks />
        <LiveDemo />
        <Emergency />
        <TrustSecurity />
        <Ecosystem />
        <FinalCTA      onCreateId={open} />
      </main>
      <Footer />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Sticky mobile CTA */}
      <div style={{
        position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        zIndex: 40, display: 'none',
      }} className="mobile-sticky-cta">
        <button onClick={open} style={{
          padding: '14px 28px', borderRadius: 999, border: 'none', cursor: 'pointer',
          background: '#005F63', color: '#fff', fontSize: 15, fontWeight: 700,
          boxShadow: '0 8px 32px rgba(0,95,99,0.45)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>🐾 Create Pet ID</button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-sticky-cta { display: block !important; }
        }
      `}</style>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
