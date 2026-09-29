import React from 'react';
import { Card } from '../common/Card';
import { mockClubs } from '../../data/clubs';
import { Badge } from '../common/Badge';

export const AffiliatedClubs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-left space-y-1">
        <Badge variant="primary">PARTNER ORGANIZATIONS</Badge>
        <h3 className="text-2xl font-bold text-slate-100">Affiliated Clubs & Communities</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {mockClubs.map((club) => (
          <Card key={club.id} className="flex gap-4 items-start">
            <img
              src={club.logo}
              alt={club.name}
              className="w-14 h-14 rounded-xl border border-slate-800 object-cover shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-200 text-base">{club.abbreviation}</h4>
                <Badge variant="outline" className="text-[10px]">{club.name}</Badge>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{club.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
