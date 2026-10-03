import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, UserPlus, LogIn, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useCountdown } from '../../hooks/useCountdown';
import { DecryptText } from '../common/DecryptText';
import { MOTION_EASE } from '../../lib/motion';

export const Hero: React.FC = () => {
  const eventDate = '2026-10-15T09:00:00';
  const countdown = useCountdown(eventDate);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: MOTION_EASE,
      },
    },
  };

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden border-b border-[var(--border-color)] bg-transparent transition-colors">
      <Container size="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
        >
          {/* 1. Top Badge & Organizer Tag */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="primary" className="px-3 py-1">
              <Sparkles className="w-3.5 h-3.5 mr-1 inline text-[var(--accent)]" /> CSEA, PSG Tech Presents
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              2-Day National Hackathon
            </Badge>
          </motion.div>

          {/* 2 & 3. Main Title & Tagline */}
          <div className="space-y-4">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text-primary)] min-h-[1.2em]"
            >
              <DecryptText text="COMPUTE 50" highlightText="50" highlightClassName="text-[#B6FF00]" />
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-2xl text-[var(--text-secondary)] font-medium max-w-2xl mx-auto leading-relaxed"
            >
              50 Hours of Non-Stop Code, Innovation, & Engineering Excellence.
            </motion.p>
          </div>

          {/* 4. Key Quick Info & Countdown Component */}
          <motion.div variants={itemVariants} className="w-full max-w-xl space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-secondary)] font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--accent)]" />
                <span>October 15 - 16, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--accent)]" />
                <span>PSG College of Technology, Coimbatore</span>
              </div>
            </div>

            <div className="w-full p-4 sm:p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-lg">
              <p className="text-xs uppercase font-semibold text-[var(--text-secondary)] tracking-wider mb-4">
                Event Starts In
              </p>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                  <span className="block text-2xl sm:text-4xl font-extrabold text-[var(--accent)] font-mono">
                    {String(countdown.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[var(--text-secondary)] uppercase">Days</span>
                </div>
                <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                  <span className="block text-2xl sm:text-4xl font-extrabold text-[var(--accent)] font-mono">
                    {String(countdown.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[var(--text-secondary)] uppercase">Hours</span>
                </div>
                <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                  <span className="block text-2xl sm:text-4xl font-extrabold text-[var(--accent)] font-mono">
                    {String(countdown.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[var(--text-secondary)] uppercase">Mins</span>
                </div>
                <div className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                  <span className="block text-2xl sm:text-4xl font-extrabold text-[var(--accent)] font-mono">
                    {String(countdown.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[var(--text-secondary)] uppercase">Secs</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5. CTA Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/register">
              <Button size="lg" variant="primary" leftIcon={<UserPlus className="w-5 h-5" />} rightIcon={<ArrowRight className="w-5 h-5" />}>
                Register Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" leftIcon={<LogIn className="w-5 h-5" />}>
                Participant Login
              </Button>
            </Link>
          </motion.div>

          {/* 6. Supporting Visual Logos / Branding Bar */}
          <motion.div
            variants={itemVariants}
            className="pt-8 border-t border-[var(--border-color)] w-full flex flex-wrap items-center justify-center gap-8 opacity-80"
          >
            <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-widest">
              Organized by
            </div>
            <div className="flex items-center gap-6 text-[var(--text-primary)] font-semibold text-sm">
              <span className="px-3 py-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg">PSG Tech</span>
              <span className="px-3 py-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg">CSEA Department</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
