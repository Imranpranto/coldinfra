'use client'

import React, { useState } from 'react'
import { Container, Section } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PricingCard } from '@/components/ui/PricingCard'
import { SecurityBadge } from '@/components/ui/SecurityBadge'
import { trackEvent } from '@/lib/utils'

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const handlePlanSelect = (planName: string, price: string) => {
    trackEvent('pricing_plan_select', {
      plan_name: planName,
      price: price,
      billing_cycle: billingCycle
    })
    // Handle plan selection
  }

  const plans = [
    {
      title: "Starter",
      price: billingCycle === 'monthly' ? "$25" : "$250",
      originalPrice: billingCycle === 'annual' ? "$300" : null,
      period: billingCycle === 'monthly' ? "/month" : "/year",
      description: "Perfect for small teams getting started with cold email",
      features: [
        "Up to 10 mailboxes ($2.50 each)",
        "Complete Google Workspace setup",
        "SPF, DMARC, DKIM configuration",
        "Basic email warming strategy",
        "Access to 13 free tools",
        "Email support",
        "30-day money-back guarantee"
      ],
      ctaText: "Start Free Trial",
      featured: false
    },
    {
      title: "Growth",
      price: billingCycle === 'monthly' ? "$125" : "$1,250",
      originalPrice: billingCycle === 'annual' ? "$1,500" : null,
      period: billingCycle === 'monthly' ? "/month" : "/year",
      description: "Most popular plan for growing sales teams",
      features: [
        "Up to 50 mailboxes ($2.50 each)",
        "Complete Google Workspace setup",
        "Advanced authentication setup",
        "Premium warming strategies",
        "Priority email & chat support",
        "Custom domain recommendations",
        "Advanced deliverability monitoring",
        "One-click export functionality",
        "Integration support"
      ],
      ctaText: "Start Free Trial",
      featured: true,
      badge: "Most Popular"
    },
    {
      title: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with complex requirements",
      features: [
        "Unlimited mailboxes",
        "White-glove setup service",
        "Dedicated account manager",
        "Custom authentication setup",
        "Enterprise-grade security",
        "Priority phone support",
        "Custom integration development",
        "SLA guarantees",
        "Training & onboarding",
        "Bulk domain management"
      ],
      ctaText: "Contact Sales",
      featured: false
    }
  ]

  const faqs = [
    {
      question: "How do you achieve $2.50/mailbox Google Workspace pricing?",
      answer: "We eliminate technical hassle through expert DNS configuration and bulk Google Workspace management. No middleman markup — just affordable professional email infrastructure."
    },
    {
      question: "What DNS setup do you handle to break spam restrictions?",
      answer: "We configure professional SPF, DMARC, DKIM records optimized to bypass Gmail, Outlook, Yahoo filters. Our setup ensures 98.7% primary inbox delivery, not promotions tab."
    },
    {
      question: "How quickly can I start landing in primary inbox?",
      answer: "Infrastructure ready in 10 minutes with expert DNS configuration. We recommend 24-48 hour warming for optimal primary inbox delivery at 98.7% rate."
    },
    {
      question: "What if I'm not satisfied with deliverability?",
      answer: "30-day money-back guarantee. If our DNS setup doesn't achieve primary inbox delivery, we refund your full payment. No technical hassle, no risk."
    },
    {
      question: "Do you provide ongoing DNS and deliverability support?",
      answer: "Yes, 24/7 expert DNS support included. We monitor, optimize, and fix deliverability issues before they impact your campaigns. Zero technical hassle."
    }
  ]

  return (
    <Section id="pricing" background="gray" padding="xl">
      <Container>
        <div className="space-y-16">
          {/* Section Header (ScaledMail Pattern) */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Affordable Google Workspace Pricing
              <span className="block mt-2 bg-gradient-to-r from-trust-green via-primary-mint to-trust-green-dark bg-clip-text text-transparent">
                Cut Email Costs to $2.50/Mailbox
              </span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              No hidden fees, no setup costs, no technical hassle.
              Professional DNS setup included at the best Google Workspace price.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={billingCycle === 'monthly' ? 'text-primary-navy font-semibold' : 'text-professional-600'}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-professional-200 transition-colors focus:outline-none focus:ring-2 focus:ring-trust-green focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={billingCycle === 'annual' ? 'text-primary-navy font-semibold' : 'text-professional-600'}>
                Annual
                <span className="ml-2 text-sm text-success-green font-medium">(Save 17%)</span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
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

          {/* ROI Calculator Section */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-professional-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-navy mb-4">
                Calculate Your Savings
              </h3>
              <p className="text-lg text-professional-600">
                See how much you can save compared to traditional solutions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Calculator */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-primary-navy">
                    Number of mailboxes needed
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue="20"
                    className="w-full h-2 bg-professional-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-professional-600">
                    <span>1</span>
                    <span className="font-semibold">20 mailboxes</span>
                    <span>100+</span>
                  </div>
                </div>

                <div className="bg-professional-50 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-professional-600">COLDINFRA (Monthly)</span>
                    <span className="text-2xl font-bold text-success-green">$50/month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-professional-600">Traditional Solution</span>
                    <span className="text-2xl font-bold text-professional-600">$300/month</span>
                  </div>
                  <div className="border-t border-professional-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary-navy">Monthly Savings</span>
                      <span className="text-2xl font-bold text-success-green">$250</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary-navy">Annual Savings</span>
                      <span className="text-2xl font-bold text-success-green">$3,000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-primary-navy">
                  What you get with COLDINFRA:
                </h4>
                <ul className="space-y-3">
                  {[
                    "83% cost reduction vs. traditional solutions",
                    "10-minute setup vs. weeks of configuration",
                    "98.7% deliverability vs. variable results",
                    "24/7 expert support vs. DIY troubleshooting",
                    "One-click export vs. vendor lock-in"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-success-green mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-professional-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center space-y-8">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <SecurityBadge type="money-back" />
              <SecurityBadge type="ssl" />
              <SecurityBadge type="uptime" />
            </div>
            
            <p className="text-sm text-professional-600 max-w-2xl mx-auto">
              All plans include our 30-day money-back guarantee, 99.9% uptime SLA, 
              and enterprise-grade security. Cancel anytime with one-click data export.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-navy mb-4">
                Frequently Asked Questions
              </h3>
              <p className="text-lg text-professional-600">
                Everything you need to know about our pricing and service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-professional-200">
                  <h4 className="text-lg font-semibold text-primary-navy mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-professional-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA (Green Theme) */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-text-primary">
              Ready to Cut Technical Hassle?
            </h3>
            <p className="text-lg text-text-secondary">
              Join 6,000+ businesses landing in primary inbox with our expert DNS setup
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => handlePlanSelect('Growth', '$125')}
                className="bg-trust-green hover:bg-trust-green-dark text-white group px-8 py-6 text-lg"
              >
                Start Free Trial
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
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}