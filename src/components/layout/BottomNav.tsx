import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Info, Code2, User as UserIcon, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
}

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navItems: NavItem[] = [
    { label: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'About', path: '/about', icon: <Info className="w-5 h-5" /> },
    { label: 'Hackathon', path: '/hackathon', icon: <Code2 className="w-5 h-5" /> },
    isAuthenticated
      ? { label: 'Profile', path: '/profile', icon: <UserIcon className="w-5 h-5" />, requiresAuth: true }
      : { label: 'Login', path: '/login', icon: <LogIn className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;
  const hideRegisterCTA = location.pathname === '/register' || location.pathname === '/profile';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--bg-surface)]/95 backdrop-blur-lg border-t border-[var(--border-color)] shadow-[0_-4px_25px_rgba(0,0,0,0.2)] pb-[env(safe-area-inset-bottom)] transition-colors">
      {/* Top Stacked Layer: Register Now CTA Button */}
      {!hideRegisterCTA && (
        <div className="px-3 pt-2.5 pb-2 border-b border-[var(--border-color)]/60">
          <Link to="/register" className="block w-full">
            <Button
              variant="primary"
              size="md"
              className="w-full min-h-[48px] text-sm font-bold shadow-md flex items-center justify-center gap-2"
              leftIcon={<UserPlus className="w-4 h-4" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              <span>Register Now</span>
            </Button>
          </Link>
        </div>
      )}

      {/* Bottom Stacked Layer: Navigation Tabs */}
      <nav aria-label="Mobile Navigation Bar">
        <div className="flex items-center justify-around h-14 px-2 max-w-lg mx-auto">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center flex-1 h-full gap-0.5 group"
              >
                {active && (
                  <motion.div
                    layoutId="bottomNavActive"
                    className="absolute -top-px left-3 right-3 h-[2px] bg-[var(--accent)] rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={{ scale: active ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`transition-colors ${
                    active
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.icon}
                </motion.div>
                <span
                  className={`text-[10px] font-semibold tracking-wide transition-colors ${
                    active
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
