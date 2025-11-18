import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sales Compensation Calculator - Design Comp Plans | COLDINFRA',
  description:
    'Design and analyze sales compensation plans with our free calculator. Calculate OTE, commission rates, quotas, and pay mix for sales teams. Perfect for SDR, AE, and Enterprise roles.',
  keywords: [
    'sales compensation calculator',
    'OTE calculator',
    'commission calculator',
    'sales comp plan',
    'quota calculator',
    'sales team compensation',
    'variable compensation',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/tools/compensation-calculator',
  },
  openGraph: {
    title: 'Sales Compensation Calculator | COLDINFRA',
    description: 'Design and analyze sales compensation plans. Free tool.',
    url: 'https://www.coldinfra.com/tools/compensation-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
