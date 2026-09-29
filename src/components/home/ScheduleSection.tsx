import React, { useState } from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { mockSchedule } from '../../data/schedule';
import { Clock, MapPin } from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'Day 1' | 'Day 2'>('Day 1');

  const filteredSchedule = mockSchedule.filter((item) => item.day === activeDay);

  return (
    <section className="py-20 bg-[var(--bg-main)] border-b border-[var(--border-color)] transition-colors">
      <Container size="lg">
        <SectionHeading
          badge="TIMELINE"
          title="2-Day Event Schedule"
          subtitle="Explore the breakdown of check-in, keynotes, hacking sessions, and judging."
        />

        {/* Day Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] p-1.5 rounded-xl inline-flex gap-2">
            <button
              onClick={() => setActiveDay('Day 1')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeDay === 'Day 1'
                  ? 'bg-[#B6FF00] text-black shadow-md font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Day 1 — Kickoff & Coding
            </button>
            <button
              onClick={() => setActiveDay('Day 2')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeDay === 'Day 2'
                  ? 'bg-[#B6FF00] text-black shadow-md font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Day 2 — Mentorship & Finale
            </button>
          </div>
        </div>

        {/* Timeline list */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredSchedule.map((item) => (
            <Card key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-xs text-[var(--accent)] font-mono font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.time}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[var(--text-primary)]">{item.title}</h4>
                <p className="text-xs text-[var(--text-secondary)]">{item.description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] px-3 py-1.5 rounded-lg border border-[var(--border-color)] shrink-0 self-start sm:self-center font-medium">
                <MapPin className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                <span>{item.venue}</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
