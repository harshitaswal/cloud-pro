import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { budgetAlerts } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function BudgetAlerts() {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-destructive';
    if (percentage >= 80) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Alerts</CardTitle>
        <CardDescription>
          Monitor budget thresholds and spending limits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgetAlerts.map((alert) => (
          <Alert key={alert.id} className={cn(
            "relative",
            alert.severity === 'high' && "border-destructive/50 bg-destructive/5",
            alert.severity === 'medium' && "border-warning/50 bg-warning/5"
          )}>
            <div className="flex items-start space-x-3">
              <div className={cn(
                "p-2 rounded-full",
                alert.severity === 'high' && "bg-destructive/10 text-destructive",
                alert.severity === 'medium' && "bg-warning/10 text-warning",
                alert.severity === 'low' && "bg-muted text-muted-foreground"
              )}>
                {getSeverityIcon(alert.severity)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{alert.service}</h4>
                  <Badge variant={getSeverityColor(alert.severity) as any}>
                    {alert.percentage}%
                  </Badge>
                </div>
                <AlertDescription>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current: {formatCurrency(alert.currentSpend)}</span>
                      <span>Budget: {formatCurrency(alert.budget)}</span>
                    </div>
                    <Progress
                      value={Math.min(alert.percentage, 100)}
                      className="h-2"
                    />
                  </div>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}