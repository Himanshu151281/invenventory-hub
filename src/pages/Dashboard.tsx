
import React from 'react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your InvenHub dashboard. Here's an overview of your store.
        </p>
      </div>
      
      <DashboardOverview />
    </div>
  );
};

export default Dashboard;
