'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BarChart3, FileText, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/overview', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Menu', href: '/menu', icon: FileText },
  { name: 'Recommendations', href: '/recommendations', icon: Lightbulb },
]

export default function Sidebar() {
  const pathname = usePathname()

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

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4 relative">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          Powered by AI Analytics
        </p>
      </div>
    </div>
  )
}
