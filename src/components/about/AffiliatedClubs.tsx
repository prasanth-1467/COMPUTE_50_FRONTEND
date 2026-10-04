import React, { useState } from 'react';
import { Card } from '../common/Card';
import { clubs } from '../../data/clubs';
import { Badge } from '../common/Badge';
import { ExternalLink, ChevronDown, ChevronUp, Users, Rocket, Target } from 'lucide-react';

const ClubAvatar: React.FC<{ logo?: string; name: string; abbreviation?: string; accent?: string }> = ({
  logo,
  name,
  abbreviation,
  accent,
}) => {
  const [hasError, setHasError] = useState(false);
  const initials = abbreviation || name.slice(0, 4);

  if (logo && !hasError) {
    return (
      <img
        src={logo}
        alt={name}
        onError={() => setHasError(true)}
        className="w-11 h-11 rounded-xl border border-[var(--border-color)] object-cover bg-[var(--bg-secondary)] shrink-0"
      />
    );
  }

  return (
    <div
      className="w-11 h-11 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-center justify-center font-mono font-bold text-xs shrink-0"
      style={{ color: accent || 'var(--accent)' }}
    >
      {initials}
    </div>
  );
};

export const AffiliatedClubs: React.FC = () => {
  const [expandedClub, setExpandedClub] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-left space-y-1">
        <Badge variant="primary">UNDER CSEA</Badge>
        <h3 className="text-2xl font-bold text-[var(--text-primary)]">Clubs & Bodies under CSEA</h3>
      </div>

      {/* 2x2 grid on desktop, 1 column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {clubs.map((club) => {
          const isExpanded = expandedClub === club.id;

          return (
            <Card
              key={club.id}
              className="h-full flex flex-col justify-between gap-4 transition-all duration-300"
            >
              {/* Card Top Content */}
              <div className="space-y-3">
                {/* Header Avatar & Name */}
                <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-3">
                  <ClubAvatar logo={club.logo} name={club.name} abbreviation={club.abbreviation} accent={club.accent} />

                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-lg text-[var(--text-primary)] leading-snug">
                      {club.fullName || club.name}
                    </h4>
                    <span className="text-xs font-mono font-semibold text-[var(--text-secondary)]">
                      {club.name}
                    </span>
                  </div>
                </div>

                {/* 1-Sentence Summary on Card Body */}
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed font-medium">
                  {club.summary || club.description}
                </p>

                {/* Expanded Full Description & Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[var(--border-color)] space-y-4 animate-fadeIn text-left">
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] font-mono">
                        About {club.name}
                      </span>
                      <p className="text-[14px] text-[var(--text-primary)]/85 dark:text-zinc-300 leading-relaxed">
                        {club.description}
                      </p>
                    </div>

                    {/* E-CELL Rich Details */}
                    {club.details && (
                      <div className="space-y-4 pt-1">
                        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed italic bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)]">
                          "{club.details.intro}"
                        </p>

                        {/* Our Approach */}
                        <div className="space-y-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5 font-mono">
                            <Rocket className="w-3.5 h-3.5" /> Our Approach
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {club.details.approach.map((item, idx) => (
                              <div key={idx} className="p-2.5 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] space-y-0.5">
                                <span className="font-bold text-xs text-[var(--text-primary)] block">
                                  {item.title}
                                </span>
                                <p className="text-[11px] text-[var(--text-secondary)] leading-normal">
                                  {item.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* What E-Cell Works Towards */}
                        <div className="space-y-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5 font-mono">
                            <Target className="w-3.5 h-3.5" /> Works Towards
                          </span>
                          <ul className="space-y-1 text-xs text-[var(--text-secondary)]">
                            {club.details.worksTowards.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2 bg-[var(--bg-secondary)] p-2 rounded-lg border border-[var(--border-color)] leading-normal">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Who It's For */}
                        <div className="space-y-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5 font-mono">
                            <Users className="w-3.5 h-3.5" /> Who It's For
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {club.details.whoItsFor.map((persona, idx) => (
                              <div key={idx} className="p-2.5 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-color)] space-y-0.5">
                                <span className="font-semibold text-xs text-[var(--text-primary)] block">
                                  {persona.title}
                                </span>
                                <p className="text-[11px] text-[var(--text-secondary)] leading-normal">
                                  {persona.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Fixed Footer Row */}
              <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between gap-2 mt-auto">
                <button
                  onClick={() => setExpandedClub(isExpanded ? null : club.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 rounded px-1.5 py-1"
                  aria-expanded={isExpanded}
                >
                  <span>{isExpanded ? 'Show less' : 'Learn more'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {club.url ? (
                  <a
                    href={club.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] bg-[var(--bg-secondary)] hover:bg-[var(--accent-muted)] border border-[var(--border-color)] hover:border-[var(--accent)] rounded-lg transition-colors shrink-0"
                    aria-label={`Explore ${club.name}`}
                  >
                    <span>Explore</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : null}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
