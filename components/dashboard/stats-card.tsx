import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCurrency, formatPercentage } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  format?: 'currency' | 'number' | 'percentage'
  comparisonText?: string
}

export default function StatsCard({ title, value, change, icon: Icon, format = 'number', comparisonText = 'from last month' }: StatsCardProps) {
  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0

  let displayValue: string
  if (format === 'currency' && typeof value === 'number') {
    displayValue = formatCurrency(value)
  } else if (format === 'percentage') {
    displayValue = `${value}%`
  } else {
    displayValue = value.toString()
  }

  return (
    <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {displayValue}
        </div>
        {change !== undefined && (
          <div className="flex items-center mt-2 text-xs">
            {isPositive && <TrendingUp className="mr-1 h-3 w-3 text-primary" />}
            {isNegative && <TrendingDown className="mr-1 h-3 w-3 text-destructive" />}
            <span
              className={cn(
                'font-medium',
                isPositive && 'text-primary',
                isNegative && 'text-destructive'
              )}
            >
              {formatPercentage(change)}
            </span>
            <span className="text-muted-foreground ml-1">{comparisonText}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
