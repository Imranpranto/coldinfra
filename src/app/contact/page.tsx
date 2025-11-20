'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.enum(['sales', 'support', 'billing', 'partnership', 'other'], {
    required_error: 'Please select a subject',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      setSubmitted(true)
      reset()
      window.scrollTo({ top: 0, behavior: 'smooth' })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error('Contact submission error:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Grid Pattern Overlay - Whole Page */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main id="main-content">
          <Section padding="xl" className="bg-transparent">
            <Container>
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 rounded-full mb-4">
                    <div className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-trust-green">We're Here to Help</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight">
                    Contact Us
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
                    Have questions? Send us a message and we'll get back to you within 24 hours.
                  </p>
                </div>

                {/* Success Message */}
                {submitted && (
                  <div className="max-w-2xl mx-auto mb-6 p-4 md:p-6 bg-trust-green/10 border-2 border-trust-green/30 rounded-xl animate-slide-down">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-trust-green/20 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 md:w-6 md:h-6 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">Message Sent Successfully!</h3>
                        <p className="text-sm md:text-base text-slate-600">
                          Thank you for contacting us. We'll get back to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="max-w-2xl mx-auto mb-6 p-4 md:p-6 bg-red-50 border-2 border-red-200 rounded-xl animate-shake">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-red-800 mb-1">Submission Failed</h3>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setError(null)}
                        className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Contact Form - Centered */}
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-slate-200 p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl shadow-slate-900/5">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {/* Name Field */}
                      <div>
                        <Label htmlFor="name" className="mb-2 block text-slate-700">
                          Full Name <span className="text-danger">*</span>
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          {...register('name')}
                          className={`h-12 text-slate-700 placeholder:text-slate-700 ${
                            errors.name ? 'border-danger' : 'border-slate-300'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-danger text-sm mt-1.5">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <Label htmlFor="email" className="mb-2 block text-slate-700">
                          Email Address <span className="text-danger">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          {...register('email')}
                          className={`h-12 text-slate-700 placeholder:text-slate-700 ${
                            errors.email ? 'border-danger' : 'border-slate-300'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-danger text-sm mt-1.5">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Subject Field */}
                      <div>
                        <Label htmlFor="subject" className="mb-2 block text-slate-700">
                          Subject <span className="text-danger">*</span>
                        </Label>
                        <select
                          id="subject"
                          {...register('subject')}
                          className={`w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors text-slate-700 ${
                            errors.subject ? 'border-danger' : 'border-slate-300'
                          }`}
                        >
                          <option value="" className="text-slate-500">Select a subject</option>
                          <option value="sales" className="text-slate-900">Sales Inquiry</option>
                          <option value="support" className="text-slate-900">Technical Support</option>
                          <option value="billing" className="text-slate-900">Billing Question</option>
                          <option value="partnership" className="text-slate-900">Partnership Opportunity</option>
                          <option value="other" className="text-slate-900">Other</option>
                        </select>
                        {errors.subject && (
                          <p className="text-danger text-sm mt-1.5">{errors.subject.message}</p>
                        )}
                      </div>

                      {/* Message Field */}
                      <div>
                        <Label htmlFor="message" className="mb-2 block text-slate-700">
                          Message <span className="text-danger">*</span>
                        </Label>
                        <textarea
                          id="message"
                          rows={6}
                          placeholder="Tell us how we can help..."
                          {...register('message')}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors resize-none text-slate-700 placeholder:text-slate-700 ${
                            errors.message ? 'border-danger' : 'border-slate-300'
                          }`}
                        />
                        {errors.message && (
                          <p className="text-danger text-sm mt-1.5">{errors.message.message}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-trust-green hover:bg-trust-green-dark text-white font-semibold shadow-lg shadow-trust-green/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </form>
                  </div>

                  {/* Contact Info Below Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
                    <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-slate-200/50 p-4 md:p-6 text-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-trust-green/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2 text-sm md:text-base">Email Us</h3>
                      <a
                        href="mailto:support@coldinfra.com"
                        className="text-slate-600 hover:text-trust-green transition-colors text-sm md:text-base"
                      >
                        support@coldinfra.com
                      </a>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl rounded-xl border border-slate-200/50 p-4 md:p-6 text-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-trust-green/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-trust-green" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2 text-sm md:text-base">Response Time</h3>
                      <p className="text-slate-600 text-sm md:text-base">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          {/* Simple CTA */}
          <Section padding="lg" className="bg-transparent">
            <Container>
              <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-trust-green to-trust-green-dark rounded-2xl p-6 md:p-8 lg:p-12 text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                  Prefer to Schedule a Call?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 md:mb-6 px-4">
                  Book a free 15-minute consultation with our team to discuss your cold email infrastructure needs.
                </p>
                <a
                  href="/book-call"
                  className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-trust-green font-semibold rounded-xl hover:bg-slate-50 transition-colors duration-200 shadow-lg text-sm md:text-base"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
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
    </div>
  )
}
