import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  number: string
  label: string
  description?: string
  className?: string
}

export function StatsCard({
  number,
  label,
  description,
  className
}: StatsCardProps) {
  return (
    <Card className={cn("text-center hover:shadow-lg transition-shadow duration-300", className)}>
      <CardContent className="p-6">
        <div className="text-4xl lg:text-5xl font-bold text-trust-green mb-2">
          {number}
        </div>
        <div className="text-lg font-semibold text-slate-900 mb-1">
          {label}
        </div>
        {description && (
          <div className="text-sm text-slate-600">
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
