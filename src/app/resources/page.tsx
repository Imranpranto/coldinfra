import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Expert insights, guides, and best practices for cold email infrastructure and deliverability.',
  robots: {
    index: true,
    follow: true,
  },
}

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Cold Email Infrastructure',
    excerpt: 'Learn the fundamentals of setting up a robust cold email infrastructure that delivers results. From DNS configuration to inbox placement optimization.',
    date: '2024-03-15',
    category: 'Getting Started',
    readTime: '8 min read',
    slug: 'getting-started-cold-email-infrastructure'
  },
  {
    id: 2,
    title: 'Complete Guide to SPF, DKIM, and DMARC Setup',
    excerpt: 'Master email authentication protocols to improve deliverability and protect your domain reputation. Step-by-step configuration guide with examples.',
    date: '2024-03-10',
    category: 'Technical Guide',
    readTime: '12 min read',
    slug: 'spf-dkim-dmarc-setup-guide'
  },
  {
    id: 3,
    title: 'How to Scale Your Cold Email Campaigns to 10,000+ Sends',
    excerpt: 'Proven strategies for scaling your cold email operations while maintaining high deliverability and inbox placement rates.',
    date: '2024-03-05',
    category: 'Best Practices',
    readTime: '10 min read',
    slug: 'scale-cold-email-campaigns'
  },
  {
    id: 4,
    title: 'Understanding Email Deliverability: The Complete 2024 Guide',
    excerpt: 'Everything you need to know about email deliverability, spam filters, and inbox placement. Learn how to optimize for the best results.',
    date: '2024-02-28',
    category: 'Deliverability',
    readTime: '15 min read',
    slug: 'email-deliverability-guide-2024'
  }
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <Section background="default" padding="lg" className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/30" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 rounded-full mb-4">
                <div className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-trust-green">Expert Insights</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Resources & Guides
              </h1>
              <p className="text-xl text-slate-600">
                Expert insights, guides, and best practices for cold email infrastructure and deliverability optimization.
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Featured Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-trust-green/20 via-trust-green/10 to-slate-100 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-trust-green/30" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category & Date */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center px-3 py-1 bg-trust-green/10 text-trust-green text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-slate-500">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-trust-green transition-colors duration-200">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                      <time className="text-sm text-slate-500">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                      <Link
                        href={`/resources/${post.slug}`}
                        className="inline-flex items-center gap-2 text-trust-green font-semibold hover:gap-3 transition-all duration-200"
                      >
                        Read More
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section background="default" padding="lg">
          <Container>
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-trust-green to-trust-green-dark rounded-2xl p-8 lg:p-12 text-white">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/90 mb-6">
                Set up your cold email infrastructure in just 10 minutes at $2.50/mailbox.
              </p>
              <Link
                href="/book-call"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-trust-green font-semibold rounded-xl hover:bg-slate-50 transition-colors duration-200 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Book a Free Call
              </Link>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
