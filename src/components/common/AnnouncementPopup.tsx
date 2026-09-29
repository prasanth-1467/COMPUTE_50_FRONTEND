import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';

export interface AnnouncementPopupProps {
  message?: string;
  badge?: string;
}

export const AnnouncementPopup: React.FC<AnnouncementPopupProps> = ({
  message = 'Registrations for Compute 50 Hackathon are now officially open!',
  badge = 'ANNOUNCEMENT',
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[var(--accent-muted)] border-b border-[var(--border-color)] text-[var(--text-primary)] px-4 py-2.5 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <Bell className="w-4 h-4 text-[var(--accent)] shrink-0" />
          <span className="bg-[var(--accent)] text-[var(--accent-text)] px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider shrink-0 uppercase">
            {badge}
          </span>
          <span className="truncate text-xs sm:text-sm font-medium">{message}</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 rounded transition-colors shrink-0 cursor-pointer"
          aria-label="Close announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
