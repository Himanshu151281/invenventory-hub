
import React from 'react';
import InventoryList from '@/components/inventory/InventoryList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Inventory: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Jungle Safari Inventory</h1>
        <p className="text-muted-foreground">
          Manage your souvenir products, check stock levels, and update information.
        </p>
      </div>
      
      <Tabs defaultValue="products" className="mb-6">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <InventoryList />
        </TabsContent>
        <TabsContent value="low-stock">
          <div className="text-center p-10 text-muted-foreground">
            <p>Low stock items will appear here</p>
          </div>
        </TabsContent>
        <TabsContent value="suppliers">
          <div className="text-center p-10 text-muted-foreground">
            <p>Supplier management will appear here</p>
          </div>
        </TabsContent>
        <TabsContent value="purchase-orders">
          <div className="text-center p-10 text-muted-foreground">
            <p>Purchase orders will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
