import { Metadata } from 'next'

interface PageMetadataProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  image?: string
  noindex?: boolean
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonical,
  image = '/og-image.jpg',
  noindex = false,
}: PageMetadataProps): Metadata {
  const baseUrl = 'https://www.coldinfra.com'
  const fullUrl = canonical ? `${baseUrl}${canonical}` : baseUrl

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'COLDINFRA',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@coldinfra',
      site: '@coldinfra',
    },
    robots: {
      index: !noindex,
      follow: true,
      googleBot: {
        index: !noindex,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Preset metadata for common pages
export const PAGE_METADATA = {
  home: generateMetadata({
    title: 'COLDINFRA - Professional Cold Email Infrastructure & Managed Mailboxes',
    description:
      'Scale your cold email outreach with COLDINFRA. Premium managed mailboxes starting at $2.50/mailbox. Expert infrastructure setup, deliverability optimization, and 24/7 support.',
    keywords: [
      'cold email infrastructure',
      'managed mailboxes',
      'email deliverability',
      'cold outreach',
      'email warming',
      'domain setup',
      'SPF DMARC DKIM',
      'B2B sales',
      'lead generation',
    ],
    canonical: '/',
  }),

  tools: generateMetadata({
    title: 'Free Cold Email Tools & Calculators',
    description:
      'Free tools for cold email professionals. ROI Calculator, Volume Calculator, Domain Generator, DMARC Generator, SPF Generator, and more. Plan and optimize your cold email campaigns.',
    keywords: [
      'cold email tools',
      'ROI calculator',
      'email volume calculator',
      'domain generator',
      'DMARC generator',
      'SPF generator',
      'free email tools',
    ],
    canonical: '/tools',
  }),

  roiCalculator: generateMetadata({
    title: 'Cold Email ROI Calculator - Calculate Campaign Returns',
    description:
      'Calculate the expected return on investment for your cold email campaigns. Estimate revenue, infrastructure costs, and profitability. Free cold email ROI calculator.',
    keywords: [
      'ROI calculator',
      'cold email ROI',
      'email campaign calculator',
      'revenue calculator',
      'email profitability',
    ],
    canonical: '/tools/roi-calculator',
  }),

  volumeCalculator: generateMetadata({
    title: 'Email Volume Calculator - Campaign Planning Tool',
    description:
      'Calculate total email volume and contact attrition through your sequence. Plan your cold email campaigns with accurate volume projections and infrastructure requirements.',
    keywords: [
      'email volume calculator',
      'campaign planning',
      'email sequence',
      'contact attrition',
      'infrastructure planning',
    ],
    canonical: '/tools/email-volume-calculator',
  }),

  pricing: generateMetadata({
    title: 'Pricing - Managed Email Infrastructure Plans',
    description:
      'Transparent pricing for professional email infrastructure. Managed mailboxes starting at $2.50/mailbox. Volume discounts, expert setup, and premium support included.',
    keywords: [
      'email infrastructure pricing',
      'mailbox pricing',
      'cold email costs',
      'managed email pricing',
    ],
    canonical: '/pricing',
  }),

  about: generateMetadata({
    title: 'About Us - Cold Email Infrastructure Experts',
    description:
      'Learn about COLDINFRA and our mission to provide the best cold email infrastructure. Expert team, proven track record, and commitment to deliverability excellence.',
    keywords: [
      'about COLDINFRA',
      'email infrastructure experts',
      'cold email company',
      'deliverability experts',
    ],
    canonical: '/about',
  }),

  contact: generateMetadata({
    title: 'Contact Us - Get in Touch with COLDINFRA',
    description:
      'Contact COLDINFRA for cold email infrastructure solutions. Schedule a consultation, get expert advice, and scale your outreach with professional email infrastructure.',
    keywords: ['contact', 'support', 'consultation', 'customer service'],
    canonical: '/contact',
  }),

  bookCall: generateMetadata({
    title: 'Book a Free Consultation - COLDINFRA Email Experts',
    description:
      'Schedule a free consultation with COLDINFRA email infrastructure experts. Discuss your cold email goals, get personalized recommendations, and scale your outreach.',
    keywords: ['book consultation', 'free call', 'expert consultation', 'schedule meeting'],
    canonical: '/book-call',
  }),

  privacy: generateMetadata({
    title: 'Privacy Policy - COLDINFRA',
    description:
      'Read COLDINFRA privacy policy. Learn how we collect, use, and protect your personal information. Transparent data practices and GDPR compliance.',
    keywords: ['privacy policy', 'data protection', 'GDPR', 'privacy'],
    canonical: '/privacy',
    noindex: true,
  }),

  terms: generateMetadata({
    title: 'Terms of Service - COLDINFRA',
    description:
      'Read COLDINFRA terms of service. Understand the terms and conditions for using our cold email infrastructure services and managed mailboxes.',
    keywords: ['terms of service', 'terms and conditions', 'legal'],
    canonical: '/terms',
    noindex: true,
  }),

  refundPolicy: generateMetadata({
    title: 'Refund Policy - COLDINFRA',
    description:
      'Read COLDINFRA refund policy. Transparent refund terms for our cold email infrastructure services. Customer satisfaction guaranteed.',
    keywords: ['refund policy', 'money back guarantee', 'refunds'],
    canonical: '/refund-policy',
    noindex: true,
  }),

  careers: generateMetadata({
    title: 'Careers - Join the COLDINFRA Team',
    description:
      'Join the COLDINFRA team. Explore career opportunities in cold email infrastructure, deliverability, and customer success. Work with cutting-edge email technology.',
    keywords: ['careers', 'jobs', 'employment', 'work at COLDINFRA'],
    canonical: '/careers',
  }),

  resources: generateMetadata({
    title: 'Resources - Cold Email Guides & Best Practices',
    description:
      'Cold email resources, guides, and best practices. Learn about deliverability, infrastructure setup, email warming, and scaling your outreach campaigns.',
    keywords: [
      'cold email resources',
      'email guides',
      'best practices',
      'deliverability guides',
    ],
    canonical: '/resources',
  }),
}

// Tool-specific metadata generator
export function generateToolMetadata(
  toolName: string,
  description: string,
  path: string,
  keywords: string[] = []
): Metadata {
  return generateMetadata({
    title: `${toolName} - Free Cold Email Tool | COLDINFRA`,
    description,
    keywords: [...keywords, 'free tool', 'cold email tool', toolName.toLowerCase()],
    canonical: path,
  })
}
