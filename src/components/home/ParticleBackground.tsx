import React, { useEffect, useRef, useCallback } from 'react';

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
const PARTICLE_COUNT = 100;

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  const createParticle = useCallback((width: number, height: number): Particle => {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 10 + 8,
      alpha: Math.random() * 0.3 + 0.1,
      char: PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)],
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resize();

    // Init particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height)
    );

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains('dark');
      const textColor = isDark ? '182, 255, 0' : '101, 163, 13';

      particlesRef.current.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        ctx.font = `${p.size}px 'Courier New', monospace`;
        ctx.fillStyle = `rgba(${textColor}, ${p.alpha})`;
        ctx.fillText(p.char, p.x, p.y);

        // Randomly change character
        if (Math.random() < 0.005) {
          p.char = PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)];
        }
      });

      // Draw connections between close particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(${textColor}, ${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas.parentElement!);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
