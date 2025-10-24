import { MenuItem, RevenueData, CategoryData, Recommendation, DashboardStats, WasteData } from '@/types'
import { format, subDays } from 'date-fns'

// Mock Menu Items
export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    category: 'Burgers',
    cost: 4.50,
    price: 12.99,
    salesCount: 450,
    revenue: 5845.50,
    margin: 65.4,
    wastePercentage: 5.2,
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    category: 'Pizza',
    cost: 3.20,
    price: 11.99,
    salesCount: 320,
    revenue: 3836.80,
    margin: 73.3,
    wastePercentage: 3.8,
  },
  {
    id: '3',
    name: 'Caesar Salad',
    category: 'Salads',
    cost: 2.80,
    price: 8.99,
    salesCount: 180,
    revenue: 1618.20,
    margin: 68.9,
    wastePercentage: 12.5,
  },
  {
    id: '4',
    name: 'Loaded Fries',
    category: 'Sides',
    cost: 1.50,
    price: 6.99,
    salesCount: 520,
    revenue: 3634.80,
    margin: 78.5,
    wastePercentage: 4.1,
  },
  {
    id: '5',
    name: 'Truffle Pasta',
    category: 'Pasta',
    cost: 6.00,
    price: 18.99,
    salesCount: 45,
    revenue: 854.55,
    margin: 68.4,
    wastePercentage: 25.0,
  },
  {
    id: '6',
    name: 'BBQ Ribs',
    category: 'Mains',
    cost: 8.50,
    price: 22.99,
    salesCount: 210,
    revenue: 4827.90,
    margin: 63.0,
    wastePercentage: 8.5,
  },
  {
    id: '7',
    name: 'Fish Tacos',
    category: 'Mains',
    cost: 4.20,
    price: 13.99,
    salesCount: 280,
    revenue: 3917.20,
    margin: 70.0,
    wastePercentage: 6.2,
  },
  {
    id: '8',
    name: 'Chicken Wings',
    category: 'Appetizers',
    cost: 3.50,
    price: 10.99,
    salesCount: 380,
    revenue: 4176.20,
    margin: 68.2,
    wastePercentage: 7.3,
  },
  {
    id: '9',
    name: 'Veggie Wrap',
    category: 'Wraps',
    cost: 2.50,
    price: 9.99,
    salesCount: 150,
    revenue: 1498.50,
    margin: 75.0,
    wastePercentage: 9.8,
  },
  {
    id: '10',
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    cost: 2.20,
    price: 7.99,
    salesCount: 165,
    revenue: 1318.35,
    margin: 72.5,
    wastePercentage: 15.2,
  },
  {
    id: '11',
    name: 'Craft Beer',
    category: 'Drinks',
    cost: 1.80,
    price: 6.99,
    salesCount: 420,
    revenue: 2935.80,
    margin: 74.2,
    wastePercentage: 2.1,
  },
  {
    id: '12',
    name: 'Fresh Lemonade',
    category: 'Drinks',
    cost: 0.60,
    price: 3.99,
    salesCount: 310,
    revenue: 1236.90,
    margin: 85.0,
    wastePercentage: 8.5,
  },
  {
    id: '13',
    name: 'Grilled Salmon',
    category: 'Mains',
    cost: 7.80,
    price: 19.99,
    salesCount: 125,
    revenue: 2498.75,
    margin: 61.0,
    wastePercentage: 11.2,
  },
  {
    id: '14',
    name: 'Onion Rings',
    category: 'Sides',
    cost: 1.20,
    price: 5.99,
    salesCount: 290,
    revenue: 1737.10,
    margin: 80.0,
    wastePercentage: 5.8,
  },
  {
    id: '15',
    name: 'Caprese Sandwich',
    category: 'Sandwiches',
    cost: 3.80,
    price: 11.99,
    salesCount: 95,
    revenue: 1139.05,
    margin: 68.3,
    wastePercentage: 18.5,
  },
]

// Generate Revenue Data for last 90 days
export const revenueData: RevenueData[] = Array.from({ length: 90 }, (_, i) => {
  const date = subDays(new Date(), 89 - i)
  const baseRevenue = 2500
  const variance = Math.sin(i / 7) * 500 + Math.random() * 400
  const revenue = baseRevenue + variance
  const orders = Math.floor(revenue / 15)
  const profit = revenue * 0.35

  return {
    date: format(date, 'yyyy-MM-dd'),
    revenue: Math.round(revenue * 100) / 100,
    orders,
    profit: Math.round(profit * 100) / 100,
  }
})

// Category Data for Pie Chart
export const categoryData: CategoryData[] = [
  { name: 'Burgers', value: 5845.50, percentage: 16.8, fill: 'hsl(var(--chart-1))' },
  { name: 'Pizza', value: 3836.80, percentage: 11.0, fill: 'hsl(var(--chart-2))' },
  { name: 'Mains', value: 11243.85, percentage: 32.3, fill: 'hsl(var(--chart-3))' },
  { name: 'Sides', value: 5371.90, percentage: 15.4, fill: 'hsl(var(--chart-4))' },
  { name: 'Drinks', value: 4172.70, percentage: 12.0, fill: 'hsl(var(--chart-5))' },
  { name: 'Other', value: 4405.10, percentage: 12.5, fill: 'hsl(var(--muted))' },
]

