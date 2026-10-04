import { Link } from 'react-router-dom';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { mockEvents } from '../../data/events';
import { Calendar, Code, MapPin, UserPlus } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Reveal } from '../common/Reveal';

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
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary">{evt.type}</Badge>
                      {evt.mode && <Badge variant="outline" className="text-[11px] font-mono">{evt.mode}</Badge>}
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)] font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>{evt.date}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2 group-hover:text-[var(--accent)] transition-colors">
                    <Code className="w-4 h-4 text-[var(--accent)]" />
                    {evt.title}
                  </h3>
                  <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">{evt.description}</p>
                </div>
                <div className="pt-3 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-3 text-[13px] font-medium">
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--text-secondary)]">
                      Status: <strong className="text-[var(--accent)]">{evt.status}</strong>
                    </span>
                    {evt.mode && (
                      <span className="text-[var(--text-secondary)] flex items-center gap-1 text-xs">
                        <MapPin className="w-3 h-3 text-[var(--accent)]" /> {evt.mode}
                      </span>
                    )}
                  </div>
                  <Link to="/register">
                    <Button size="sm" variant="primary" leftIcon={<UserPlus className="w-3.5 h-3.5" />}>
                      Register
                    </Button>
                  </Link>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
