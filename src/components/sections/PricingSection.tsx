'use client'

import React, { useState, useEffect } from 'react'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { PricingCard } from '@/components/ui/PricingCard'
import { SecurityBadge } from '@/components/ui/SecurityBadge'
import { trackEvent, cn } from '@/lib/utils'

interface PricingCalculation {
  mailboxCount: number
  pricePerMailbox: number
  tierName: string
  monthlyCost: number
  traditionalCost: number
  monthlySavings: number
  annualSavings: number
  savingsPercentage: number
}

export function PricingSection() {
  const [mailboxCount, setMailboxCount] = useState(10)
  const [pricing, setPricing] = useState<PricingCalculation>(calculatePricing(10))

  // Calculate pricing based on mailbox count
  function calculatePricing(count: number): PricingCalculation {
    let pricePerMailbox: number
    let tierName: string

    if (count >= 100) {
      pricePerMailbox = 2.50
      tierName = "Scale"
    } else if (count >= 30) {
      pricePerMailbox = 2.80
      tierName = "Growth"
    } else {
      pricePerMailbox = 3.00
      tierName = "Starter"
    }

    const monthlyCost = count * pricePerMailbox
    const traditionalCost = count * 7 // Actual Google Workspace pricing
    const monthlySavings = traditionalCost - monthlyCost
    const annualSavings = monthlySavings * 12
    const savingsPercentage = (monthlySavings / traditionalCost) * 100

    return {
      mailboxCount: count,
      pricePerMailbox,
      tierName,
      monthlyCost,
      traditionalCost,
      monthlySavings,
      annualSavings,
      savingsPercentage
    }
  }

  // Update pricing when mailbox count changes
  useEffect(() => {
    setPricing(calculatePricing(mailboxCount))
  }, [mailboxCount])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setMailboxCount(value)

    trackEvent('pricing_calculator_interaction', {
      mailbox_count: value,
      tier: calculatePricing(value).tierName,
      monthly_cost: calculatePricing(value).monthlyCost
    })
  }

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

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly."
    },
    {
      question: "What's included in all plans?",
      answer: "All plans include expert DNS configuration (SPF, DMARC, DKIM), email warming, deliverability monitoring, and ongoing support to ensure 98.7% inbox delivery."
    },
    {
      question: "How does the additional mailbox pricing work?",
      answer: "Each plan includes a set number of mailboxes. If you need more, you can add them at the per-mailbox rate shown in your plan (ranging from $2.50-$3.00 per mailbox)."
    },
    {
      question: "What happens if I exceed my monthly email limit?",
      answer: "We'll notify you as you approach your limit. You can either upgrade to a higher plan or wait until the next billing cycle. We never cut off your service mid-campaign."
    },
    {
      question: "Is there a setup fee or long-term contract?",
      answer: "No setup fees, no long-term contracts. Pay monthly and cancel anytime. We include a 30-day money-back guarantee if you're not satisfied."
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

          {/* Savings Calculator - Compact Vertical Design */}
          <div className="max-w-4xl mx-auto">
            {/* Glass Card with Glow Effect */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-trust-green/20 via-primary-teal/20 to-trust-green/20 rounded-[32px] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

              <div className="relative bg-white/80 backdrop-blur-2xl rounded-[32px] p-4 lg:p-6 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">

              {/* Slider Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-slate-600">
                    Number of Mailboxes
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold text-trust-green">
                      {mailboxCount}
                    </div>
                    <div className={cn(
                      "px-2 py-0.5 rounded-md text-xs font-semibold",
                      pricing.tierName === "Scale" && "bg-trust-green text-white",
                      pricing.tierName === "Growth" && "bg-trust-green/20 text-trust-green",
                      pricing.tierName === "Starter" && "bg-slate-100 text-slate-600"
                    )}>
                      {pricing.tierName}
                    </div>
                  </div>
                </div>

                <input
                  type="range"
                  min="10"
                  max="300"
                  step="1"
                  value={mailboxCount}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, #28D27A 0%, #28D27A ${((mailboxCount - 10) / 290) * 100}%, #F1F5F9 ${((mailboxCount - 10) / 290) * 100}%, #F1F5F9 100%)`
                  }}
                />
                <div className="flex justify-between mt-1 text-xs text-slate-500">
                  <span>10</span>
                  <span>300</span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-200/50">

                {/* Retail Price */}
                <div className="text-center p-3 rounded-lg bg-slate-50/50">
                  <div className="text-xs text-slate-500 mb-1">Retail Price</div>
                  <div className="text-lg font-bold text-slate-400 line-through">
                    ${pricing.traditionalCost.toFixed(0)}
                  </div>
                </div>

                {/* COLDINFRA Price */}
                <div className="text-center p-3 rounded-lg bg-trust-green/5">
                  <div className="text-xs text-trust-green mb-1 font-medium">Your Price</div>
                  <div className="text-lg font-bold text-trust-green">
                    ${pricing.monthlyCost.toFixed(0)}
                  </div>
                </div>

                {/* Monthly Savings */}
                <div className="text-center p-3 rounded-lg bg-slate-50/50">
                  <div className="text-xs text-slate-500 mb-1">Monthly Savings</div>
                  <div className="text-lg font-bold text-trust-green">
                    ${pricing.monthlySavings.toFixed(0)}
                  </div>
                </div>

                {/* Annual Savings */}
                <div className="text-center p-3 rounded-lg bg-slate-50/50">
                  <div className="text-xs text-slate-500 mb-1">Annual Savings</div>
                  <div className="text-lg font-bold text-trust-green">
                    ${pricing.annualSavings.toFixed(0)}
                  </div>
                </div>

              </div>

              {/* Savings Percentage */}
              <div className="mt-3 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-trust-green/10 rounded-full">
                  <span className="text-xs font-semibold text-slate-900">
                    Save <span className="text-trust-green">{pricing.savingsPercentage.toFixed(0)}%</span> vs Google Retail
                  </span>
                </div>
              </div>

              {/* Get Started Button */}
              <div className="mt-4 text-center">
                <Button
                  size="default"
                  onClick={() => {
                    // Scroll to pricing cards
                    const pricingCards = document.querySelector('#pricing-cards')
                    pricingCards?.scrollIntoView({ behavior: 'smooth', block: 'start' })

                    trackEvent('calculator_get_started', {
                      mailbox_count: mailboxCount,
                      tier: pricing.tierName,
                      monthly_cost: pricing.monthlyCost
                    })
                  }}
                  className="bg-trust-green hover:bg-trust-green-dark text-white group px-4 py-2"
                >
                  Get Started Now
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </div>

              </div>
            </div>
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

          {/* FAQ Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h3>
              <p className="text-lg text-slate-600">
                Everything you need to know about our pricing and service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-trust-green/10 to-primary-teal/10 rounded-[24px] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                  {/* Glass Card */}
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-[24px] p-6 border border-slate-200/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:shadow-[0_12px_48px_0_rgba(31,38,135,0.15)] transition-all duration-500">
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">
                      {faq.question}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">
              Ready to Start Sending?
            </h3>
            <p className="text-lg text-slate-600">
              Join 6,000+ businesses achieving 98.7% inbox delivery with expert DNS setup
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => handlePlanSelect('Growth', '$84')}
                className="bg-trust-green hover:bg-trust-green-dark text-white group px-8 py-6 text-lg"
              >
                Get Started Now
                <svg
                  className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button variant="outline" size="lg" className="border-trust-green text-trust-green hover:bg-trust-green/10 px-8 py-6 text-lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}