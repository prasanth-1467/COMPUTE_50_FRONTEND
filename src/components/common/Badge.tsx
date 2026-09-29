import React, { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent)]/30 font-mono',
    secondary: 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    error: 'bg-red-500/10 text-red-400 border border-red-500/20',
    info: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
    outline: 'bg-transparent text-[var(--text-primary)] border border-[var(--border-color)]',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs font-medium rounded',
    md: 'px-2.5 py-1 text-xs font-semibold rounded-md',
  };

  return (
    <span className={`inline-flex items-center gap-1 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
