import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { mockSpeakers } from '../../data/speakers';
import { Badge } from '../common/Badge';
import { Reveal } from '../common/Reveal';
import { motion } from 'framer-motion';

export const SpeakersSection: React.FC = () => {
  return (
    <section className="py-20 bg-[var(--bg-main)] border-b border-[var(--border-color)] transition-colors">
      <Container size="lg">
        <Reveal>
          <SectionHeading
            badge="SPEAKERS & JUDGES"
            title="Learn From Industry Pioneers"
            subtitle="Experienced tech leaders, startup founders, and engineering veterans guiding Compute 50."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSpeakers.map((speaker, idx) => (
            <Reveal key={speaker.id} delay={idx * 0.1}>
              <Card hoverable className="group text-center flex flex-col items-center overflow-hidden">
                <div className="relative overflow-hidden rounded-full mb-4 border-2 border-[var(--border-color)] group-hover:border-[var(--accent)] transition-colors">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-24 h-24 rounded-full object-cover bg-[var(--bg-secondary)]"
                  />
                </div>
                <Badge variant="primary" className="mb-2 uppercase text-[10px]">
                  {speaker.type}
                </Badge>
                <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {speaker.name}
                </h3>
                <p className="text-xs text-[var(--accent)] font-semibold mb-1">{speaker.role}</p>
                <p className="text-xs text-[var(--text-secondary)] mb-3">{speaker.organization}</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] pt-3">
                  {speaker.bio}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
