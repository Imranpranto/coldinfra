import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Cold Email Tools & Calculators | COLDINFRA',
  description:
    'Free tools for cold email professionals. ROI Calculator, Volume Calculator, Domain Generator, DMARC Generator, SPF Generator, and more. Plan and optimize your cold email campaigns.',
  keywords: [
    'cold email tools',
    'ROI calculator',
    'email volume calculator',
    'domain generator',
    'DNS record generator',
    'DMARC generator',
    'SPF generator',
    'free email tools',
    'cold email calculator',
    'email planning tools',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/tools',
  },
  openGraph: {
    title: 'Free Cold Email Tools & Calculators | COLDINFRA',
    description:
      'Free tools for cold email professionals. Calculate ROI, email volume, generate domains, create DMARC and SPF records, and more.',
    url: 'https://www.coldinfra.com/tools',
    type: 'website',
  },
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children
}
