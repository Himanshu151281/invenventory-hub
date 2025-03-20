
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, DollarSign, Package, ShoppingBag, AlertCircle } from 'lucide-react';
import { StatsData } from '@/lib/types';

interface StatsCardProps {
  data: StatsData;
  className?: string;
}

const getIcon = (icon: string | undefined) => {
  switch (icon) {
    case 'dollar-sign':
      return <DollarSign className="h-5 w-5" />;
    case 'shopping-bag':
      return <ShoppingBag className="h-5 w-5" />;
    case 'package':
      return <Package className="h-5 w-5" />;
    case 'alert-circle':
      return <AlertCircle className="h-5 w-5" />;
    default:
      return <DollarSign className="h-5 w-5" />;
  }
};

const StatsCard: React.FC<StatsCardProps> = ({ data, className }) => {
  const isPositive = data.change ? data.change > 0 : false;

  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{data.label}</p>
            <h3 className="text-2xl font-semibold tracking-tight">{data.value}</h3>
            {data.change !== undefined && (
              <div className="flex items-center gap-1 mt-1">
                <div className={cn(
                  "flex items-center text-xs",
                  isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  <span>{Math.abs(data.change).toFixed(1)}%</span>
                </div>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            )}
          </div>
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            isPositive ? "bg-green-100" : data.change === undefined ? "bg-blue-100" : "bg-red-100",
            isPositive ? "text-green-600" : data.change === undefined ? "text-blue-600" : "text-red-600"
          )}>
            {getIcon(data.icon)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
