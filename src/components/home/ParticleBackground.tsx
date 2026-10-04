import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  char: string;
  targetX: number;
  targetY: number;
  startX: number;
  startY: number;
  dispersed: boolean;
}

const PARTICLE_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}[]<>/\\#@$%&*+=;:~^!?';

function generate50TargetPoints(width: number, height: number, count: number): { x: number; y: number }[] {
  if (typeof document === 'undefined') return Array.from({ length: count }, () => ({ x: width / 2, y: height / 2 }));

  const offCanvas = document.createElement('canvas');
  const size = Math.min(width, height) * 0.28;
  const offWidth = Math.round(size * 2.2);
  const offHeight = Math.round(size * 1.2);
  offCanvas.width = offWidth;
  offCanvas.height = offHeight;

  const offCtx = offCanvas.getContext('2d');
  if (!offCtx) {
    return Array.from({ length: count }, () => ({ x: width / 2, y: height / 2 }));
  }

  offCtx.fillStyle = '#ffffff';
  offCtx.font = `bold ${Math.round(size * 0.85)}px 'JetBrains Mono', 'Courier New', monospace`;
  offCtx.textAlign = 'center';
  offCtx.textBaseline = 'middle';
  offCtx.fillText('50', offWidth / 2, offHeight / 2);

  const imgData = offCtx.getImageData(0, 0, offWidth, offHeight);
  const pixels = imgData.data;
  const validPoints: { x: number; y: number }[] = [];

  const step = 4;
  for (let y = 0; y < offHeight; y += step) {
    for (let x = 0; x < offWidth; x += step) {
      const alpha = pixels[(y * offWidth + x) * 4 + 3];
      if (alpha > 128) {
        const screenX = width / 2 - offWidth / 2 + x;
        const screenY = height * 0.3 - offHeight / 2 + y;
        validPoints.push({ x: screenX, y: screenY });
      }
    }
  }

  if (validPoints.length === 0) {
    return Array.from({ length: count }, () => ({ x: width / 2, y: height / 2 }));
  }

  const targets: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const pointIndex = Math.floor((i / count) * validPoints.length);
    targets.push(validPoints[pointIndex] || validPoints[0]);
  }

  return targets;
}

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

    // 2. Adaptive particle count (fewer on mobile & low-core devices)
    const isSmallScreen = window.innerWidth < 768;
    const isLowConcurrency =
      typeof navigator !== 'undefined' &&
      typeof navigator.hardwareConcurrency === 'number' &&
      navigator.hardwareConcurrency <= 4;

    const particleCount = isSmallScreen || isLowConcurrency ? 35 : 75;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let startTime = performance.now();

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

      const targets = generate50TargetPoints(width, height, particleCount);

      particlesRef.current = Array.from({ length: particleCount }, (_, idx) => {
        const sx = Math.random() * width;
        const sy = Math.random() * height;
        const target = targets[idx] || { x: width / 2, y: height / 2 };

        return {
          x: sx,
          y: sy,
          startX: sx,
          startY: sy,
          targetX: target.x,
          targetY: target.y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 8 + 9,
          alpha: Math.random() * 0.2 + 0.1,
          char: PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)],
          dispersed: false,
        };
      });

      startTime = performance.now();
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

    // 3. Animation loop with ~30fps capping, tab pause, and "50" assembly/disperse sequence
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

        const timeSinceStart = now - startTime;
        const particles = particlesRef.current;
        const count = particles.length;

        // Assembly phase (0 - 1300ms), Disperse phase (1300ms - 2500ms), Drift phase (2500ms+)
        const isAssembling = timeSinceStart < 1300;
        const isDispersing = timeSinceStart >= 1300 && timeSinceStart < 2500;

        for (let i = 0; i < count; i++) {
          const p = particles[i];

          if (isAssembling) {
            // Smooth lerp to target "50" points
            const progress = Math.min(1, timeSinceStart / 1000);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
            p.x = p.startX + (p.targetX - p.startX) * easeProgress;
            p.y = p.startY + (p.targetY - p.startY) * easeProgress;
          } else if (isDispersing && !p.dispersed) {
            // Scatter outward impulse once at transition
            const angle = Math.random() * Math.PI * 2;
            const force = Math.random() * 2 + 1;
            p.vx = Math.cos(angle) * force;
            p.vy = Math.sin(angle) * force;
            p.dispersed = true;
          } else {
            // Normal drift + Mouse repulsion
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              const force = (110 - dist) / 110;
              p.vx += (dx / dist) * force * 0.35;
              p.vy += (dy / dist) * force * 0.35;
            }

            p.vx *= 0.98;
            p.vy *= 0.98;

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -20) p.x = width + 20;
            if (p.x > width + 20) p.x = -20;
            if (p.y < -20) p.y = height + 20;
            if (p.y > height + 20) p.y = -20;
          }

          // Render character
          ctx.font = `${p.size}px 'JetBrains Mono', 'Courier New', monospace`;
          ctx.fillStyle = `rgba(${textColor}, ${p.alpha})`;
          ctx.fillText(p.char, p.x, p.y);

          // Random character mutation
          if (Math.random() < 0.005) {
            p.char = PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)];
          }
        }

        // Connecting lines between nearby particles
        for (let i = 0; i < count; i++) {
          for (let j = i + 1; j < count; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              ctx.strokeStyle = `rgba(${textColor}, ${0.1 * (1 - dist / 110)})`;
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

  // Faint static grid fallback for reduced-motion
  if (isDisabled) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
