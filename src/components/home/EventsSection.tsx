import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { mockEvents } from '../../data/events';
import { Calendar, Code, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Reveal } from '../common/Reveal';
import { motion } from 'framer-motion';

export const EventsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[var(--bg-main)] border-b border-[var(--border-color)] transition-colors">
      <Container size="lg">
        <Reveal>
          <SectionHeading
            badge="COMPUTE 50 EVENTS"
            title="Parallel Tracks & Workshops"
            subtitle="Discover co-located competitive coding, hands-on masterclasses, and tech showcases."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mockEvents.map((evt, idx) => (
            <Reveal key={evt.id} delay={idx * 0.1}>
              <Card hoverable className="group flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="primary">{evt.type}</Badge>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>{evt.date}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2 group-hover:text-[var(--accent)] transition-colors">
                    <Code className="w-4 h-4 text-[var(--accent)]" />
                    {evt.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{evt.description}</p>
                </div>
                <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-medium">
                  <span className="text-[var(--text-secondary)]">
                    Status: <strong className="text-[var(--accent)]">{evt.status}</strong>
                  </span>
                  <motion.div initial={{ x: 0 }} whileHover={{ x: 4 }} className="inline-flex items-center text-[var(--accent)]">
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
