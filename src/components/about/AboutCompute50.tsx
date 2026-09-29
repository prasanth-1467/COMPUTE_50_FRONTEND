import React from 'react';
import { Card } from '../common/Card';
import { Cpu, Zap, Trophy } from 'lucide-react';

export const AboutCompute50: React.FC = () => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3 text-blue-400">
        <Cpu className="w-7 h-7" />
        <h3 className="text-xl font-bold text-slate-100">About Compute 50</h3>
      </div>
      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
        Compute 50 represents 50 continuous hours of technical creation and engineering challenges. Conceived as a celebration of computing milestone, Compute 50 brings together developers from across the country to craft impactful solutions to pressing real-world challenges.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3">
          <Zap className="w-5 h-5 text-blue-400 shrink-0" />
          <span className="text-xs text-slate-300">50 Hours Continuous Coding</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-3">
          <Trophy className="w-5 h-5 text-blue-400 shrink-0" />
          <span className="text-xs text-slate-300">National Innovation Challenge</span>
        </div>
      </div>
    </Card>
  );
};
