import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how COLDINFRA collects, uses, and protects your personal information.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
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
                  Privacy Policy
                </h1>
                <p className="text-lg text-slate-600">
                  Last Updated: November 13, 2025
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-slate max-w-none">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 p-8 lg:p-12 space-y-8">

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
                    <p className="text-slate-600 leading-relaxed">
                      This Privacy Policy governs the manner in which COLDINFRA ("we," "our," or the "Company") collects, uses, maintains, and discloses information, including personal information.
                    </p>
                    <p className="text-slate-600 leading-relaxed mt-4">
                      This Privacy Policy applies when you:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>Access or use our website located at: https://coldinfra.com (the "Site")</li>
                      <li>Use Company services</li>
                      <li>Contact or otherwise interact with us in any way (collectively, the "Services")</li>
                    </ul>
                    <p className="text-slate-600 leading-relaxed mt-4">
                      This Privacy Policy applies to all clients, visitors, and users of the Services; however, it does not apply to any third-party content or websites that are linked to or from the Site.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>

                    <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Information You Provide Directly</h3>
                    <p className="text-slate-600 leading-relaxed">
                      We may collect information that you provide us, including when you create an account, purchase Services, upload content, request support, or contact us. For example:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li><strong>Accounts:</strong> When signing up, you may be required to provide personal information such as name, email, phone number, and login details.</li>
                      <li><strong>Purchases:</strong> Includes name, email, billing address, phone number, payment details (partial), transaction date, time, and amount.</li>
                      <li><strong>User Content:</strong> Any content you upload or transmit (text or otherwise).</li>
                      <li><strong>Inquiries:</strong> Information you provide when contacting us (e.g., name, email, and message).</li>
                      <li><strong>Verification:</strong> We may verify your identity to process certain requests.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Information Collected Automatically</h3>
                    <p className="text-slate-600 leading-relaxed">We may automatically collect:</p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>IP address</li>
                      <li>Device hardware/software details</li>
                      <li>Browser information</li>
                      <li>Usage/access times</li>
                      <li>Analytics data (via cookies or similar technologies)</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Cookies</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Cookies store user preferences to optimize the browsing experience. Disabling cookies in your browser may affect access to certain parts of the Site.
                    </p>

                    <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Information Collected from Third Parties</h3>
                    <p className="text-slate-600 leading-relaxed">
                      We may obtain personal data from service providers (e.g., payment processors, analytics, security vendors, promotions platforms) and combine it with data we collect directly.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Collected Information</h2>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2">
                      <li><strong>Services:</strong> To provide our Services, process payments, notify about changes, prevent fraud, and communicate.</li>
                      <li><strong>Site:</strong> To operate, maintain, and improve the Site.</li>
                      <li><strong>Accounts:</strong> To create/manage accounts and personalize your experience.</li>
                      <li><strong>Purchases:</strong> To manage purchase updates and communication.</li>
                      <li><strong>Legal:</strong> To comply with obligations and protect rights.</li>
                      <li><strong>Respond to Inquiries:</strong> To deliver customer support.</li>
                      <li><strong>Analytics:</strong> To improve Site and Services.</li>
                      <li><strong>Confirm Identity:</strong> To verify users when required.</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Sharing Your Personal Information</h2>

                    <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Personal Information</h3>
                    <p className="text-slate-600 leading-relaxed">
                      We do not sell, trade, or rent your personal information. Disclosure may occur as follows:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li><strong>Service Providers:</strong> Vendors assisting us (credit card processors, email providers).</li>
                      <li><strong>Affiliated Parties:</strong> Our affiliates or subsidiaries.</li>
                      <li><strong>Legal:</strong> If required by law, subpoena, or court order.</li>
                      <li><strong>Merger:</strong> If merged/acquired, subject to this Privacy Policy.</li>
                      <li><strong>Consent:</strong> With your explicit consent.</li>
                      <li><strong>Our Rights:</strong> To investigate fraud or breaches of security.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Non-Personal Information</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Aggregated, non-identifiable information may be disclosed for lawful purposes such as improving Site and Services.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
                    <p className="text-slate-600 leading-relaxed">
                      We use industry-standard measures to secure data but cannot guarantee 100% security.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Retention</h2>
                    <p className="text-slate-600 leading-relaxed">
                      Personal information is retained no longer than necessary for its intended purpose or as permitted by law.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Transfers</h2>
                    <p className="text-slate-600 leading-relaxed">
                      We are a U.S.-based entity. All information is processed and stored in the United States under U.S. law.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Children's Privacy</h2>
                    <p className="text-slate-600 leading-relaxed">
                      The Services are not intended for children under 18. We do not knowingly collect data from minors. If a child has provided us information, contact us at support@coldinfra.com and we will delete it.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights</h2>
                    <p className="text-slate-600 leading-relaxed">
                      Depending on your jurisdiction, you may have rights to:
                    </p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
                      <li>Know what personal data we collected</li>
                      <li>Know whether it is sold or disclosed, and to whom</li>
                      <li>Access, delete, or correct personal data</li>
                      <li>Limit use/disclosure of "sensitive" personal data</li>
                      <li>Receive personal data in a portable format</li>
                      <li>Opt out of sale or sharing of personal data</li>
                      <li>Opt out of automated decision-making or profiling</li>
                      <li>Revoke consent</li>
                      <li>Equal service and non-discrimination for exercising rights</li>
                    </ul>
                    <p className="text-slate-600 leading-relaxed mt-4">
                      To exercise rights, email support@coldinfra.com. Verification of identity is required. We generally respond within 30–45 days.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Links</h2>
                    <p className="text-slate-600 leading-relaxed">
                      The Site may link to third-party websites. We are not responsible for their practices, and you should review their privacy policies independently.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to this Privacy Policy</h2>
                    <p className="text-slate-600 leading-relaxed">
                      We may update this Privacy Policy at any time. Updates will be reflected in the "Last Updated" date at the top of the page. Continued use of the Site constitutes acceptance of the revised policy.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
                    <p className="text-slate-600 leading-relaxed">
                      If you have questions about this Privacy Policy, contact us at:
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
    </div>
  )
}
