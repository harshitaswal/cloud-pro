import { MetricCard } from "@/components/MetricCard";
import { CostTrendChart } from "@/components/CostTrendChart";
import { ServiceBreakdown } from "@/components/ServiceBreakdown";
import { BudgetAlerts } from "@/components/BudgetAlerts";
import { OptimizationTips } from "@/components/OptimizationTips";
import { 
  getTotalMonthlyCost, 
  getPreviousMonthCost, 
  getCostTrend, 
  serviceCosts,
  budgetAlerts,
  optimizationTips 
} from "@/lib/mockData";

export default function Dashboard() {
  const currentCost = getTotalMonthlyCost();
  const costTrend = getCostTrend();
  const totalBudget = budgetAlerts.reduce((sum, alert) => sum + alert.budget, 0);
  const totalSavings = optimizationTips.reduce((sum, tip) => sum + tip.potentialSavings, 0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Cloud Cost Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor, analyze, and optimize your cloud infrastructure costs
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Monthly Cost"
            value={formatCurrency(currentCost)}
            prefix="$"
            change={costTrend}
            trend={costTrend > 0 ? 'up' : 'down'}
          />
          <MetricCard
            title="Budget Utilization"
            value={((currentCost / totalBudget) * 100).toFixed(1)}
            suffix="%"
            change={5.2}
            trend="up"
          />
          <MetricCard
            title="Active Services"
            value={serviceCosts.length.toString()}
            trend="stable"
          />
          <MetricCard
            title="Potential Savings"
            value={formatCurrency(totalSavings)}
            prefix="$"
            suffix="/mo"
            trend="down"
            className="border-success/20 bg-success/5"
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-7">
          <CostTrendChart />
          <ServiceBreakdown />
        </div>

        {/* Alerts and Recommendations */}
        <div className="grid gap-6 md:grid-cols-2">
          <BudgetAlerts />
          <OptimizationTips />
        </div>
      </div>
    </div>
  );
}