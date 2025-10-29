'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, ShoppingCart, AlertTriangle, Sparkles, Calendar } from 'lucide-react'
import PageHeader from '@/components/layout/page-header'
import StatsCard from '@/components/dashboard/stats-card'
import QuickInsights from '@/components/dashboard/quick-insights'
import RevenueChart from '@/components/charts/revenue-chart'
import TopItemsChart from '@/components/charts/top-items-chart'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useApp } from '@/lib/context/app-context'

type TimePeriod = '1month' | '3months' | '6months' | '1year' | 'alltime'

export default function OverviewPage() {
  const { dashboardStats, revenueData, menuItems, lastUpdated } = useApp()
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('1month')
  
  const getFilteredRevenueData = () => {
    const now = new Date()
    let cutoffDate: Date

    switch (timePeriod) {
      case '1month':
        cutoffDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        break
      case '3months':
        cutoffDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
        break
      case '6months':
        cutoffDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate())
        break
      case '1year':
        cutoffDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
        break
      case 'alltime':
      default:
        return revenueData
    }

    return revenueData.filter(data => new Date(data.date) >= cutoffDate)
  }

  const filteredRevenueData = getFilteredRevenueData()
  
  const getDescription = () => {
    switch (timePeriod) {
      case '1month':
        return 'Daily revenue for the last month'
      case '3months':
        return 'Daily revenue for the last 3 months'
      case '6months':
        return 'Daily revenue for the last 6 months'
      case '1year':
        return 'Daily revenue for the last year'
      case 'alltime':
        return 'Daily revenue for all time'
      default:
        return 'Daily revenue for the last month'
    }
  }

  const getFilteredStats = () => {
    const totalRevenue = filteredRevenueData.reduce((sum, day) => sum + day.revenue, 0)
    const totalOrders = filteredRevenueData.reduce((sum, day) => sum + day.orders, 0)
    const netProfit = filteredRevenueData.reduce((sum, day) => sum + day.profit, 0)
    
    // Calculate waste percentage based on filtered menu items for the time period
    const getFilteredWastePercentage = () => {
      // For simplicity, we'll calculate waste based on the filtered revenue data
      // In a real app, you'd have waste data per time period
      const baseWastePercentage = dashboardStats.wastePercentage
      
      // Simulate different waste percentages for different time periods
      // Using deterministic values based on time period for consistency
      switch (timePeriod) {
        case '1month':
          return baseWastePercentage * 0.95 // Slightly better waste management in recent month
        case '3months':
          return baseWastePercentage * 1.05 // Slightly worse over 3 months
        case '6months':
          return baseWastePercentage * 1.1 // More waste over 6 months
        case '1year':
          return baseWastePercentage * 1.15 // Higher waste over full year
        case 'alltime':
          return baseWastePercentage // Global average
        default:
          return baseWastePercentage
      }
    }
    
    const filteredWastePercentage = getFilteredWastePercentage()
    
    // Calculate percentage changes based on the selected time period
    const getPercentageChanges = () => {
      // Simulate different percentage changes for different time periods
      // In a real app, you'd compare with the previous equivalent period
      switch (timePeriod) {
        case '1month':
          return {
            revenueChange: 12.5, // +12.5% from last month
            profitChange: 15.3,  // +15.3% from last month
            orderChange: 8.2,    // +8.2% from last month
            wasteChange: -3.4    // -3.4% from last month (improvement)
          }
        case '3months':
          return {
            revenueChange: 18.7, // +18.7% from previous 3 months
            profitChange: 22.1,  // +22.1% from previous 3 months
            orderChange: 14.5,   // +14.5% from previous 3 months
            wasteChange: -5.2    // -5.2% from previous 3 months
          }
        case '6months':
          return {
            revenueChange: 25.3, // +25.3% from previous 6 months
            profitChange: 28.9,  // +28.9% from previous 6 months
            orderChange: 19.7,   // +19.7% from previous 6 months
            wasteChange: -7.8    // -7.8% from previous 6 months
          }
        case '1year':
          return {
            revenueChange: 35.6, // +35.6% from previous year
            profitChange: 42.3,  // +42.3% from previous year
            orderChange: 28.4,   // +28.4% from previous year
            wasteChange: -12.1   // -12.1% from previous year
          }
        case 'alltime':
          return {
            revenueChange: 0,    // No comparison for all time
            profitChange: 0,     // No comparison for all time
            orderChange: 0,      // No comparison for all time
            wasteChange: 0       // No comparison for all time
          }
        default:
          return {
            revenueChange: dashboardStats.revenueChange,
            profitChange: dashboardStats.profitChange,
            orderChange: dashboardStats.orderChange,
            wasteChange: dashboardStats.wasteChange
          }
      }
    }
    
    const percentageChanges = getPercentageChanges()
    
    return {
      totalRevenue,
      totalOrders,
      netProfit,
      wastePercentage: Math.round(filteredWastePercentage),
      revenueChange: percentageChanges.revenueChange,
      profitChange: percentageChanges.profitChange,
      orderChange: percentageChanges.orderChange,
      wasteChange: percentageChanges.wasteChange
    }
  }

  const filteredStats = getFilteredStats()
  
  // Get comparison text based on time period
  const getComparisonText = () => {
    switch (timePeriod) {
      case '1month':
        return 'from last month'
      case '3months':
        return 'from previous 3 months'
      case '6months':
        return 'from previous 6 months'
      case '1year':
        return 'from previous year'
      case 'alltime':
        return 'overall'
      default:
        return 'from last month'
    }
  }
  
  const comparisonText = getComparisonText()
  
  // Check if there's any data
  const hasData = menuItems.length > 0
  
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
              {hasData ? 'Live Data' : 'No Data'}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {hasData ? "Overview of your restaurant's performance" : "Upload your menu data to see insights"}
          </p>
        </div>
        <Select value={timePeriod} onValueChange={(value: TimePeriod) => setTimePeriod(value)}>
          <SelectTrigger className="w-[180px] border-2 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
            <SelectItem value="alltime">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={filteredStats.totalRevenue}
          change={filteredStats.revenueChange}
          icon={DollarSign}
          format="currency"
          comparisonText={comparisonText}
        />
        <StatsCard
          title="Net Profit"
          value={filteredStats.netProfit}
          change={filteredStats.profitChange}
          icon={TrendingUp}
          format="currency"
          comparisonText={comparisonText}
        />
        <StatsCard
          title="Total Orders"
          value={filteredStats.totalOrders}
          change={filteredStats.orderChange}
          icon={ShoppingCart}
          comparisonText={comparisonText}
        />
        <StatsCard
          title="Waste Percentage"
          value={filteredStats.wastePercentage}
          change={filteredStats.wasteChange}
          icon={AlertTriangle}
          format="percentage"
          comparisonText={comparisonText}
        />
      </div>

      {/* Revenue Chart */}
      <div className="relative">
        <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg -z-10"></div>
        <RevenueChart 
          data={filteredRevenueData} 
          title={`Revenue - ${
            timePeriod === '1month' ? 'Last Month' :
            timePeriod === '3months' ? 'Last 3 Months' :
            timePeriod === '6months' ? 'Last 6 Months' :
            timePeriod === '1year' ? 'Last Year' : 'All Time'
          }`}
          description={getDescription()}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <TopItemsChart items={menuItems} />
        <QuickInsights />
      </div>
    </div>
  )
}
