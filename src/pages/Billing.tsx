
import React from 'react';
import BillingSystem from '@/components/billing/BillingSystem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Billing: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Jungle Safari Billing</h1>
        <p className="text-muted-foreground">
          Create bills, process payments, and track sales for your souvenir shop.
        </p>
      </div>
      
      <Tabs defaultValue="pos" className="mb-6">
        <TabsList>
          <TabsTrigger value="pos">Point of Sale</TabsTrigger>
          <TabsTrigger value="online">Online Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers & Loyalty</TabsTrigger>
        </TabsList>
        <TabsContent value="pos">
          <BillingSystem />
        </TabsContent>
        <TabsContent value="online">
          <div className="text-center p-10 text-muted-foreground">
            <p>Online order management will appear here</p>
          </div>
        </TabsContent>
        <TabsContent value="customers">
          <div className="text-center p-10 text-muted-foreground">
            <p>Customer and loyalty program management will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Billing;
