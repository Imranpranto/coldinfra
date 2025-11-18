import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DMARC Generator - Create DMARC Records | COLDINFRA',
  description:
    'Generate DMARC records for your email domains. Free DMARC generator tool for improved email authentication and deliverability. Protect your domain from spoofing.',
  keywords: [
    'DMARC generator',
    'DMARC record',
    'email authentication',
    'domain security',
    'email deliverability',
    'SPF DMARC DKIM',
    'email security',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/tools/dmarc-generator',
  },
  openGraph: {
    title: 'DMARC Generator | COLDINFRA',
    description: 'Generate DMARC records for improved email authentication. Free tool.',
    url: 'https://www.coldinfra.com/tools/dmarc-generator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
