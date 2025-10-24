'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function SettingsForm() {
  return (
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
  )
}
