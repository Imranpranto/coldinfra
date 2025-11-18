import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SPF Generator - Create SPF Records | COLDINFRA',
  description:
    'Generate SPF records for your email domains. Free SPF generator tool for improved email authentication and deliverability. Protect your domain from spoofing.',
  keywords: [
    'SPF generator',
    'SPF record',
    'email authentication',
    'domain security',
    'email deliverability',
    'SPF DMARC DKIM',
    'email security',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/tools/spf-generator',
  },
  openGraph: {
    title: 'SPF Generator | COLDINFRA',
    description: 'Generate SPF records for improved email authentication. Free tool.',
    url: 'https://www.coldinfra.com/tools/spf-generator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
