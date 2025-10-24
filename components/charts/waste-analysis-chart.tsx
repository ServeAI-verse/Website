'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { WasteData } from '@/types'

interface WasteAnalysisChartProps {
  data: WasteData[]
  title?: string
  description?: string
}

export default function WasteAnalysisChart({
  data,
  title = 'Waste Analysis',
  description = 'Items with highest waste percentage'
}: WasteAnalysisChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="itemName"
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as WasteData
                  const wastePercentage = ((data.waste / (data.sales + data.waste)) * 100).toFixed(1)
                  return (
                    <div className="rounded-lg border bg-card p-3 shadow-sm">
                      <div className="grid gap-2">
                        <div className="font-semibold text-foreground">{data.itemName}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <span className="text-muted-foreground">Sales:</span>
                          <span className="font-medium text-primary">{data.sales}</span>
                          <span className="text-muted-foreground">Waste:</span>
                          <span className="font-medium text-destructive">{data.waste}</span>
                          <span className="text-muted-foreground">Waste %:</span>
                          <span className="font-medium">{wastePercentage}%</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            <Bar dataKey="sales" fill="hsl(var(--primary))" name="Sales" stackId="a" />
            <Bar dataKey="waste" fill="hsl(var(--destructive))" name="Waste" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
