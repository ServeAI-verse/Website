'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { MenuItem, Recommendation, DashboardStats, RevenueData, CategoryData, WasteData } from '@/types'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  timestamp: Date
  read: boolean
}
import { 
  menuItems as initialMenuItems, 
  recommendations as initialRecommendations, 
  dashboardStats as initialDashboardStats,
  revenueData as initialRevenueData,
  categoryData as initialCategoryData,
  wasteData as initialWasteData
} from '@/lib/mock-data'

interface AppContextType {
  // Data
  menuItems: MenuItem[]
  recommendations: Recommendation[]
  dashboardStats: DashboardStats
  revenueData: RevenueData[]
  categoryData: CategoryData[]
  wasteData: WasteData[]
  notifications: Notification[]
  
  // Actions
  refreshAnalysis: () => Promise<void>
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void
  deleteMenuItem: (id: string) => void
  addMenuItem: (item: Omit<MenuItem, 'id' | 'revenue' | 'margin' | 'wastePercentage'>) => void
  implementRecommendation: (recommendationId: string) => Promise<void>
  markNotificationAsRead: (notificationId: string) => void
  markAllNotificationsAsRead: () => void
  
  // UI State
  isRefreshing: boolean
  lastUpdated: Date | null
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations)
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(initialDashboardStats)
  const [revenueData, setRevenueData] = useState<RevenueData[]>(initialRevenueData)
  const [categoryData, setCategoryData] = useState<CategoryData[]>(initialCategoryData)
  const [wasteData, setWasteData] = useState<WasteData[]>(initialWasteData)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  
  // Initialize notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'High Waste Alert',
      message: 'Truffle Pasta has 25% waste rate. Consider removing from menu.',
      type: 'warning',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false
    },
    {
      id: '2',
      title: 'Revenue Milestone',
      message: 'Congratulations! You\'ve reached $30,000 in monthly revenue.',
      type: 'success',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      read: false
    },
    {
      id: '3',
      title: 'New Recommendation',
      message: 'AI suggests promoting Loaded Fries - high margin item with great potential.',
      type: 'info',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: false
    },
    {
      id: '4',
      title: 'Menu Update',
      message: 'Classic Burger price has been updated to $13.99 as recommended.',
      type: 'success',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      read: true
    }
  ])

  const refreshAnalysis = async () => {
    setIsRefreshing(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate new mock data with some variations
      const newRevenueData = generateNewRevenueData()
      const newMenuItems = generateUpdatedMenuItems(menuItems)
      const newRecommendations = generateNewRecommendations(newMenuItems)
      const newDashboardStats = calculateDashboardStats(newMenuItems, newRevenueData)
      const newCategoryData = calculateCategoryData(newMenuItems)
      const newWasteData = calculateWasteData(newMenuItems)
      
      // Update all data
      setRevenueData(newRevenueData)
      setMenuItems(newMenuItems)
      setRecommendations(newRecommendations)
      setDashboardStats(newDashboardStats)
      setCategoryData(newCategoryData)
      setWasteData(newWasteData)
      setLastUpdated(new Date())
      
    } catch (error) {
      console.error('Failed to refresh analysis:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const updateMenuItem = (id: string, item: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(menuItem => 
      menuItem.id === id 
        ? { ...menuItem, ...item }
        : menuItem
    ))
  }

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id))
  }

  const addMenuItem = (newItem: Omit<MenuItem, 'id' | 'revenue' | 'margin' | 'wastePercentage'>) => {
    const id = (menuItems.length + 1).toString()
    const revenue = newItem.price * newItem.salesCount
    const margin = ((newItem.price - newItem.cost) / newItem.price) * 100
    const wastePercentage = Math.random() * 20
    
    const menuItem: MenuItem = {
      id,
      revenue,
      margin,
      wastePercentage,
      ...newItem
    }
    
    setMenuItems(prev => [...prev, menuItem])
  }

  const implementRecommendation = async (recommendationId: string) => {
    const recommendation = recommendations.find(r => r.id === recommendationId)
    if (!recommendation) return

    try {
      // Simulate implementation delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Apply the recommendation based on type
      switch (recommendation.type) {
        case 'remove':
          if (recommendation.itemName) {
            const itemToRemove = menuItems.find(item => item.name === recommendation.itemName)
            if (itemToRemove) {
              deleteMenuItem(itemToRemove.id)
            }
          }
          break
        case 'price-adjust':
          if (recommendation.itemName) {
            const itemToUpdate = menuItems.find(item => item.name === recommendation.itemName)
            if (itemToUpdate) {
              // Apply price increase (simplified)
              const newPrice = itemToUpdate.price * 1.1 // 10% increase
              updateMenuItem(itemToUpdate.id, { price: newPrice })
            }
          }
          break
        case 'promote':
          // For promotion, we might increase sales count
          if (recommendation.itemName) {
            const itemToUpdate = menuItems.find(item => item.name === recommendation.itemName)
            if (itemToUpdate) {
              const newSalesCount = Math.floor(itemToUpdate.salesCount * 1.2) // 20% increase
              updateMenuItem(itemToUpdate.id, { salesCount: newSalesCount })
            }
          }
          break
        case 'bundle':
          // For bundles, we might create a new menu item
          // This is simplified - in reality you'd create a proper bundle
          break
      }
      
      // Remove the implemented recommendation
      setRecommendations(prev => prev.filter(r => r.id !== recommendationId))
      
    } catch (error) {
      console.error('Failed to implement recommendation:', error)
    }
  }

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ))
  }

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })))
  }

  return (
    <AppContext.Provider value={{
      menuItems,
      recommendations,
      dashboardStats,
      revenueData,
      categoryData,
      wasteData,
      notifications,
      refreshAnalysis,
      updateMenuItem,
      deleteMenuItem,
      addMenuItem,
      implementRecommendation,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      isRefreshing,
      lastUpdated
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Helper functions for generating new data
function generateNewRevenueData(): RevenueData[] {
  return Array.from({ length: 90 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (89 - i))
    const baseRevenue = 2500 + Math.random() * 1000
    const variance = Math.sin(i / 7) * 500 + Math.random() * 400
    const revenue = baseRevenue + variance
    const orders = Math.floor(revenue / 15)
    const profit = revenue * (0.3 + Math.random() * 0.1)

    return {
      date: date.toISOString().split('T')[0],
      revenue: Math.round(revenue * 100) / 100,
      orders,
      profit: Math.round(profit * 100) / 100,
    }
  })
}

function generateUpdatedMenuItems(currentItems: MenuItem[]): MenuItem[] {
  return currentItems.map(item => ({
    ...item,
    salesCount: Math.floor(item.salesCount * (0.9 + Math.random() * 0.2)), // ±10% variation
    price: Math.round(item.price * (0.95 + Math.random() * 0.1) * 100) / 100, // ±5% variation
    wastePercentage: Math.max(0, item.wastePercentage + (Math.random() - 0.5) * 5), // ±2.5% variation
  })).map(item => ({
    ...item,
    revenue: item.price * item.salesCount,
    margin: ((item.price - item.cost) / item.price) * 100,
  }))
}

function generateNewRecommendations(menuItems: MenuItem[]): Recommendation[] {
  // Generate new recommendations based on current menu items
  const newRecommendations: Recommendation[] = []
  
  // Find items with high waste percentage
  const highWasteItems = menuItems.filter(item => item.wastePercentage > 15)
  highWasteItems.forEach(item => {
    newRecommendations.push({
      id: `remove-${item.id}`,
      type: 'remove',
      priority: 'high',
      title: `Consider removing ${item.name}`,
      description: `This item has a high waste percentage of ${item.wastePercentage.toFixed(1)}% and low sales volume.`,
      itemName: item.name,
      currentMetrics: {
        revenue: item.revenue,
        margin: item.margin,
        salesCount: item.salesCount,
      },
      expectedImpact: {
        revenueChange: -item.revenue,
        profitChange: item.revenue * 0.1, // Estimated waste cost savings
      },
      confidence: 75 + Math.random() * 20,
    })
  })
  
  // Find high-margin items to promote
  const highMarginItems = menuItems.filter(item => item.margin > 70)
  highMarginItems.forEach(item => {
    newRecommendations.push({
      id: `promote-${item.id}`,
      type: 'promote',
      priority: 'medium',
      title: `Promote ${item.name}`,
      description: `This item has excellent margins (${item.margin.toFixed(1)}%) and could benefit from promotion.`,
      itemName: item.name,
      currentMetrics: {
        revenue: item.revenue,
        margin: item.margin,
        salesCount: item.salesCount,
      },
      expectedImpact: {
        revenueChange: item.revenue * 0.3, // 30% increase
        profitChange: item.revenue * 0.3 * (item.margin / 100),
      },
      confidence: 80 + Math.random() * 15,
    })
  })
  
  return newRecommendations.slice(0, 8) // Limit to 8 recommendations
}

function calculateDashboardStats(menuItems: MenuItem[], revenueData: RevenueData[]): DashboardStats {
  const totalRevenue = menuItems.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = revenueData.reduce((sum, day) => sum + day.orders, 0)
  const netProfit = revenueData.reduce((sum, day) => sum + day.profit, 0)
  const wastePercentage = menuItems.reduce((sum, item) => sum + item.wastePercentage, 0) / menuItems.length
  
  return {
    totalRevenue,
    netProfit,
    totalOrders,
    wastePercentage,
    revenueChange: (Math.random() - 0.5) * 20, // ±10% change
    profitChange: (Math.random() - 0.5) * 25, // ±12.5% change
    orderChange: (Math.random() - 0.5) * 15, // ±7.5% change
    wasteChange: (Math.random() - 0.5) * 10, // ±5% change
  }
}

function calculateCategoryData(menuItems: MenuItem[]): CategoryData[] {
  const categoryMap = new Map<string, { revenue: number; count: number }>()
  
  menuItems.forEach(item => {
    const existing = categoryMap.get(item.category) || { revenue: 0, count: 0 }
    categoryMap.set(item.category, {
      revenue: existing.revenue + item.revenue,
      count: existing.count + 1
    })
  })
  
  const totalRevenue = Array.from(categoryMap.values()).reduce((sum, cat) => sum + cat.revenue, 0)
  
  return Array.from(categoryMap.entries()).map(([name, data], index) => ({
    name,
    value: data.revenue,
    percentage: (data.revenue / totalRevenue) * 100,
    fill: `hsl(${index * 45}, 70%, 50%)`,
  }))
}

function calculateWasteData(menuItems: MenuItem[]): WasteData[] {
  return menuItems
    .filter(item => item.wastePercentage > 5)
    .sort((a, b) => b.wastePercentage - a.wastePercentage)
    .slice(0, 5)
    .map(item => ({
      itemName: item.name,
      sales: item.salesCount,
      waste: item.wastePercentage,
    }))
}
