'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null)

  const jobs = [
    {
      title: "Full Stack JS Developer",
      type: "Full-Time",
      location: "Remote",
      department: "Engineering",
      experience: "3-5 years",
      description: "We're looking for a talented Full Stack JavaScript Developer to join our growing team and help build the future of cold email infrastructure.",
      responsibilities: [
        "Design, develop, and maintain scalable web applications using modern JavaScript frameworks",
        "Build and optimize RESTful APIs and microservices using Node.js",
        "Develop responsive and intuitive user interfaces using React.js or Next.js",
        "Collaborate with product managers and designers to implement new features",
        "Write clean, maintainable, and well-documented code",
        "Participate in code reviews and contribute to technical discussions",
        "Optimize application performance and ensure high availability",
        "Implement automated testing and CI/CD pipelines",
        "Troubleshoot and resolve technical issues in production environments"
      ],
      requirements: [
        "3-5 years of professional experience in full stack JavaScript development",
        "Strong proficiency in Node.js and Express.js (or similar backend frameworks)",
        "Expert knowledge of React.js, Next.js, or Vue.js",
        "Experience with TypeScript",
        "Solid understanding of RESTful API design and implementation",
        "Proficiency with SQL and NoSQL databases (PostgreSQL, MongoDB, Redis)",
        "Experience with Git and version control workflows",
        "Understanding of Docker and containerization",
        "Knowledge of cloud platforms (AWS, GCP, or Azure)",
        "Strong problem-solving and debugging skills",
        "Excellent communication and teamwork abilities",
        "Self-motivated and able to work independently in a remote environment"
      ],
      niceToHave: [
        "Experience with email infrastructure or deliverability systems",
        "Knowledge of DNS, SPF, DMARC, and DKIM protocols",
        "Familiarity with GraphQL",
        "Experience with serverless architecture",
        "Background in DevOps practices",
        "Contributions to open-source projects",
        "Experience with testing frameworks (Jest, Mocha, Cypress)",
        "Knowledge of Kubernetes and container orchestration"
      ],
      benefits: [
        "Competitive salary with equity options",
        "Fully remote work environment",
        "Flexible working hours",
        "Health, dental, and vision insurance",
        "Annual learning and development budget",
        "Latest tech equipment and tools",
        "Unlimited PTO policy",
        "Quarterly team retreats",
        "Work with cutting-edge technologies",
        "Opportunity to make significant impact in a growing startup"
      ]
    }
  ]

  return (
    <div className="relative min-h-screen bg-white">
      {/* Grid Pattern Overlay - Whole Page */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main id="main-content">
          <Section padding="xl" className="bg-transparent">

            <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 rounded-full mb-2">
                <div className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-trust-green">Join Our Team</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900">
                Build the Future of Cold Email Infrastructure
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Join a team that's revolutionizing email infrastructure for businesses worldwide. We're growing fast and looking for talented individuals who want to make an impact.
              </p>
            </div>
          </Container>
        </Section>

        {/* Why Join Section */}
        <Section padding="lg" className="bg-transparent">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why Join COLDINFRA?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Make an Impact",
                    description: "Work on products that directly impact thousands of businesses and their outbound success.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )
                  },
                  {
                    title: "Remote-First Culture",
                    description: "Work from anywhere with flexible hours. We believe in results, not time tracking.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    title: "Growth Opportunities",
                    description: "Learn from experienced engineers and grow your skills with our learning budget.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    )
                  },
                  {
                    title: "Modern Tech Stack",
                    description: "Work with cutting-edge technologies and contribute to technical decisions.",
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-xl rounded-xl border border-slate-200/50">
                    <div className="w-12 h-12 bg-trust-green/10 rounded-lg flex items-center justify-center flex-shrink-0 text-trust-green">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Open Positions */}
        <Section padding="lg" className="bg-transparent">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
                Open Positions ({jobs.length})
              </h2>

              <div className="space-y-6">
                {jobs.map((job, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 overflow-hidden">
                    {/* Job Header */}
                    <div className="p-6 lg:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center px-3 py-1 bg-trust-green/10 text-trust-green text-sm font-medium rounded-full">
                              {job.type}
                            </span>
                            <span className="inline-flex items-center gap-1 text-sm text-slate-600">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {job.location}
                            </span>
                            <span className="inline-flex items-center gap-1 text-sm text-slate-600">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              {job.department}
                            </span>
                          </div>
                        </div>
                        <Button
                          onClick={() => setSelectedJob(selectedJob === index ? null : index)}
                          className="bg-trust-green hover:bg-trust-green-dark text-white whitespace-nowrap"
                        >
                          {selectedJob === index ? 'Close Details' : 'View Details'}
                        </Button>
                      </div>

                      <p className="text-slate-600 leading-relaxed">{job.description}</p>
                    </div>

                    {/* Job Details */}
                    {selectedJob === index && (
                      <div className="border-t border-slate-200/50 p-6 lg:p-8 bg-slate-50/50 space-y-8">
                        {/* Responsibilities */}
                        <div>
                          <h4 className="text-xl font-semibold text-slate-900 mb-4">Responsibilities</h4>
                          <ul className="space-y-3">
                            {job.responsibilities.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-trust-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-slate-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Requirements */}
                        <div>
                          <h4 className="text-xl font-semibold text-slate-900 mb-4">Requirements</h4>
                          <ul className="space-y-3">
                            {job.requirements.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-trust-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-slate-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Nice to Have */}
                        <div>
                          <h4 className="text-xl font-semibold text-slate-900 mb-4">Nice to Have</h4>
                          <ul className="space-y-3">
                            {job.niceToHave.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-slate-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Benefits */}
                        <div>
                          <h4 className="text-xl font-semibold text-slate-900 mb-4">Benefits & Perks</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {job.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-trust-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-slate-600 text-sm">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Apply Button */}
                        <div className="pt-6 border-t border-slate-200">
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <a
                              href="mailto:careers@coldinfra.com?subject=Application for Full Stack JS Developer"
                              className="inline-flex items-center px-8 py-4 bg-trust-green text-white font-semibold rounded-xl hover:bg-trust-green-dark transition-colors duration-200 shadow-lg hover:shadow-xl"
                            >
                              Apply for this Position
                              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </a>
                            <p className="text-sm text-slate-600">
                              Send your resume and portfolio to <a href="mailto:careers@coldinfra.com" className="text-trust-green hover:underline">careers@coldinfra.com</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* No Position Match */}
        <Section padding="lg" className="bg-transparent">
          <Container>
            <div className="max-w-3xl mx-auto text-center bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 p-8 lg:p-12">
              <div className="w-16 h-16 bg-trust-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-trust-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Don't See the Right Position?
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                We're always looking for talented people. Send us your resume and tell us how you can contribute to COLDINFRA.
              </p>
              <a
                href="mailto:careers@coldinfra.com"
                className="inline-flex items-center px-8 py-4 bg-trust-green text-white font-semibold rounded-xl hover:bg-trust-green-dark transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Us Your Resume
              </a>
            </div>
          </Container>
        </Section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
