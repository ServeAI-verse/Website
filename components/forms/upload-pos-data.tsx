'use client'

import { useState } from 'react'
import { Upload, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export default function UploadPosData() {
  const [posSystem, setPosSystem] = useState('')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload POS Data</CardTitle>
        <CardDescription>
          Import your sales data from your Point of Sale system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="pos-system">POS System</Label>
          <Select value={posSystem} onValueChange={setPosSystem}>
            <SelectTrigger id="pos-system">
              <SelectValue placeholder="Select your POS system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="square">Square</SelectItem>
              <SelectItem value="toast">Toast</SelectItem>
              <SelectItem value="clover">Clover</SelectItem>
              <SelectItem value="lightspeed">Lightspeed</SelectItem>
              <SelectItem value="other">Other / CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-primary/10 p-4 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Drag and drop your file here</p>
              <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
            </div>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Choose File
            </Button>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h4 className="text-sm font-medium">Supported Formats</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>CSV files from your POS system export</li>
            <li>Excel files (.xlsx, .xls)</li>
            <li>Required columns: Item Name, Price, Cost, Sales Count</li>
            <li>Optional: Category, Date Range</li>
          </ul>
        </div>

        <Button className="w-full" disabled={!posSystem}>
          Process Data
        </Button>
      </CardContent>
    </Card>
  )
}
