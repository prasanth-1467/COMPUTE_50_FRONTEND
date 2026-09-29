import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { Rocket, Target, HeartHandshake } from 'lucide-react';
import { Reveal } from '../common/Reveal';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] transition-colors">
      <Container size="lg">
        <Reveal>
          <SectionHeading
            badge="ABOUT THE HACKATHON"
            title="Empowering Next-Gen Innovators"
            subtitle="Compute 50 is designed to test your problem-solving limits, rapid prototyping, and engineering collaborative skills."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Reveal delay={0.1}>
            <Card hoverable className="h-full">
              <Rocket className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Rapid Prototyping</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Transform raw problem statements into working software prototypes within 48 continuous hours with technical mentor guidance.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.2}>
            <Card hoverable className="h-full">
              <Target className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Real Industry Challenges</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Tackle tracks curated alongside industry mentors, focusing on AI, decentralization, sustainability, and open domain builds.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.3}>
            <Card hoverable className="h-full">
              <HeartHandshake className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Collaborative Ecosystem</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Connect with fellow student hackers, tech leaders, sponsor engineers, and academic veterans in an encouraging community.
              </p>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
