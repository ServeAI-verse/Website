import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatPercentage(value: number, includeSign: boolean = true): string {
  const sign = includeSign && value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

export function calculateMargin(price: number, cost: number): number {
  if (price === 0) return 0
  return ((price - cost) / price) * 100
}
