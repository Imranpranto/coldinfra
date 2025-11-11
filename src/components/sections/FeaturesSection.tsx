'use client'

import React from 'react'
import { Container, Section, Grid } from '@/components/ui/Container'
import { FeatureCard } from '@/components/ui/FeatureCard'

export function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: "Expert DNS Configuration That Works",
      description: "Professional SPF, DMARC, DKIM setup optimized to bypass spam filters and land directly in primary inbox. We break all restrictions.",
      badge: "98.7% inbox rate"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      ),
      title: "Affordable Google Workspace Pricing",
      description: "Cut your email costs with Google Workspace at just $2.50/mailbox. No hidden fees, no setup costs, no long-term contracts.",
      badge: "$2.50/mailbox"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: "Zero Technical Hassle Setup",
      description: "We handle all technical complexity: domain registration, DNS configuration, email authentication. You focus on campaigns, we handle infrastructure.",
      badge: "Ready in 10 minutes"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
      title: "Break Spam Filter Restrictions",
      description: "Our DNS experts configure records to bypass Gmail, Outlook, and Yahoo spam filters. Your offers land in primary inbox, not promotions tab.",
      badge: "Primary inbox delivery"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      title: "Complete Technical Support",
      description: "24/7 expert DNS and deliverability support. We monitor, optimize, and fix issues before they impact your campaigns.",
      badge: "24/7 expert support"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      title: "No Vendor Lock-In",
      description: "Full data ownership with one-click export. Bring your own tools or switch providers anytime. Your infrastructure, your control.",
      badge: "Complete freedom"
    }
  ]

  const processSteps = [
    {
      step: "1",
      title: "Expert DNS Configuration",
      description: "We configure SPF, DMARC, DKIM records optimized to bypass spam filters. Professional setup that breaks restrictions and ensures primary inbox delivery.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      step: "2",
      title: "Affordable Google Workspace",
      description: "Professional email accounts at $2.50/mailbox with optimized settings for cold email campaigns. Cut costs without sacrificing deliverability.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      step: "3",
      title: "Zero Technical Hassle",
      description: "We handle domain setup, email warming, and ongoing deliverability monitoring. You focus on campaigns while we ensure 98.7% inbox rate.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    }
  ]

  return (
    <Section id="features" padding="xl">
      <Container>
        <div className="space-y-20">
          {/* Section Header (ScaledMail "Unlock" Pattern) */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Cut Out Technical Hassle
              <span className="block mt-2 bg-gradient-to-r from-trust-green via-primary-mint to-trust-green-dark bg-clip-text text-transparent">
                We Handle Best DNS Setup to Land in Primary Inbox
              </span>
            </h2>
            <p className="text-xl text-text-secondary leading-relaxed">
              Affordable Google Workspace pricing at $2.50/mailbox.
              Professional DNS configuration that breaks all restrictions and lands your offer in clients' primary email.
            </p>
          </div>

          {/* Features Grid */}
          <Grid cols={3} gap="lg" className="mb-20">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                badge={feature.badge}
                className="animate-slide-up"
              />
            ))}
          </Grid>

          {/* Process Section (ScaledMail Pattern with Green) */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-text-primary">
                How We Cut Technical Hassle
                <span className="block mt-2 text-trust-green">
                  3 Steps to Primary Inbox Delivery
                </span>
              </h3>
              <p className="text-lg text-text-secondary">
                From signup to sending in 10 minutes — we handle all DNS complexity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center group">
                  {/* Step Number (Green) */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-trust-green text-white rounded-full flex items-center justify-center text-2xl font-bold group-hover:scale-110 group-hover:bg-trust-green-dark transition-all duration-200">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex justify-center text-trust-green group-hover:text-trust-green-dark transition-colors duration-200">
                      {step.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-primary-navy">
                      {step.title}
                    </h4>
                    <p className="text-professional-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (hidden on last item) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-4 lg:-right-6 text-professional-300">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Section (Green Theme) */}
          <div className="bg-professional-50 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                Why COLDINFRA Cuts Technical Hassle
                <span className="block mt-2 text-trust-green">
                  Best DNS Setup at Affordable Google Workspace Price
                </span>
              </h3>
              <p className="text-lg text-text-secondary">
                We handle complexity so you focus on landing offers in primary inbox
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-professional-200">
                    <th className="text-left py-4 px-6 font-semibold text-primary-navy"></th>
                    <th className="text-center py-4 px-6 font-semibold text-primary-navy">COLDINFRA</th>
                    <th className="text-center py-4 px-6 font-semibold text-professional-600">DIY Setup</th>
                    <th className="text-center py-4 px-6 font-semibold text-professional-600">Other Services</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-professional-200">
                  <tr>
                    <td className="py-4 px-6 font-medium text-primary-navy">Setup Time</td>
                    <td className="py-4 px-6 text-center text-success-green font-semibold">10 minutes</td>
                    <td className="py-4 px-6 text-center text-professional-600">2-4 weeks</td>
                    <td className="py-4 px-6 text-center text-professional-600">3-7 days</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-primary-navy">Technical Expertise Required</td>
                    <td className="py-4 px-6 text-center text-success-green font-semibold">None</td>
                    <td className="py-4 px-6 text-center text-professional-600">Expert level</td>
                    <td className="py-4 px-6 text-center text-professional-600">Intermediate</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-primary-navy">Monthly Cost</td>
                    <td className="py-4 px-6 text-center text-success-green font-semibold">$2.50/mailbox</td>
                    <td className="py-4 px-6 text-center text-professional-600">$15+/mailbox</td>
                    <td className="py-4 px-6 text-center text-professional-600">$8-20/mailbox</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-primary-navy">Deliverability Optimization</td>
                    <td className="py-4 px-6 text-center text-success-green font-semibold">98.7% inbox rate</td>
                    <td className="py-4 px-6 text-center text-professional-600">Variable</td>
                    <td className="py-4 px-6 text-center text-professional-600">85-95%</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-primary-navy">Ongoing Support</td>
                    <td className="py-4 px-6 text-center text-success-green font-semibold">24/7 Expert Support</td>
                    <td className="py-4 px-6 text-center text-professional-600">Self-managed</td>
                    <td className="py-4 px-6 text-center text-professional-600">Business hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}