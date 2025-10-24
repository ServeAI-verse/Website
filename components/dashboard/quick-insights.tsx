import { AlertCircle, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

const insights = [
  {
    type: 'warning',
    icon: AlertTriangle,
    message: '3 items have waste percentage above 15% - consider removing or reducing inventory',
  },
  {
    type: 'success',
    icon: TrendingUp,
    message: 'Loaded Fries has 78.5% margin - perfect candidate for promotion',
  },
  {
    type: 'info',
    icon: Lightbulb,
    message: 'Classic Burger is underpriced compared to market - opportunity for $1 increase',
  },
  {
    type: 'alert',
    icon: AlertCircle,
    message: 'Truffle Pasta only sold 45 times this month with high ingredient costs',
  },
]

export default function QuickInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Insights</CardTitle>
        <CardDescription>AI-powered recommendations at a glance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => (
          <Alert key={index} variant={insight.type === 'warning' || insight.type === 'alert' ? 'destructive' : 'default'}>
            <insight.icon className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {insight.message}
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
