'use client'

import { DollarSign, TrendingUp, ShoppingCart, AlertTriangle, Sparkles } from 'lucide-react'
import PageHeader from '@/components/layout/page-header'
import StatsCard from '@/components/dashboard/stats-card'
import QuickInsights from '@/components/dashboard/quick-insights'
import RevenueChart from '@/components/charts/revenue-chart'
import TopItemsChart from '@/components/charts/top-items-chart'
import { Badge } from '@/components/ui/badge'
import { useApp } from '@/lib/context/app-context'

export default function OverviewPage() {
  const { dashboardStats, revenueData, menuItems, lastUpdated } = useApp()
  
  // Filter revenue data to show last month by default
  const getLastMonthData = () => {
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    return revenueData.filter(data => new Date(data.date) >= lastMonth)
  }
  
  const lastMonthRevenueData = getLastMonthData()
  return (
    <div className="space-y-6 relative">
      {/* Gradient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl -z-10"></div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Dashboard
            </h1>
            <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10">
              <Sparkles className="w-3 h-3 mr-1" />
              Live Data
            </Badge>
          </div>
          <p className="text-muted-foreground">Overview of your restaurant's performance</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={dashboardStats.totalRevenue}
          change={dashboardStats.revenueChange}
          icon={DollarSign}
          format="currency"
        />
        <StatsCard
          title="Net Profit"
          value={dashboardStats.netProfit}
          change={dashboardStats.profitChange}
          icon={TrendingUp}
          format="currency"
        />
        <StatsCard
          title="Total Orders"
          value={dashboardStats.totalOrders}
          change={dashboardStats.orderChange}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Waste Percentage"
          value={dashboardStats.wastePercentage}
          change={dashboardStats.wasteChange}
          icon={AlertTriangle}
          format="percentage"
        />
      </div>

      {/* Revenue Chart */}
      <div className="relative">
        <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg -z-10"></div>
        <RevenueChart data={lastMonthRevenueData} title="Revenue - Last Month" description="Revenue trends for the past month" />
      </div>

      {/* Bottom Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <TopItemsChart items={menuItems} />
        <QuickInsights />
      </div>
    </div>
  )
}
