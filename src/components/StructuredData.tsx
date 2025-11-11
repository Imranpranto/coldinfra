import Script from 'next/script'

export function StructuredData() {
  return (
    <>
      <OrganizationSchema />
      <ProductSchema />
      <WebSiteSchema />
      <ServiceSchema />
      <BreadcrumbSchema />
    </>
  )
}

export function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "COLDINFRA",
    "description": "Complete cold email infrastructure setup service providing professional email accounts, domain configuration, and deliverability optimization.",
    "url": "https://coldinfra.com",
    "logo": "https://coldinfra.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-COLDINFRA",
      "contactType": "customer service",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://twitter.com/coldinfra",
      "https://linkedin.com/company/coldinfra"
    ],
    "founder": {
      "@type": "Person",
      "name": "COLDINFRA Founder"
    },
    "foundingDate": "2023",
    "numberOfEmployees": "10-50",
    "areaServed": "Worldwide",
    "serviceType": "Cold Email Infrastructure Setup"
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema)
      }}
    />
  )
}

export function ProductSchema() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "COLDINFRA Cold Email Infrastructure Setup",
    "description": "Complete cold email infrastructure setup service including Google Workspace accounts, domain configuration, email authentication, and deliverability optimization.",
    "brand": {
      "@type": "Brand",
      "name": "COLDINFRA"
    },
    "offers": {
      "@type": "Offer",
      "price": "2.50",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "2.50",
        "priceCurrency": "USD",
        "unitText": "per mailbox per month"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Chen"
        },
        "reviewBody": "COLDINFRA saved us $2,000/month on email infrastructure while improving our deliverability by 40%. Setup was literally 8 minutes."
      }
    ],
    "category": "Email Infrastructure Services",
    "serviceType": "Cold Email Infrastructure Setup"
  }

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productSchema)
      }}
    />
  )
}

export function FAQSchema({ faqs }: { faqs: Array<{question: string, answer: string}> }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema)
      }}
    />
  )
}

export function WebSiteSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "COLDINFRA",
    "alternateName": "COLDINFRA - Cold Email Infrastructure",
    "url": "https://coldinfra.com",
    "description": "Best cold email infrastructure provider offering Google Workspace at $2.50/mailbox with expert DNS configuration and 98.7% inbox rate",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://coldinfra.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema)
      }}
    />
  )
}

export function ServiceSchema() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Cold Email Infrastructure Setup",
    "name": "Cold Email Infrastructure Setup Service",
    "description": "Professional cold email infrastructure setup including Google Workspace accounts at $2.50/mailbox, DNS configuration (SPF, DMARC, DKIM), and deliverability optimization for 98.7% inbox rate",
    "provider": {
      "@type": "Organization",
      "name": "COLDINFRA",
      "url": "https://coldinfra.com"
    },
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cold Email Infrastructure Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Starter Plan",
            "description": "10-29 mailboxes at $3.00 per mailbox"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Growth Plan",
            "description": "30-99 mailboxes at $2.80 per mailbox"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Scale Plan",
            "description": "100+ mailboxes at $2.50 per mailbox"
          }
        }
      ]
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "2.50",
      "highPrice": "3.00",
      "offerCount": "3"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "247",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceSchema)
      }}
    />
  )
}

export function BreadcrumbSchema() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://coldinfra.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Features",
        "item": "https://coldinfra.com#features"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Pricing",
        "item": "https://coldinfra.com#pricing"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Tools",
        "item": "https://coldinfra.com#tools"
      }
    ]
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema)
      }}
    />
  )
}