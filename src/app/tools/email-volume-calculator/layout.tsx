import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Email Volume Calculator - Campaign Planning Tool | COLDINFRA',
  description:
    'Calculate total email volume and contact attrition through your sequence. Plan your cold email campaigns with accurate volume projections and infrastructure requirements. Free tool.',
  keywords: [
    'email volume calculator',
    'campaign planning',
    'email sequence',
    'contact attrition',
    'infrastructure planning',
    'email volume planning',
    'sequence calculator',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/tools/email-volume-calculator',
  },
  openGraph: {
    title: 'Email Volume Calculator | COLDINFRA',
    description:
      'Calculate email volume and contact attrition through your sequence. Plan campaigns with accurate projections.',
    url: 'https://www.coldinfra.com/tools/email-volume-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
