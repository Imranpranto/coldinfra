'use client'

import React from 'react'
import { Container, Section } from '@/components/ui/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatsCard } from '@/components/ui/StatsCard'
import { SecurityBadge } from '@/components/ui/SecurityBadge'
import { Check, TrendingUp, Zap, Shield } from 'lucide-react'

export function SocialProofSection() {
  const testimonials = [
    {
      quote: "Cut our email costs by $2,000/month while boosting deliverability by 40%. Setup took 8 minutes—no technical headaches.",
      author: "Sarah Chen",
      company: "TechStartup Inc.",
      title: "Head of Growth",
      image: "/testimonials/sarah-chen.jpg",
      results: "+40% deliverability",
      metric: "40%"
    },
    {
      quote: "Our inbox placement jumped from 60% to 95% in week one. Finally, a service that actually understands cold email infrastructure.",
      author: "Michael Rodriguez",
      company: "SalesFlow",
      title: "VP of Sales",
      image: "/testimonials/michael-rodriguez.jpg",
      results: "95% inbox rate",
      metric: "95%"
    },
    {
      quote: "They handle DNS, SPF, DMARC, warming—everything. Our team focuses on campaigns, not infrastructure. Game-changer.",
      author: "Emily Watson",
      company: "GrowthAgency",
      title: "Founder",
      image: "/testimonials/emily-watson.jpg",
      results: "10x faster setup",
      metric: "10x"
    }
  ]

  const companyLogos = [
    { name: "TechCorp", logo: "/logos/techcorp.svg" },
    { name: "GrowthLab", logo: "/logos/growthlab.svg" },
    { name: "SalesForce", logo: "/logos/salesforce.svg" },
    { name: "MarketingPro", logo: "/logos/marketingpro.svg" },
    { name: "EmailMaster", logo: "/logos/emailmaster.svg" },
    { name: "ScaleUp", logo: "/logos/scaleup.svg" }
  ]

  const stats = [
    {
      number: "14,000+",
      label: "Mailboxes Served",
      description: "Professional email accounts configured and optimized"
    },
    {
      number: "6,000+",
      label: "Domains Configured",
      description: "Complete DNS and authentication setup"
    },
    {
      number: "98.7%",
      label: "Average Delivery Rate",
      description: "Consistent inbox placement across campaigns"
    },
    {
      number: "4.9/5",
      label: "Customer Rating",
      description: "Based on 247+ verified reviews"
    }
  ]

  return (
    <Section background="gray" padding="xl">
      <Container>
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-navy">
              Trusted by 6,000+ Growing Businesses
            </h2>
            <p className="text-xl text-professional-600 max-w-3xl mx-auto">
              Join thousands of companies that have improved their email deliverability 
              and reduced infrastructure costs with COLDINFRA
            </p>
          </div>

          {/* Customer Logos */}
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-sm text-professional-600 font-medium uppercase tracking-wider">
                Trusted by companies like
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 hover:opacity-80 transition-opacity duration-300">
              {companyLogos.map((company) => (
                <div key={company.name} className="h-12 w-24 bg-professional-300 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-professional-600">{company.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Statistics */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-professional-200">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-navy mb-4">
                Proven Results Across 14,000+ Mailboxes
              </h3>
              <p className="text-lg text-professional-600">
                Real performance metrics from our customer base
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  number={stat.number}
                  label={stat.label}
                  description={stat.description}
                  className="border-r border-professional-200 last:border-r-0 lg:last:border-r-0"
                />
              ))}
            </div>
          </div>

          {/* Customer Testimonials */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-navy mb-4">
                What Our Customers Say
              </h3>
              <p className="text-lg text-professional-600">
                Real results from real customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="h-full">
                  <div className="flex flex-col h-full space-y-6">
                    {/* Rating Stars */}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-trust-green fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-professional-600 leading-relaxed flex-grow">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Results Badge */}
                    <div className="flex justify-center">
                      <span className="guarantee-badge">
                        {testimonial.results}
                      </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-professional-200">
                      <div className="w-12 h-12 bg-professional-200 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-professional-600">
                          {testimonial.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-primary-navy">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-professional-600">
                          {testimonial.title}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-professional-200">
            <div className="text-center space-y-8">
              <h3 className="text-xl font-bold text-primary-navy">
                Enterprise-Grade Security & Compliance
              </h3>
              
              <div className="flex flex-wrap items-center justify-center gap-6">
                <SecurityBadge type="soc2" />
                <SecurityBadge type="gdpr" />
                <SecurityBadge type="ssl" />
                <SecurityBadge type="uptime" />
                <SecurityBadge type="money-back" />
              </div>
              
              <div className="text-sm text-professional-600 max-w-2xl mx-auto">
                Your data is protected with enterprise-grade security measures. 
                We maintain SOC 2 Type II compliance and follow GDPR data protection standards.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}