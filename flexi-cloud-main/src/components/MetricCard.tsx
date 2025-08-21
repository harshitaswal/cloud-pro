import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function MetricCard({
  title,
  value,
  change,
  trend,
  className,
  prefix,
  suffix
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return change && change > 0 ? 'text-destructive' : 'text-success';
      case 'down':
        return change && change > 0 ? 'text-success' : 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {trend && (
            <div className={cn("flex items-center space-x-1", getTrendColor())}>
              {getTrendIcon()}
            </div>
          )}
        </div>
        <div className="flex items-baseline space-x-2">
          {prefix && <span className="text-2xl font-bold">{prefix}</span>}
          <div className="text-2xl font-bold">{value}</div>
          {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
        </div>
        {change !== undefined && (
          <p className={cn("text-xs flex items-center space-x-1 mt-1", getTrendColor())}>
            <span>{Math.abs(change).toFixed(1)}%</span>
            <span className="text-muted-foreground">vs last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}