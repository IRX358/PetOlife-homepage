import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import WhatIsIdentity from './components/WhatIsIdentity';
import HowItWorks from './components/HowItWorks';
import LiveDemo from './components/LiveDemo';
import Emergency from './components/Emergency';
import TrustSecurity from './components/TrustSecurity';
import Ecosystem from './components/Ecosystem';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Modal from './components/Modal';

function AppInner() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero onCreateId={() => setModalOpen(true)} />
        <Problem />
        <WhatIsIdentity />
        <HowItWorks />
        <LiveDemo />
        <Emergency />
        <TrustSecurity />
        <Ecosystem />
        <FinalCTA onCreateId={() => setModalOpen(true)} />
      </main>
      <Footer />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden">
        <button
          id="sticky-mobile-cta"
          onClick={() => setModalOpen(true)}
          className="btn-primary shadow-2xl text-sm px-6 py-3"
          style={{ boxShadow: '0 8px 32px rgba(0,95,99,0.4)' }}
        >
          🐾 Create Pet ID
        </button>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

export default App;