// Waste Analysis Data
export const wasteData: WasteData[] = [
  { itemName: 'Truffle Pasta', sales: 45, waste: 25 },
  { itemName: 'Caprese Sandwich', sales: 95, waste: 18 },
  { itemName: 'Chocolate Lava', sales: 165, waste: 15 },
  { itemName: 'Caesar Salad', sales: 180, waste: 12 },
  { itemName: 'Grilled Salmon', sales: 125, waste: 11 },
]

// Dashboard Stats
export const dashboardStats: DashboardStats = {
  totalRevenue: 34875.85,
  netProfit: 12206.55,
  totalOrders: 3125,
  wastePercentage: 8.7,
  revenueChange: 12.5,
  profitChange: 15.3,
  orderChange: 8.2,
  wasteChange: -3.4,
}

// AI Recommendations
export const recommendations: Recommendation[] = [
  {
    id: '1',
    type: 'remove',
    priority: 'high',
    title: 'Remove Truffle Pasta from Menu',
    description: 'This item has extremely low sales (45 orders/month) and the highest waste percentage (25%). The ingredients are expensive and spoil quickly. Removing this item would eliminate $270/month in waste costs.',
    itemName: 'Truffle Pasta',
    currentMetrics: {
      revenue: 854.55,
      margin: 68.4,
      salesCount: 45,
    },
    expectedImpact: {
      revenueChange: -854.55,
      profitChange: 270.00,
    },
    confidence: 92,
  },
  {
    id: '2',
    type: 'promote',
    priority: 'high',
    title: 'Feature Loaded Fries as Signature Item',
    description: 'Already a top seller with 520 orders and 78.5% margin. Promoting this as a signature side or combo add-on could increase sales by 30-40%. Consider creating Instagram-worthy presentation.',
    itemName: 'Loaded Fries',
    currentMetrics: {
      revenue: 3634.80,
      margin: 78.5,
      salesCount: 520,
    },
    expectedImpact: {
      revenueChange: 1090.44,
      profitChange: 856.00,
    },
    confidence: 88,
  },
  {
    id: '3',
    type: 'price-adjust',
    priority: 'high',
    title: 'Increase Classic Burger Price to $13.99',
    description: 'Market analysis shows competitors charging $13.50-$15.99 for similar burgers. Your burger is underpriced. A $1 increase would boost monthly revenue by $450 with minimal impact on sales.',
    itemName: 'Classic Burger',
    currentMetrics: {
      revenue: 5845.50,
      margin: 65.4,
      salesCount: 450,
    },
    expectedImpact: {
      revenueChange: 450.00,
      profitChange: 450.00,
    },
    confidence: 85,
  },
  {
    id: '4',
    type: 'bundle',
    priority: 'medium',
    title: 'Create "Burger Combo" Bundle',
    description: 'Bundle Classic Burger + Loaded Fries + Craft Beer for $19.99 (vs $26.97 separate). This creates perceived value while increasing average order size and moving high-margin items.',
    currentMetrics: {
      revenue: 12416.10,
      margin: 70.2,
      salesCount: 0,
    },
    expectedImpact: {
      revenueChange: 2400.00,
      profitChange: 1680.00,
    },
    confidence: 78,
  },
  {
    id: '5',
    type: 'remove',
    priority: 'medium',
    title: 'Consider Removing Caprese Sandwich',
    description: 'Low sales volume (95 orders) and high waste (18.5%). This item requires fresh mozzarella and tomatoes that spoil quickly. Could replace with a sandwich using longer-lasting ingredients.',
    itemName: 'Caprese Sandwich',
    currentMetrics: {
      revenue: 1139.05,
      margin: 68.3,
      salesCount: 95,
    },
    expectedImpact: {
      revenueChange: -1139.05,
      profitChange: 185.00,
    },
    confidence: 72,
  },
  {
    id: '6',
    type: 'promote',
    priority: 'medium',
    title: 'Upsell Fresh Lemonade with Meals',
    description: 'Highest margin item (85%) with good sales already. Train staff to suggest with every meal. Could increase drink attachment rate from 40% to 60%.',
    itemName: 'Fresh Lemonade',
    currentMetrics: {
      revenue: 1236.90,
      margin: 85.0,
      salesCount: 310,
    },
    expectedImpact: {
      revenueChange: 620.00,
      profitChange: 527.00,
    },
    confidence: 81,
  },
  {
    id: '7',
    type: 'price-adjust',
    priority: 'low',
    title: 'Test $1 Increase on BBQ Ribs',
    description: 'Strong seller at $22.99. Premium items have more price elasticity. Test $23.99 for 2 weeks - if sales drop <10%, the increase is profitable.',
    itemName: 'BBQ Ribs',
    currentMetrics: {
      revenue: 4827.90,
      margin: 63.0,
      salesCount: 210,
    },
    expectedImpact: {
      revenueChange: 210.00,
      profitChange: 210.00,
    },
    confidence: 68,
  },
  {
    id: '8',
    type: 'bundle',
    priority: 'low',
    title: 'Create "Family Meal Deal"',
    description: 'Pizza + Wings + 2 Drinks for $34.99. Perfect for families, increases average ticket size, and moves multiple high-margin items together.',
    currentMetrics: {
      revenue: 11949.00,
      margin: 71.8,
      salesCount: 0,
    },
    expectedImpact: {
      revenueChange: 1750.00,
      profitChange: 1257.00,
    },
    confidence: 65,
  },
]
