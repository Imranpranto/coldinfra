'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Copy, CheckCircle2, Mail, User, AlertCircle } from 'lucide-react'
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
    <>
      <Header />
      <main id="main-content">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Gradient Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-trust-green/20 to-emerald-600/20 rounded-full blur-3xl" />

          <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-xl border border-white/20 rounded-full mb-6">
            <Mail className="w-4 h-4 text-trust-green" />
            <span className="text-sm font-medium text-slate-700">Email Generator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-trust-green via-emerald-600 to-trust-green-dark bg-clip-text text-transparent">
            Email Generator for Cold Email
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Generate professional email addresses from full names
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <User className="w-6 h-6 text-trust-green" />
                    User Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Domain
                    </label>
                    <Input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value.toLowerCase())}
                      placeholder="e.g., example.com"
                      className="bg-white/50 border-slate-200"
                    />
                    <p className="text-xs text-slate-500 mt-1">
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
                      className="bg-white/50 border-slate-200"
                    />
                    <p className="text-xs text-slate-500 mt-1">
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
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>1</span>
                      <span>5</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Maximum 5 variations
                    </p>
                  </div>

                  <Button
                    onClick={generateEmails}
                    className="w-full bg-gradient-to-r from-trust-green to-emerald-600 hover:from-emerald-600 hover:to-trust-green text-white shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Generate Email Addresses
                  </Button>

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
                </CardContent>
              </Card>
            </div>

            {/* Pattern Information */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl">Username Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-slate-700">
                    <p className="font-medium">Generated patterns include:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>First name only</li>
                      <li>First name + 1 letter from last name</li>
                      <li>First name + 2 letters from last name</li>
                      <li>First name + 3 letters from last name</li>
                      <li>First name + 4 letters from last name</li>
                    </ul>
                    <p className="text-xs text-slate-500 mt-3">
                      All usernames are automatically converted to lowercase
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Mail className="w-6 h-6 text-trust-green" />
                      Generated Emails
                    </CardTitle>
                    {emails.length > 0 && (
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        size="sm"
                        className="border-trust-green/30 hover:bg-trust-green/10"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div ref={resultsRef}>
                    {emails.length === 0 ? (
                      <div className="text-center py-12">
                        <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">
                          Enter information and generate email addresses
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

            {/* Next Steps */}
            {emails.length > 0 && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
                <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3 text-sm text-slate-700">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          1
                        </span>
                        <span>Choose your preferred email address pattern</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        <span>Create the email account in your email provider (Google Workspace, Microsoft 365, etc.)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          3
                        </span>
                        <span>Configure email authentication (SPF, DKIM, DMARC)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          4
                        </span>
                        <span>Warm up your email account before starting cold outreach</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          5
                        </span>
                        <span>Start your cold email campaigns with proper sending limits</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
