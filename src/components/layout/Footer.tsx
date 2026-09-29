import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Globe, Mail, MapPin, Share2 } from 'lucide-react';
import { Container } from '../common/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] pt-12 pb-8 text-[var(--text-secondary)] text-sm transition-colors">
      <Container size="lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[var(--border-color)]">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)]">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-[var(--text-primary)] tracking-tight">
                COMPUTE <span className="text-[var(--accent)]">50</span>
              </span>
            </Link>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              National 2-Day Hackathon hosted by the Computer Science and Engineering Association (CSEA) at PSG College of Technology.
            </p>
            <div className="flex items-center gap-3 text-[var(--text-secondary)]">
              <a href="https://psgtech.edu" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="mailto:csea@psgtech.ac.in" className="hover:text-[var(--accent)] transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-[var(--accent)] transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--accent)] transition-colors">About PSG Tech & CSEA</Link>
              </li>
              <li>
                <Link to="/hackathon" className="hover:text-[var(--accent)] transition-colors">Hackathon Tracks & Rules</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[var(--accent)] transition-colors">Participant Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[var(--accent)] transition-colors">Register Team</Link>
              </li>
            </ul>
          </div>

          {/* Event Details */}
          <div className="space-y-3">
            <h4 className="text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider">Event Details</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-[var(--text-secondary)]">Event Mode: In-Person / On-Campus</li>
              <li className="text-[var(--text-secondary)]">Duration: 2 Continuous Days</li>
              <li className="text-[var(--text-secondary)]">Team Size: 2 - 4 Members</li>
              <li className="text-[var(--text-secondary)]">Eligibility: All College Students</li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-[var(--text-primary)] font-semibold text-xs uppercase tracking-wider">Contact & Venue</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <span>Department of CSE, PSG College of Technology, Peelamedu, Coimbatore - 641004</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span>csea@psgtech.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-secondary)] gap-4">
          <p>© {new Date().getFullYear()} Compute 50 — CSEA, PSG Tech. All rights reserved.</p>
          <p className="text-[var(--text-secondary)]">Frontend Foundation Built for Hackathon Portal</p>
        </div>
      </Container>
    </footer>
  );
};
