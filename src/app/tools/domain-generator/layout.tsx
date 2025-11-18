import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cold Email Domain Generator - Create Domain Variations | COLDINFRA',
  description:
    'Generate domain variations for your cold email infrastructure. Create multiple domain options for better deliverability and sender reputation. Free domain generator tool.',
  keywords: [
    'domain generator',
    'email domain generator',
    'domain variations',
    'cold email domains',
    'deliverability domains',
    'sender reputation',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/tools/domain-generator',
  },
  openGraph: {
    title: 'Cold Email Domain Generator | COLDINFRA',
    description: 'Generate domain variations for your cold email infrastructure. Free tool.',
    url: 'https://www.coldinfra.com/tools/domain-generator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
