
import { create } from 'zustand';
import { mockSales } from '@/lib/mockData';
import { Sale } from '@/lib/types';

interface SalesState {
  sales: Sale[];
  addSale: (sale: Sale) => void;
  updateSale: (id: string, updatedSale: Partial<Sale>) => void;
  deleteSale: (id: string) => void;
}

export const useSalesStore = create<SalesState>((set) => ({
  sales: [...mockSales], // Initialize with mock data
  
  addSale: (sale: Sale) => 
    set((state) => ({ 
      sales: [...state.sales, sale] 
    })),
  
  updateSale: (id: string, updatedSale: Partial<Sale>) => 
    set((state) => ({
      sales: state.sales.map(sale => 
        sale.id === id ? { ...sale, ...updatedSale } : sale
      )
    })),
  
  deleteSale: (id: string) => 
    set((state) => ({
      sales: state.sales.filter(sale => sale.id !== id)
    })),
}));
