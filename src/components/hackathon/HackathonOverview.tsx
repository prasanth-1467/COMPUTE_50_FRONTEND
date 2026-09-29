import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Clock, Users, MapPin, Award } from 'lucide-react';

export const HackathonOverview: React.FC = () => {
  return (
    <Card className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <Badge variant="primary" className="mb-2">COMPUTE 50 HACKATHON</Badge>
          <h2 className="text-2xl font-bold text-slate-100">National 2-Day Prototyping Challenge</h2>
        </div>
        <Badge variant="success" className="px-3 py-1 text-xs">REGISTRATIONS OPEN</Badge>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
        Compute 50 is a 2-day continuous coding hackathon bringing together students from technical institutions across India. Participants collaborate in teams of 2 to 4 members to engineer software or hardware solutions addressing real-world problem statements.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
          <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <span className="block text-xs font-bold text-slate-200">50 Hours</span>
          <span className="text-[10px] text-slate-400">Continuous Code</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
          <Users className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <span className="block text-xs font-bold text-slate-200">2 - 4 Members</span>
          <span className="text-[10px] text-slate-400">Team Size</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
          <MapPin className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <span className="block text-xs font-bold text-slate-200">PSG Tech</span>
          <span className="text-[10px] text-slate-400">On-Campus Venue</span>
        </div>
        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
          <Award className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <span className="block text-xs font-bold text-slate-200">₹ 2,50,000+</span>
          <span className="text-[10px] text-slate-400">Prize Pool</span>
        </div>
      </div>
    </Card>
  );
};
