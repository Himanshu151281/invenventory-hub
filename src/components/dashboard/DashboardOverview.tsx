
import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from './StatsCard';
import { mockCategoryData, mockStatsData } from '@/lib/mockData';
import { useSalesStore } from '@/lib/stores/salesStore';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardOverview: React.FC = () => {
  const { sales } = useSalesStore();
  
  // Calculate total revenue
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  
  // Calculate cost price
  const totalCostPrice = sales.reduce((sum, sale) => {
    return sum + sale.products.reduce((prodSum, prod) => {
      return prodSum + (prod.product.costPrice * prod.quantity);
    }, 0);
  }, 0);
  
  // Calculate profit
  const profit = totalRevenue - totalCostPrice;
  const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

  // Generate monthly sales data
  const generateMonthlySalesData = () => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const salesByMonth = months.map(month => ({
      name: month,
      value: 0
    }));
    
    // Populate with actual sales data
    sales.forEach(sale => {
      const month = sale.timestamp.getMonth();
      salesByMonth[month].value += sale.totalAmount;
    });
    
    return salesByMonth;
  };

  const salesData = generateMonthlySalesData();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockStatsData.map((stat, index) => (
          <StatsCard key={index} data={stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Monthly sales over the past year</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0070F3" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#0070F3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#888888', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
                    border: 'none', 
                    padding: '8px' 
                  }} 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0070F3" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPv)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [value, 'Products']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
                    border: 'none' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profit Overview</CardTitle>
            <CardDescription>Current period performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">${totalCostPrice.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Profit</p>
                <p className="text-2xl font-bold text-green-500">${profit.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                <p className="text-2xl font-bold">{profitMargin.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sales.length > 0 ? (
                [...sales]
                  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                  .slice(0, 5)
                  .map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Sale #{sale.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {sale.timestamp.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-medium">${sale.totalAmount.toLocaleString()}</p>
                    </div>
                  ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No sales recorded yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border p-3 hover:bg-muted transition-colors cursor-pointer">
                <div className="text-sm font-medium mb-1">New Sale</div>
                <div className="text-xs text-muted-foreground">Create a new sales record</div>
              </div>
              <div className="rounded-lg border border-border p-3 hover:bg-muted transition-colors cursor-pointer">
                <div className="text-sm font-medium mb-1">Add Product</div>
                <div className="text-xs text-muted-foreground">Add a new product to inventory</div>
              </div>
              <div className="rounded-lg border border-border p-3 hover:bg-muted transition-colors cursor-pointer">
                <div className="text-sm font-medium mb-1">Generate Report</div>
                <div className="text-xs text-muted-foreground">Create a sales report</div>
              </div>
              <div className="rounded-lg border border-border p-3 hover:bg-muted transition-colors cursor-pointer">
                <div className="text-sm font-medium mb-1">Scan Barcode</div>
                <div className="text-xs text-muted-foreground">Scan product barcode</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
