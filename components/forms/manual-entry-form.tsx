'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ManualEntryForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Menu Item</CardTitle>
        <CardDescription>
          Manually enter menu item details for analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="item-name">Item Name</Label>
              <Input id="item-name" placeholder="e.g., Classic Burger" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="burgers">Burgers</SelectItem>
                  <SelectItem value="pizza">Pizza</SelectItem>
                  <SelectItem value="salads">Salads</SelectItem>
                  <SelectItem value="sides">Sides</SelectItem>
                  <SelectItem value="mains">Mains</SelectItem>
                  <SelectItem value="desserts">Desserts</SelectItem>
                  <SelectItem value="drinks">Drinks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sales-count">Monthly Sales</Label>
              <Input id="sales-count" type="number" placeholder="e.g., 450" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Cost per Item</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input id="cost" type="number" step="0.01" className="pl-7" placeholder="4.50" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Selling Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input id="price" type="number" step="0.01" className="pl-7" placeholder="12.99" />
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">Add Item</Button>
            <Button type="button" variant="outline">Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
