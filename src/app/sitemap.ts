import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://coldinfra.com'
  
  // Static pages
  const staticPages = [
    '',
    '/pricing',
    '/about',
    '/contact',
    '/privacy',
    '/terms'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' as const : 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Tool pages (13 calculators)
  const toolPages = [
    'cold-email-cost-calculator',
    'cold-email-roi-calculator',
    'cold-email-volume-calculator',
    'cold-email-domain-generator',
    'dmarc-generator',
    'email-generator',
    'spf-generator',
    'marketing-budget-calculator',
    'sales-pipeline-calculator',
    'sales-compensation-calculator',
    'sales-forecasting-calculator',
    'email-signature-generator',
    'cold-email-deliverability-analyzer'
  ].map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...toolPages]
}