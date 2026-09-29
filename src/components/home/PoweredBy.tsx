import React from 'react';
import { Container } from '../common/Container';
import { ShieldCheck, Award, Users } from 'lucide-react';
import { Reveal } from '../common/Reveal';

export const PoweredBy: React.FC = () => {
  return (
    <section className="py-12 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] transition-colors">
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <Reveal delay={0.1}>
            <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl flex flex-col items-center h-full">
              <ShieldCheck className="w-8 h-8 text-[var(--accent)] mb-3" />
              <h4 className="font-bold text-[var(--text-primary)] text-base mb-1">PSG College of Technology</h4>
              <p className="text-xs text-[var(--text-secondary)]">Leading autonomous institute committed to engineering and research perfection.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl flex flex-col items-center h-full">
              <Award className="w-8 h-8 text-[var(--accent)] mb-3" />
              <h4 className="font-bold text-[var(--text-primary)] text-base mb-1">CSEA Association</h4>
              <p className="text-xs text-[var(--text-secondary)]">Computer Science & Engineering Association organizing high-impact technical symposiums.</p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl flex flex-col items-center h-full">
              <Users className="w-8 h-8 text-[var(--accent)] mb-3" />
              <h4 className="font-bold text-[var(--text-primary)] text-base mb-1">National Innovation Hub</h4>
              <p className="text-xs text-[var(--text-secondary)]">Welcoming 500+ participant teams from top engineering institutions across India.</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
