'use client'

import { useState } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here (e.g., send to API)
    console.log('Form submitted:', formData)
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main id="main-content">
        <Section background="default" padding="xl" className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/30" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 rounded-full mb-4">
                  <div className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-trust-green">We're Here to Help</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  Contact Us
                </h1>
                <p className="text-xl text-slate-600">
                  Have questions? Send us a message and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Contact Form - Centered */}
              <div className="max-w-2xl mx-auto">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 p-8 lg:p-12 shadow-lg">
                  {submitted ? (
                    <div className="p-6 bg-trust-green/10 border border-trust-green/30 rounded-xl text-center">
                      <div className="w-16 h-16 bg-trust-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h3>
                      <p className="text-slate-600">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors"
                        >
                          <option value="">Select a subject</option>
                          <option value="sales">Sales Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="partnership">Partnership Opportunity</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors resize-none"
                          placeholder="Tell us how we can help..."
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-trust-green hover:bg-trust-green-dark text-white py-4 text-lg font-semibold"
                      >
                        Send Message
                      </Button>
                    </form>
                  )}
                </div>

                {/* Contact Info Below Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-slate-200/50 p-6 text-center">
                    <div className="w-12 h-12 bg-trust-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">Email Us</h3>
                    <a href="mailto:support@coldinfra.com" className="text-slate-600 hover:text-trust-green transition-colors">
                      support@coldinfra.com
                    </a>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-slate-200/50 p-6 text-center">
                    <div className="w-12 h-12 bg-trust-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">Response Time</h3>
                    <p className="text-slate-600">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Simple CTA */}
        <Section background="default" padding="lg">
          <Container>
            <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-trust-green to-trust-green-dark rounded-2xl p-8 lg:p-12 text-white">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Prefer to Schedule a Call?
              </h2>
              <p className="text-lg text-white/90 mb-6">
                Book a free 15-minute consultation with our team to discuss your cold email infrastructure needs.
              </p>
              <a
                href="/book-call"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-trust-green font-semibold rounded-xl hover:bg-slate-50 transition-colors duration-200 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Book a Free Call
              </a>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
