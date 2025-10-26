'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BarChart3, FileText, Lightbulb, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { stackClientApp } from '@/stack/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navigation = [
  { name: 'Dashboard', href: '/overview', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Menu', href: '/menu', icon: FileText },
  { name: 'Recommendations', href: '/recommendations', icon: Lightbulb },
]

export default function Sidebar() {
  const pathname = usePathname()
  const user = stackClientApp.useUser()

  // Get user initials for avatar
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border relative overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-accent/10 rounded-full blur-3xl"></div>

      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border relative">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-md">
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ServeAI
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 relative">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group relative overflow-hidden',
                isActive
                  ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              )}
              <item.icon className={cn("h-5 w-5 relative", isActive && "text-primary-foreground")} />
              <span className="relative">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="border-t border-sidebar-border p-4 relative">
        {user ? (
          <Link 
            href="/settings" 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors"
          >
            <Avatar className="h-9 w-9 ring-2 ring-primary/20">
              {user.profileImageUrl && (
                <AvatarImage src={user.profileImageUrl} alt={user.displayName || 'User'} />
              )}
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-semibold">
                {getInitials(user.displayName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.displayName || 'User'}
              </p>
              <p className="text-xs text-sidebar-foreground/50 truncate">
                {user.primaryEmail}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex items-center space-x-3 p-2">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground">Loading...</p>
            </div>
          </div>
        )}
        <p className="text-xs text-sidebar-foreground/50 text-center mt-3">
          Powered by AI Analytics
        </p>
      </div>
    </div>
  )
}
