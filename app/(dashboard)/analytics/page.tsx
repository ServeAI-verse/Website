import PageHeader from '@/components/layout/page-header'
import RevenueChart from '@/components/charts/revenue-chart'
import TopItemsChart from '@/components/charts/top-items-chart'
import ProfitMarginChart from '@/components/charts/profit-margin-chart'
import WasteAnalysisChart from '@/components/charts/waste-analysis-chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, BarChart3, Sparkles } from 'lucide-react'
import { revenueData, menuItems, categoryData, wasteData } from '@/lib/mock-data'

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 relative">
      {/* Gradient background accents */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-10"></div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Analytics
            </h1>
            <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10">
              <BarChart3 className="w-3 h-3 mr-1" />
              Deep Insights
            </Badge>
          </div>
          <p className="text-muted-foreground">Detailed insights into your restaurant's performance</p>
        </div>
        <Button variant="outline" className="border-2 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5">
          <Calendar className="mr-2 h-4 w-4" />
          Last 90 Days
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gradient-to-r from-secondary to-secondary/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
            Overview
          </TabsTrigger>
          <TabsTrigger value="items" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
            Items
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
            Categories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur"></div>
            <div className="relative">
              <RevenueChart data={revenueData} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ProfitMarginChart data={categoryData} />
            <WasteAnalysisChart data={wasteData} />
          </div>
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <TopItemsChart
              items={menuItems}
              title="Top Revenue Generators"
              description="Highest earning menu items"
              limit={10}
            />
            <TopItemsChart
              items={[...menuItems].sort((a, b) => b.margin - a.margin)}
              title="Highest Margin Items"
              description="Most profitable items by margin"
              limit={10}
            />
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ProfitMarginChart data={categoryData} />
            <RevenueChart
              data={revenueData.slice(-30)}
              title="Last 30 Days Revenue"
              description="Recent revenue trends"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
