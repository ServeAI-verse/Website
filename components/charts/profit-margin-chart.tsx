'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoryData } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface ProfitMarginChartProps {
  data: CategoryData[]
  title?: string
  description?: string
}

export default function ProfitMarginChart({
  data,
  title = 'Revenue by Category',
  description = 'Distribution of revenue across menu categories'
}: ProfitMarginChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name}: ${Math.round(percentage)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as CategoryData
                  return (
                    <div className="rounded-lg border bg-card p-3 shadow-sm">
                      <div className="grid gap-2">
                        <div className="font-semibold text-foreground">{data.name}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <span className="text-muted-foreground">Revenue:</span>
                          <span className="font-medium">{formatCurrency(data.value)}</span>
                          <span className="text-muted-foreground">Share:</span>
                          <span className="font-medium">{Math.round(data.percentage)}%</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
