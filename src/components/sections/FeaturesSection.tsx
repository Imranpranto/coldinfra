'use client'

import React from 'react'
import { Container, Section } from '@/components/ui/Container'

export function FeaturesSection() {
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
    <Section id="features" padding="xl" className="relative overflow-hidden">
      {/* Clean Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/30" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Container className="relative z-10">
        <div className="space-y-20">
          {/* Process Section */}
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 rounded-full mb-2">
                <span className="text-sm font-semibold text-trust-green">Simple Process</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900">
                How It Works
                <span className="block mt-2 text-trust-green">
                  Three Simple Steps
                </span>
              </h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We handle all the technical complexity—DNS, authentication, warming, and monitoring
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-16 lg:space-y-24">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Layout with Large Number */}
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* Large Step Number */}
                    <div className="flex-shrink-0">
                      <div className="text-[120px] lg:text-[140px] font-black leading-none bg-gradient-to-br from-trust-green/20 to-primary-teal/20 bg-clip-text text-transparent select-none">
                        0{step.step}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 lg:pt-8">
                      <div className="relative group">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-trust-green/20 to-primary-teal/20 rounded-[24px] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                        {/* White Card */}
                        <div className="relative bg-white rounded-[24px] p-8 lg:p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:shadow-[0_12px_48px_0_rgba(31,38,135,0.15)] transition-all duration-500">
                          <div className="space-y-6">
                            {/* Title */}
                            <h4 className="text-2xl lg:text-3xl font-bold text-slate-900">
                              {step.title}
                            </h4>

                            {/* Description */}
                            <p className="text-slate-600 leading-relaxed text-lg">
                              {step.description}
                            </p>

                            {/* Get Started Button */}
                            <div className="pt-2">
                              <button className="inline-flex items-center gap-2 px-6 py-3 bg-trust-green hover:bg-trust-green-dark text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                                <span>Get Started</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Icon Badge - Positioned on card */}
                          <div className="absolute -top-6 -right-6 lg:-right-8">
                            <div className="relative group/icon">
                              <div className="absolute inset-0 bg-gradient-to-br from-trust-green to-primary-teal rounded-2xl blur-md opacity-40" />
                              <div className="relative w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center text-trust-green group-hover/icon:scale-110 transition-transform duration-300">
                                {step.icon}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vertical Connecting Line (only between steps) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute left-[70px] top-[180px] w-1 h-24 bg-gradient-to-b from-trust-green/30 to-primary-teal/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}