'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { trackEvent, cn } from '@/lib/utils'
import { ArrowRight, Check, Settings, Sparkles, TrendingUp } from 'lucide-react'

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

export function HeroSectionModern() {
  const router = useRouter()
  const [mailboxCount, setMailboxCount] = useState([10])
  const [pricing, setPricing] = useState<PricingCalculation>(calculatePricing(10))

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
    const traditionalCost = count * 7
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

  useEffect(() => {
    setPricing(calculatePricing(mailboxCount[0]))
  }, [mailboxCount])

  const handleSliderChange = (value: number[]) => {
    setMailboxCount(value)
    trackEvent('calculator_interaction', {
      mailbox_count: value[0],
      tier: calculatePricing(value[0]).tierName,
      monthly_cost: calculatePricing(value[0]).monthlyCost
    })
  }

  const handleGetStarted = () => {
    trackEvent('hero_cta_click', {
      cta_text: 'Get Started',
      section: 'hero',
      mailbox_count: mailboxCount[0],
      estimated_cost: pricing.monthlyCost
    })
    router.push('/order')
  }

  const handleBookDemo = () => {
    trackEvent('hero_demo_click', {
      cta_text: 'Talk to Sales',
      section: 'hero',
      mailbox_count: mailboxCount[0]
    })
    router.push('/book-call')
  }

  return (
    <Section
      background="default"
      padding="lg"
      className="relative overflow-hidden min-h-screen flex items-center pt-32 -mt-32"
    >
      {/* Modern Gradient Background - Extended to cover header area */}
      <div className="absolute inset-0 -top-32 bg-gradient-to-br from-slate-50 via-white to-green-50/30" />

      {/* Animated Gradient Orbs */}
      <div className="absolute -top-32 -right-4 w-[800px] h-[800px] bg-gradient-to-br from-trust-green/20 via-primary-mint/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-8 -left-4 w-[600px] h-[600px] bg-gradient-to-tr from-trust-green/10 via-transparent to-trust-green/5 rounded-full blur-3xl" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 -top-32 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Container className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-center pt-32">

            {/* LEFT COLUMN - Modern Copy (2/3 width) */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
                Google Workspace for{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-trust-green via-emerald-500 to-trust-green-dark bg-clip-text text-transparent">
                    Cold Email
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-trust-green/20 blur-sm" />
                </span>
                {' '}That Delivers
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                We sell Google Workspace at{' '}
                <span className="font-bold text-trust-green">${pricing.pricePerMailbox.toFixed(2)}/mailbox</span>
                {' '}(vs Google's $7) with expert cold email setup.
                <span className="block mt-3 font-semibold text-slate-700">
                  Perfect DNS, SPF, DMARC, DKIM — Your emails land in primary inbox, not spam.
                </span>
              </p>

              {/* Value Props with Modern Icons */}
              <div className="space-y-3">
                {[
                  { text: 'Integrations with Instantly, Smartlead, EmailBison, Lemlist, and More', icon: Settings },
                  { text: 'Google Workspace at 57-64% off retail', icon: TrendingUp },
                  { text: 'Expert cold email infrastructure setup', icon: Sparkles },
                  { text: 'Primary inbox delivery guaranteed', icon: Check }
                  
                ].map((prop, index) => {
                  const Icon = prop.icon
                  return (
                    <div key={index} className="flex items-center gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-trust-green to-trust-green-dark flex items-center justify-center shadow-lg shadow-trust-green/30 group-hover:scale-110 transition-transform">
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-slate-700 font-medium">{prop.text}</span>
                    </div>
                  )
                })}
              </div>

              {/* Modern CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-trust-green to-trust-green-dark hover:from-trust-green-dark hover:to-trust-green text-white shadow-lg shadow-trust-green/30 hover:shadow-xl hover:shadow-trust-green/40 transition-all group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleBookDemo}
                  className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                >
                  Talk to Sales
                </Button>
              </div>

              {/* Trust Line */}
              <p className="text-xs text-slate-500 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-trust-green" />
                  14,000+ mailboxes
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-trust-green" />
                  Setup in 10 minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-trust-green" />
                  24/7 DNS support
                </span>
              </p>
            </div>

            {/* RIGHT COLUMN - Glassmorphic Calculator (1/3 width) */}
            <div className="lg:col-span-1 relative">
              {/* Glow Effect Behind Card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />

              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                <CardHeader className="space-y-1 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      Savings Calculator
                    </CardTitle>
                    <Badge variant="secondary" className="bg-trust-green/10 text-trust-green border-trust-green/20 hover:bg-trust-green/20">
                      {pricing.tierName}
                    </Badge>
                  </div>
                  <CardDescription className="text-slate-600">
                    vs Google Workspace retail ($7/mailbox)
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">

                  {/* Mailbox Counter with Slider */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">
                        Number of Mailboxes
                      </label>
                      <div className="text-3xl font-bold bg-gradient-to-r from-trust-green to-trust-green-dark bg-clip-text text-transparent">
                        {mailboxCount[0]}
                      </div>
                    </div>

                    {/* Shadcn Slider */}
                    <Slider
                      value={mailboxCount}
                      onValueChange={handleSliderChange}
                      min={10}
                      max={300}
                      step={1}
                      className="w-full"
                    />

                    {/* Tier Markers */}
                    <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                      <span>10</span>
                      <span className="text-slate-500">30 (Growth)</span>
                      <span className="text-slate-500">100 (Scale)</span>
                      <span>300</span>
                    </div>
                  </div>

                  {/* Price Comparison Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-50/80 backdrop-blur-sm rounded-xl p-4 border border-slate-100">
                      <div className="text-xs text-slate-500 mb-1 font-medium">Google Retail</div>
                      <div className="text-2xl font-bold text-slate-400 line-through">
                        ${pricing.traditionalCost}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">$7 per mailbox</div>
                    </div>

                    <div className="bg-gradient-to-br from-trust-green-light to-emerald-50/80 backdrop-blur-sm rounded-xl p-4 border border-trust-green/30 shadow-lg shadow-trust-green/10">
                      <div className="text-xs text-trust-green-dark mb-1 font-bold">COLDINFRA</div>
                      <div className="text-2xl font-bold text-trust-green">
                        ${pricing.monthlyCost.toFixed(0)}
                      </div>
                      <div className="text-[10px] text-trust-green-dark mt-0.5 font-medium">
                        ${pricing.pricePerMailbox.toFixed(2)} per mailbox
                      </div>
                    </div>
                  </div>

                  {/* Savings Highlight - Glassmorphic */}
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-trust-green via-emerald-500 to-trust-green-dark p-[1px]">
                    <div className="bg-gradient-to-br from-trust-green/95 to-trust-green-dark/95 backdrop-blur-sm rounded-xl p-5 text-white">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium opacity-90">Monthly Savings</span>
                        <span className="text-2xl font-bold">
                          ${pricing.monthlySavings.toFixed(0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/20">
                        <span className="text-sm font-medium opacity-90">Annual Savings</span>
                        <span className="text-2xl font-bold">
                          ${pricing.annualSavings.toLocaleString()}
                        </span>
                      </div>
                      <div className="pt-3 text-center">
                        <div className="text-xs opacity-90">
                          You save <span className="font-bold text-base">{pricing.savingsPercentage.toFixed(0)}%</span> off Google retail
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calculator CTA */}
                  <Button
                    onClick={handleGetStarted}
                    className="w-full bg-gradient-to-r from-trust-green to-trust-green-dark hover:from-trust-green-dark hover:to-trust-green text-white shadow-lg shadow-trust-green/30 group"
                    size="lg"
                  >
                    <span>Start Saving ${pricing.monthlySavings.toFixed(0)}/month</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-[10px] text-center text-slate-500">
                    Includes setup + DNS configuration + 24/7 support
                  </p>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </Container>
    </Section>
  )
}
