import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  title: string
  price: string | number
  period?: string
  description: string
  features: string[]
  ctaText: string
  ctaAction: () => void
  featured?: boolean
  badge?: string
  className?: string
  style?: React.CSSProperties
}

export function PricingCard({
  title,
  price,
  period = '/month',
  description,
  features,
  ctaText,
  ctaAction,
  featured = false,
  badge,
  className,
  style
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "relative hover:shadow-xl transition-all duration-300",
        featured && "border-trust-green border-2 shadow-xl scale-105",
        className
      )}
      style={style}
    >
      {badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-trust-green text-white px-4 py-1">
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader className={cn("text-center", badge && "pt-8")}>
        <CardTitle className="text-2xl font-bold text-slate-900">
          {title}
        </CardTitle>
        <div className="mt-4">
          <span className="text-5xl font-bold text-slate-900">{price}</span>
          {period && <span className="text-slate-600 ml-2">{period}</span>}
        </div>
        <CardDescription className="mt-2 text-slate-600">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-5 h-5 text-trust-green mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-slate-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={ctaAction}
          className={cn(
            "w-full",
            featured
              ? "bg-trust-green hover:bg-trust-green-dark text-white"
              : "bg-slate-100 hover:bg-slate-200 text-slate-900"
          )}
        >
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  )
}
