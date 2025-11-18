import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers - Join Our Team | COLDINFRA',
  description:
    'Join the COLDINFRA team and help businesses scale their cold email infrastructure. Explore career opportunities in email technology and customer success.',
  keywords: [
    'COLDINFRA careers',
    'email infrastructure jobs',
    'remote jobs',
    'email technology careers',
    'customer success jobs',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/careers',
  },
  openGraph: {
    title: 'Careers | COLDINFRA',
    description: 'Join our team and help businesses scale their email infrastructure.',
    url: 'https://www.coldinfra.com/careers',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
