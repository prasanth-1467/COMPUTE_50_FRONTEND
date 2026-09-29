import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { CheckCircle2, CreditCard, Home, Download } from 'lucide-react';
import { RegistrationStatus, PaymentStatus, AccommodationStatus } from '../../types/user';

interface StatusCardsProps {
  registrationStatus: RegistrationStatus;
  paymentStatus: PaymentStatus;
  accommodationStatus: AccommodationStatus;
  receiptUrl?: string;
}

export const StatusCards: React.FC<StatusCardsProps> = ({
  registrationStatus,
  paymentStatus,
  accommodationStatus,
  receiptUrl,
}) => {
  const getBadgeVariant = (status: string) => {
    if (status === 'Confirmed' || status === 'Paid') return 'success';
    if (status === 'Pending') return 'warning';
    return 'secondary';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Registration Status */}
      <Card className="flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
            <Badge variant={getBadgeVariant(registrationStatus)}>{registrationStatus}</Badge>
          </div>
          <h4 className="text-sm font-semibold text-slate-200">Registration Status</h4>
          <p className="text-xs text-slate-400 mt-1">Hackathon registration verification status.</p>
        </div>
      </Card>

      {/* Payment Status */}
      <Card className="flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            <Badge variant={getBadgeVariant(paymentStatus)}>{paymentStatus}</Badge>
          </div>
          <h4 className="text-sm font-semibold text-slate-200">Payment Status</h4>
          <p className="text-xs text-slate-400 mt-1">Registration fee status.</p>
        </div>
        {receiptUrl && (
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            leftIcon={<Download className="w-3.5 h-3.5" />}
            onClick={() => alert('Downloading registration fee receipt...')}
          >
            Receipt Placeholder
          </Button>
        )}
      </Card>

      {/* Accommodation Status */}
      <Card className="flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Home className="w-5 h-5 text-purple-400" />
            <Badge variant={getBadgeVariant(accommodationStatus)}>{accommodationStatus}</Badge>
          </div>
          <h4 className="text-sm font-semibold text-slate-200">Accommodation Status</h4>
          <p className="text-xs text-slate-400 mt-1">Hostel stay status for outstation teams.</p>
        </div>
      </Card>
    </div>
  );
};
