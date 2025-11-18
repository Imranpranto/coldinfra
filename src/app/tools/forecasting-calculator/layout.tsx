import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sales Forecasting Calculator - Predict Revenue | COLDINFRA',
  description:
    'Forecast future sales revenue based on pipeline metrics and growth trends. Free sales forecasting calculator with pipeline coverage analysis and confidence levels.',
  keywords: [
    'sales forecasting',
    'revenue forecast',
    'pipeline calculator',
    'sales forecast tool',
    'revenue prediction',
    'pipeline metrics',
    'sales projections',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/tools/forecasting-calculator',
  },
  openGraph: {
    title: 'Sales Forecasting Calculator | COLDINFRA',
    description: 'Forecast future sales revenue based on pipeline metrics. Free tool.',
    url: 'https://www.coldinfra.com/tools/forecasting-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
