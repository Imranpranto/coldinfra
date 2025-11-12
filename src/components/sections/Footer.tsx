import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Container className="relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Left Section - Brand & Description */}
            <div className="lg:col-span-4 space-y-6">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center space-x-3 group">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/logo.svg"
                    alt="COLDINFRA Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-bold text-white">COLDINFRA</span>
              </Link>

              {/* Description */}
              <p className="text-slate-400 leading-relaxed max-w-md text-sm">
                Expert Google Workspace setup at $2.50/mailbox. We handle DNS, SPF, DMARC, DKIM configuration to ensure your cold emails land in the primary inbox. Setup ready in 10 minutes.
              </p>

              {/* LinkedIn Icon */}
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/company/coldinfra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-slate-400 hover:text-trust-green hover:border-trust-green/30 hover:bg-trust-green/10 transition-all duration-300"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Section - Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

                {/* Tools Column */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Tools</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/tools/roi-calculator"
                        className="text-sm text-slate-400 hover:text-trust-green transition-colors duration-200"
                      >
                        ROI Calculator
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tools/cost-calculator"
                        className="text-sm text-slate-400 hover:text-trust-green transition-colors duration-200"
                      >
                        Email Cost Calculator
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tools/dmarc-generator"
                        className="text-sm text-slate-400 hover:text-trust-green transition-colors duration-200"
                      >
                        DMARC Record Generator
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tools/email-volume-calculator"
                        className="text-sm text-slate-400 hover:text-trust-green transition-colors duration-200"
                      >
                        Email Volume Calculator
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Quick Links Column */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/privacy"
                        className="text-sm text-slate-400 hover:text-trust-green transition-colors duration-200"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/terms"
                        className="text-sm text-slate-400 hover:text-trust-green transition-colors duration-200"
                      >
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/refund-policy"
                        className="text-sm text-slate-400 hover:text-trust-green transition-colors duration-200"
                      >
                        Refund & Cancellation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-sm text-slate-400 hover:text-trust-green transition-colors duration-200"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company Column */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/about"
                        className="text-sm text-slate-400 hover:text-trust-green transition-colors duration-200"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/resources"
                        className="text-sm text-slate-400 hover:text-trust-green transition-colors duration-200"
                      >
                        Resources
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/careers"
                        className="text-sm text-slate-400 hover:text-trust-green transition-colors duration-200"
                      >
                        Careers
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} COLDINFRA. All rights reserved.
            </p>
            <p className="text-sm text-slate-400">
              Made with <span className="text-trust-green">♥</span> for cold email success
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}