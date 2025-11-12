import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using COLDINFRA services.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main id="main-content">
        <Section background="default" padding="xl" className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/30" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  Terms of Service
                </h1>
                <p className="text-lg text-slate-600">
                  Last Updated: November 13, 2025
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-slate max-w-none">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 p-8 lg:p-12 space-y-8">

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
                    <p className="text-slate-600 leading-relaxed">
                      By accessing or using COLDINFRA's website at https://coldinfra.com (the "Site") and our services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Description of Services</h2>
                    <p className="text-slate-600 leading-relaxed">
                      COLDINFRA provides Google Workspace and Microsoft 365 email infrastructure setup services optimized for cold email campaigns. Our services include:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>Google Workspace and Microsoft 365 account provisioning</li>
                      <li>DNS configuration (SPF, DMARC, DKIM)</li>
                      <li>Email deliverability optimization</li>
                      <li>Technical support for email infrastructure</li>
                      <li>Integration assistance with email sending tools</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Account Registration</h2>
                    <p className="text-slate-600 leading-relaxed">
                      To use our Services, you must:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>Provide accurate, current, and complete information during registration</li>
                      <li>Maintain and promptly update your account information</li>
                      <li>Maintain the security of your account credentials</li>
                      <li>Be at least 18 years of age</li>
                      <li>Accept full responsibility for all activities under your account</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Pricing and Payment</h2>
                    <p className="text-slate-600 leading-relaxed">
                      Pricing for our Services is displayed on our Site and is subject to change. By subscribing to our Services, you agree to:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>Pay all fees associated with your selected plan</li>
                      <li>Provide valid payment information</li>
                      <li>Authorize recurring charges for subscription plans</li>
                      <li>Be responsible for any taxes or additional fees</li>
                    </ul>
                    <p className="text-slate-600 leading-relaxed mt-4">
                      All payments are processed securely through third-party payment processors. We do not store your complete payment information.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Refund Policy</h2>
                    <p className="text-slate-600 leading-relaxed">
                      We offer a 30-day money-back guarantee for first-time subscribers. To request a refund:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>Contact support@coldinfra.com within 30 days of your initial purchase</li>
                      <li>Provide your account details and reason for the refund request</li>
                      <li>Refunds are processed within 5-10 business days</li>
                    </ul>
                    <p className="text-slate-600 leading-relaxed mt-4">
                      Refunds do not apply to domain purchases, additional mailboxes purchased after the initial setup, or renewals beyond the first billing cycle.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Acceptable Use Policy</h2>
                    <p className="text-slate-600 leading-relaxed">
                      You agree not to use our Services to:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>Send spam, unsolicited emails, or violate CAN-SPAM regulations</li>
                      <li>Engage in illegal activities or violate any applicable laws</li>
                      <li>Transmit malware, viruses, or harmful code</li>
                      <li>Impersonate others or misrepresent your identity</li>
                      <li>Infringe on intellectual property rights</li>
                      <li>Harass, threaten, or harm others</li>
                      <li>Attempt to gain unauthorized access to our systems</li>
                    </ul>
                    <p className="text-slate-600 leading-relaxed mt-4">
                      Violation of this policy may result in immediate termination of your account without refund.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Service Level Agreement (SLA)</h2>
                    <p className="text-slate-600 leading-relaxed">
                      We strive to maintain 99.9% uptime for our Services. In the event of service disruptions:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>We will make commercially reasonable efforts to resolve issues promptly</li>
                      <li>Scheduled maintenance will be announced in advance when possible</li>
                      <li>Emergency maintenance may occur without prior notice</li>
                    </ul>
                    <p className="text-slate-600 leading-relaxed mt-4">
                      Service credits may be provided for extended outages as outlined in your service agreement.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
                    <p className="text-slate-600 leading-relaxed">
                      All content, features, and functionality on the Site are owned by COLDINFRA and are protected by copyright, trademark, and other intellectual property laws. You may not:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>Copy, modify, or distribute our content without permission</li>
                      <li>Use our trademarks or branding without authorization</li>
                      <li>Reverse engineer or decompile any aspect of our Services</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
                    <p className="text-slate-600 leading-relaxed">
                      To the maximum extent permitted by law, COLDINFRA shall not be liable for:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>Indirect, incidental, special, or consequential damages</li>
                      <li>Loss of profits, data, or business opportunities</li>
                      <li>Damages exceeding the amount paid for Services in the past 12 months</li>
                      <li>Issues arising from third-party services or integrations</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Disclaimers</h2>
                    <p className="text-slate-600 leading-relaxed">
                      Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>Uninterrupted or error-free service</li>
                      <li>Specific email deliverability rates</li>
                      <li>Compatibility with all email sending tools</li>
                      <li>Results from using our Services</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Termination</h2>
                    <p className="text-slate-600 leading-relaxed">
                      We reserve the right to suspend or terminate your account at any time for:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>Violation of these Terms</li>
                      <li>Non-payment of fees</li>
                      <li>Fraudulent activity</li>
                      <li>Any reason at our sole discretion</li>
                    </ul>
                    <p className="text-slate-600 leading-relaxed mt-4">
                      You may cancel your subscription at any time through your account settings or by contacting support. Cancellations take effect at the end of the current billing period.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
                    <p className="text-slate-600 leading-relaxed">
                      We may modify these Terms at any time. Changes will be effective upon posting to the Site with an updated "Last Updated" date. Continued use of our Services after changes constitutes acceptance of the modified Terms.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Governing Law</h2>
                    <p className="text-slate-600 leading-relaxed">
                      These Terms are governed by the laws of the United States, without regard to conflict of law provisions. Any disputes shall be resolved in the courts located in the United States.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
                    <p className="text-slate-600 leading-relaxed">
                      For questions about these Terms of Service, contact us at:
                    </p>
                    <div className="mt-4 p-6 bg-slate-50 rounded-lg">
                      <p className="text-slate-900 font-semibold">COLDINFRA</p>
                      <p className="text-slate-600">Email: support@coldinfra.com</p>
                      <p className="text-slate-600">Website: https://coldinfra.com</p>
                    </div>
                  </section>

                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
