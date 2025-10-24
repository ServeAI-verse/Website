import { FileUp, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const activities = [
  {
    icon: FileUp,
    title: 'POS Data Uploaded',
    description: 'Square POS data for October processed',
    time: '2 hours ago',
    color: 'text-primary',
  },
  {
    icon: CheckCircle,
    title: 'Analysis Complete',
    description: '8 new recommendations generated',
    time: '3 hours ago',
    color: 'text-primary',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Milestone',
    description: 'Crossed $35,000 monthly revenue',
    time: '1 day ago',
    color: 'text-primary',
  },
  {
    icon: AlertCircle,
    title: 'High Waste Alert',
    description: 'Truffle Pasta waste exceeds 20%',
    time: '2 days ago',
    color: 'text-destructive',
  },
]

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`mt-0.5 ${activity.color}`}>
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
