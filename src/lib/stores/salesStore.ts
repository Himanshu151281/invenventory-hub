
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockSales } from '@/lib/mockData';
import { Sale, Product, ChartData } from '@/lib/types';

interface SalesState {
  sales: Sale[];
  addSale: (sale: Sale) => void;
  updateSale: (id: string, updatedSale: Partial<Sale>) => void;
  deleteSale: (id: string) => void;
  
  // Analytics data getters
  getTotalRevenue: () => number;
  getTotalCost: () => number;
  getTotalProfit: () => number;
  getProfitMargin: () => number;
  getTotalItemsSold: () => number;
  getAverageOrderValue: () => number;
  getSalesByChannel: () => { name: string; value: number }[];
  getSalesByCategory: () => { name: string; value: number }[];
  getSalesByPaymentMethod: () => { name: string; value: number }[];
  getMonthlySalesData: () => ChartData[];
  getProductPerformance: () => { name: string; sold: number; revenue: number }[];
  getLowStockProducts: () => Product[];
}

// Helper function to ensure timestamp is a Date object
const ensureDateObject = (date: Date | string): Date => {
  if (date instanceof Date) return date;
  return new Date(date);
};

export const useSalesStore = create<SalesState>()(
  persist(
    (set, get) => ({
      // Initialize with mock data and ensure dates are Date objects
      sales: mockSales.map(sale => ({
        ...sale,
        timestamp: ensureDateObject(sale.timestamp)
      })),
      
      addSale: (sale: Sale) => 
        set((state) => ({ 
          sales: [...state.sales, {
            ...sale,
            timestamp: ensureDateObject(sale.timestamp)
          }] 
        })),
      
      updateSale: (id: string, updatedSale: Partial<Sale>) => 
        set((state) => ({
          sales: state.sales.map(sale => 
            sale.id === id ? { 
              ...sale, 
              ...updatedSale,
              timestamp: updatedSale.timestamp ? ensureDateObject(updatedSale.timestamp) : sale.timestamp
            } : sale
          )
        })),
      
      deleteSale: (id: string) => 
        set((state) => ({
          sales: state.sales.filter(sale => sale.id !== id)
        })),
        
      // Analytics functions
      getTotalRevenue: () => {
        const { sales } = get();
        return sales.reduce((total, sale) => total + sale.totalAmount, 0);
      },
      
      getTotalCost: () => {
        const { sales } = get();
        return sales.reduce((total, sale) => 
          total + sale.products.reduce((subtotal, item) => 
            subtotal + (item.product.costPrice * item.quantity), 0), 0);
      },
      
      getTotalProfit: () => {
        const { getTotalRevenue, getTotalCost } = get();
        return getTotalRevenue() - getTotalCost();
      },
      
      getProfitMargin: () => {
        const { getTotalRevenue, getTotalProfit } = get();
        const revenue = getTotalRevenue();
        return revenue > 0 ? (getTotalProfit() / revenue) * 100 : 0;
      },
      
      getTotalItemsSold: () => {
        const { sales } = get();
        return sales.reduce((total, sale) => 
          total + sale.products.reduce((subtotal, item) => subtotal + item.quantity, 0), 0);
      },
      
      getAverageOrderValue: () => {
        const { sales, getTotalRevenue } = get();
        return sales.length > 0 ? getTotalRevenue() / sales.length : 0;
      },
      
      getSalesByChannel: () => {
        const { sales } = get();
        const channels: Record<string, number> = {};
        
        sales.forEach(sale => {
          const channel = sale.channel;
          channels[channel] = (channels[channel] || 0) + sale.totalAmount;
        });
        
        return Object.entries(channels).map(([name, value]) => ({ name, value }));
      },
      
      getSalesByCategory: () => {
        const { sales } = get();
        const categories: Record<string, number> = {};
        
        sales.forEach(sale => {
          sale.products.forEach(item => {
            const category = item.product.category;
            const value = item.quantity * item.priceAtSale;
            categories[category] = (categories[category] || 0) + value;
          });
        });
        
        return Object.entries(categories).map(([name, value]) => ({ name, value }));
      },
      
      getSalesByPaymentMethod: () => {
        const { sales } = get();
        const methods: Record<string, number> = {};
        
        sales.forEach(sale => {
          const method = sale.paymentMethod;
          methods[method] = (methods[method] || 0) + sale.totalAmount;
        });
        
        return Object.entries(methods).map(([name, value]) => ({ name, value }));
      },
      
      getMonthlySalesData: () => {
        const { sales } = get();
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        
        const monthlySales = months.map(month => ({ name: month, value: 0 }));
        
        sales.forEach(sale => {
          // Ensure timestamp is a Date object before calling getMonth()
          const timestamp = ensureDateObject(sale.timestamp);
          const month = timestamp.getMonth();
          monthlySales[month].value += sale.totalAmount;
        });
        
        return monthlySales;
      },
      
      getProductPerformance: () => {
        const { sales } = get();
        const products: Record<string, { name: string; sold: number; revenue: number }> = {};
        
        sales.forEach(sale => {
          sale.products.forEach(item => {
            const { name, id } = item.product;
            if (!products[id]) {
              products[id] = { name, sold: 0, revenue: 0 };
            }
            products[id].sold += item.quantity;
            products[id].revenue += item.quantity * item.priceAtSale;
          });
        });
        
        return Object.values(products);
      },
      
      getLowStockProducts: () => {
        const { sales } = get();
        const products: Record<string, Product> = {};
        
        // Extract all products from sales
        sales.forEach(sale => {
          sale.products.forEach(item => {
            const product = item.product;
            if (!products[product.id]) {
              products[product.id] = { ...product };
            }
          });
        });
        
        // Filter for low stock (less than 10 items)
        return Object.values(products).filter(product => product.stock < 10);
      },
    }),
    {
      name: 'jungle-safari-sales-storage', // Name in localStorage
      onRehydrateStorage: () => (state) => {
        // Ensure all timestamps are Date objects when rehydrating from storage
        if (state) {
          state.sales = state.sales.map(sale => ({
            ...sale,
            timestamp: ensureDateObject(sale.timestamp)
          }));
        }
      }
    }
  )
);
