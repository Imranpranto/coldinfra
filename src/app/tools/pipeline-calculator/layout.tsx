import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sales Pipeline Calculator - Analyze Pipeline Velocity | COLDINFRA',
  description:
    'Analyze your sales pipeline velocity and performance metrics. Free pipeline calculator with win rate analysis, industry benchmarks, and actionable recommendations.',
  keywords: [
    'sales pipeline calculator',
    'pipeline velocity',
    'win rate calculator',
    'pipeline analysis',
    'sales metrics',
    'pipeline performance',
    'sales benchmarks',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/tools/pipeline-calculator',
  },
  openGraph: {
    title: 'Sales Pipeline Calculator | COLDINFRA',
    description: 'Analyze your sales pipeline velocity and performance metrics. Free tool.',
    url: 'https://www.coldinfra.com/tools/pipeline-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
