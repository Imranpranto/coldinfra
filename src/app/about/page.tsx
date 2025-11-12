import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about COLDINFRA - your trusted partner for Google Workspace and Microsoft 365 email infrastructure.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <Section background="default" padding="xl" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/30" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 rounded-full mb-2">
                <div className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-trust-green">About COLDINFRA</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900">
                Making Cold Email Infrastructure Simple, Affordable, and Effective
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                We're on a mission to democratize cold email infrastructure by providing enterprise-grade Google Workspace and Microsoft 365 setup at a fraction of the retail cost.
              </p>
            </div>
          </Container>
        </Section>

        {/* Story Section */}
        <Section background="default" padding="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 p-8 lg:p-12 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Story</h2>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p>
                      COLDINFRA was born out of a simple observation: cold email is one of the most effective outbound strategies for businesses, but the infrastructure costs and technical complexity were keeping many teams from scaling effectively.
                    </p>
                    <p>
                      Traditional Google Workspace costs $7 per mailbox, and Microsoft 365 has similar pricing. For agencies and sales teams needing dozens or hundreds of mailboxes, these costs quickly become prohibitive. Add to that the technical complexity of DNS configuration, SPF records, DMARC policies, and DKIM setup – and you have a significant barrier to entry.
                    </p>
                    <p>
                      We saw an opportunity to change this. By leveraging our partnerships and technical expertise, we're able to offer fully configured Google Workspace accounts at just $2.50 per mailbox – a 64% savings compared to retail pricing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Mission & Values */}
        <Section background="default" padding="lg">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mission */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 p-8">
                  <div className="w-16 h-16 bg-trust-green/10 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                  <p className="text-slate-600 leading-relaxed">
                    To empower businesses of all sizes with enterprise-grade email infrastructure at affordable prices, eliminating the technical barriers and cost constraints that prevent teams from scaling their outbound efforts.
                  </p>
                </div>

                {/* Vision */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 p-8">
                  <div className="w-16 h-16 bg-trust-green/10 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                  <p className="text-slate-600 leading-relaxed">
                    To become the global standard for cold email infrastructure, known for reliability, affordability, and exceptional deliverability. We envision a world where any business can launch effective cold email campaigns without technical headaches or budget constraints.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Core Values */}
        <Section background="default" padding="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Core Values</h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Transparency",
                    description: "We believe in honest pricing with no hidden fees. What you see is what you get – always.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )
                  },
                  {
                    title: "Reliability",
                    description: "99.9% uptime isn't just a promise – it's our commitment. Your campaigns depend on us, and we take that seriously.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    )
                  },
                  {
                    title: "Customer Success",
                    description: "Your success is our success. We're not just a vendor – we're your partner in achieving inbox delivery excellence.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )
                  },
                  {
                    title: "Innovation",
                    description: "We constantly evolve our services to stay ahead of deliverability challenges and industry changes.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )
                  },
                  {
                    title: "Simplicity",
                    description: "Complex infrastructure should be simple to use. We handle the technical complexity so you can focus on your campaigns.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    )
                  }
                ].map((value, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-xl rounded-xl border border-slate-200/50 hover:border-trust-green/30 transition-all duration-300">
                    <div className="w-12 h-12 bg-trust-green/10 rounded-lg flex items-center justify-center flex-shrink-0 text-trust-green">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-2">{value.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Stats Section */}
        <Section background="default" padding="lg">
          <Container>
            <div className="bg-gradient-to-br from-trust-green to-trust-green-dark rounded-2xl p-8 lg:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">COLDINFRA by the Numbers</h2>
                <p className="text-white/90 text-lg">Our impact on businesses worldwide</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { number: "14,000+", label: "Active Mailboxes" },
                  { number: "98.7%", label: "Inbox Delivery Rate" },
                  { number: "10 min", label: "Average Setup Time" },
                  { number: "99.9%", label: "Uptime SLA" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section background="default" padding="lg">
          <Container>
            <div className="max-w-3xl mx-auto text-center bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Ready to Transform Your Cold Email Infrastructure?
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Join thousands of businesses that trust COLDINFRA for their email infrastructure needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/#pricing"
                  className="inline-flex items-center px-8 py-4 bg-trust-green text-white font-semibold rounded-xl hover:bg-trust-green-dark transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  View Pricing
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl border-2 border-slate-200 hover:border-trust-green hover:text-trust-green transition-all duration-200"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
