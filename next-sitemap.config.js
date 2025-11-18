/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://coldinfra.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml', '/api/*', '/_next/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
        crawlDelay: 0,
      },
    ],
    additionalSitemaps: [
      'https://coldinfra.com/sitemap.xml',
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom priority and changefreq for different paths
    const customPriority = {
      '/': 1.0,
      '/tools': 0.9,
      '/pricing': 0.9,
      '/tools/roi-calculator': 0.8,
      '/tools/email-volume-calculator': 0.8,
      '/tools/domain-generator': 0.7,
      '/tools/dmarc-generator': 0.7,
      '/tools/spf-generator': 0.7,
      '/tools/email-generator': 0.7,
      '/tools/cost-calculator': 0.7,
      '/tools/compensation-calculator': 0.6,
      '/tools/forecasting-calculator': 0.6,
      '/about': 0.6,
      '/contact': 0.7,
      '/book-call': 0.8,
      '/privacy': 0.4,
      '/terms': 0.4,
      '/refund-policy': 0.4,
      '/careers': 0.5,
      '/resources': 0.7,
    }

    const customChangefreq = {
      '/': 'daily',
      '/tools': 'weekly',
      '/pricing': 'weekly',
      '/tools/roi-calculator': 'monthly',
      '/tools/email-volume-calculator': 'monthly',
      '/resources': 'weekly',
    }

    return {
      loc: path,
      changefreq: customChangefreq[path] || 'monthly',
      priority: customPriority[path] || 0.5,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}
