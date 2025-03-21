import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockSalesData, mockCategoryData } from '@/lib/mockData';
import { ChartData } from '@/lib/types';
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

// Generate predictive data based on existing sales data
const generatePredictions = (data: ChartData[]): ChartData[] => {
  // Simple prediction model
  return data.map((item, index) => {
    const growthFactor = 1.15; // 15% growth
    return {
      name: item.name,
      value: Math.round(item.value * growthFactor),
      isProjected: true,
    };
  });
};

const predictionData = generatePredictions(mockSalesData);

// Channel distribution data (in-store vs online)
const channelData = [
  { name: 'In-Store Sales', value: 68 },
  { name: 'Online Sales', value: 32 },
];

// Tourist season impact data
const seasonalityData = [
  { name: 'Jan', value: 8500, tourists: 12000 },
  { name: 'Feb', value: 9200, tourists: 13500 },
  { name: 'Mar', value: 11500, tourists: 18000 },
  { name: 'Apr', value: 15200, tourists: 22000 },
  { name: 'May', value: 17800, tourists: 28000 },
  { name: 'Jun', value: 19500, tourists: 32000 },
  { name: 'Jul', value: 20100, tourists: 35000 },
  { name: 'Aug', value: 22500, tourists: 38000 },
  { name: 'Sep', value: 18100, tourists: 30000 },
  { name: 'Oct', value: 15400, tourists: 25000 },
  { name: 'Nov', value: 12800, tourists: 19000 },
  { name: 'Dec', value: 15900, tourists: 21000 },
];

const Analytics: React.FC = () => {
  const [timeFrame, setTimeFrame] = React.useState('year');
  
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Safari Shop Analytics</h1>
          <p className="text-muted-foreground">
            Track souvenir sales performance, tourist season impact, and inventory insights.
          </p>
        </div>
        
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
            <SelectItem value="season">Tourist Season</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="seasonality">Seasonality</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Monthly souvenir sales over the past year</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={mockSalesData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                        border: 'none' 
                      }}
                    />
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0070F3" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0070F3" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0070F3" 
                      fillOpacity={1} 
                      fill="url(#colorSales)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Safari souvenir sales by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string) => [`${value} products`, name]}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                        border: 'none' 
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales Channels</CardTitle>
                <CardDescription>In-store vs. Online distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                        border: 'none' 
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
        
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Sales vs. targets breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockSalesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tickFormatter={(value) => `$${value/1000}k`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                        border: 'none' 
                      }}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Sales" fill="#0070F3" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Forecast</CardTitle>
              <CardDescription>Predicted sales for the next 12 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[...mockSalesData, ...predictionData]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string, props: any) => {
                      return [`$${value.toLocaleString()}`, props.payload.isProjected ? 'Projected' : 'Actual'];
                    }}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                      border: 'none' 
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Historical" 
                    stroke="#0070F3" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Projected" 
                    stroke="#00C49F" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Category Growth Analysis</CardTitle>
                <CardDescription>Projected souvenir category sales</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockCategoryData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      type="number" 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${value} products`, 'Current']}
                      contentStyle={{ 
                        borderRadius: '8px', 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                        border: 'none' 
                      }}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Current" fill="#0070F3" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="value" name="Projected" fill="#00C49F" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Jungle Safari Shop Recommendations</CardTitle>
                <CardDescription>AI-powered inventory insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h3 className="font-medium mb-1">Bastar Art Promotion</h3>
                    <p className="text-sm text-muted-foreground">
                      Increase promotion of handcrafted tribal art pieces to capitalize on rising tourist interest in authentic local crafts.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h3 className="font-medium mb-1">Apparel Restocking</h3>
                    <p className="text-sm text-muted-foreground">
                      Increase Safari Adventure T-Shirt inventory by 20% before peak tourist season in July-August.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h3 className="font-medium mb-1">Online Channel Focus</h3>
                    <p className="text-sm text-muted-foreground">
                      Expand online marketing for Canvas and Stationery items to reach customers post-visit.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="seasonality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tourism Impact on Sales</CardTitle>
              <CardDescription>Correlation between tourist arrivals and souvenir sales</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={seasonalityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <YAxis 
                    yAxisId="left"
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(value) => `${value/1000}k`}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => {
                      if (name === 'value') return [`$${value.toLocaleString()}`, 'Sales'];
                      return [`${value.toLocaleString()}`, 'Visitors'];
                    }}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
                      border: 'none' 
                    }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="value" 
                    name="Sales" 
                    stroke="#0070F3" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="tourists" 
                    name="Visitors" 
                    stroke="#00C49F" 
                    activeDot={{ r: 6 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="flex flex-col items-center justify-center p-6 h-40">
              <div className="text-4xl font-bold text-primary">32%</div>
              <div className="text-sm font-medium mt-2">Sales During Peak Season</div>
              <div className="text-xs text-muted-foreground mt-1">July-August period</div>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-6 h-40">
              <div className="text-4xl font-bold text-primary">2.7x</div>
              <div className="text-sm font-medium mt-2">Revenue Multiplier</div>
              <div className="text-xs text-muted-foreground mt-1">Peak vs. Off-season</div>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-6 h-40">
              <div className="text-4xl font-bold text-green-500">18%</div>
              <div className="text-sm font-medium mt-2">Online Sales Growth</div>
              <div className="text-xs text-muted-foreground mt-1">During off-peak season</div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="flex flex-col items-center justify-center p-6 h-40">
              <div className="text-4xl font-bold text-primary">24%</div>
              <div className="text-sm font-medium mt-2">Year-over-Year Growth</div>
              <div className="text-xs text-muted-foreground mt-1">Based on total revenue</div>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-6 h-40">
              <div className="text-4xl font-bold text-primary">$48.2k</div>
              <div className="text-sm font-medium mt-2">Average Monthly Revenue</div>
              <div className="text-xs text-muted-foreground mt-1">Last 12 months</div>
            </Card>
            
            <Card className="flex flex-col items-center justify-center p-6 h-40">
              <div className="text-4xl font-bold text-green-500">32%</div>
              <div className="text-sm font-medium mt-2">Profit Margin</div>
              <div className="text-xs text-muted-foreground mt-1">Industry avg: 28%</div>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Sales Report</CardTitle>
              <CardDescription>Download detailed reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors cursor-pointer">
                  <div>
                    <div className="font-medium">Monthly Sales Report</div>
                    <div className="text-sm text-muted-foreground">Detailed breakdown of monthly sales</div>
                  </div>
                  <div className="text-sm text-muted-foreground">PDF · 2.4 MB</div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors cursor-pointer">
                  <div>
                    <div className="font-medium">Inventory Status Report</div>
                    <div className="text-sm text-muted-foreground">Current stock levels and valuation</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Excel · 1.8 MB</div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors cursor-pointer">
                  <div>
                    <div className="font-medium">Financial Summary</div>
                    <div className="text-sm text-muted-foreground">Profit/loss statement and cash flow</div>
                  </div>
                  <div className="text-sm text-muted-foreground">PDF · 3.2 MB</div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors cursor-pointer">
                  <div>
                    <div className="font-medium">Product Performance</div>
                    <div className="text-sm text-muted-foreground">Sales by product and category</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Excel · 2.1 MB</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
