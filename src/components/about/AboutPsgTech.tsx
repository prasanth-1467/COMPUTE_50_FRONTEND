import React from 'react';
import { Card } from '../common/Card';
import { Award, Building2, BookOpen } from 'lucide-react';

export const AboutPsgTech: React.FC = () => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3 text-blue-400">
        <Building2 className="w-7 h-7" />
        <h3 className="text-xl font-bold text-slate-100">About PSG College of Technology</h3>
      </div>
      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
        PSG College of Technology, established in 1951 by PSG & Sons’ Charities Trust, is an autonomous government-aided engineering institution in Coimbatore, Tamil Nadu. Renowned for academic quality and industry collaborations, PSG Tech continues to nurture leaders across engineering domains.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3">
          <Award className="w-5 h-5 text-blue-400 shrink-0" />
          <span className="text-xs text-slate-300">NIRF Top Ranked Engineering Institution</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-blue-400 shrink-0" />
          <span className="text-xs text-slate-300">70+ Years of Academic Innovation</span>
        </div>
      </div>
    </Card>
  );
};
