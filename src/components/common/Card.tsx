import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const hoverClasses = hoverable
    ? 'hover:border-[var(--accent)] hover:shadow-md cursor-pointer'
    : '';

  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverable ? { y: -3 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-6 shadow-xs backdrop-blur-xs transition-colors ${hoverClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`mb-4 ${className}`}>{children}</div>;

export const CardTitle: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <h3 className={`text-lg font-bold text-[var(--text-primary)] ${className}`}>{children}</h3>;

export const CardContent: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`text-[var(--text-secondary)] ${className}`}>{children}</div>;

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between ${className}`}>{children}</div>;
