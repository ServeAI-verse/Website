'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MenuItem } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface TopItemsChartProps {
  items: MenuItem[]
  title?: string
  description?: string
  limit?: number
}

export default function TopItemsChart({
  items,
  title = 'Top Performing Items',
  description = 'Best sellers by revenue',
  limit = 5
}: TopItemsChartProps) {
  const topItems = [...items]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit)
    .reverse()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topItems} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              type="number"
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis
              type="category"
              dataKey="name"
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              width={120}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as MenuItem
                  return (
                    <div className="rounded-lg border bg-card p-3 shadow-sm">
                      <div className="grid gap-2">
                        <div className="font-semibold text-foreground">{data.name}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <span className="text-muted-foreground">Revenue:</span>
                          <span className="font-medium">{formatCurrency(data.revenue)}</span>
                          <span className="text-muted-foreground">Sales:</span>
                          <span className="font-medium">{data.salesCount} orders</span>
                          <span className="text-muted-foreground">Margin:</span>
                          <span className="font-medium">{data.margin.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar
              dataKey="revenue"
              fill="hsl(var(--primary))"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
