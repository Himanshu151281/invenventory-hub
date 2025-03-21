
import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCard from './StatsCard';
import { mockStatsData } from '@/lib/mockData';
import { useSalesStore } from '@/lib/stores/salesStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart, Bar } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();
  const { 
    sales, 
    getTotalRevenue,
    getTotalProfit,
    getProfitMargin,
    getMonthlySalesData,
    getSalesByCategory,
    getSalesByChannel,
    getTotalCost 
  } = useSalesStore();
  
  // Generate dashboard stats
  const totalRevenue = getTotalRevenue();
  const totalCostPrice = getTotalCost();
  const profit = getTotalProfit();
  const profitMargin = getProfitMargin();
  
  // Get chart data
  const salesData = getMonthlySalesData();
  const categoryData = getSalesByCategory();
  const channelData = getSalesByChannel();
  
  const handleViewAnalytics = () => {
    navigate('/analytics');
  };
  
  const handleAddTransaction = () => {
    navigate('/transactions');
  };

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
                  data={categoryData.length > 0 ? categoryData : [{name: 'No Data', value: 1}]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
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
            <CardTitle>Sales Channels</CardTitle>
            <CardDescription>In-store vs online distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={channelData.length > 0 ? channelData : [{name: 'No Data', value: 0}]}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" 
                  tickFormatter={(value) => `$${value}`} 
                  axisLine={false} 
                  tickLine={false}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)', 
                    border: 'none' 
                  }}
                />
                <Bar dataKey="value" fill="#0070F3" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full" 
              onClick={handleAddTransaction}
            >
              Record New Sale
            </Button>
            
            <Button 
              className="w-full" 
              variant="outline" 
              onClick={handleViewAnalytics}
            >
              View Detailed Analytics
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border p-3 hover:bg-muted transition-colors cursor-pointer">
                <div className="text-sm font-medium mb-1">Add Product</div>
                <div className="text-xs text-muted-foreground">Add a new product to inventory</div>
              </div>
              <div className="rounded-lg border border-border p-3 hover:bg-muted transition-colors cursor-pointer">
                <div className="text-sm font-medium mb-1">Generate Report</div>
                <div className="text-xs text-muted-foreground">Create a sales report</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
