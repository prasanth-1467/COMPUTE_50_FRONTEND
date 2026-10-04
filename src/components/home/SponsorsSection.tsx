import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { mockSponsors } from '../../data/sponsors';
import { EVENT_CONFIG } from '../../config/event';
import { Badge } from '../common/Badge';
import { Reveal } from '../common/Reveal';
import { EmptyState } from '../common/EmptyState';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Sponsor } from '../../types/hackathon';

interface CarouselItem extends Sponsor {
  uniqueKey: string;
}

export const SponsorsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();

  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [cardWidth, setCardWidth] = useState<number>(200);
  const [gap, setGap] = useState<number>(24);

  const [isManualPaused, setIsManualPaused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const [isInView, setIsInView] = useState<boolean>(false);

  const isAnimatingRef = useRef<boolean>(false);

  // Initialize items array with enough duplicated cards for seamless looping
  const [items, setItems] = useState<CarouselItem[]>(() => {
    if (!mockSponsors || mockSponsors.length === 0) return [];
    const minItemsNeeded = 12;
    const repeatCount = Math.max(3, Math.ceil(minItemsNeeded / mockSponsors.length));
    const list: CarouselItem[] = [];
    for (let i = 0; i < repeatCount; i++) {
      mockSponsors.forEach((spon, idx) => {
        list.push({
          ...spon,
          uniqueKey: `${spon.id}-${i}-${idx}`,
        });
      });
    }
    return list;
  });

  // Handle ResizeObserver & viewport breakpoints
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const windowWidth = window.innerWidth;

      let count = 5;
      let g = 24;
      if (windowWidth < 768) {
        count = 1.5;
        g = 16;
      } else if (windowWidth < 1024) {
        count = 3;
        g = 24;
      } else {
        count = 5;
        g = 24;
      }

      setVisibleCount(count);
      setGap(g);

      const computedCardWidth = Math.max(140, (width - (Math.floor(count) - 1) * g) / count);
      setCardWidth(computedCardWidth);
    };

    updateDimensions();

    const observer = new ResizeObserver(() => {
      updateDimensions();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', updateDimensions);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Page visibility change listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // IntersectionObserver for section in-view
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const step = cardWidth + gap;

  // Slide forward (Next)
  const slideNext = useCallback(async () => {
    if (isAnimatingRef.current || !step) return;
    isAnimatingRef.current = true;

    await controls.start({
      x: -step,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    setItems((prev) => (prev.length > 0 ? [...prev.slice(1), prev[0]] : prev));
    controls.set({ x: 0 });
    isAnimatingRef.current = false;
  }, [controls, step]);

  // Slide backward (Previous)
  const slidePrev = useCallback(async () => {
    if (isAnimatingRef.current || !step) return;
    isAnimatingRef.current = true;

    setItems((prev) => (prev.length > 0 ? [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)] : prev));
    controls.set({ x: -step });

    await controls.start({
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    isAnimatingRef.current = false;
  }, [controls, step]);

  // Check if rotation should be active
  const isEnoughSponsorsToRotate = mockSponsors.length >= visibleCount;
  const isAutoPlaying =
    !isManualPaused &&
    !isHovered &&
    !isFocused &&
    isTabVisible &&
    isInView &&
    !shouldReduceMotion &&
    isEnoughSponsorsToRotate;

  // Auto-slide timer (3 seconds)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      slideNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slideNext]);

  if (!mockSponsors || mockSponsors.length === 0) {
    return (
      <section id="sponsors" ref={sectionRef} className="py-16 md:py-24 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] transition-colors">
        <Container size="lg">
          <Reveal>
            <SectionHeading
              badge="SPONSORS & PARTNERS"
              title="Backing Technical Excellence"
              subtitle="Sponsors and partners will be announced soon."
            />
          </Reveal>
          <Reveal>
            <EmptyState
              category="SPONSORS & PARTNERS"
              title="Sponsors & Partners Announcing Soon"
              subtitle={`We are actively onboarding sponsors for Compute 50. Interested in partnering? Reach out at ${EVENT_CONFIG.contactEmail}`}
              icon={<Sparkles className="w-7 h-7" />}
            />
          </Reveal>
        </Container>
      </section>
    );
  }

  // Reduced motion view
  if (shouldReduceMotion) {
    return (
      <section id="sponsors" ref={sectionRef} className="py-16 md:py-24 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] transition-colors">
        <Container size="lg">
          <Reveal>
            <SectionHeading
              badge="SPONSORS & PARTNERS"
              title="Backing Technical Excellence"
              subtitle="Sponsors and partners will be announced soon."
            />
          </Reveal>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin">
            {mockSponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.website}
                target={sponsor.website.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noreferrer"
                className="w-56 h-44 p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl flex flex-col items-center justify-between text-center hover:border-[var(--accent)] transition-all group focus:outline-none focus:ring-2 focus:ring-[var(--accent)] shrink-0"
              >
                <div className="flex-1 flex flex-col items-center justify-center">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-12 w-auto object-contain mb-2 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all"
                  />
                  <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {sponsor.name}
                  </span>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {sponsor.category}
                </Badge>
              </a>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // Static Centered view (if fewer sponsors than visible slots)
  if (!isEnoughSponsorsToRotate) {
    return (
      <section id="sponsors" ref={sectionRef} className="py-16 md:py-24 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] transition-colors">
        <Container size="lg">
          <Reveal>
            <SectionHeading
              badge="SPONSORS & PARTNERS"
              title="Backing Technical Excellence"
              subtitle="Sponsors and partners will be announced soon."
            />
          </Reveal>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {mockSponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.website}
                target={sponsor.website.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noreferrer"
                className="w-56 h-44 p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl flex flex-col items-center justify-between text-center hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] transition-all group focus:outline-none focus:ring-2 focus:ring-[var(--accent)] shrink-0"
              >
                <div className="flex-1 flex flex-col items-center justify-center">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-12 w-auto object-contain mb-2 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all"
                  />
                  <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {sponsor.name}
                  </span>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {sponsor.category}
                </Badge>
              </a>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="py-16 md:py-24 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] transition-colors"
      role="region"
      aria-roledescription="carousel"
      aria-label="Sponsors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <Container size="lg">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <SectionHeading
              badge="SPONSORS & PARTNERS"
              title="Backing Technical Excellence"
              subtitle="Sponsors and partners will be announced soon."
              className="mb-0 text-left"
            />
            {/* Carousel Control Buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={slidePrev}
                className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer"
                aria-label="Previous sponsor"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsManualPaused((prev) => !prev)}
                className="px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                aria-label={isManualPaused ? "Play sponsors carousel" : "Pause sponsors carousel"}
              >
                {isManualPaused ? <Play className="w-4 h-4 text-[var(--accent)]" /> : <Pause className="w-4 h-4" />}
                <span className="font-mono text-[11px]">
                  {isManualPaused ? 'Play' : 'Pause'}
                </span>
              </button>
              <button
                type="button"
                onClick={slideNext}
                className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer"
                aria-label="Next sponsor"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Carousel Container with Soft Edge Fade */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden py-4"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <motion.div
            animate={controls}
            className="flex items-center"
            style={{
              gap: `${gap}px`,
            }}
          >
            {items.map((sponsor, idx) => {
              const isDuplicated = idx >= Math.ceil(visibleCount);
              return (
                <a
                  key={sponsor.uniqueKey}
                  href={sponsor.website}
                  target={sponsor.website.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noreferrer"
                  aria-hidden={isDuplicated ? 'true' : undefined}
                  tabIndex={isDuplicated ? -1 : 0}
                  style={{
                    width: `${cardWidth}px`,
                    height: '176px',
                  }}
                  className="p-5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl flex flex-col items-center justify-between text-center transition-all duration-300 group hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.22)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] shrink-0 select-none"
                >
                  <div className="flex-1 w-full flex flex-col items-center justify-center">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-12 max-w-[85%] w-auto object-contain mb-2 grayscale group-hover:grayscale-0 opacity-75 group-hover:opacity-100 transition-all duration-300"
                    />
                    <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                      {sponsor.name}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px] shrink-0 mt-2">
                    {sponsor.category}
                  </Badge>
                </a>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

