import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Refund and Cancellation Policy',
  description: 'Learn about COLDINFRA refund and cancellation policy for our services.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function RefundPolicyPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Grid Pattern Overlay - Whole Page */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main id="main-content">
          <Section padding="xl" className="bg-transparent">

            <Container>
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  Refund and Cancellation Policy
                </h1>
                <p className="text-lg text-slate-600">
                  Last Updated: November 13, 2025
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-slate max-w-none">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 p-8 lg:p-12 space-y-8">

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
                    <p className="text-slate-600 leading-relaxed">
                      This Refund and Cancellation Policy explains our policies regarding refunds and cancellations for COLDINFRA services. By purchasing our services, you acknowledge and agree to this policy.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Refund Policy</h2>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                      <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <h3 className="text-lg font-semibold text-amber-900 mb-2">No Refunds Available</h3>
                          <p className="text-amber-800">
                            COLDINFRA does not offer refunds for purchased services. All sales are final.
                          </p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Why We Don't Offer Refunds</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      When you subscribe to COLDINFRA services, we immediately allocate resources and provision your Google Workspace or Microsoft 365 accounts. This process incurs costs that are charged to us immediately for a 30-day period.
                    </p>

                    <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                      <h4 className="font-semibold text-slate-900">Upon subscription, we:</h4>
                      <ul className="list-disc pl-6 text-slate-600 space-y-2">
                        <li>Provision and configure your email accounts</li>
                        <li>Set up DNS records (SPF, DMARC, DKIM)</li>
                        <li>Configure deliverability optimization</li>
                        <li>Pay upfront costs to Google/Microsoft for 30-day account access</li>
                        <li>Allocate technical resources for setup and configuration</li>
                      </ul>
                    </div>

                    <p className="text-slate-600 leading-relaxed mt-4">
                      Because these costs are incurred immediately and services are delivered within minutes of purchase, we cannot offer refunds once the subscription is processed.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Cancellation Policy</h2>

                    <p className="text-slate-600 leading-relaxed mb-4">
                      You may cancel your COLDINFRA subscription at any time. However, to ensure proper processing and avoid being charged for the next billing cycle, you must follow our cancellation notice requirements.
                    </p>

                    <div className="bg-trust-green/10 border border-trust-green/30 rounded-lg p-6 mb-6">
                      <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-trust-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <h3 className="text-lg font-semibold text-trust-green-dark mb-2">2-Day Notice Required</h3>
                          <p className="text-slate-700">
                            To cancel your subscription and avoid being charged for the next billing cycle, you must notify us at least 2 days before your renewal date.
                          </p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">How to Cancel Your Subscription</h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-trust-green rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Contact Support</h4>
                          <p className="text-slate-600">
                            Email us at <a href="mailto:support@coldinfra.com" className="text-trust-green hover:underline">support@coldinfra.com</a> with your cancellation request
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-trust-green rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Provide Account Details</h4>
                          <p className="text-slate-600">
                            Include your account email, subscription plan, and reason for cancellation (optional)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-trust-green rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Receive Confirmation</h4>
                          <p className="text-slate-600">
                            We will send you a confirmation email within 24 hours acknowledging your cancellation request
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-trust-green rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Service Continues Until Period End</h4>
                          <p className="text-slate-600">
                            Your services will remain active until the end of your current billing period
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Important Cancellation Terms</h2>

                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-trust-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="font-semibold text-slate-900">Minimum Notice Period:</span>
                          <span className="text-slate-600"> You must provide at least 2 days notice before your next billing date to avoid being charged for the following cycle.</span>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-trust-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="font-semibold text-slate-900">No Partial Refunds:</span>
                          <span className="text-slate-600"> Cancellations take effect at the end of the current billing period. No partial refunds are provided for unused days.</span>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-trust-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="font-semibold text-slate-900">Continued Access:</span>
                          <span className="text-slate-600"> You will retain full access to your services until the end of your paid period.</span>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-trust-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="font-semibold text-slate-900">Data Retention:</span>
                          <span className="text-slate-600"> After cancellation, your account data will be retained for 30 days, after which it will be permanently deleted.</span>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-trust-green flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="font-semibold text-slate-900">Reactivation:</span>
                          <span className="text-slate-600"> You may reactivate your account within 30 days of cancellation. After 30 days, you will need to create a new account.</span>
                        </div>
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Late Cancellation Charges</h2>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <h3 className="text-lg font-semibold text-red-900 mb-2">Important Notice</h3>
                          <p className="text-red-800">
                            If you cancel your subscription with less than 2 days notice before your renewal date, you will be charged for the next billing cycle. These charges are non-refundable as the resources have already been allocated.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Exceptions</h2>

                    <p className="text-slate-600 leading-relaxed mb-4">
                      COLDINFRA reserves the right to make exceptions to this policy in cases of:
                    </p>

                    <ul className="list-disc pl-6 text-slate-600 space-y-2">
                      <li>Technical issues preventing service delivery within our control</li>
                      <li>Billing errors or duplicate charges</li>
                      <li>Fraudulent transactions</li>
                      <li>Service interruptions exceeding our SLA commitments</li>
                    </ul>

                    <p className="text-slate-600 leading-relaxed mt-4">
                      Any exceptions will be evaluated on a case-by-case basis at our sole discretion.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions About Cancellation</h2>

                    <p className="text-slate-600 leading-relaxed mb-4">
                      If you have questions about canceling your subscription or this policy, please contact us before initiating a cancellation:
                    </p>

                    <div className="mt-4 p-6 bg-slate-50 rounded-lg">
                      <p className="text-slate-900 font-semibold">COLDINFRA Support</p>
                      <p className="text-slate-600">Email: support@coldinfra.com</p>
                      <p className="text-slate-600">Response Time: Within 24 hours</p>
                      <p className="text-slate-600">Website: https://coldinfra.com</p>
                    </div>

                    <p className="text-slate-600 leading-relaxed mt-4 text-sm">
                      Our support team is here to help address any concerns you may have before you decide to cancel your subscription.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Policy Updates</h2>

                    <p className="text-slate-600 leading-relaxed">
                      We reserve the right to modify this Refund and Cancellation Policy at any time. Changes will be effective immediately upon posting with an updated "Last Updated" date. Continued use of our services after changes constitutes acceptance of the modified policy.
                    </p>
                  </section>

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
