import Link from 'next/link'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { Mail, Home, ArrowLeft, Search } from 'lucide-react'

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found. Return to COLDINFRA homepage or explore our cold email tools and resources.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col">
        <Header />

        <main id="main-content" className="flex-1 flex items-center justify-center py-12">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              {/* 404 Graphic */}
              <div className="mb-8">
                <div className="relative inline-block">
                  <div className="text-[120px] md:text-[180px] font-bold text-slate-100 leading-none select-none">
                    404
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-trust-green to-emerald-600 rounded-full flex items-center justify-center">
                      <Mail className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Page Not Found
                </h1>
                <p className="text-lg text-slate-600 max-w-lg mx-auto">
                  Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link href="/">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-trust-green to-trust-green-dark hover:from-trust-green-dark hover:to-trust-green text-white shadow-lg shadow-trust-green/30 group"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Back to Homepage
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-300 hover:bg-slate-50"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Browse Tools
                  </Button>
                </Link>
              </div>

              {/* Helpful Links */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h2 className="text-sm font-semibold text-slate-900 mb-4">Popular Pages:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <Link
                    href="/tools/roi-calculator"
                    className="text-trust-green hover:text-trust-green-dark transition-colors text-left"
                  >
                    → Cold Email ROI Calculator
                  </Link>
                  <Link
                    href="/tools/email-volume-calculator"
                    className="text-trust-green hover:text-trust-green-dark transition-colors text-left"
                  >
                    → Email Volume Calculator
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-trust-green hover:text-trust-green-dark transition-colors text-left"
                  >
                    → Pricing Plans
                  </Link>
                  <Link
                    href="/book-call"
                    className="text-trust-green hover:text-trust-green-dark transition-colors text-left"
                  >
                    → Book a Free Consultation
                  </Link>
                  <Link
                    href="/tools/domain-generator"
                    className="text-trust-green hover:text-trust-green-dark transition-colors text-left"
                  >
                    → Domain Generator
                  </Link>
                  <Link
                    href="/tools/dmarc-generator"
                    className="text-trust-green hover:text-trust-green-dark transition-colors text-left"
                  >
                    → DMARC Generator
                  </Link>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-8 text-sm text-slate-600">
                <p>
                  Need help? {' '}
                  <Link href="/contact" className="text-trust-green hover:text-trust-green-dark font-medium">
                    Contact our support team
                  </Link>
                </p>
              </div>
            </div>
          </Container>
        </main>

        <Footer />
      </div>
    </div>
  )
}
