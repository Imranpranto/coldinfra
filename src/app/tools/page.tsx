'use client'

import React from 'react'
import Link from 'next/link'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { trackEvent } from '@/lib/utils'

export default function ToolsPage() {
  const handleToolClick = (toolName: string, href: string) => {
    trackEvent('tool_click', {
      tool_name: toolName,
      section: 'tools_page',
      destination: href
    })
  }

  const tools = [
    {
      name: "Cold Email ROI Calculator",
      description: "Calculate expected returns, conversion rates, and revenue from your cold email campaigns with precision metrics.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      ),
      category: "Analytics",
      popular: true,
      href: "/tools/roi-calculator",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "DNS Record Generator",
      description: "Generate complete DNS records (MX, SPF, DMARC, DKIM) for any email provider - Google Workspace, Microsoft 365, Zoho, and more.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      category: "Email",
      popular: true,
      href: "/tools/dns-record-generator",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "DMARC Record Generator",
      description: "Generate DMARC DNS records for email authentication and security with advanced policy configuration options.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      ),
      category: "Security",
      popular: false,
      href: "/tools/dmarc-generator",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      name: "Email Cost Calculator",
      description: "Compare costs across different email infrastructure providers and calculate your potential savings instantly.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      category: "Finance",
      popular: true,
      href: "/tools/cost-calculator",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      name: "Domain Generator",
      description: "Generate professional domain name suggestions optimized for cold email campaigns and brand recognition.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
        </svg>
      ),
      category: "Domains",
      popular: false,
      href: "/tools/domain-generator",
      gradient: "from-orange-500 to-red-500"
    },
    {
      name: "SPF Record Generator",
      description: "Create SPF DNS records for email authentication and deliverability optimization with proper syntax validation.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      category: "Security",
      popular: false,
      href: "/tools/spf-generator",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      name: "Email Volume Calculator",
      description: "Calculate optimal sending volumes and schedule for your email campaigns to maximize deliverability rates.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      category: "Analytics",
      popular: true,
      href: "/tools/email-volume-calculator",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      name: "Username Generator",
      description: "Generate professional email addresses from full names with multiple pattern variations for your team.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      category: "Email",
      popular: false,
      href: "/tools/email-generator",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      name: "Sales Compensation Calculator",
      description: "Design and analyze sales compensation plans with OTE calculations and pay mix optimization.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      ),
      category: "Sales",
      popular: false,
      href: "/tools/compensation-calculator",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      name: "Sales Forecasting Calculator",
      description: "Forecast future sales revenue based on pipeline metrics and growth trends with confidence levels.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
      category: "Sales",
      popular: false,
      href: "/tools/forecasting-calculator",
      gradient: "from-violet-500 to-purple-500"
    }
  ]

  const categories = Array.from(new Set(tools.map(tool => tool.category)))

  return (
    <div className="relative min-h-screen bg-white">
      {/* Grid Pattern Overlay - Whole Page */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main id="main-content">
          {/* Hero Section */}
          <Section padding="xl" className="bg-transparent">

          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 backdrop-blur-sm rounded-full border border-trust-green/20">
                <div className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-trust-green">9 Free Tools</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900">
                Professional Tools for<br />
                <span className="bg-gradient-to-r from-trust-green to-primary-teal bg-clip-text text-transparent">
                  Cold Email Success
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                Access our complete suite of free tools to optimize your cold email infrastructure. Calculate ROI, generate DNS records, analyze deliverability, and more – all included at $2.50/mailbox.
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-sm text-slate-600">Free to Use</div>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">9+</div>
                  <div className="text-sm text-slate-600">Tools Available</div>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">$0</div>
                  <div className="text-sm text-slate-600">Extra Cost</div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Category Filter - Optional for future */}
        <Section padding="sm" className="bg-transparent">
          <Container>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button className="px-5 py-2 bg-trust-green text-white rounded-full text-sm font-medium hover:bg-trust-green-dark transition-colors duration-200">
                All Tools
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="px-5 py-2 bg-white text-slate-600 rounded-full text-sm font-medium border border-slate-200 hover:border-trust-green hover:text-trust-green transition-all duration-200"
                >
                  {category}
                </button>
              ))}
            </div>
          </Container>
        </Section>

        {/* Tools Grid */}
        <Section padding="xl" className="bg-transparent">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {tools.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.href}
                  onClick={() => handleToolClick(tool.name, tool.href)}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-[24px] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />

                  {/* Card */}
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-[24px] border border-slate-200/50 p-8 hover:border-trust-green/30 hover:shadow-xl transition-all duration-300 h-full">
                    {/* Popular Badge */}
                    {tool.popular && (
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 bg-trust-green/10 text-trust-green text-xs font-semibold rounded-full border border-trust-green/20">
                          Popular
                        </div>
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                      {tool.icon}
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      {/* Category */}
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                        <span className="text-xs font-medium text-slate-600">{tool.category}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-trust-green transition-colors duration-200">
                        {tool.name}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {tool.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center gap-2 text-trust-green font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                      <span>Try Tool</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section padding="xl" className="bg-transparent">
          <Container>
            <div className="relative overflow-hidden rounded-[32px]">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-trust-green via-primary-teal to-trust-green-dark" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Content */}
              <div className="relative z-10 text-center py-16 px-8 lg:py-20 lg:px-12">
                <div className="max-w-3xl mx-auto space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white">
                    All Tools Included at $2.50/Mailbox
                  </h2>
                  <p className="text-xl text-white/90 leading-relaxed">
                    Get access to all 9 professional tools plus expert Google Workspace setup, DNS configuration, and deliverability optimization. No additional costs, no hidden fees.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <a
                      href="/#pricing"
                      className="inline-flex items-center px-8 py-4 bg-white text-trust-green font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      View Pricing
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border-2 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
                    >
                      Contact Sales
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
