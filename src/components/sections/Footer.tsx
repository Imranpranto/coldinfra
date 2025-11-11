import React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SecurityBadge } from '@/components/ui/SecurityBadge'

export function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Email Infrastructure", href: "#features" },
        { name: "Google Workspace Setup", href: "#features" },
        { name: "Deliverability Tools", href: "#tools" },
        { name: "Analytics Dashboard", href: "#features" },
        { name: "API Access", href: "/api-docs" }
      ]
    },
    {
      title: "Tools",
      links: [
        { name: "Cold Email ROI Calculator", href: "/tools/roi-calculator" },
        { name: "DMARC Generator", href: "/tools/dmarc-generator" },
        { name: "Email Cost Calculator", href: "/tools/cost-calculator" },
        { name: "Domain Generator", href: "/tools/domain-generator" },
        { name: "View All Tools", href: "/tools" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Getting Started Guide", href: "/resources/guide" },
        { name: "Best Practices", href: "/resources/best-practices" },
        { name: "Case Studies", href: "/resources/case-studies" },
        { name: "Integration Docs", href: "/resources/docs" },
        { name: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/support" },
        { name: "Setup Assistance", href: "/support/setup" },
        { name: "Contact Us", href: "/contact" },
        { name: "System Status", href: "/status" },
        { name: "Community", href: "/community" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Partners", href: "/partners" },
        { name: "Affiliate Program", href: "/affiliates" }
      ]
    }
  ]

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/coldinfra",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/coldinfra",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@coldinfra",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H9.414l-3 3A1 1 0 015 12.414V10H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
        </svg>
      )
    }
  ]

  return (
    <footer className="bg-primary-navy text-white">
      <Container>
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo (Green) */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-trust-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold">COLDINFRA</span>
            </div>

            {/* Description (DNS Focus) */}
            <p className="text-professional-100 leading-relaxed max-w-md">
              Cut technical hassle with expert DNS setup at affordable $2.50/mailbox Google Workspace pricing.
              We handle SPF, DMARC, DKIM to land your offers in primary inbox — ready in 10 minutes.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-professional-300 hover:text-trust-green transition-colors duration-200"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              <SecurityBadge type="soc2" className="bg-white/10 text-white border-white/20" />
              <SecurityBadge type="gdpr" className="bg-white/10 text-white border-white/20" />
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-professional-300 hover:text-trust-green transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-professional-600 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-professional-300 text-sm">
              © {new Date().getFullYear()} COLDINFRA. All rights reserved.
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-professional-300 hover:text-trust-green transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-professional-300 hover:text-trust-green transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/security"
                className="text-professional-300 hover:text-trust-green transition-colors duration-200 text-sm"
              >
                Security
              </Link>
              <Link
                href="/cookies"
                className="text-professional-300 hover:text-trust-green transition-colors duration-200 text-sm"
              >
                Cookie Policy
              </Link>
            </div>
            
            {/* Contact Info */}
            <div className="text-professional-300 text-sm">
              <a
                href="mailto:support@coldinfra.com"
                className="hover:text-trust-green transition-colors duration-200"
              >
                support@coldinfra.com
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}