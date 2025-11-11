import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  badge?: string
  features?: string[]
  className?: string
}

export function FeatureCard({
  icon,
  title,
  description,
  badge,
  features,
  className
}: FeatureCardProps) {
  return (
    <Card className={cn(
      "group hover:shadow-lg hover:border-trust-green/30 transition-all duration-300",
      className
    )}>
      <CardHeader>
        {badge && (
          <Badge variant="secondary" className="w-fit mb-2">
            {badge}
          </Badge>
        )}
        {icon && (
          <div className="w-12 h-12 bg-trust-green/10 rounded-lg flex items-center justify-center text-trust-green mb-4 group-hover:bg-trust-green/20 transition-colors duration-300">
            {icon}
          </div>
        )}
        <CardTitle className="text-xl font-bold text-slate-900">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-600">
          {description}
        </CardDescription>
      </CardHeader>
      {features && features.length > 0 && (
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-trust-green mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-600">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  )
}
