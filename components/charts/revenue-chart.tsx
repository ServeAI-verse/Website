'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RevenueData } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { format, parseISO } from 'date-fns'

interface RevenueChartProps {
  data: RevenueData[]
  title?: string
  description?: string
}

export default function RevenueChart({
  data,
  title = 'Revenue Trend',
  description = 'Daily revenue for the last 90 days'
}: RevenueChartProps) {
  // Determine the appropriate date format and tick interval based on data length
  const getDateConfig = () => {
    const dataLength = data.length
    
    if (dataLength <= 31) {
      // Last month or less - show daily
      return {
        format: (date: string) => format(parseISO(date), 'MMM d'),
        tickCount: Math.min(7, dataLength), // Show up to 7 ticks
        interval: Math.max(1, Math.floor(dataLength / 7))
      }
    } else if (dataLength <= 90) {
      // Last 3 months - show weekly
      return {
        format: (date: string) => format(parseISO(date), 'MMM d'),
        tickCount: Math.min(6, dataLength),
        interval: Math.max(1, Math.floor(dataLength / 6))
      }
    } else if (dataLength <= 365) {
      // Last year - show monthly
      return {
        format: (date: string) => format(parseISO(date), 'MMM'),
        tickCount: Math.min(12, dataLength),
        interval: Math.max(1, Math.floor(dataLength / 12))
      }
    } else {
      // All time - show quarterly
      return {
        format: (date: string) => format(parseISO(date), 'MMM yyyy'),
        tickCount: Math.min(8, dataLength),
        interval: Math.max(1, Math.floor(dataLength / 8))
      }
    }
  }

  const dateConfig = getDateConfig()
  
  const formattedData = data.map(item => ({
    ...item,
    displayDate: dateConfig.format(item.date),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-[350px] text-muted-foreground">
            <p>No revenue data available. Upload your menu data to see trends.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="displayDate"
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              interval={dateConfig.interval}
              tickCount={dateConfig.tickCount}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-card p-3 shadow-sm">
                      <div className="grid gap-2">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            {payload[0].payload.displayDate}
                          </span>
                          <span className="font-bold text-foreground">
                            {formatCurrency(payload[0].value as number)}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {payload[0].payload.orders} orders
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
