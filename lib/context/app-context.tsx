"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  MenuItem,
  Recommendation,
  DashboardStats,
  RevenueData,
  CategoryData,
  WasteData,
} from "@/types";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  timestamp: Date;
  read: boolean;
}
// Empty initial data - all data comes from CSV uploads
const initialMenuItems: MenuItem[] = [];
const initialRecommendations: Recommendation[] = [];
const initialDashboardStats: DashboardStats = {
  totalRevenue: 0,
  netProfit: 0,
  totalOrders: 0,
  wastePercentage: 0,
  revenueChange: 0,
  profitChange: 0,
  orderChange: 0,
  wasteChange: 0,
};
const initialRevenueData: RevenueData[] = [];
const initialCategoryData: CategoryData[] = [];
const initialWasteData: WasteData[] = [];

interface AppContextType {
  // Data
  menuItems: MenuItem[];
  recommendations: Recommendation[];
  dashboardStats: DashboardStats;
  revenueData: RevenueData[];
  categoryData: CategoryData[];
  wasteData: WasteData[];
  notifications: Notification[];

  // Actions
  refreshAnalysis: () => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addMenuItem: (
    item: Omit<MenuItem, "id" | "revenue" | "margin" | "wastePercentage">
  ) => void;
  replaceAllMenuItems: (
    items: Omit<MenuItem, "id" | "revenue" | "margin" | "wastePercentage">[]
  ) => void;
  implementRecommendation: (recommendationId: string) => Promise<void>;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  resetAllData: () => void;

