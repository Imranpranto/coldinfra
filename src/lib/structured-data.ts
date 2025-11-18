// Structured Data (JSON-LD) for SEO

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'COLDINFRA',
  url: 'https://www.coldinfra.com',
  logo: 'https://www.coldinfra.com/logo.png',
  description:
    'Professional cold email infrastructure and managed mailboxes provider. Expert email deliverability solutions for B2B sales and marketing teams.',
  sameAs: [
    'https://twitter.com/coldinfra',
    'https://www.linkedin.com/company/coldinfra',
    'https://github.com/coldinfra',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'support@coldinfra.com',
    availableLanguage: ['en'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
}

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'COLDINFRA',
  url: 'https://www.coldinfra.com',
  description: 'Professional cold email infrastructure and managed mailboxes',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.coldinfra.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cold Email Infrastructure Management',
  provider: {
    '@type': 'Organization',
    name: 'COLDINFRA',
    url: 'https://www.coldinfra.com',
  },
  description:
    'Professional cold email infrastructure setup and management. Managed mailboxes, domain configuration, deliverability optimization, and expert support.',
  serviceType: 'Email Infrastructure Management',
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  offers: {
    '@type': 'Offer',
    price: '2.50',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '2.50',
      priceCurrency: 'USD',
      unitText: 'mailbox per month',
    },
  },
}

export const BREADCRUMB_SCHEMA = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const PRODUCT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'COLDINFRA Managed Mailboxes',
  description:
    'Professional managed mailboxes for cold email outreach. Premium infrastructure with expert setup and deliverability optimization.',
  brand: {
    '@type': 'Brand',
    name: 'COLDINFRA',
  },
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '2.50',
    highPrice: '3.00',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '2.50',
      priceCurrency: 'USD',
      unitText: 'mailbox per month',
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '150',
  },
}

export const SOFTWARE_APPLICATION_SCHEMA = (tool: {
  name: string
  description: string
  url: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: tool.name,
  applicationCategory: 'BusinessApplication',
  description: tool.description,
  url: tool.url,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  operatingSystem: 'Web Browser',
})

export const FAQ_SCHEMA = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})
