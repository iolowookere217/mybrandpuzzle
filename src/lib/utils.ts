import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function generateShareableLink(campaignId: string, userId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  return `${baseUrl}/campaigns/${campaignId}?ref=${userId}`
}

export function generateReportCardText(
  brandName: string,
  campaignTitle: string,
  prizeAmount: number,
  shareLink: string
): string {
  return `I just completed ${brandName}'s ${campaignTitle} quiz! 

I just took a quiz to stand a chance to win ${formatCurrency(prizeAmount)}! Please help me by liking and sharing so I can win.

Click here to take the quiz yourself and stand a chance to win ${formatCurrency(prizeAmount)} for free: ${shareLink}

Sponsored by ${brandName} – your reliable source for quality products and services.`
}