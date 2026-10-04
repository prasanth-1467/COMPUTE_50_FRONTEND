import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { BottomNav } from '../components/layout/BottomNav';
import { BackToTop } from '../components/common/BackToTop';
import { CursorGlow } from '../components/common/CursorGlow';
import { AnnouncementPopup } from '../components/common/AnnouncementPopup';
import { StickyMobileRegister } from '../components/layout/StickyMobileRegister';
import { ParticleBackground } from '../components/home/ParticleBackground';
import { SectionDotNav } from '../components/common/SectionDotNav';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors pb-16 md:pb-0 relative overflow-x-hidden">
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Subtle Noise / Grain Overlay (3% opacity) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grain" aria-hidden="true" />

      {/* Ambient GPU Floating Accent Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[var(--accent)]/5 dark:bg-[var(--accent)]/8 blur-3xl animate-orb-1" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-emerald-500/5 dark:bg-[var(--accent)]/6 blur-3xl animate-orb-2" />
      </div>

      <ParticleBackground />
      <AnnouncementPopup />
      <CursorGlow />
      <Navbar />

      {/* Desktop Section Navigation Dots */}
      <SectionDotNav />

      <main id="main-content" className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
      <StickyMobileRegister />
      <BottomNav />
    </div>
  );
};
