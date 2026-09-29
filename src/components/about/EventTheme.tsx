import React from 'react';
import { Card } from '../common/Card';
import { Sparkles, Globe, Shield, Terminal } from 'lucide-react';
import { Badge } from '../common/Badge';

export const EventTheme: React.FC = () => {
  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-blue-400">
          <Sparkles className="w-7 h-7" />
          <h3 className="text-xl font-bold text-slate-100">Event Theme: "Engineering The Future"</h3>
        </div>
        <Badge variant="primary">2026 EDITION</Badge>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
        The overarching theme for Compute 50 centers on bridging bleeding-edge technological paradigms with sustainable societal needs. Teams are encouraged to push boundaries across artificial intelligence, decentralized architecture, urban infrastructure, and human wellness.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
          <Globe className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <h4 className="text-xs font-bold text-slate-200 uppercase mb-1">Global Impact</h4>
          <p className="text-[11px] text-slate-400">Solutions designed for real scale and global usability.</p>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
          <Shield className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <h4 className="text-xs font-bold text-slate-200 uppercase mb-1">Ethical & Secure</h4>
          <p className="text-[11px] text-slate-400">Focus on data privacy, safety, and responsible engineering.</p>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
          <Terminal className="w-6 h-6 text-amber-400 mx-auto mb-2" />
          <h4 className="text-xs font-bold text-slate-200 uppercase mb-1">Functional MVP</h4>
          <p className="text-[11px] text-slate-400">Working prototypes with real-time execution capability.</p>
        </div>
      </div>
    </Card>
  );
};
