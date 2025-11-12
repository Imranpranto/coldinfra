'use client'

import React, { useState } from 'react'
import { Container, Section } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { FAQSchema } from '@/components/StructuredData'

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const faqs = [
    {
      question: "What sending tools do you integrate with?",
      answer: "We integrate with all major email sequencers including Instantly, Smartlead, Lemlist, Email Bison, Reachinbox, and more. Our Google Workspace setup works seamlessly with your preferred cold email tools."
    },
    {
      question: "Are domains included in the package, or do I need to buy them myself?",
      answer: "Domains are not included in the package. You need to purchase domains separately. We can guide you on the best domain providers and help with the setup process."
    },
    {
      question: "Can I use domains I've previously used, or do I need new ones?",
      answer: "We strongly recommend using new domains for cold email campaigns. Previously used domains may have existing reputation issues that could affect deliverability. Fresh domains allow us to build optimal sender reputation from the ground up."
    },
    {
      question: "Does COLDINFRA offer Google and Microsoft accounts?",
      answer: "Yes, we offer both Google Workspace and Microsoft 365 accounts. Our expert team handles the complete setup and configuration for either platform based on your preference."
    }
  ]

  return (
    <Section background="default" padding="xl" className="relative overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/30" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Container className="relative z-10">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 rounded-full mb-2">
              <div className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-trust-green">FAQ</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to know about our service
            </p>
          </div>

          {/* FAQ Items - Modern Single Column */}
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="relative group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-trust-green/10 via-primary-teal/10 to-trust-green/10 rounded-[24px] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Glass Card */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-[24px] border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] overflow-hidden">
                  <button
                    className="w-full text-left p-6 hover:bg-slate-50/50 transition-colors duration-200"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    aria-expanded={openFAQ === index}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-lg font-semibold text-slate-900">
                        {faq.question}
                      </h4>
                      <svg
                        className={cn(
                          "w-5 h-5 text-trust-green transition-transform duration-300 flex-shrink-0",
                          openFAQ === index ? "transform rotate-180" : ""
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {openFAQ === index && (
                    <div className="px-6 pb-6 animate-slide-down">
                      <div className="border-t border-slate-200/50 pt-4">
                        <p className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions Section */}
          <div className="relative group max-w-3xl mx-auto">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-trust-green/20 via-primary-teal/20 to-trust-green/20 rounded-[32px] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

            {/* Glass Card */}
            <div className="relative bg-white/80 backdrop-blur-2xl rounded-[32px] p-8 lg:p-12 text-center border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-trust-green rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Still Have Questions?
                  </h3>
                  <p className="text-lg text-slate-600">
                    Our team is here to help you get started with COLDINFRA
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="mailto:support@coldinfra.com"
                    className="inline-flex items-center px-6 py-3 bg-trust-green text-white font-semibold rounded-xl hover:bg-trust-green-dark transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* FAQ Schema for SEO */}
      <FAQSchema faqs={faqs} />
    </Section>
  )
}