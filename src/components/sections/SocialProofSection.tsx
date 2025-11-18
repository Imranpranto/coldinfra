'use client'

import React from 'react'
import { Container, Section } from '@/components/ui/Container'
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
      number: "14K+",
      label: "Active Mailboxes",
      description: "Configured and warmed daily"
    },
    {
      number: "6K+",
      label: "Domains Live",
      description: "Full DNS authentication"
    },
    {
      number: "98.7%",
      label: "Inbox Rate",
      description: "Average across all campaigns"
    },
    {
      number: "8 min",
      label: "Setup Time",
      description: "From signup to sending"
    }
  ]

  return (
    <Section background="default" padding="xl" className="relative overflow-hidden">
      {/* Clean Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/30" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Container className="relative z-10">
        <div className="space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 rounded-full mb-2">
              <div className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-trust-green">6,000+ Active Users</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Built for Teams That Move Fast
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From solo founders to enterprise sales teams—scale your cold email infrastructure
              without the complexity or cost of managing it yourself
            </p>
          </div>

          {/* Customer Logos */}
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                Trusted by leading companies
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center justify-items-center">
              {companyLogos.map((company) => (
                <div
                  key={company.name}
                  className="group relative h-14 sm:h-16 w-28 sm:w-32 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 flex items-center justify-center hover:bg-white hover:border-trust-green/30 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-400 group-hover:text-slate-700 transition-colors duration-300">{company.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Statistics - Glass Morphism Design */}
          <div className="relative group">
            {/* Glass Card with Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-trust-green/20 via-primary-teal/20 to-trust-green/20 rounded-[32px] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

            <div className="relative bg-white/80 backdrop-blur-2xl rounded-[32px] p-8 lg:p-12 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 rounded-full mb-4">
                  <TrendingUp className="w-5 h-5 text-trust-green" />
                  <span className="text-sm font-semibold text-trust-green">Live Metrics</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                  The Numbers Speak for Themselves
                </h3>
                <p className="text-lg text-slate-600">
                  Real-time performance across our entire network
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50/50 to-white/50 border border-slate-100/50 hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-trust-green to-primary-teal bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 mb-2">
                      {stat.label}
                    </div>
                    <div className="text-xs text-slate-600">
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Testimonials - Modern Card Design */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-teal/10 rounded-full mb-4">
                <Check className="w-5 h-5 text-primary-teal" />
                <span className="text-sm font-semibold text-primary-teal">Success Stories</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                See Why Teams Switch to COLDINFRA
              </h3>
              <p className="text-lg text-slate-600">
                Real impact on deliverability, costs, and team productivity
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="relative group h-full">
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-trust-green/20 to-primary-teal/20 rounded-[24px] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                  {/* Glass Card */}
                  <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-[24px] p-6 sm:p-8 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:shadow-[0_12px_48px_0_rgba(31,38,135,0.2)] transition-all duration-500">
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
                      <blockquote className="text-slate-600 leading-relaxed flex-grow text-[15px]">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Metric Badge - Highlighted */}
                      <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-trust-green/20 to-primary-teal/20 rounded-full border border-trust-green/30">
                          <Zap className="w-4 h-4 text-trust-green" />
                          <span className="text-sm font-bold bg-gradient-to-r from-trust-green to-primary-teal bg-clip-text text-transparent">
                            {testimonial.results}
                          </span>
                        </div>
                      </div>

                      {/* Author */}
                      <div className="flex items-center space-x-4 pt-4 border-t border-slate-200/50">
                        <div className="w-12 h-12 bg-gradient-to-br from-trust-green/20 to-primary-teal/20 rounded-full flex items-center justify-center border border-trust-green/30">
                          <span className="text-lg font-semibold text-primary-teal">
                            {testimonial.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            {testimonial.author}
                          </div>
                          <div className="text-sm text-slate-600">
                            {testimonial.title}, {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators - Glass Morphism Design */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/20 via-trust-green/20 to-primary-teal/20 rounded-[32px] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

            <div className="relative bg-white/80 backdrop-blur-2xl rounded-[32px] p-8 lg:p-10 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
              <div className="text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-teal/10 rounded-full mb-2">
                  <Shield className="w-5 h-5 text-primary-teal" />
                  <span className="text-sm font-semibold text-primary-teal">Security & Trust</span>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold text-slate-900">
                  Enterprise-Grade Security & Compliance
                </h3>

                <div className="flex flex-wrap items-center justify-center gap-6">
                  <SecurityBadge type="soc2" />
                  <SecurityBadge type="gdpr" />
                  <SecurityBadge type="ssl" />
                  <SecurityBadge type="uptime" />
                  <SecurityBadge type="money-back" />
                </div>

                <div className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Your data is protected with enterprise-grade security measures.
                  We maintain SOC 2 Type II compliance and follow GDPR data protection standards.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}