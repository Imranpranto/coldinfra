'use client'

import React, { useState } from 'react'
import { Container, Section } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { FAQSchema } from '@/components/StructuredData'

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How quickly can I get started with COLDINFRA?",
          answer: "Your complete email infrastructure will be ready in approximately 10 minutes after signup. This includes Google Workspace setup, domain configuration, and email authentication. We recommend a 24-48 hour warming period for optimal deliverability before starting large campaigns."
        },
        {
          question: "What technical knowledge do I need?",
          answer: "None at all. COLDINFRA is designed for non-technical users. Our team handles all the complex DNS configurations, email authentication setup, and technical optimizations. You simply provide your domain preferences and we take care of everything else."
        },
        {
          question: "Can I use my existing domains?",
          answer: "Yes, you can use existing domains or we can help you acquire new ones. We'll audit your current domains for deliverability potential and provide recommendations. For maximum effectiveness, we often suggest dedicated domains for cold email campaigns."
        },
        {
          question: "What if I already have Google Workspace?",
          answer: "We can work with your existing Google Workspace setup or create new optimized accounts. Our team will assess your current configuration and recommend the best approach for cold email deliverability while maintaining your existing business email setup."
        }
      ]
    },
    {
      title: "Pricing & Plans",
      faqs: [
        {
          question: "Are there any hidden fees or setup costs?",
          answer: "No hidden fees whatsoever. Our pricing is completely transparent at $2.50 per mailbox per month. This includes setup, configuration, ongoing support, and access to all 13 tools. The only additional cost might be domain registration if you need new domains."
        },
        {
          question: "Can I change plans or cancel anytime?",
          answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. There are no long-term contracts or cancellation fees. If you cancel, you retain full access to your data with our one-click export feature."
        },
        {
          question: "Do you offer volume discounts?",
          answer: "Enterprise customers with 100+ mailboxes receive custom pricing with additional volume discounts. Contact our sales team for a personalized quote that can include dedicated account management and custom SLAs."
        },
        {
          question: "What's included in the 30-day money-back guarantee?",
          answer: "If you're not completely satisfied within 30 days, we'll refund your full payment. This gives you risk-free time to test our service and see the deliverability improvements firsthand."
        }
      ]
    },
    {
      title: "Technical & Deliverability",
      faqs: [
        {
          question: "How do you achieve 98.7% deliverability rates?",
          answer: "We use a combination of optimal domain configuration, proper email authentication (SPF, DMARC, DKIM), strategic IP warming, reputation monitoring, and ongoing deliverability optimization. Our team continuously monitors and adjusts configurations based on the latest best practices."
        },
        {
          question: "What email authentication do you set up?",
          answer: "We configure complete email authentication including SPF records, DMARC policies, DKIM signatures, and additional deliverability optimizations. All authentication is properly configured for your specific domains and sending patterns."
        },
        {
          question: "How do you handle email warming?",
          answer: "We implement strategic warming sequences that gradually increase sending volume while maintaining engagement metrics. This includes automated warm-up campaigns, reputation building, and ongoing monitoring to ensure optimal deliverability."
        },
        {
          question: "Can I monitor my deliverability metrics?",
          answer: "Yes, you'll have access to detailed deliverability analytics including inbox placement rates, spam folder rates, bounce rates, and reputation scores. We provide regular reports and recommendations for ongoing optimization."
        }
      ]
    },
    {
      title: "Support & Security",
      faqs: [
        {
          question: "What level of support do you provide?",
          answer: "All plans include email support with responses within 24 hours. Growth and Enterprise plans include priority support with faster response times. Enterprise customers also get dedicated account managers and phone support."
        },
        {
          question: "Is my data secure with COLDINFRA?",
          answer: "Yes, we maintain enterprise-grade security with SOC 2 Type II compliance, GDPR compliance, and industry-standard encryption. Your data is protected with the same security measures used by Fortune 500 companies."
        },
        {
          question: "What happens to my data if I leave?",
          answer: "You maintain full ownership of your data. Our one-click export feature allows you to download all configurations, settings, and data in standard formats. There's no vendor lock-in, and we'll assist with migration if needed."
        },
        {
          question: "Do you provide training or onboarding?",
          answer: "Yes, we provide comprehensive onboarding for all customers and specialized training for Enterprise clients. This includes best practices guidance, campaign optimization tips, and ongoing support to maximize your success."
        }
      ]
    }
  ]

  const allFAQs = faqCategories.flatMap(category => category.faqs)

  return (
    <Section background="gray" padding="xl">
      <Container>
        <div className="space-y-12">
          {/* Section Header (Green Theme) */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
              Questions About DNS Setup & Affordability
              <span className="block mt-2 text-trust-green">
                Expert Answers on Primary Inbox Delivery
              </span>
            </h2>
            <p className="text-xl text-text-secondary">
              Everything about cutting technical hassle with $2.50/mailbox Google Workspace
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                {/* Category Header */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-professional-200">
                  <h3 className="text-xl font-semibold text-primary-navy flex items-center">
                    <span className="w-8 h-8 bg-trust-green text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {categoryIndex + 1}
                    </span>
                    {category.title}
                  </h3>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = faqCategories
                      .slice(0, categoryIndex)
                      .reduce((acc, cat) => acc + cat.faqs.length, 0) + faqIndex
                    
                    return (
                      <div
                        key={faqIndex}
                        className="bg-white rounded-lg shadow-sm border border-professional-200 overflow-hidden"
                      >
                        <button
                          className="w-full text-left p-6 hover:bg-professional-50 transition-colors duration-200"
                          onClick={() => setOpenFAQ(openFAQ === globalIndex ? null : globalIndex)}
                          aria-expanded={openFAQ === globalIndex}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-primary-navy pr-4">
                              {faq.question}
                            </h4>
                            <svg
                              className={cn(
                                "w-5 h-5 text-trust-green transition-transform duration-200 flex-shrink-0",
                                openFAQ === globalIndex ? "transform rotate-180" : ""
                              )}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        
                        {openFAQ === globalIndex && (
                          <div className="px-6 pb-6 animate-slide-down">
                            <div className="border-t border-professional-200 pt-4">
                              <p className="text-professional-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions Section (Green Theme) */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 text-center shadow-lg border border-success-green/20">
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-trust-green rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  Need DNS Setup Help?
                </h3>
                <p className="text-lg text-text-secondary">
                  Our DNS experts are here 24/7 to help you land in primary inbox.
                  Get answers about breaking spam restrictions and cutting technical hassle.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:support@coldinfra.com"
                  className="inline-flex items-center px-6 py-3 bg-trust-green text-white font-semibold rounded-lg hover:bg-trust-green-dark transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Email DNS Experts
                </a>

                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-white text-trust-green font-semibold rounded-lg border-2 border-trust-green hover:bg-trust-green hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  Live Chat
                </a>
              </div>

              <p className="text-sm text-text-secondary">
                Average response time: <strong>2 hours</strong> • DNS experts available 24/7
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* FAQ Schema for SEO */}
      <FAQSchema faqs={allFAQs} />
    </Section>
  )
}