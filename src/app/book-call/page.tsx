import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Book a Call',
  description: 'Schedule a 15-minute consultation with our team to discuss your cold email infrastructure needs.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function BookCallPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Grid Pattern Overlay - Whole Page */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main id="main-content">
          <Section padding="lg" className="bg-transparent">

            <Container>
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 rounded-full mb-4">
                  <div className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-trust-green">Free 15-Minute Consultation</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  Book a Call with Our Team
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Get expert advice on cold email infrastructure, deliverability optimization, and scaling your campaigns at $2.50/mailbox.
                </p>
              </div>

              {/* Cal.com Embed - Full Width */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 p-2 shadow-xl mb-12">
                <div className="relative w-full" style={{ minHeight: '800px' }}>
                  <iframe
                    src="https://cal.com/coldinfra/15min"
                    className="w-full h-full rounded-xl"
                    style={{ minHeight: '800px', border: 'none' }}
                    title="Book a call with COLDINFRA"
                  />
                </div>
              </div>

              {/* Benefits Grid Below Embed */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-slate-200/50 p-6 text-center">
                  <div className="w-12 h-12 bg-trust-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Quick & Easy</h3>
                  <p className="text-sm text-slate-600">Just 15 minutes to discuss your needs and get started</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-slate-200/50 p-6 text-center">
                  <div className="w-12 h-12 bg-trust-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Expert Guidance</h3>
                  <p className="text-sm text-slate-600">Get advice on DNS setup, deliverability, and scaling</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-slate-200/50 p-6 text-center">
                  <div className="w-12 h-12 bg-trust-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">No Obligation</h3>
                  <p className="text-sm text-slate-600">Free consultation with no pressure to commit</p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Simple CTA Section */}
        <Section padding="lg" className="bg-transparent">
          <Container>
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-trust-green to-trust-green-dark rounded-2xl p-8 lg:p-12 text-white">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Prefer to Email Instead?
              </h2>
              <p className="text-lg text-white/90 mb-6">
                Reach out directly at support@coldinfra.com and we'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:support@coldinfra.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-trust-green font-semibold rounded-xl hover:bg-slate-50 transition-colors duration-200 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Send Us an Email
              </a>
            </div>
          </Container>
        </Section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
