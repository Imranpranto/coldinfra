'use client'

import React, { useState, useEffect } from 'react'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
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

export function HeroSection() {
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

    trackEvent('calculator_interaction', {
      mailbox_count: value,
      tier: calculatePricing(value).tierName,
      monthly_cost: calculatePricing(value).monthlyCost
    })
  }

  const handleGetStarted = () => {
    trackEvent('hero_cta_click', {
      cta_text: 'Get Started',
      section: 'hero',
      mailbox_count: mailboxCount,
      estimated_cost: pricing.monthlyCost
    })
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleBookDemo = () => {
    trackEvent('hero_demo_click', {
      cta_text: 'Book a Demo',
      section: 'hero',
      mailbox_count: mailboxCount
    })
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section
      background="default"
      padding="xl"
      className="relative overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-bg-mint to-white" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-trust-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-mint/5 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* LEFT COLUMN - Clever Copy */}
            <div className="space-y-6 animate-slide-up">

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary leading-[1.1] tracking-tight">
                Google Workspace for
                <span className="block mt-2 bg-gradient-to-r from-trust-green via-primary-mint to-trust-green-dark bg-clip-text text-transparent">
                  Cold Email That Delivers
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
                We sell Google Workspace at <span className="font-bold text-trust-green">${pricing.pricePerMailbox.toFixed(2)}/mailbox</span>
                {' '}(vs Google's $7) + handle all technical setup.
                <span className="block mt-2 font-medium text-primary-navy">
                  Perfect DNS, SPF, DMARC, DKIM configuration. Your cold emails land in primary inbox, not spam.
                </span>
              </p>

              {/* Value Props */}
              <div className="space-y-3">
                {[
                  'Google Workspace at 57-64% off retail price',
                  'Expert cold email infrastructure setup',
                  'Primary inbox delivery guaranteed'
                ].map((prop, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-trust-green flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-professional-700 font-medium">{prop}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="bg-trust-green hover:bg-trust-green-dark text-white group"
                >
                  <span>Get Started</span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleBookDemo}
                  className="border-trust-green text-trust-green hover:bg-trust-green/10"
                >
                  Talk to Sales
                </Button>
              </div>

              {/* Trust Line */}
              <p className="text-xs text-text-muted pt-1">
                14,000+ mailboxes • Setup in 10 minutes • 24/7 DNS support
              </p>
            </div>

            {/* RIGHT COLUMN - Compact Calculator */}
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="bg-white rounded-xl p-6 shadow-xl border border-professional-200 relative overflow-hidden">

                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-trust-green/5 rounded-full blur-xl" />

                {/* Calculator Header */}
                <div className="relative mb-6">
                  <h3 className="text-xl font-bold text-primary-navy mb-1">
                    Savings Calculator
                  </h3>
                  <p className="text-sm text-professional-600">
                    vs Google Workspace retail ($7/mailbox)
                  </p>
                </div>

                {/* Slider Control - Compact */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-professional-600">
                      Mailboxes
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold text-trust-green">
                        {mailboxCount}
                      </div>
                      <div className={cn(
                        "px-2 py-1 rounded-md text-xs font-semibold transition-all duration-300",
                        pricing.tierName === "Scale" && "bg-trust-green text-white",
                        pricing.tierName === "Growth" && "bg-trust-green-light text-trust-green",
                        pricing.tierName === "Starter" && "bg-professional-100 text-professional-600"
                      )}>
                        {pricing.tierName}
                      </div>
                    </div>
                  </div>

                  {/* Custom Slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="1"
                      value={mailboxCount}
                      onChange={handleSliderChange}
                      className="w-full h-2 bg-professional-100 rounded-full appearance-none cursor-pointer slider-thumb"
                      style={{
                        background: `linear-gradient(to right, #28D27A 0%, #28D27A ${((mailboxCount - 10) / 290) * 100}%, #F1F5F9 ${((mailboxCount - 10) / 290) * 100}%, #F1F5F9 100%)`
                      }}
                    />

                    {/* Tier Markers */}
                    <div className="flex justify-between mt-1 text-[10px] text-professional-500">
                      <span>10</span>
                      <span>100</span>
                      <span>300</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Display - Compact */}
                <div className="space-y-4">

                  {/* Price Comparison Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-professional-50 rounded-lg p-4">
                      <div className="text-xs text-professional-600 mb-1">Google Retail</div>
                      <div className="text-xl font-bold text-professional-900 line-through">
                        ${pricing.traditionalCost.toFixed(0)}/mo
                      </div>
                      <div className="text-[10px] text-professional-500 mt-0.5">$7 per mailbox</div>
                    </div>

                    <div className="bg-trust-green-light rounded-lg p-4 border border-trust-green/30">
                      <div className="text-xs text-trust-green-dark mb-1 font-medium">COLDINFRA</div>
                      <div className="text-xl font-bold text-trust-green">
                        ${pricing.monthlyCost.toFixed(0)}/mo
                      </div>
                      <div className="text-[10px] text-trust-green-dark mt-0.5">${pricing.pricePerMailbox.toFixed(2)} per mailbox</div>
                    </div>
                  </div>

                  {/* Savings Highlight - Compact */}
                  <div className="bg-gradient-to-r from-trust-green to-trust-green-dark rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Monthly Savings</span>
                      <span className="text-xl font-bold">
                        ${pricing.monthlySavings.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-white/20">
                      <span className="text-sm font-medium">Annual Savings</span>
                      <span className="text-xl font-bold">
                        ${pricing.annualSavings.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2 text-center">
                      <div className="text-xs opacity-90">You save {pricing.savingsPercentage.toFixed(0)}% off Google retail</div>
                    </div>
                  </div>
                </div>

                {/* Calculator CTA - Compact */}
                <div className="mt-6 pt-4 border-t border-professional-200">
                  <Button
                    onClick={handleGetStarted}
                    className="w-full bg-trust-green hover:bg-trust-green-dark text-white group"
                  >
                    <span>Start Saving ${pricing.monthlySavings.toFixed(0)}/month</span>
                    <svg
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                  <p className="text-[10px] text-center text-professional-500 mt-2">
                    Includes setup + DNS configuration + 24/7 support
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>

      {/* Custom Slider Styles - Sleek */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #28D27A;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(40, 210, 122, 0.4);
          transition: all 0.15s ease;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          background: #1FB864;
          transform: scale(1.15);
          box-shadow: 0 2px 8px rgba(40, 210, 122, 0.5);
        }

        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #28D27A;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 4px rgba(40, 210, 122, 0.4);
          transition: all 0.15s ease;
        }

        .slider-thumb::-moz-range-thumb:hover {
          background: #1FB864;
          transform: scale(1.15);
          box-shadow: 0 2px 8px rgba(40, 210, 122, 0.5);
        }
      `}</style>
    </Section>
  )
}
