
export interface Product {
  id: string;
  name: string;
  barcode: string;
  category: string;
  price: number;
  costPrice: number;
  stock: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sale {
  id: string;
  products: {
    product: Product;
    quantity: number;
    priceAtSale: number;
  }[];
  totalAmount: number;
  paymentMethod: 'cash' | 'card' | 'online';
  customerId?: string;
  employeeId: string;
  timestamp: Date;
}

export interface BillItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  avatar?: string;
}

export interface StatsData {
  label: string;
  value: string | number;
  change?: number;
  icon?: string;
}

export interface ChartData {
  name: string;
  value: number;
}
