
import React from 'react';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Jungle Safari Shop Dashboard</h1>
        <p className="text-muted-foreground">
          Track inventory, sales, and performance metrics for your Jungle Safari souvenir shop.
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <DashboardOverview />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
