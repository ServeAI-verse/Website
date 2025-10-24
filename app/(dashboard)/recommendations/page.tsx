import PageHeader from '@/components/layout/page-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, TrendingUp, DollarSign, Package, RefreshCw, Sparkles } from 'lucide-react'
import { recommendations } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'

const typeIcons = {
  remove: AlertCircle,
  promote: TrendingUp,
  'price-adjust': DollarSign,
  bundle: Package,
}

const priorityColors = {
  high: 'destructive',
  medium: 'default',
  low: 'secondary',
} as const

export default function RecommendationsPage() {
  const highPriority = recommendations.filter((r) => r.priority === 'high')
  const mediumPriority = recommendations.filter((r) => r.priority === 'medium')
  const lowPriority = recommendations.filter((r) => r.priority === 'low')

  return (
    <div className="space-y-6 relative">
      {/* Gradient background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-gradient-to-bl from-accent/10 to-primary/10 rounded-full blur-3xl -z-10"></div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI Recommendations
            </h1>
            <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10">
              <Sparkles className="w-3 h-3 mr-1" />
              {recommendations.length} Insights
            </Badge>
          </div>
          <p className="text-muted-foreground">Data-driven suggestions to optimize your menu and increase profits</p>
        </div>
        <Button variant="outline" className="border-2 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Analysis
        </Button>
      </div>

      {/* High Priority */}
      {highPriority.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <h2 className="text-xl font-semibold">Action Required ({highPriority.length})</h2>
          </div>
          <div className="grid gap-4">
            {highPriority.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
      )}

      {/* Medium Priority */}
      {mediumPriority.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Opportunities ({mediumPriority.length})</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {mediumPriority.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
      )}

      {/* Low Priority */}
      {lowPriority.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold">Consider Later ({lowPriority.length})</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {lowPriority.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function RecommendationCard({ recommendation }: { recommendation: typeof recommendations[0] }) {
  const Icon = typeIcons[recommendation.type]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="mt-1">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{recommendation.title}</CardTitle>
              <CardDescription className="mt-1">{recommendation.description}</CardDescription>
            </div>
          </div>
          <Badge variant={priorityColors[recommendation.priority]}>
            {recommendation.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendation.itemName && (
          <div className="text-sm">
            <span className="font-medium">Item:</span>{' '}
            <span className="text-muted-foreground">{recommendation.itemName}</span>
          </div>
        )}

        <Separator />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Expected Revenue Impact</p>
            <p className={`font-semibold ${recommendation.expectedImpact.revenueChange > 0 ? 'text-primary' : 'text-destructive'}`}>
              {recommendation.expectedImpact.revenueChange > 0 ? '+' : ''}
              {formatCurrency(recommendation.expectedImpact.revenueChange)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Expected Profit Impact</p>
            <p className={`font-semibold ${recommendation.expectedImpact.profitChange > 0 ? 'text-primary' : 'text-destructive'}`}>
              {recommendation.expectedImpact.profitChange > 0 ? '+' : ''}
              {formatCurrency(recommendation.expectedImpact.profitChange)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-muted-foreground">
            Confidence: <span className="font-medium">{recommendation.confidence}%</span>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button size="sm">Implement</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
