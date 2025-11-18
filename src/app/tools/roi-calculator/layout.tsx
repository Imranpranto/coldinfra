import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cold Email ROI Calculator - Calculate Campaign Returns | COLDINFRA',
  description:
    'Calculate the expected return on investment for your cold email campaigns. Estimate revenue, infrastructure costs, and profitability. Free cold email ROI calculator with instant results.',
  keywords: [
    'ROI calculator',
    'cold email ROI',
    'email campaign calculator',
    'revenue calculator',
    'email profitability',
    'cold outreach ROI',
    'campaign returns',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/tools/roi-calculator',
  },
  openGraph: {
    title: 'Cold Email ROI Calculator | COLDINFRA',
    description:
      'Calculate expected ROI for your cold email campaigns. Estimate revenue, costs, and profitability with our free calculator.',
    url: 'https://www.coldinfra.com/tools/roi-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
