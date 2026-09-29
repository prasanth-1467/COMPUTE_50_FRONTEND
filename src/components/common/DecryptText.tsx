import React, { useState, useEffect } from 'react';

export interface DecryptTextProps {
  text: string;
  className?: string;
  speed?: number; // Speed per frame update in ms (default: 35ms)
  scrambleChars?: string;
  highlightText?: string;
  highlightClassName?: string;
  onComplete?: () => void;
}

const DEFAULT_HEX_SCRAMBLE = '0123456789ABCDEF#$@%&*<>[]{}';

export const DecryptText: React.FC<DecryptTextProps> = ({
  text,
  className = '',
  speed = 35,
  scrambleChars = DEFAULT_HEX_SCRAMBLE,
  highlightText,
  highlightClassName = 'text-[#B6FF00]',
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState<string[]>(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return text.split('');
    }
    return text.split('').map((char) => {
      if (char === ' ') return ' ';
      return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    });
  });

  const [settledIndices, setSettledIndices] = useState<Set<number>>(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return new Set(text.split('').map((_, i) => i));
    }
    const initial = new Set<number>();
    text.split('').forEach((char, i) => {
      if (char === ' ') initial.add(i);
    });
    return initial;
  });

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayText(text.split(''));
      setSettledIndices(new Set(text.split('').map((_, i) => i)));
      onComplete?.();
      return;
    }

    let frameId: number;
    let iteration = 0;
    const totalChars = text.length;
    const baseStepsPerChar = 3;
    const initialDelaySteps = 5;

    let lastTime = performance.now();

    const updateFrame = (now: number) => {
      if (now - lastTime >= speed) {
        lastTime = now;
        iteration++;

        const nextDisplayText: string[] = [];
        const nextSettled = new Set<number>();
        let allSettled = true;

        for (let i = 0; i < totalChars; i++) {
          const targetChar = text[i];
          if (targetChar === ' ') {
            nextDisplayText.push(' ');
            nextSettled.add(i);
            continue;
          }

          const lockAtIteration = initialDelaySteps + i * baseStepsPerChar;

          if (iteration >= lockAtIteration) {
            nextDisplayText.push(targetChar);
            nextSettled.add(i);
          } else {
            allSettled = false;
            const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            nextDisplayText.push(randomChar);
          }
        }

        setDisplayText(nextDisplayText);
        setSettledIndices(nextSettled);

        if (allSettled) {
          onComplete?.();
          return;
        }
      }

      frameId = requestAnimationFrame(updateFrame);
    };

    frameId = requestAnimationFrame(updateFrame);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [text, speed, scrambleChars, onComplete]);

  const highlightStart = highlightText ? text.indexOf(highlightText) : -1;
  const highlightEnd =
    highlightStart !== -1 && highlightText ? highlightStart + highlightText.length : -1;

  return (
    <span className={`inline-block font-mono select-none ${className}`}>
      {displayText.map((char, index) => {
        const isHighlighted =
          highlightStart !== -1 && index >= highlightStart && index < highlightEnd;
        const isSettled = settledIndices.has(index);

        return (
          <span
            key={index}
            className={`inline-block transition-colors duration-100 ${
              isHighlighted ? highlightClassName : ''
            } ${!isSettled && char !== ' ' ? 'opacity-80 text-accent-lime font-mono' : ''}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </span>
  );
};
