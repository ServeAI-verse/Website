'use client'

import { useState } from 'react'
import PageHeader from '@/components/layout/page-header'
import UploadPosData from '@/components/forms/upload-pos-data'
import ManualEntryForm from '@/components/forms/manual-entry-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, ChefHat } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { MenuItem } from '@/types'
import { useApp } from '@/lib/context/app-context'

export default function MenuPage() {
  const { 
    menuItems, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem 
  } = useApp()
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
  }

  return (
    <div className="space-y-6 relative">
      {/* Gradient background accents */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-bl from-primary/10 to-accent/10 rounded-full blur-3xl -z-10"></div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Menu Management
            </h1>
            <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10">
              <ChefHat className="w-3 h-3 mr-1" />
              {menuItems.length} Items
            </Badge>
          </div>
          <p className="text-muted-foreground">Manage your menu items and upload POS data</p>
        </div>
      </div>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList className="bg-gradient-to-r from-secondary to-secondary/50">
          <TabsTrigger value="upload" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
            Upload Data
          </TabsTrigger>
          <TabsTrigger value="manual" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground">
            Manual Entry
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <UploadPosData />
        </TabsContent>

        <TabsContent value="manual">
          <ManualEntryForm 
            onAddItem={addMenuItem} 
            editingItem={editingItem} 
            onUpdateItem={updateMenuItem} 
            onCancelEdit={() => setEditingItem(null)} 
          />
        </TabsContent>
      </Tabs>

      {/* Current Menu Items */}
      <Card>
        <CardHeader>
          <CardTitle>Current Menu Items</CardTitle>
          <CardDescription>
            {menuItems.length} items in your menu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Margin</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(item.cost)}</TableCell>
                  <TableCell>{formatCurrency(item.price)}</TableCell>
                  <TableCell>
                    <Badge variant={item.margin > 70 ? 'default' : 'secondary'}>
                      {item.margin.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell>{item.salesCount}</TableCell>
                  <TableCell>{formatCurrency(item.revenue)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(item)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteMenuItem(item.id)}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
