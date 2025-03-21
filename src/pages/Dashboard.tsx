
import React from 'react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Jungle Safari Shop Dashboard</h1>
        <p className="text-muted-foreground">
          Track inventory, sales, and performance metrics for your Jungle Safari souvenir shop.
        </p>
      </div>
      
      <DashboardOverview />
    </div>
  );
};

export default Dashboard;
