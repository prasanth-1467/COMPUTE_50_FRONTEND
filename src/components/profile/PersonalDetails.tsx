import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { User } from '../../types/auth';
import { Edit3, Mail, Phone, Building, GraduationCap } from 'lucide-react';

interface PersonalDetailsProps {
  user: User;
  onEdit: () => void;
}

export const PersonalDetails: React.FC<PersonalDetailsProps> = ({ user, onEdit }) => {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">{user.name}</h3>
            <span className="text-xs text-slate-400 font-mono">{user.id}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onEdit} leftIcon={<Edit3 className="w-4 h-4" />}>
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <Mail className="w-4 h-4 text-blue-400 shrink-0" />
          <span><strong>Email:</strong> {user.email}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone className="w-4 h-4 text-blue-400 shrink-0" />
          <span><strong>Phone:</strong> {user.phone}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Building className="w-4 h-4 text-blue-400 shrink-0" />
          <span><strong>College:</strong> {user.college}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />
          <span><strong>Dept & Year:</strong> {user.department} ({user.year})</span>
        </div>
      </div>
    </Card>
  );
};
