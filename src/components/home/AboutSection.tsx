import React from 'react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { Rocket, Target, HeartHandshake } from 'lucide-react';
import { Reveal } from '../common/Reveal';
import { aboutCompute50 } from '../../data/content';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] transition-colors">
      <Container size="lg">
        <Reveal>
          <SectionHeading
            badge="ABOUT THE HACKATHON"
            title="Empowering Next-Gen Innovators"
            subtitle={aboutCompute50}
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Reveal delay={0.1}>
            <Card hoverable className="h-full">
              <Rocket className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Rapid Prototyping</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                Transform raw problem statements into working prototypes with technical mentor guidance during the two-day event.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.2}>
            <Card hoverable className="h-full">
              <Target className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Real Industry Challenges</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                Tackle tracks focusing on AI, software engineering, web/mobile, cybersecurity, IoT, and emerging technologies.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.3}>
            <Card hoverable className="h-full">
              <HeartHandshake className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Collaborative Ecosystem</h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                Connect with student innovators, tech mentors, and academic leaders in an encouraging community.
              </p>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
