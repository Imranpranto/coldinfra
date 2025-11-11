import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { StructuredData } from '@/components/StructuredData'
import { WebVitals } from '@/components/WebVitals'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://coldinfra.com'),
  title: {
    default: 'Best Cold Email Infrastructure Provider | COLDINFRA - Google Workspace at $2.50',
    template: '%s | COLDINFRA - Cold Email Infrastructure'
  },
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
  authors: [{ name: 'COLDINFRA Team' }],
  creator: 'COLDINFRA',
  publisher: 'COLDINFRA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://coldinfra.com',
    siteName: 'COLDINFRA',
    title: 'Best Cold Email Infrastructure Provider - Google Workspace at $2.50',
    description: 'Get Google Workspace for cold email at $2.50/mailbox (57% off). Expert DNS setup. 98.7% inbox rate. 14,000+ mailboxes served. Primary inbox delivery guaranteed.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'COLDINFRA - Best Cold Email Infrastructure Provider - Google Workspace at $2.50',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Cold Email Infrastructure Provider - Google Workspace at $2.50',
    description: 'Get Google Workspace for cold email at $2.50/mailbox (vs $7). Expert DNS, SPF, DMARC, DKIM setup. 98.7% inbox rate guaranteed.',
    images: ['/twitter-image.jpg'],
    creator: '@coldinfra',
    site: '@coldinfra',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#000000" />
      </head>
      <body className="font-body antialiased">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Structured Data */}
        <StructuredData />
        
        {/* Web Vitals Monitoring */}
        <WebVitals />
        
        {children}
        
        {/* Analytics and tracking scripts would go here */}
      </body>
    </html>
  )
}