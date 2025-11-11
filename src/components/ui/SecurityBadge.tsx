import React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SecurityBadgeProps {
  icon?: React.ReactNode
  text?: string
  type?: 'soc2' | 'gdpr' | 'hipaa' | 'iso27001' | 'pci' | 'ssl' | 'uptime' | 'money-back'
  variant?: 'default' | 'secondary' | 'outline'
  className?: string
}

const badgeTextMap: Record<string, string> = {
  soc2: 'SOC 2 Certified',
  gdpr: 'GDPR Compliant',
  hipaa: 'HIPAA Compliant',
  iso27001: 'ISO 27001',
  pci: 'PCI DSS',
  ssl: 'SSL Secured',
  uptime: '99.9% Uptime',
  'money-back': '30-Day Money Back'
}

export function SecurityBadge({
  icon,
  text,
  type,
  variant = 'secondary',
  className
}: SecurityBadgeProps) {
  const displayText = text || (type && badgeTextMap[type]) || ''

  return (
    <Badge
      variant={variant}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 bg-trust-green/10 text-trust-green border-trust-green/20 hover:bg-trust-green/20 transition-colors",
        className
      )}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span className="font-medium">{displayText}</span>
    </Badge>
  )
}
