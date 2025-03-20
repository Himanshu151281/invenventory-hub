
import React from 'react';
import InventoryList from '@/components/inventory/InventoryList';

const Inventory: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground">
          Manage your products, check stock levels, and update information.
        </p>
      </div>
      
      <InventoryList />
    </div>
  );
};

export default Inventory;
