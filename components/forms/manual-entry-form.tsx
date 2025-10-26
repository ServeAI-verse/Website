'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MenuItem } from '@/types'

interface ManualEntryFormProps {
  onAddItem: (item: Omit<MenuItem, 'id' | 'revenue' | 'margin' | 'wastePercentage'>) => void
  editingItem: MenuItem | null
  onUpdateItem: (id: string, item: Omit<MenuItem, 'id' | 'revenue' | 'margin' | 'wastePercentage'>) => void
  onCancelEdit: () => void
}

export default function ManualEntryForm({ onAddItem, editingItem, onUpdateItem, onCancelEdit }: ManualEntryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    cost: '',
    price: '',
    salesCount: ''
  })

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        category: editingItem.category,
        cost: editingItem.cost.toString(),
        price: editingItem.price.toString(),
        salesCount: editingItem.salesCount.toString()
      })
    } else {
      setFormData({
        name: '',
        category: '',
        cost: '',
        price: '',
        salesCount: ''
      })
    }
  }, [editingItem])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.category || !formData.cost || !formData.price || !formData.salesCount) {
      return
    }

    const itemData = {
      name: formData.name,
      category: formData.category,
      cost: parseFloat(formData.cost),
      price: parseFloat(formData.price),
      salesCount: parseInt(formData.salesCount)
    }

    if (editingItem) {
      onUpdateItem(editingItem.id, itemData)
    } else {
      onAddItem(itemData)
    }

    // Reset form
    setFormData({
      name: '',
      category: '',
      cost: '',
      price: '',
      salesCount: ''
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</CardTitle>
        <CardDescription>
          {editingItem ? 'Update menu item details' : 'Manually enter menu item details for analysis'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="item-name">Item Name</Label>
              <Input 
                id="item-name" 
                placeholder="e.g., Classic Burger"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Burgers">Burgers</SelectItem>
                  <SelectItem value="Pizza">Pizza</SelectItem>
                  <SelectItem value="Salads">Salads</SelectItem>
                  <SelectItem value="Sides">Sides</SelectItem>
                  <SelectItem value="Mains">Mains</SelectItem>
                  <SelectItem value="Desserts">Desserts</SelectItem>
                  <SelectItem value="Drinks">Drinks</SelectItem>
                  <SelectItem value="Appetizers">Appetizers</SelectItem>
                  <SelectItem value="Wraps">Wraps</SelectItem>
                  <SelectItem value="Sandwiches">Sandwiches</SelectItem>
                  <SelectItem value="Pasta">Pasta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sales-count">Monthly Sales</Label>
              <Input 
                id="sales-count" 
                type="number" 
                placeholder="e.g., 450"
                value={formData.salesCount}
                onChange={(e) => handleInputChange('salesCount', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Cost per Item</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input 
                  id="cost" 
                  type="number" 
                  step="0.01" 
                  className="pl-7" 
                  placeholder="4.50"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Selling Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input 
                  id="price" 
                  type="number" 
                  step="0.01" 
                  className="pl-7" 
                  placeholder="12.99"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              {editingItem ? 'Update Item' : 'Add Item'}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={editingItem ? onCancelEdit : () => setFormData({
                name: '',
                category: '',
                cost: '',
                price: '',
                salesCount: ''
              })}
            >
              {editingItem ? 'Cancel Edit' : 'Clear'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
