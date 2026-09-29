import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { FileText, Lock } from 'lucide-react';

export const ProblemStatements: React.FC = () => {
  const problems = [
    {
      id: 'PS-01',
      track: 'AI & Machine Learning',
      title: 'Real-Time Edge AI for Disaster Management',
      difficulty: 'Hard',
    },
    {
      id: 'PS-02',
      track: 'Web3 & Decentralized Tech',
      title: 'Decentralized Academic Credential Verification System',
      difficulty: 'Medium',
    },
    {
      id: 'PS-03',
      track: 'HealthTech & BioInformatics',
      title: 'Predictive Patient Triage Platform for Emergency Rooms',
      difficulty: 'Hard',
    },
    {
      id: 'PS-04',
      track: 'Smart Cities & Sustainability',
      title: 'Intelligent Micro-Grid Energy Distribution Optimizer',
      difficulty: 'Medium',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-400" />
          Problem Statements Preview
        </h3>
        <Badge variant="outline">RELEASED ON DAY 1</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {problems.map((ps) => (
          <Card key={ps.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-400 font-bold">{ps.id}</span>
              <Badge variant="secondary">{ps.track}</Badge>
            </div>
            <h4 className="font-semibold text-slate-200 text-sm">{ps.title}</h4>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1 text-amber-400">
                <Lock className="w-3.5 h-3.5" /> Detailed spec unlocks on Day 1
              </span>
              <span>Level: {ps.difficulty}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
