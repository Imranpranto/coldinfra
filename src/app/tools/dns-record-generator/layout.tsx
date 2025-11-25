import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DNS Record Generator - Create MX, SPF, DMARC, DKIM Records | COLDINFRA',
  description:
    'Generate complete DNS records for your email infrastructure. Free DNS record generator for MX, SPF, DMARC, and DKIM records. Supports Google Workspace, Microsoft 365, and more. Setup in minutes.',
  keywords: [
    'DNS record generator',
    'MX record generator',
    'SPF record generator',
    'DMARC record generator',
    'DKIM record generator',
    'email DNS setup',
    'email infrastructure',
    'DNS configuration tool',
    'email authentication',
    'Google Workspace DNS',
    'Microsoft 365 DNS',
    'email deliverability',
    'DNS management',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/tools/dns-record-generator',
  },
  openGraph: {
    title: 'DNS Record Generator - Complete Email DNS Setup | COLDINFRA',
    description: 'Generate MX, SPF, DMARC, and DKIM records for your email infrastructure. Free tool with step-by-step instructions.',
    url: 'https://www.coldinfra.com/tools/dns-record-generator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