  // UI State
  isRefreshing: boolean;
  lastUpdated: Date | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Load data from localStorage or use initial data
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('menuItems');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored menuItems:', e);
        }
      }
    }
    return initialMenuItems;
  });
  
  const [recommendations, setRecommendations] = useState<Recommendation[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('recommendations');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored recommendations:', e);
        }
      }
    }
    return initialRecommendations;
  });
  
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dashboardStats');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored dashboardStats:', e);
        }
      }
    }
    return initialDashboardStats;
  });
  
  const [revenueData, setRevenueData] = useState<RevenueData[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('revenueData');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored revenueData:', e);
        }
      }
    }
    return initialRevenueData;
  });
  
  const [categoryData, setCategoryData] = useState<CategoryData[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('categoryData');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored categoryData:', e);
        }
      }
    }
    return initialCategoryData;
  });
  
  const [wasteData, setWasteData] = useState<WasteData[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wasteData');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored wasteData:', e);
        }
      }
    }
    return initialWasteData;
  });
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lastUpdated');
      if (stored) {
        try {
          return new Date(stored);
        } catch (e) {
          console.error('Failed to parse stored lastUpdated:', e);
        }
      }
    }
    return null;
  });

  // Persist data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
    }
  }, [menuItems]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('recommendations', JSON.stringify(recommendations));
    }
  }, [recommendations]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboardStats', JSON.stringify(dashboardStats));
    }
  }, [dashboardStats]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('revenueData', JSON.stringify(revenueData));
    }
  }, [revenueData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('categoryData', JSON.stringify(categoryData));
    }
  }, [categoryData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wasteData', JSON.stringify(wasteData));
    }
  }, [wasteData]);

  useEffect(() => {
    if (typeof window !== 'undefined' && lastUpdated) {
      localStorage.setItem('lastUpdated', lastUpdated.toISOString());
    }
  }, [lastUpdated]);

  // Initialize notifications with localStorage support - start empty
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('notifications');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Convert timestamp strings back to Date objects
          return parsed.map((notif: any) => ({
            ...notif,
            timestamp: new Date(notif.timestamp),
          }));
        } catch (e) {
          console.error('Failed to parse stored notifications:', e);
        }
      }
    }
    // Start with no notifications - they will be generated based on actual data
    return [];
  });

  // Persist notifications to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  const refreshAnalysis = async () => {
    setIsRefreshing(true);

    try {
      // Call the AI API to generate new recommendations
      const response = await fetch("/api/recommendations/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuItems,
          revenueData,
          wasteData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recommendations");
      }

      const data = await response.json();

      // Update recommendations with AI-generated ones
      setRecommendations(data.recommendations);
      setLastUpdated(new Date());

      // Also recalculate other stats
      const newDashboardStats = calculateDashboardStats(menuItems, revenueData);
      const newCategoryData = calculateCategoryData(menuItems);
      const newWasteData = calculateWasteData(menuItems);

      setDashboardStats(newDashboardStats);
      setCategoryData(newCategoryData);
      setWasteData(newWasteData);
    } catch (error) {
      console.error("Failed to refresh analysis:", error);
      // Fall back to generating mock recommendations if API fails
      const newRecommendations = generateNewRecommendations(menuItems);
      setRecommendations(newRecommendations);
      setLastUpdated(new Date());
    } finally {
      setIsRefreshing(false);
    }
  };

  const updateMenuItem = (id: string, item: Partial<MenuItem>) => {
    setMenuItems((prev) => {
      const updatedItems = prev.map((menuItem) =>
        menuItem.id === id ? { 
          ...menuItem, 
          ...item,
          // Recalculate derived fields if price, cost, or salesCount changed
          revenue: (item.price || menuItem.price) * (item.salesCount || menuItem.salesCount),
          margin: ((item.price || menuItem.price) - (item.cost || menuItem.cost)) / (item.price || menuItem.price) * 100
        } : menuItem
      );
      
      // Recalculate all derived data
      setTimeout(() => {
        const newRevenueData = generateRevenueDataFromMenuItems(updatedItems);
        const newDashboardStats = calculateDashboardStats(updatedItems, newRevenueData);
        const newCategoryData = calculateCategoryData(updatedItems);
        const newWasteData = calculateWasteData(updatedItems);
        
        setRevenueData(newRevenueData);
        setDashboardStats(newDashboardStats);
        setCategoryData(newCategoryData);
        setWasteData(newWasteData);
        setLastUpdated(new Date());
      }, 0);
      
      return updatedItems;
    });
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);
      
      // Recalculate all derived data
      setTimeout(() => {
        const newRevenueData = generateRevenueDataFromMenuItems(updatedItems);
        const newDashboardStats = calculateDashboardStats(updatedItems, newRevenueData);
        const newCategoryData = calculateCategoryData(updatedItems);
        const newWasteData = calculateWasteData(updatedItems);
        
        setRevenueData(newRevenueData);
        setDashboardStats(newDashboardStats);
        setCategoryData(newCategoryData);
        setWasteData(newWasteData);
        setLastUpdated(new Date());
      }, 0);
      
      return updatedItems;
    });
  };

  const addMenuItem = (
    newItem: Omit<MenuItem, "id" | "revenue" | "margin" | "wastePercentage">
  ) => {
    const id = `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const revenue = newItem.price * newItem.salesCount;
    const margin = ((newItem.price - newItem.cost) / newItem.price) * 100;
    const wastePercentage = Math.random() * 20;

    const menuItem: MenuItem = {
      id,
      revenue,
      margin,
      wastePercentage,
      ...newItem,
    };

    setMenuItems((prev) => {
      const updatedItems = [...prev, menuItem];
      
      // Recalculate all derived data based on uploaded menu items
      setTimeout(() => {
        const newRevenueData = generateRevenueDataFromMenuItems(updatedItems);
        const newDashboardStats = calculateDashboardStats(updatedItems, newRevenueData);
        const newCategoryData = calculateCategoryData(updatedItems);
        const newWasteData = calculateWasteData(updatedItems);
        
        setRevenueData(newRevenueData);
        setDashboardStats(newDashboardStats);
        setCategoryData(newCategoryData);
        setWasteData(newWasteData);
        setLastUpdated(new Date());
      }, 0);
      
      return updatedItems;
    });
  };

  const replaceAllMenuItems = (
    items: Omit<MenuItem, "id" | "revenue" | "margin" | "wastePercentage">[]
  ) => {
    const menuItems: MenuItem[] = items.map((item) => {
      const id = `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const revenue = item.price * item.salesCount;
      const margin = ((item.price - item.cost) / item.price) * 100;
      const wastePercentage = Math.random() * 20;

      return {
        id,
        revenue,
        margin,
        wastePercentage,
        ...item,
      };
    });

    setMenuItems(menuItems);
    
    // Recalculate all derived data based on new menu items
    setTimeout(() => {
      const newRevenueData = generateRevenueDataFromMenuItems(menuItems);
      const newDashboardStats = calculateDashboardStats(menuItems, newRevenueData);
      const newCategoryData = calculateCategoryData(menuItems);
      const newWasteData = calculateWasteData(menuItems);
      
      setRevenueData(newRevenueData);
      setDashboardStats(newDashboardStats);
      setCategoryData(newCategoryData);
      setWasteData(newWasteData);
      setLastUpdated(new Date());
    }, 0);
  };

  const implementRecommendation = async (recommendationId: string) => {
    const recommendation = recommendations.find(
      (r) => r.id === recommendationId
    );
    if (!recommendation) return;

    try {
      // Simulate implementation delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Apply the recommendation based on type
      switch (recommendation.type) {
        case "remove":
          if (recommendation.itemName) {
            const itemToRemove = menuItems.find(
              (item) => item.name === recommendation.itemName
            );
            if (itemToRemove) {
              deleteMenuItem(itemToRemove.id);
            }
          }
          break;
        case "price-adjust":
          if (recommendation.itemName) {
            const itemToUpdate = menuItems.find(
              (item) => item.name === recommendation.itemName
            );
            if (itemToUpdate) {
              // Apply price increase (simplified)
              const newPrice = itemToUpdate.price * 1.1; // 10% increase
              updateMenuItem(itemToUpdate.id, { price: newPrice });
            }
          }
          break;
        case "promote":
          // For promotion, we might increase sales count
          if (recommendation.itemName) {
            const itemToUpdate = menuItems.find(
              (item) => item.name === recommendation.itemName
            );
            if (itemToUpdate) {
              const newSalesCount = Math.floor(itemToUpdate.salesCount * 1.2); // 20% increase
              updateMenuItem(itemToUpdate.id, { salesCount: newSalesCount });
            }
          }
          break;
        case "bundle":
          // For bundles, we might create a new menu item
          // This is simplified - in reality you'd create a proper bundle
          break;
      }

      // Remove the implemented recommendation
      setRecommendations((prev) =>
        prev.filter((r) => r.id !== recommendationId)
      );
    } catch (error) {
      console.error("Failed to implement recommendation:", error);
    }
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const resetAllData = () => {
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('menuItems');
      localStorage.removeItem('recommendations');
      localStorage.removeItem('dashboardStats');
      localStorage.removeItem('revenueData');
      localStorage.removeItem('categoryData');
      localStorage.removeItem('wasteData');
      localStorage.removeItem('notifications');
      localStorage.removeItem('lastUpdated');
    }
    
    // Reset state to empty (no dummy data)
    setMenuItems([]);
    setRecommendations([]);
    setDashboardStats({
      totalRevenue: 0,
      netProfit: 0,
      totalOrders: 0,
      wastePercentage: 0,
      revenueChange: 0,
      profitChange: 0,
      orderChange: 0,
      wasteChange: 0,
    });
    setRevenueData([]);
    setCategoryData([]);
    setWasteData([]);
    setLastUpdated(null);
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
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
        replaceAllMenuItems,
        implementRecommendation,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        resetAllData,
        isRefreshing,
        lastUpdated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

// Helper functions for generating new data
function generateRevenueDataFromMenuItems(menuItems: MenuItem[]): RevenueData[] {
  // Calculate total revenue from all menu items
  const totalRevenue = menuItems.reduce((sum, item) => sum + item.revenue, 0);
  const avgItemPrice = menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length;
  const totalSales = menuItems.reduce((sum, item) => sum + item.salesCount, 0);
  
  // Generate 90 days of revenue data based on actual menu data
  return Array.from({ length: 90 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));
    
    // Distribute the total revenue across 90 days with realistic variation
    const baseDailyRevenue = totalRevenue / 90;
    
    // Add realistic patterns:
    // - Weekly pattern (weekends have higher sales)
    const dayOfWeek = date.getDay();
    const weekendMultiplier = (dayOfWeek === 5 || dayOfWeek === 6) ? 1.4 : 
                             (dayOfWeek === 0) ? 1.2 : 1.0;
    
    // - Growth trend (more recent days have slightly higher revenue)
    const growthFactor = 1 + (i / 90) * 0.15; // 15% growth over the period
    
    // - Random daily variation
    const randomVariation = 0.85 + Math.random() * 0.3; // ±15% daily variation
    
    const revenue = baseDailyRevenue * weekendMultiplier * growthFactor * randomVariation;
    
    // Calculate orders based on average item price
    const orders = Math.floor(revenue / avgItemPrice);
    
    // Calculate profit based on average margin
    const avgMargin = menuItems.reduce((sum, item) => sum + item.margin, 0) / menuItems.length;
    const profit = revenue * (avgMargin / 100);

    return {
      date: date.toISOString().split("T")[0],
      revenue: Math.round(revenue * 100) / 100,
      orders,
      profit: Math.round(profit * 100) / 100,
    };
  });
}

