import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cold Email Cost Calculator - Calculate Infrastructure Costs | COLDINFRA',
  description:
    'Calculate the total cost of your cold email infrastructure including ESP, email sequencer, and additional services. Free cost analysis tool for cold email campaigns.',
  keywords: [
    'cold email cost',
    'infrastructure cost calculator',
    'email campaign costs',
    'ESP pricing',
    'email sequencer cost',
    'cold email ROI',
    'email infrastructure pricing',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/tools/cost-calculator',
  },
  openGraph: {
    title: 'Cold Email Cost Calculator | COLDINFRA',
    description: 'Calculate the total cost of your cold email infrastructure. Free tool.',
    url: 'https://www.coldinfra.com/tools/cost-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
