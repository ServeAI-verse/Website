'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, TrendingUp, DollarSign, Package, BarChart3, Target, Zap } from 'lucide-react'
import { Recommendation } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface RecommendationDetailsDialogProps {
  recommendation: Recommendation
  onImplement: (id: string) => Promise<void>
  children: React.ReactNode
}

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

export default function RecommendationDetailsDialog({ 
  recommendation, 
  onImplement, 
  children 
}: RecommendationDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isImplementing, setIsImplementing] = useState(false)

  const Icon = typeIcons[recommendation.type]

  const handleImplement = async () => {
    setIsImplementing(true)
    try {
      await onImplement(recommendation.id)
      setIsOpen(false)
    } catch (error) {
      console.error('Failed to implement recommendation:', error)
    } finally {
      setIsImplementing(false)
    }
  }

  const getImpactColor = (value: number) => {
    return value > 0 ? 'text-green-600' : 'text-red-600'
  }

  const getImpactIcon = (value: number) => {
    return value > 0 ? TrendingUp : AlertCircle
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">{recommendation.title}</DialogTitle>
                <DialogDescription className="mt-2 text-base">
                  {recommendation.description}
                </DialogDescription>
              </div>
            </div>
            <Badge variant={priorityColors[recommendation.priority]} className="ml-4">
              {recommendation.priority}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Information */}
          {recommendation.itemName && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Target Item
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium">{recommendation.itemName}</div>
                {recommendation.currentMetrics && (
                  <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Revenue</p>
                      <p className="font-semibold">{formatCurrency(recommendation.currentMetrics.revenue || 0)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Margin</p>
                      <p className="font-semibold">{(recommendation.currentMetrics.margin || 0).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Sales</p>
                      <p className="font-semibold">{recommendation.currentMetrics.salesCount || 0}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Expected Impact */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Expected Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Revenue Impact</span>
                    <div className={`flex items-center ${getImpactColor(recommendation.expectedImpact.revenueChange)}`}>
                      {(() => {
                        const ImpactIcon = getImpactIcon(recommendation.expectedImpact.revenueChange)
                        return <ImpactIcon className="h-4 w-4 mr-1" />
                      })()}
                      <span className="font-semibold">
                        {recommendation.expectedImpact.revenueChange > 0 ? '+' : ''}
                        {formatCurrency(recommendation.expectedImpact.revenueChange)}
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(100, Math.abs(recommendation.expectedImpact.revenueChange) / 1000 * 10)} 
                    className="h-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Profit Impact</span>
                    <div className={`flex items-center ${getImpactColor(recommendation.expectedImpact.profitChange)}`}>
                      {(() => {
                        const ImpactIcon = getImpactIcon(recommendation.expectedImpact.profitChange)
                        return <ImpactIcon className="h-4 w-4 mr-1" />
                      })()}
                      <span className="font-semibold">
                        {recommendation.expectedImpact.profitChange > 0 ? '+' : ''}
                        {formatCurrency(recommendation.expectedImpact.profitChange)}
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(100, Math.abs(recommendation.expectedImpact.profitChange) / 500 * 10)} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confidence Level */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                AI Confidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Confidence Level</span>
                  <span className="font-semibold">{Math.round(recommendation.confidence)}%</span>
                </div>
                <Progress value={recommendation.confidence} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {recommendation.confidence >= 80 
                    ? "High confidence - Strong recommendation based on data analysis"
                    : recommendation.confidence >= 60
                    ? "Medium confidence - Good recommendation with some uncertainty"
                    : "Lower confidence - Consider additional factors before implementing"
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Implementation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {recommendation.type === 'remove' && (
                  <div>
                    <p className="font-medium mb-2">What happens when you implement this:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Item will be removed from your menu</li>
                      <li>No new orders will be accepted for this item</li>
                      <li>Waste costs will be eliminated</li>
                      <li>Kitchen space and resources will be freed up</li>
                    </ul>
                  </div>
                )}
                
                {recommendation.type === 'promote' && (
                  <div>
                    <p className="font-medium mb-2">What happens when you implement this:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Item will be featured prominently on your menu</li>
                      <li>Staff will be trained to recommend this item</li>
                      <li>Marketing materials will be created</li>
                      <li>Expected 20-40% increase in sales volume</li>
                    </ul>
                  </div>
                )}
                
                {recommendation.type === 'price-adjust' && (
                  <div>
                    <p className="font-medium mb-2">What happens when you implement this:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Item price will be updated in your POS system</li>
                      <li>Menu boards and digital menus will be updated</li>
                      <li>Staff will be notified of the price change</li>
                      <li>Revenue per sale will increase immediately</li>
                    </ul>
                  </div>
                )}
                
                {recommendation.type === 'bundle' && (
                  <div>
                    <p className="font-medium mb-2">What happens when you implement this:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>New bundle item will be added to your menu</li>
                      <li>Bundle pricing will be configured in your POS</li>
                      <li>Marketing materials will be created</li>
                      <li>Staff will be trained on bundle offerings</li>
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button 
              onClick={handleImplement}
              disabled={isImplementing}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              {isImplementing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Implementing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Implement Recommendation
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
