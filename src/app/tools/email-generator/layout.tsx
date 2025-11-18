import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Email Generator - Create Professional Email Addresses | COLDINFRA',
  description:
    'Generate professional email addresses from full names. Free email username generator tool with multiple pattern variations for cold email campaigns.',
  keywords: [
    'email generator',
    'username generator',
    'email address generator',
    'professional email',
    'cold email setup',
    'email patterns',
    'email variations',
  ],
  alternates: {
    canonical: 'https://www.coldinfra.com/tools/email-generator',
  },
  openGraph: {
    title: 'Email Generator | COLDINFRA',
    description: 'Generate professional email addresses from full names. Free tool.',
    url: 'https://www.coldinfra.com/tools/email-generator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
