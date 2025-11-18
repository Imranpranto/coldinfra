'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Download, Copy, CheckCircle2, Mail, User, AlertCircle, Hash, Globe, ArrowRight } from 'lucide-react'
import html2canvas from 'html2canvas'

interface EmailVariation {
  username: string
  email: string
  pattern: string
}

export default function EmailGeneratorPage() {
  const [domain, setDomain] = useState('')
  const [fullName, setFullName] = useState('')
  const [numUsers, setNumUsers] = useState(1)
  const [emails, setEmails] = useState<EmailVariation[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const resultsRef = useRef<HTMLDivElement>(null)

  const validateInputs = (): boolean => {
    const newErrors: string[] = []

    if (!domain.trim()) {
      newErrors.push('Domain is required')
    } else if (!/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(domain)) {
      newErrors.push('Invalid domain format (e.g., example.com)')
    }

    if (!fullName.trim()) {
      newErrors.push('Full name is required')
    }

    if (numUsers < 1 || numUsers > 5) {
      newErrors.push('Number of users must be between 1 and 5')
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const generateEmails = () => {
    if (!validateInputs()) return

    const names = fullName.trim().toLowerCase().split(' ').filter(n => n)
    if (names.length < 2) {
      setErrors(['Please enter both first and last name'])
      return
    }

    const firstName = names[0]
    const lastName = names[names.length - 1]
    const generated: EmailVariation[] = []

    // Pattern 1: First name only
    generated.push({
      username: firstName,
      email: `${firstName}@${domain}`,
      pattern: 'First name only'
    })

    // Pattern 2-5: First name + 1-4 letters from last name
    for (let i = 1; i <= Math.min(4, lastName.length); i++) {
      const username = firstName + lastName.substring(0, i)
      generated.push({
        username,
        email: `${username}@${domain}`,
        pattern: `First name + ${i} letter${i > 1 ? 's' : ''} from last name`
      })
    }

    // Limit to requested number of variations
    setEmails(generated.slice(0, Math.min(numUsers, generated.length)))
  }

  const handleCopy = async (email: string, index: number) => {
    await navigator.clipboard.writeText(email)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleDownload = async () => {
    if (resultsRef.current) {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `email-addresses-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main id="main-content">
          <Section padding="xl" className="bg-transparent">
            <Container>
              <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 rounded-full mb-4">
                    <div className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-trust-green">Free Generator Tool</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                    Cold Email Username Generator
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Generate professional email address variations from full names for your cold email campaigns.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />

                    <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                      <CardHeader className="space-y-1 pb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-trust-green to-emerald-600 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl font-bold text-slate-900">
                              User Information
                            </CardTitle>
                            <CardDescription className="text-slate-600">
                              Enter details to generate email addresses
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Domain
                          </label>
                          <Input
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value.toLowerCase())}
                            placeholder="e.g., example.com"
                            className="bg-white/50 border-slate-200 h-12"
                          />
                          <p className="text-xs text-slate-500 mt-1.5">
                            Enter your domain name
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Full Name
                          </label>
                          <Input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g., John Smith"
                            className="bg-white/50 border-slate-200 h-12"
                          />
                          <p className="text-xs text-slate-500 mt-1.5">
                            Enter first and last name
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Number of Variations: {numUsers}
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            value={numUsers}
                            onChange={(e) => setNumUsers(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-trust-green"
                          />
                          <div className="flex justify-between text-xs text-slate-500 mt-1.5">
                            <span>1</span>
                            <span>5</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1.5">
                            Maximum 5 variations
                          </p>
                        </div>

                        {errors.length > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-red-800 mb-1">Validation Errors</h4>
                                <ul className="list-disc list-inside space-y-1">
                                  {errors.map((error, index) => (
                                    <li key={index} className="text-sm text-red-700">{error}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button
                          onClick={generateEmails}
                          className="w-full bg-gradient-to-r from-trust-green to-emerald-600 hover:from-emerald-600 hover:to-trust-green text-white shadow-lg hover:shadow-xl transition-all"
                          size="lg"
                        >
                          <Mail className="w-5 h-5 mr-2" />
                          Generate Email Addresses
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Results Section */}
                  <div className="space-y-6">
                    {/* Row 1: Summary Stats (only show when emails generated) */}
                    {emails.length > 0 && (
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />

                        <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-semibold text-slate-900">
                              Generation Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-trust-green">{emails.length}</div>
                                <div className="text-xs text-slate-600 mt-1">Variations</div>
                              </div>
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-emerald-600 capitalize">{domain || '—'}</div>
                                <div className="text-xs text-slate-600 mt-1">Domain</div>
                              </div>
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-blue-600">
                                  <CheckCircle2 className="w-6 h-6 mx-auto" />
                                </div>
                                <div className="text-xs text-slate-600 mt-1">Ready</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {/* Row 2: Generated Email List */}
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />

                      <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                        <CardHeader className="space-y-1 pb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                <Mail className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-2xl font-bold text-slate-900">
                                  Generated Emails
                                </CardTitle>
                                <CardDescription className="text-slate-600">
                                  {emails.length > 0 ? `${emails.length} email address variations` : 'Enter details to generate'}
                                </CardDescription>
                              </div>
                            </div>
                            {emails.length > 0 && (
                              <Button
                                onClick={handleDownload}
                                variant="outline"
                                size="sm"
                                className="border-trust-green/30 hover:bg-trust-green/10 text-trust-green"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Export
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div ref={resultsRef}>
                            {emails.length === 0 ? (
                              <div className="text-center py-16">
                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                  <Mail className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                  No emails generated yet
                                </h3>
                                <p className="text-slate-500 text-sm">
                                  Enter your domain and full name to generate professional email addresses
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {emails.map((item, index) => (
                                  <div
                                    key={index}
                                    className="p-4 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl hover:shadow-md transition-all group"
                                  >
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-trust-green to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                                            {index + 1}
                                          </div>
                                          <div>
                                            <p className="font-semibold text-slate-800 break-all">
                                              {item.email}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                              {item.pattern}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="ml-11 p-2 bg-slate-100 rounded-lg">
                                          <p className="text-xs text-slate-600">
                                            <span className="font-medium">Username:</span>{' '}
                                            <code className="text-trust-green">{item.username}</code>
                                          </p>
                                        </div>
                                      </div>
                                      <Button
                                        onClick={() => handleCopy(item.email, index)}
                                        variant="ghost"
                                        size="sm"
                                        className="flex-shrink-0"
                                      >
                                        {copiedIndex === index ? (
                                          <CheckCircle2 className="w-4 h-4 text-trust-green" />
                                        ) : (
                                          <Copy className="w-4 h-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Username Patterns Info */}
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-50" />

                      <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                        <CardHeader className="space-y-1 pb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                              <Hash className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl font-bold text-slate-900">
                                Pattern Information
                              </CardTitle>
                              <CardDescription className="text-slate-600">
                                How email variations are generated
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg border border-slate-100">
                              <div className="w-6 h-6 rounded-full bg-trust-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-trust-green">1</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900">First name only</p>
                                <p className="text-xs text-slate-500 mt-0.5">Simple and clean format</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg border border-slate-100">
                              <div className="w-6 h-6 rounded-full bg-trust-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-trust-green">2-5</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900">First name + last name letters</p>
                                <p className="text-xs text-slate-500 mt-0.5">Adds 1-4 letters from last name for uniqueness</p>
                              </div>
                            </div>
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                              <p className="text-xs text-blue-900">
                                <strong>Note:</strong> All usernames are automatically converted to lowercase for email compatibility.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          {/* CTA Section */}
          <Section padding="lg" className="bg-transparent">
            <Container>
              <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-trust-green to-trust-green-dark rounded-2xl p-8 lg:p-12 text-white">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Ready to Scale Your Cold Email?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Get Google Workspace mailboxes at $2.50/month with COLDINFRA and start your cold email campaigns today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-trust-green hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
                  >
                    <a href="/book-call">
                      Book a Call
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <a href="/tools">
                      <Mail className="mr-2 w-5 h-5" />
                      More Tools
                    </a>
                  </Button>
                </div>
              </div>
            </Container>
          </Section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
