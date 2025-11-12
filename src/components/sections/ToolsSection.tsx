'use client'

import React from 'react'
import { Container, Section, Grid } from '@/components/ui/Container'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { trackEvent } from '@/lib/utils'

export function ToolsSection() {
  const handleToolClick = (toolName: string) => {
    trackEvent('tool_click', {
      tool_name: toolName,
      section: 'tools_showcase'
    })
  }

  const tools = [
    {
      name: "Cold Email ROI Calculator",
      description: "Calculate expected returns, conversion rates, and revenue from your cold email campaigns.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      ),
      category: "Analytics",
      popular: true
    },
    {
      name: "DMARC Record Generator",
      description: "Generate DMARC DNS records for email authentication and security with policy configuration.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      ),
      category: "Security",
      popular: false
    },
    {
      name: "Email Cost Calculator",
      description: "Compare costs across different email infrastructure providers and calculate savings.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      category: "Finance",
      popular: true
    },
    {
      name: "Domain Generator",
      description: "Generate professional domain name suggestions optimized for cold email campaigns.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      category: "Domains",
      popular: false
    },
    {
      name: "SPF Record Generator",
      description: "Create SPF DNS records for email authentication and deliverability optimization.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      category: "Security",
      popular: false
    },
    {
      name: "Email Volume Calculator",
      description: "Calculate optimal sending volumes and schedule for your email campaigns.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      category: "Analytics",
      popular: true
    },
    {
      name: "Sales Pipeline Calculator",
      description: "Calculate conversion rates, pipeline velocity, and sales forecasting metrics.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
          <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v-1z" />
        </svg>
      ),
      category: "Sales",
      popular: false
    },
    {
      name: "Email Signature Generator",
      description: "Create professional email signatures with contact information and branding.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
        </svg>
      ),
      category: "Branding",
      popular: false
    },
    {
      name: "Deliverability Analyzer",
      description: "Analyze your email setup and get recommendations for improved deliverability.",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45.75a2.5 2.5 0 00-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1-4a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      category: "Analytics",
      popular: true
    }
  ]

  return (
    <Section id="tools" padding="xl">
      <Container>
        <div className="space-y-16">
          {/* Section Header (Green Theme) */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Professional Tools to Cut Technical Hassle
              <span className="block mt-2 text-trust-green">
                13 Free DNS & Email Tools Included
              </span>
            </h2>
            <p className="text-xl text-text-secondary leading-relaxed">
              Optimize DNS setup, calculate savings, and ensure primary inbox delivery.
              All tools free with affordable $2.50/mailbox pricing.
            </p>
          </div>

          {/* Tools Grid */}
          <Grid cols={3} gap="lg">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="group animate-slide-up hover:shadow-lg hover:border-trust-green/30 transition-all duration-300"
              >
                <CardContent className="space-y-4 p-6">
                  {/* Tool Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-trust-green group-hover:text-trust-green-dark transition-colors duration-200">
                        {tool.icon}
                      </div>
                      <Badge variant={tool.category === 'Security' ? 'secondary' : 'default'}>
                        {tool.category}
                      </Badge>
                    </div>
                    {tool.popular && (
                      <Badge className="bg-trust-green/10 text-trust-green border-trust-green/20">
                        Popular
                      </Badge>
                    )}
                  </div>

                  {/* Tool Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-primary-navy group-hover:text-trust-green transition-colors duration-200">
                      {tool.name}
                    </h3>
                    <p className="text-professional-600 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* Tool CTA */}
                  <div className="pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToolClick(tool.name)}
                      className="w-full group-hover:bg-trust-green group-hover:text-white transition-all duration-200"
                    >
                      Try Tool
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </div>
      </Container>
    </Section>
  )
}