// Mock data for cloud cost optimization dashboard

export interface CostData {
  date: string;
  cost: number;
  service?: string;
}

export interface ServiceCost {
  name: string;
  cost: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

export interface BudgetAlert {
  id: string;
  service: string;
  currentSpend: number;
  budget: number;
  percentage: number;
  severity: 'low' | 'medium' | 'high';
}

export interface OptimizationTip {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  priority: 'low' | 'medium' | 'high';
  category: 'compute' | 'storage' | 'network' | 'database';
}

export const dailyCosts: CostData[] = [
  { date: '2024-01-01', cost: 1240 },
  { date: '2024-01-02', cost: 1350 },
  { date: '2024-01-03', cost: 1180 },
  { date: '2024-01-04', cost: 1420 },
  { date: '2024-01-05', cost: 1380 },
  { date: '2024-01-06', cost: 1290 },
  { date: '2024-01-07', cost: 1450 },
  { date: '2024-01-08', cost: 1320 },
  { date: '2024-01-09', cost: 1390 },
  { date: '2024-01-10', cost: 1480 },
  { date: '2024-01-11', cost: 1360 },
  { date: '2024-01-12', cost: 1520 },
  { date: '2024-01-13', cost: 1440 },
  { date: '2024-01-14', cost: 1580 },
];

export const serviceCosts: ServiceCost[] = [
  {
    name: 'EC2 Instances',
    cost: 4520,
    percentage: 42,
    trend: 'up',
    color: 'hsl(var(--chart-1))'
  },
  {
    name: 'RDS Database',
    cost: 2340,
    percentage: 22,
    trend: 'stable',
    color: 'hsl(var(--chart-2))'
  },
  {
    name: 'S3 Storage',
    cost: 1890,
    percentage: 18,
    trend: 'down',
    color: 'hsl(var(--chart-3))'
  },
  {
    name: 'CloudFront CDN',
    cost: 980,
    percentage: 9,
    trend: 'up',
    color: 'hsl(var(--chart-4))'
  },
  {
    name: 'Lambda Functions',
    cost: 750,
    percentage: 7,
    trend: 'stable',
    color: 'hsl(var(--chart-5))'
  },
  {
    name: 'Other Services',
    cost: 220,
    percentage: 2,
    trend: 'stable',
    color: 'hsl(215 13% 65%)'
  }
];

export const budgetAlerts: BudgetAlert[] = [
  {
    id: '1',
    service: 'EC2 Instances',
    currentSpend: 4520,
    budget: 4000,
    percentage: 113,
    severity: 'high'
  },
  {
    id: '2',
    service: 'CloudFront CDN',
    currentSpend: 980,
    budget: 1200,
    percentage: 82,
    severity: 'medium'
  },
  {
    id: '3',
    service: 'Lambda Functions',
    currentSpend: 750,
    budget: 1000,
    percentage: 75,
    severity: 'low'
  }
];

export const optimizationTips: OptimizationTip[] = [
  {
    id: '1',
    title: 'Right-size EC2 Instances',
    description: 'Several instances are underutilized. Consider downsizing to save costs.',
    potentialSavings: 890,
    priority: 'high',
    category: 'compute'
  },
  {
    id: '2',
    title: 'Enable S3 Intelligent Tiering',
    description: 'Automatically move objects to cost-effective storage classes.',
    potentialSavings: 340,
    priority: 'medium',
    category: 'storage'
  },
  {
    id: '3',
    title: 'Schedule Lambda Functions',
    description: 'Optimize function execution times and memory allocation.',
    potentialSavings: 125,
    priority: 'medium',
    category: 'compute'
  },
  {
    id: '4',
    title: 'Reserve RDS Instances',
    description: 'Purchase reserved instances for predictable workloads.',
    potentialSavings: 560,
    priority: 'high',
    category: 'database'
  }
];

export const getTotalMonthlyCost = () => {
  return serviceCosts.reduce((total, service) => total + service.cost, 0);
};

export const getPreviousMonthCost = () => {
  return 9800; // Mock previous month cost
};

export const getCostTrend = () => {
  const current = getTotalMonthlyCost();
  const previous = getPreviousMonthCost();
  return ((current - previous) / previous) * 100;
};