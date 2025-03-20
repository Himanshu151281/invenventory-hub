
import React from 'react';
import BillingSystem from '@/components/billing/BillingSystem';

const Billing: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Create bills, process payments, and track sales in real-time.
        </p>
      </div>
      
      <BillingSystem />
    </div>
  );
};

export default Billing;
