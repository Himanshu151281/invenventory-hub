
import { Product, Sale, User, StatsData, ChartData } from './types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    barcode: '123456789001',
    category: 'Electronics',
    price: 999.99,
    costPrice: 699.99,
    stock: 42,
    imageUrl: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae7d3a?q=80&w=2070&auto=format&fit=crop',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-05-20')
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    barcode: '123456789002',
    category: 'Electronics',
    price: 1299.99,
    costPrice: 899.99,
    stock: 23,
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop',
    createdAt: new Date('2023-01-10'),
    updatedAt: new Date('2023-06-12')
  },
  {
    id: '3',
    name: 'AirPods Pro',
    barcode: '123456789003',
    category: 'Audio',
    price: 249.99,
    costPrice: 159.99,
    stock: 78,
    imageUrl: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=2069&auto=format&fit=crop',
    createdAt: new Date('2023-02-05'),
    updatedAt: new Date('2023-04-18')
  },
  {
    id: '4',
    name: 'iPad Air',
    barcode: '123456789004',
    category: 'Electronics',
    price: 599.99,
    costPrice: 399.99,
    stock: 31,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2033&auto=format&fit=crop',
    createdAt: new Date('2023-03-22'),
    updatedAt: new Date('2023-07-05')
  },
  {
    id: '5',
    name: 'Apple Watch Series 8',
    barcode: '123456789005',
    category: 'Wearables',
    price: 399.99,
    costPrice: 259.99,
    stock: 54,
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop',
    createdAt: new Date('2023-02-18'),
    updatedAt: new Date('2023-05-30')
  },
  {
    id: '6',
    name: 'Magic Keyboard',
    barcode: '123456789006',
    category: 'Accessories',
    price: 149.99,
    costPrice: 89.99,
    stock: 67,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2065&auto=format&fit=crop',
    createdAt: new Date('2023-01-25'),
    updatedAt: new Date('2023-06-08')
  }
];

export const mockSales: Sale[] = [
  {
    id: '1',
    products: [
      {
        product: mockProducts[0],
        quantity: 1,
        priceAtSale: mockProducts[0].price
      }
    ],
    totalAmount: mockProducts[0].price,
    paymentMethod: 'card',
    employeeId: '1',
    channel: 'in-store',
    timestamp: new Date('2023-07-15T14:23:05')
  },
  {
    id: '2',
    products: [
      {
        product: mockProducts[1],
        quantity: 1,
        priceAtSale: mockProducts[1].price
      },
      {
        product: mockProducts[2],
        quantity: 2,
        priceAtSale: mockProducts[2].price
      }
    ],
    totalAmount: mockProducts[1].price + (mockProducts[2].price * 2),
    paymentMethod: 'cash',
    employeeId: '2',
    channel: 'in-store',
    timestamp: new Date('2023-07-16T10:45:22')
  },
  {
    id: '3',
    products: [
      {
        product: mockProducts[3],
        quantity: 1,
        priceAtSale: mockProducts[3].price
      }
    ],
    totalAmount: mockProducts[3].price,
    paymentMethod: 'online',
    customerId: 'cust001',
    employeeId: '1',
    channel: 'online',
    timestamp: new Date('2023-07-17T16:12:40')
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Appleseed',
    email: 'john@invenhub.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=John+Appleseed&background=0D8ABC&color=fff'
  },
  {
    id: '2',
    name: 'Emily Parker',
    email: 'emily@invenhub.com',
    role: 'manager',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Parker&background=2C3E50&color=fff'
  },
  {
    id: '3',
    name: 'Michael Smith',
    email: 'michael@invenhub.com',
    role: 'employee',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Smith&background=E74C3C&color=fff'
  }
];

export const mockStatsData: StatsData[] = [
  {
    label: 'Total Sales',
    value: '$32,549.00',
    change: 12.5,
    icon: 'dollar-sign'
  },
  {
    label: 'Products Sold',
    value: '1,342',
    change: 8.2,
    icon: 'shopping-bag'
  },
  {
    label: 'Active Products',
    value: '312',
    change: 4.1,
    icon: 'package'
  },
  {
    label: 'Low Stock Items',
    value: '28',
    change: -2.5,
    icon: 'alert-circle'
  }
];

export const mockSalesData: ChartData[] = [
  { name: 'Jan', value: 12400 },
  { name: 'Feb', value: 14500 },
  { name: 'Mar', value: 16500 },
  { name: 'Apr', value: 15200 },
  { name: 'May', value: 17800 },
  { name: 'Jun', value: 19500 },
  { name: 'Jul', value: 20100 },
  { name: 'Aug', value: 22500 },
  { name: 'Sep', value: 24100 },
  { name: 'Oct', value: 23400 },
  { name: 'Nov', value: 25800 },
  { name: 'Dec', value: 27900 }
];

export const mockCategoryData: ChartData[] = [
  { name: 'Electronics', value: 42 },
  { name: 'Audio', value: 28 },
  { name: 'Wearables', value: 15 },
  { name: 'Accessories', value: 15 }
];

export const mockCurrentUser = mockUsers[0];
