'use client'

import React from 'react'
import { Container, Section } from '@/components/ui/Container'
import { PricingCard } from '@/components/ui/PricingCard'
import { SecurityBadge } from '@/components/ui/SecurityBadge'
import { trackEvent } from '@/lib/utils'

export function PricingSection() {
  const handlePlanSelect = (planName: string, price: string) => {
    trackEvent('pricing_plan_select', {
      plan_name: planName,
      price: price
    })
    // Handle plan selection
  }

  const plans = [
    {
      title: "Starter",
      price: "$30",
      period: "/month",
      description: "Best for Freelancers Looking to Startup",
      features: [
        "10 Mailboxes at $3/mailbox",
        "Additional Mailboxes at $3/Mailbox",
        "Send Up to 8,000 Emails Per Month",
        "Support"
      ],
      ctaText: "Subscribe Now",
      featured: false
    },
    {
      title: "Growth",
      price: "$84",
      period: "/month",
      description: "Best for Mid-Size Agencies",
      features: [
        "30 Mailboxes at $2.8/mailbox",
        "Additional Mailboxes at $3/Mailbox",
        "Send Up to 24,000 Emails Per Month",
        "Support"
      ],
      ctaText: "Subscribe Now",
      featured: true,
      badge: "Most Popular"
    },
    {
      title: "Scale",
      price: "$250",
      period: "/month",
      description: "Best for Agencies with Multiple Clients",
      features: [
        "100 Mailboxes at $2.5/mailbox",
        "Additional Mailboxes at $2.5/Mailbox",
        "Send Up to 80,000 Emails Per Month",
        "Priority Support"
      ],
      ctaText: "Subscribe Now",
      featured: false
    }
  ]

  return (
    <Section id="pricing" background="default" padding="xl" className="relative overflow-hidden">
      {/* Clean Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/30" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Container className="relative z-10">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-teal/10 rounded-full mb-2">
              <div className="w-2 h-2 bg-primary-teal rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-primary-teal">Simple Pricing</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Flexible pricing that grows with your business. All plans include expert DNS setup and deliverability monitoring.
            </p>
          </div>

          {/* Pricing Cards */}
          <div id="pricing-cards" className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                ctaText={plan.ctaText}
                ctaAction={() => handlePlanSelect(plan.title, plan.price)}
                featured={plan.featured}
                badge={plan.badge}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="text-center space-y-8">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <SecurityBadge type="money-back" />
              <SecurityBadge type="ssl" />
              <SecurityBadge type="uptime" />
            </div>

            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              All plans include our 30-day money-back guarantee, 99.9% uptime SLA,
              and enterprise-grade security.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}