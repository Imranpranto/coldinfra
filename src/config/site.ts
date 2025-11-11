/**
 * Site Configuration
 * Centralized configuration for COLDINFRA landing page
 */

export const siteConfig = {
  name: 'COLDINFRA',
  title: 'Best Cold Email Infrastructure Provider | COLDINFRA',
  description:
    'Get Google Workspace for cold email at $2.50/mailbox (vs Google\'s $7). Expert DNS, SPF, DMARC, DKIM setup. 98.7% inbox rate. 14,000+ mailboxes served. Setup in 10 minutes.',
  url: 'https://coldinfra.com',
  ogImage: '/og-image.jpg',
  twitterImage: '/twitter-image.jpg',

  // Social Links
  links: {
    twitter: 'https://twitter.com/coldinfra',
    linkedin: 'https://linkedin.com/company/coldinfra',
    github: 'https://github.com/coldinfra',
    email: 'mailto:support@coldinfra.com',
  },

  // Contact Information
  contact: {
    support: 'support@coldinfra.com',
    sales: 'sales@coldinfra.com',
    phone: '+1 (555) 123-4567',
  },

  // Business Metrics
  metrics: {
    mailboxesServed: '14,000+',
    domainsConfigured: '6,000+',
    deliveryRate: '98.7%',
    averageSetupTime: '10 min',
    businessesServed: '6,000+',
    uptimeGuarantee: '99.9%',
  },

  // SEO Keywords
  keywords: [
    'cold email infrastructure provider',
    'Google Workspace for cold email',
    'affordable Google Workspace',
    'cold email deliverability',
    'email infrastructure setup',
    'SPF DMARC DKIM configuration',
    'primary inbox delivery',
    'DNS configuration for cold email',
    'email authentication service',
    'cold email setup service',
    'bulk email infrastructure',
    'Google Workspace reseller',
    'email deliverability experts',
  ],

  // Pricing
  pricing: {
    starter: {
      price: 2.5,
      currency: 'USD',
      period: 'mailbox',
    },
    professional: {
      price: 2.25,
      currency: 'USD',
      period: 'mailbox',
    },
    enterprise: {
      price: 'Custom',
      currency: 'USD',
      period: 'mailbox',
    },
  },

  // Service Features
  serviceFeatures: {
    setupTime: '10 minutes',
    guarantee: '30-day money-back',
    support: '24/7 chat support',
    deliverability: '98.7% inbox rate',
  },

  // Trust Badges
  certifications: ['SOC 2', 'GDPR Compliant', 'SSL Secured'],

  // Navigation
  navigation: {
    main: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Tools', href: '#tools' },
      { name: 'FAQ', href: '#faq' },
    ],
    footer: [
      {
        title: 'Product',
        links: [
          { name: 'Features', href: '#features' },
          { name: 'Pricing', href: '#pricing' },
          { name: 'Tools', href: '#tools' },
          { name: 'Integrations', href: '/integrations' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { name: 'Documentation', href: '/docs' },
          { name: 'Best Practices', href: '/resources/best-practices' },
          { name: 'Case Studies', href: '/resources/case-studies' },
          { name: 'Blog', href: '/blog' },
        ],
      },
      {
        title: 'Support',
        links: [
          { name: 'Help Center', href: '/support' },
          { name: 'Setup Assistance', href: '/support/setup' },
          { name: 'Contact Us', href: '/contact' },
          { name: 'Status', href: '/status' },
        ],
      },
      {
        title: 'Company',
        links: [
          { name: 'About', href: '/about' },
          { name: 'Privacy Policy', href: '/privacy' },
          { name: 'Terms of Service', href: '/terms' },
          { name: 'Cookie Policy', href: '/cookies' },
        ],
      },
    ],
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.coldinfra.com',
    timeout: 10000,
  },

  // Analytics
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    facebookPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
  },

  // Feature Flags
  features: {
    enableChat: true,
    enableBlog: false,
    enableDarkMode: false,
    enableMultiLanguage: false,
  },
} as const

export type SiteConfig = typeof siteConfig
