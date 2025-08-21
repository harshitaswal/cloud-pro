import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Server, 
  Database, 
  HardDrive, 
  Wifi, 
  DollarSign,
  ChevronRight 
} from "lucide-react";
import { optimizationTips } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function OptimizationTips() {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compute':
        return <Server className="h-4 w-4" />;
      case 'database':
        return <Database className="h-4 w-4" />;
      case 'storage':
        return <HardDrive className="h-4 w-4" />;
      case 'network':
        return <Wifi className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'compute':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'database':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'storage':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'network':
        return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimization Recommendations</CardTitle>
        <CardDescription>
          AI-powered suggestions to reduce your cloud costs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {optimizationTips.map((tip) => (
          <div
            key={tip.id}
            className="group p-4 border border-border rounded-lg hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-3">
                  <div className={cn("p-1.5 rounded-md border", getCategoryColor(tip.category))}>
                    {getCategoryIcon(tip.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">
                        {tip.title}
                      </h4>
                      <Badge variant={getPriorityColor(tip.priority) as any} className="text-xs">
                        {tip.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {tip.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="h-4 w-4 text-success" />
                    <span className="font-medium text-success">
                      Save {formatCurrency(tip.potentialSavings)}/month
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Potential Monthly Savings:</span>
            <span className="text-lg font-bold text-success">
              {formatCurrency(optimizationTips.reduce((sum, tip) => sum + tip.potentialSavings, 0))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}