function generateNewRevenueData(): RevenueData[] {
  return Array.from({ length: 90 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));
    const baseRevenue = 2500 + Math.random() * 1000;
    const variance = Math.sin(i / 7) * 500 + Math.random() * 400;
    const revenue = baseRevenue + variance;
    const orders = Math.floor(revenue / 15);
    const profit = revenue * (0.3 + Math.random() * 0.1);

    return {
      date: date.toISOString().split("T")[0],
      revenue: Math.round(revenue * 100) / 100,
      orders,
      profit: Math.round(profit * 100) / 100,
    };
  });
}

function generateUpdatedMenuItems(currentItems: MenuItem[]): MenuItem[] {
  return currentItems
    .map((item) => ({
      ...item,
      salesCount: Math.floor(item.salesCount * (0.9 + Math.random() * 0.2)), // ±10% variation
      price: Math.round(item.price * (0.95 + Math.random() * 0.1) * 100) / 100, // ±5% variation
      wastePercentage: Math.max(
        0,
        item.wastePercentage + (Math.random() - 0.5) * 5
      ), // ±2.5% variation
    }))
    .map((item) => ({
      ...item,
      revenue: item.price * item.salesCount,
      margin: ((item.price - item.cost) / item.price) * 100,
    }));
}

function generateNewRecommendations(menuItems: MenuItem[]): Recommendation[] {
  // Generate new recommendations based on current menu items
  const newRecommendations: Recommendation[] = [];

  // Find items with high waste percentage
  const highWasteItems = menuItems.filter((item) => item.wastePercentage > 15);
  highWasteItems.forEach((item) => {
    newRecommendations.push({
      id: `remove-${item.id}`,
      type: "remove",
      priority: "high",
      title: `Consider removing ${item.name}`,
      description: `This item has a high waste percentage of ${item.wastePercentage.toFixed(
        1
      )}% and low sales volume.`,
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
    });
  });

  // Find high-margin items to promote
  const highMarginItems = menuItems.filter((item) => item.margin > 70);
  highMarginItems.forEach((item) => {
    newRecommendations.push({
      id: `promote-${item.id}`,
      type: "promote",
      priority: "medium",
      title: `Promote ${item.name}`,
      description: `This item has excellent margins (${item.margin.toFixed(
        1
      )}%) and could benefit from promotion.`,
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
    });
  });

  return newRecommendations.slice(0, 8); // Limit to 8 recommendations
}

