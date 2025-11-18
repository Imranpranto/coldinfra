import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | COLDINFRA',
  description:
    'Contact COLDINFRA for questions about cold email infrastructure, Google Workspace pricing, or technical support. Get expert help with email deliverability.',
  keywords: [
    'contact COLDINFRA',
    'email infrastructure support',
    'cold email help',
    'Google Workspace contact',
    'email deliverability support',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/contact',
  },
  openGraph: {
    title: 'Contact Us | COLDINFRA',
    description: 'Get in touch with our team for email infrastructure support.',
    url: 'https://www.coldinfra.com/contact',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
