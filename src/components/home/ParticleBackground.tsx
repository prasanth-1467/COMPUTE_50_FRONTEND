import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  char: string;
}

const PARTICLE_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}[]<>/\\#@$%&*+=;:~^!?';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsDisabled(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 2. Determine adaptive particle count (screen width < 768px or hardwareConcurrency <= 4)
    const isSmallScreen = window.innerWidth < 768;
    const isLowConcurrency =
      typeof navigator !== 'undefined' &&
      typeof navigator.hardwareConcurrency === 'number' &&
      navigator.hardwareConcurrency <= 4;

    const particleCount = isSmallScreen || isLowConcurrency ? 35 : 75;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const updateCanvasDimensions = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Re-initialize particles for new bounds
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 8 + 8,
        alpha: Math.random() * 0.25 + 0.1,
        char: PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)],
      }));
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCanvasDimensions, 150);
    };

    updateCanvasDimensions();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // 3. Animation loop with ~30fps capping & tab visibility pause
    let lastTime = performance.now();
    const fpsInterval = 1000 / 30; // ~33.3ms

    const animate = (now: number) => {
      if (document.hidden) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = now - lastTime;

      if (elapsed >= fpsInterval) {
        lastTime = now - (elapsed % fpsInterval);

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        const isDark =
          document.documentElement.classList.contains('dark') ||
          document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '182, 255, 0' : '63, 98, 18';

        const particles = particlesRef.current;
        const count = particles.length;

        for (let i = 0; i < count; i++) {
          const p = particles[i];

          // Mouse repulsion
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            p.vx += (dx / dist) * force * 0.3;
            p.vy += (dy / dist) * force * 0.3;
          }

          p.vx *= 0.98;
          p.vy *= 0.98;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          ctx.font = `${p.size}px 'Courier New', monospace`;
          ctx.fillStyle = `rgba(${textColor}, ${p.alpha})`;
          ctx.fillText(p.char, p.x, p.y);

          if (Math.random() < 0.005) {
            p.char = PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)];
          }
        }

        // Connections between close particles
        for (let i = 0; i < count; i++) {
          for (let j = i + 1; j < count; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.strokeStyle = `rgba(${textColor}, ${0.12 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        lastTime = performance.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isDisabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
