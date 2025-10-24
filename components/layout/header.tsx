import { Bell, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 relative">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>

      <div className="relative">
        <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Demo Restaurant
        </h2>
        <p className="text-sm text-muted-foreground">Italian Cuisine • Downtown</p>
      </div>

      <div className="flex items-center space-x-4 relative">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent shadow-sm" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10">
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">John Doe</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
