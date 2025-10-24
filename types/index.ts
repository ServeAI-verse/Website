export interface MenuItem {
  id: string;
  name: string;
  category: string;
  cost: number;
  price: number;
  salesCount: number;
  revenue: number;
  margin: number;
  wastePercentage: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
  profit: number;
}

export interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  fill?: string;
  [key: string]: string | number | undefined;
}

export interface Recommendation {
  id: string;
  type: 'remove' | 'promote' | 'price-adjust' | 'bundle';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  itemName?: string;
  currentMetrics: {
    revenue?: number;
    margin?: number;
    salesCount?: number;
  };
  expectedImpact: {
    revenueChange: number;
    profitChange: number;
  };
  confidence: number;
}

export interface DashboardStats {
  totalRevenue: number;
  netProfit: number;
  totalOrders: number;
  wastePercentage: number;
  revenueChange: number;
  profitChange: number;
  orderChange: number;
  wasteChange: number;
}

export interface WasteData {
  itemName: string;
  sales: number;
  waste: number;
}
