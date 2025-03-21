
import React from 'react';
import InventoryList from '@/components/inventory/InventoryList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Inventory: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Jungle Safari Inventory</h1>
        <p className="text-muted-foreground">
          Manage your safari souvenir products, track stock levels, and process supplier orders.
        </p>
      </div>
      
      <Tabs defaultValue="products" className="mb-6">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="barcode">Barcode Scanner</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <InventoryList />
        </TabsContent>
        <TabsContent value="low-stock">
          <div className="text-center p-10 text-muted-foreground">
            <p>Products below reorder threshold will appear here</p>
          </div>
        </TabsContent>
        <TabsContent value="suppliers">
          <div className="text-center p-10 text-muted-foreground">
            <p>Tribal artisans, local manufacturers, and wholesale supplier management</p>
          </div>
        </TabsContent>
        <TabsContent value="purchase-orders">
          <div className="text-center p-10 text-muted-foreground">
            <p>Track orders from suppliers with automated reorder capabilities</p>
          </div>
        </TabsContent>
        <TabsContent value="barcode">
          <div className="text-center p-10 text-muted-foreground">
            <p>Scan product barcodes for quick inventory checks and updates</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
