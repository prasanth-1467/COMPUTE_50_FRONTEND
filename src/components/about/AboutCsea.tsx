import React from 'react';
import { Card } from '../common/Card';
import { Code2, Users, Flame } from 'lucide-react';

export const AboutCsea: React.FC = () => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3 text-blue-400">
        <Code2 className="w-7 h-7" />
        <h3 className="text-xl font-bold text-slate-100">About CSEA</h3>
      </div>
      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
        The Computer Science and Engineering Association (CSEA) is the flagship student body of the CSE Department at PSG College of Technology. CSEA organizes technical symposiums, hackathons, guest lectures, and coding competitions to foster student developer communities.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3">
          <Users className="w-5 h-5 text-blue-400 shrink-0" />
          <span className="text-xs text-slate-300">1000+ Active Student Members</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3">
          <Flame className="w-5 h-5 text-blue-400 shrink-0" />
          <span className="text-xs text-slate-300">Annual Flagship Tech Festival Host</span>
        </div>
      </div>
    </Card>
  );
};
