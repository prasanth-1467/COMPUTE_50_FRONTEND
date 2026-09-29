import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input } from '../common/Input';
import { HackathonTeam } from '../../types/user';
import { Users, Crown, Plus, Copy, Check } from 'lucide-react';

interface TeamSectionProps {
  team?: HackathonTeam;
  onCreateTeam: (name: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ team, onCreateTeam }) => {
  const [newTeamName, setNewTeamName] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleCopyCode = () => {
    if (team?.code) {
      navigator.clipboard.writeText(team.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      onCreateTeam(newTeamName.trim());
      setIsCreating(false);
    }
  };

  if (!team) {
    return (
      <Card className="space-y-4">
        <div className="flex items-center gap-3 text-slate-100">
          <Users className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold">Hackathon Team</h3>
        </div>
        <p className="text-xs text-slate-400">
          You are currently not part of any registered team. Create a team or ask your leader for a join code.
        </p>

        {isCreating ? (
          <form onSubmit={handleCreate} className="space-y-3 pt-2">
            <Input
              label="Team Name"
              placeholder="e.g., CyberPunks 50"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" variant="primary" size="sm">
                Create Team
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button variant="primary" size="sm" onClick={() => setIsCreating(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Create New Team
          </Button>
        )}
      </Card>
    );
  }

  return (
    <Card className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs text-slate-400 uppercase font-semibold">Registered Team</span>
          <h3 className="text-xl font-bold text-slate-100">{team.name}</h3>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Join Code:</span>
          <span className="text-blue-400 font-bold">{team.code}</span>
          <button
            onClick={handleCopyCode}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Copy team code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Team Members ({team.members.length} / {team.maxMembers})</span>
          <span>Max Capacity: 4</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {team.members.map((member) => (
            <div
              key={member.id}
              className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <span className="font-semibold text-slate-200 block">{member.name}</span>
                <span className="text-[11px] text-slate-400 block">{member.email}</span>
              </div>
              {member.role === 'Leader' ? (
                <Badge variant="warning" className="text-[10px]">
                  <Crown className="w-3 h-3 mr-1 inline text-amber-400" /> Team Leader
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px]">Member</Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