function calculateDashboardStats(
  menuItems: MenuItem[],
  revenueData: RevenueData[]
): DashboardStats {
  const totalRevenue = menuItems.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = revenueData.reduce((sum, day) => sum + day.orders, 0);
  const netProfit = revenueData.reduce((sum, day) => sum + day.profit, 0);
  const wastePercentage =
    menuItems.reduce((sum, item) => sum + item.wastePercentage, 0) /
    menuItems.length;

  return {
    totalRevenue,
    netProfit,
    totalOrders,
    wastePercentage,
    revenueChange: (Math.random() - 0.5) * 20, // ±10% change
    profitChange: (Math.random() - 0.5) * 25, // ±12.5% change
    orderChange: (Math.random() - 0.5) * 15, // ±7.5% change
    wasteChange: (Math.random() - 0.5) * 10, // ±5% change
  };
}

function calculateCategoryData(menuItems: MenuItem[]): CategoryData[] {
  const categoryMap = new Map<string, { revenue: number; count: number }>();

  menuItems.forEach((item) => {
    const existing = categoryMap.get(item.category) || { revenue: 0, count: 0 };
    categoryMap.set(item.category, {
      revenue: existing.revenue + item.revenue,
      count: existing.count + 1,
    });
  });

  const totalRevenue = Array.from(categoryMap.values()).reduce(
    (sum, cat) => sum + cat.revenue,
    0
  );

  return Array.from(categoryMap.entries()).map(([name, data], index) => ({
    name,
    value: data.revenue,
    percentage: (data.revenue / totalRevenue) * 100,
    fill: `hsl(${index * 45}, 70%, 50%)`,
  }));
}

function calculateWasteData(menuItems: MenuItem[]): WasteData[] {
  return menuItems
    .filter((item) => item.wastePercentage > 5)
    .sort((a, b) => b.wastePercentage - a.wastePercentage)
    .slice(0, 5)
    .map((item) => ({
      itemName: item.name,
      sales: item.salesCount,
      waste: item.wastePercentage,
    }));
}
