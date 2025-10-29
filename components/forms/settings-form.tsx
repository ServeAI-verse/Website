'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, RotateCcw, CheckCircle } from 'lucide-react'
import { useApp } from '@/lib/context/app-context'

export default function SettingsForm() {
  const { resetAllData, lastUpdated } = useApp()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const handleResetData = () => {
    if (!showResetConfirm) {
      setShowResetConfirm(true)
      return
    }
    
    resetAllData()
    setShowResetConfirm(false)
    setResetSuccess(true)
    
    setTimeout(() => {
      setResetSuccess(false)
    }, 3000)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Settings</CardTitle>
          <CardDescription>
            Configure your restaurant profile and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="restaurant-name">Restaurant Name</Label>
                <Input id="restaurant-name" defaultValue="Demo Restaurant" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cuisine">Cuisine Type</Label>
                  <Select defaultValue="italian">
                    <SelectTrigger id="cuisine">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="mexican">Mexican</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Downtown" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Business Hours</Label>
                <Input id="hours" defaultValue="11:00 AM - 10:00 PM" />
              </div>
            </div>

            <Button type="submit">Save Settings</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Data Management</CardTitle>
          <CardDescription>
            Manage your stored menu and analytics data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {lastUpdated && (
            <div className="text-sm text-muted-foreground">
              Last data update: {lastUpdated.toLocaleString()}
            </div>
          )}

          {resetSuccess && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                All data has been reset successfully. Upload a CSV to get started.
              </AlertDescription>
            </Alert>
          )}

          {showResetConfirm && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Are you sure? This will permanently delete all your uploaded menu data, 
                analytics, and recommendations. Click Reset Data again to confirm.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Reset all data to clear your uploaded CSV data. The dashboard will be empty until you upload a new CSV file. 
              This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                onClick={handleResetData}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                {showResetConfirm ? 'Click Again to Confirm' : 'Reset All Data'}
              </Button>
              {showResetConfirm && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowResetConfirm(false)}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
