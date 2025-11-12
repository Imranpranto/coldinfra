import type { Metadata } from 'next'
import { Header } from '@/components/sections/Header'
import { HeroSectionModern } from '@/components/sections/HeroSectionModern'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { Footer } from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'Best Cold Email Infrastructure Provider | COLDINFRA',
  description: 'Get Google Workspace for cold email at $2.50/mailbox (vs Google\'s $7). Expert DNS, SPF, DMARC, DKIM setup. 98.7% inbox rate. 14,000+ mailboxes served. Setup in 10 minutes.',
  keywords: [
    'cold email infrastructure provider',
    'Google Workspace for cold email',
    'affordable Google Workspace',
    'cold email deliverability',
    'email infrastructure setup',
    'SPF DMARC DKIM configuration',
    'primary inbox delivery',
    'DNS configuration for cold email',
    'email authentication service',
    'cold email setup service',
    'bulk email infrastructure',
    'Google Workspace reseller',
    'email deliverability experts'
  ],
  openGraph: {
    title: 'Best Cold Email Infrastructure Provider - Google Workspace at $2.50',
    description: 'Get Google Workspace for cold email at $2.50/mailbox (57% off). Expert DNS setup. 98.7% inbox rate. 14,000+ mailboxes served. Primary inbox delivery guaranteed.',
    images: '/og-homepage.jpg',
  },
  alternates: {
    canonical: 'https://coldinfra.com',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main id="main-content">
        <HeroSectionModern />
        <SocialProofSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  )
}