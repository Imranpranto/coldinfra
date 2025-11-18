'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Download, Copy, CheckCircle2, Shield, ChevronDown, ChevronUp, AlertCircle, ArrowRight, Plus, X } from 'lucide-react'
import html2canvas from 'html2canvas'

const ESP_PROVIDERS = {
  'Microsoft 365': 'include:spf.protection.outlook.com',
  'Google Workspace': 'include:_spf.google.com',
  'Amazon SES': 'include:amazonses.com',
  'SendGrid': 'include:sendgrid.net',
  'Mailgun': 'include:mailgun.org',
  'Postmark': 'include:spf.mtasv.net',
  'Mailchimp': 'include:servers.mcsv.net',
  'Custom': ''
}

export default function SpfGeneratorPage() {
  const [domain, setDomain] = useState('')
  const [espProvider, setEspProvider] = useState<keyof typeof ESP_PROVIDERS>('Google Workspace')
  const [customInclude, setCustomInclude] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Advanced options
  const [includeMX, setIncludeMX] = useState(false)
  const [includeA, setIncludeA] = useState(false)
  const [includePTR, setIncludePTR] = useState(false)
  const [ipAddresses, setIpAddresses] = useState<string[]>([''])

  const [spfRecord, setSpfRecord] = useState('')
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const resultsRef = useRef<HTMLDivElement>(null)

  const validateInputs = (): boolean => {
    const newErrors: string[] = []

    if (!domain.trim()) {
      newErrors.push('Domain is required')
    } else if (!/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(domain)) {
      newErrors.push('Invalid domain format')
    }

    if (espProvider === 'Custom' && !customInclude.trim()) {
      newErrors.push('Custom include value is required when Custom is selected')
    }

    // Validate IP addresses if provided
    const validIPs = ipAddresses.filter(ip => ip.trim())
    validIPs.forEach(ip => {
      const trimmedIP = ip.trim()
      // Basic IP validation (IPv4)
      if (!/^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/.test(trimmedIP)) {
        newErrors.push(`Invalid IP address format: ${trimmedIP}`)
      }
    })

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const generateSpfRecord = () => {
    if (!validateInputs()) return

    let record = 'v=spf1'

    // Add mechanisms
    if (showAdvanced) {
      if (includeMX) record += ' mx'
      if (includeA) record += ' a'
      if (includePTR) record += ' ptr'
    }

    // Add IP addresses
    const validIPs = ipAddresses.filter(ip => ip.trim())
    validIPs.forEach(ip => {
      const trimmedIP = ip.trim()
      if (trimmedIP.includes('/')) {
        record += ` ip4:${trimmedIP}`
      } else {
        record += ` ip4:${trimmedIP}`
      }
    })

    // Add ESP provider
    if (espProvider === 'Custom') {
      if (customInclude.trim()) {
        record += ` ${customInclude.trim()}`
      }
    } else {
      const providerSPF = ESP_PROVIDERS[espProvider]
      if (providerSPF) {
        record += ` ${providerSPF}`
      }
    }

    // Add final policy (always ~all for cold email)
    record += ' ~all'

    setSpfRecord(record)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(spfRecord)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = async () => {
    if (resultsRef.current) {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `spf-record-${domain}-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const addIPField = () => {
    setIpAddresses([...ipAddresses, ''])
  }

  const removeIPField = (index: number) => {
    setIpAddresses(ipAddresses.filter((_, i) => i !== index))
  }

  const updateIPAddress = (index: number, value: string) => {
    const newIPs = [...ipAddresses]
    newIPs[index] = value
    setIpAddresses(newIPs)
  }

  const mechanismsCount = [includeMX, includeA, includePTR].filter(Boolean).length
  const ipCount = ipAddresses.filter(ip => ip.trim()).length

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
                    <span className="text-sm font-semibold text-trust-green">Free Security Tool</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                    SPF Generator for Cold Email
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Create SPF records for email authentication and deliverability optimization.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input Form - Glassmorphic Style */}
                  <div className="space-y-6">
                    {/* Basic Configuration */}
                    <div className="relative">
                      {/* Glow Effect */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />

                      <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                        <CardHeader className="space-y-1 pb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-trust-green to-emerald-600 rounded-xl flex items-center justify-center">
                              <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl font-bold text-slate-900">
                                Basic Configuration
                              </CardTitle>
                              <CardDescription className="text-slate-600">
                                Configure your SPF record
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                              Domain
                            </label>
                            <Input
                              type="text"
                              value={domain}
                              onChange={(e) => setDomain(e.target.value.toLowerCase())}
                              placeholder="e.g., example.com"
                              className="bg-white/50 border-slate-200 h-12"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                              Email Service Provider
                            </label>
                            <select
                              value={espProvider}
                              onChange={(e) => setEspProvider(e.target.value as keyof typeof ESP_PROVIDERS)}
                              className="w-full h-12 px-4 py-2 bg-white/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-trust-green text-slate-700"
                            >
                              {Object.keys(ESP_PROVIDERS).map((provider) => (
                                <option key={provider} value={provider}>
                                  {provider}
                                </option>
                              ))}
                            </select>
                            <p className="text-xs text-slate-500">
                              Select your primary email sending provider
                            </p>
                          </div>

                          {espProvider === 'Custom' && (
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-slate-700">
                                Custom Include
                              </label>
                              <Input
                                type="text"
                                value={customInclude}
                                onChange={(e) => setCustomInclude(e.target.value)}
                                placeholder="e.g., include:_spf.example.com"
                                className="bg-white/50 border-slate-200 h-12"
                              />
                              <p className="text-xs text-slate-500">
                                Enter the full include directive
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Advanced Options */}
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />

                      <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                        <CardHeader className="pb-3">
                          <button
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="w-full flex items-center justify-between text-left"
                          >
                            <CardTitle className="text-xl flex items-center gap-2">
                              <Shield className="w-5 h-5 text-trust-green" />
                              Advanced Options
                              {showAdvanced && (mechanismsCount > 0 || ipCount > 0) && (
                                <Badge variant="secondary" className="bg-trust-green/10 text-trust-green border-trust-green/20 ml-2">
                                  {mechanismsCount + ipCount} active
                                </Badge>
                              )}
                            </CardTitle>
                            {showAdvanced ? (
                              <ChevronUp className="w-5 h-5 text-slate-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-500" />
                            )}
                          </button>
                        </CardHeader>
                        {showAdvanced && (
                          <CardContent className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-3">
                                Mechanisms
                              </label>
                              <div className="space-y-2">
                                <label className="flex items-center gap-3 p-3 bg-white/50 rounded-lg cursor-pointer hover:bg-white/80 border border-slate-200/50">
                                  <input
                                    type="checkbox"
                                    checked={includeMX}
                                    onChange={(e) => setIncludeMX(e.target.checked)}
                                    className="w-4 h-4 text-trust-green rounded"
                                  />
                                  <div className="flex-1">
                                    <span className="text-sm font-medium text-slate-700">MX Records</span>
                                    <p className="text-xs text-slate-500">Allow domain's MX servers to send email</p>
                                  </div>
                                </label>

                                <label className="flex items-center gap-3 p-3 bg-white/50 rounded-lg cursor-pointer hover:bg-white/80 border border-slate-200/50">
                                  <input
                                    type="checkbox"
                                    checked={includeA}
                                    onChange={(e) => setIncludeA(e.target.checked)}
                                    className="w-4 h-4 text-trust-green rounded"
                                  />
                                  <div className="flex-1">
                                    <span className="text-sm font-medium text-slate-700">A Records</span>
                                    <p className="text-xs text-slate-500">Allow domain's A record IP to send email</p>
                                  </div>
                                </label>

                                <label className="flex items-center gap-3 p-3 bg-white/50 rounded-lg cursor-pointer hover:bg-white/80 border border-slate-200/50">
                                  <input
                                    type="checkbox"
                                    checked={includePTR}
                                    onChange={(e) => setIncludePTR(e.target.checked)}
                                    className="w-4 h-4 text-trust-green rounded"
                                  />
                                  <div className="flex-1">
                                    <span className="text-sm font-medium text-slate-700">PTR Records</span>
                                    <p className="text-xs text-slate-500">Allow reverse DNS verification (not recommended)</p>
                                  </div>
                                </label>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                IP Addresses (Optional)
                              </label>
                              <div className="space-y-2">
                                {ipAddresses.map((ip, index) => (
                                  <div key={index} className="flex gap-2">
                                    <Input
                                      type="text"
                                      value={ip}
                                      onChange={(e) => updateIPAddress(index, e.target.value)}
                                      placeholder="e.g., 192.168.1.1 or 192.168.1.0/24"
                                      className="bg-white/50 border-slate-200"
                                    />
                                    {ipAddresses.length > 1 && (
                                      <Button
                                        onClick={() => removeIPField(index)}
                                        variant="outline"
                                        size="sm"
                                        className="border-red-200 hover:bg-red-50 text-red-600"
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    )}
                                  </div>
                                ))}
                                <Button
                                  onClick={addIPField}
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-trust-green/30 hover:bg-trust-green/10 text-trust-green"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add IP Address
                                </Button>
                              </div>
                              <p className="text-xs text-slate-500 mt-2">
                                Add IPv4 addresses or CIDR ranges
                              </p>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    </div>

                    <Button
                      onClick={generateSpfRecord}
                      className="w-full bg-gradient-to-r from-trust-green to-trust-green-dark hover:from-trust-green-dark hover:to-trust-green text-white shadow-lg shadow-trust-green/30 group h-12"
                      size="lg"
                    >
                      <span>Generate SPF Record</span>
                      <Shield className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
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
                  </div>

                  {/* Results Display - Two Row Layout */}
                  <div className="space-y-6">
                    {/* Row 1: Summary Stats (only show when record generated) */}
                    {spfRecord && (
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />

                        <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-semibold text-slate-900">
                              Record Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-trust-green capitalize">{espProvider}</div>
                                <div className="text-xs text-slate-600 mt-1">Provider</div>
                              </div>
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-emerald-600">{mechanismsCount + ipCount}</div>
                                <div className="text-xs text-slate-600 mt-1">Options</div>
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

                    {/* Row 2: Generated Record */}
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />

                      <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                        <CardHeader className="space-y-1 pb-4">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-bold text-slate-900">
                              Generated SPF Record
                            </CardTitle>
                            {spfRecord && (
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleCopy}
                                  variant="outline"
                                  size="sm"
                                  className="gap-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm border-slate-200/50"
                                >
                                  {copied ? (
                                    <CheckCircle2 className="w-4 h-4 text-trust-green" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                  Copy
                                </Button>
                                <Button
                                  onClick={handleDownload}
                                  variant="outline"
                                  size="sm"
                                  className="gap-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm border-slate-200/50"
                                >
                                  <Download className="w-4 h-4" />
                                  PNG
                                </Button>
                              </div>
                            )}
                          </div>
                          <CardDescription className="text-slate-600">
                            {spfRecord
                              ? 'Your SPF record is ready to publish'
                              : 'Configure settings and generate your SPF record'
                            }
                          </CardDescription>
                        </CardHeader>

                        <CardContent>
                          <div ref={resultsRef}>
                            {!spfRecord ? (
                              <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200/50">
                                  <Shield className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Generate</h3>
                                <p className="text-slate-600">
                                  Select your email provider and click Generate to create your SPF record.
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="p-4 bg-slate-900 rounded-xl">
                                  <code className="text-sm text-emerald-400 break-all">
                                    {spfRecord}
                                  </code>
                                </div>

                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    DNS Record Information
                                  </h4>
                                  <div className="space-y-2 text-sm text-blue-800">
                                    <div className="grid grid-cols-3 gap-2">
                                      <span className="font-medium">Type:</span>
                                      <span className="col-span-2">TXT</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                      <span className="font-medium">Host/Name:</span>
                                      <span className="col-span-2 font-mono">@</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                      <span className="font-medium">Value:</span>
                                      <span className="col-span-2 font-mono break-all">{spfRecord}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                      <span className="font-medium">TTL:</span>
                                      <span className="col-span-2">3600 (or default)</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* How to Publish Instructions */}
                    {spfRecord && (
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />

                        <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                          <CardHeader>
                            <CardTitle className="text-xl font-bold text-slate-900">
                              How to Publish
                            </CardTitle>
                            <CardDescription>
                              Follow these steps to add your SPF record
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ol className="space-y-3 text-sm text-slate-700">
                              <li className="flex gap-3">
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-trust-green/10 flex items-center justify-center">
                                  <span className="text-sm font-bold text-trust-green">1</span>
                                </div>
                                <span>Log in to your DNS provider (where you manage your domain)</span>
                              </li>
                              <li className="flex gap-3">
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-trust-green/10 flex items-center justify-center">
                                  <span className="text-sm font-bold text-trust-green">2</span>
                                </div>
                                <span>Navigate to DNS records section for your domain</span>
                              </li>
                              <li className="flex gap-3">
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-trust-green/10 flex items-center justify-center">
                                  <span className="text-sm font-bold text-trust-green">3</span>
                                </div>
                                <span>Add a new TXT record with host "@" and the generated value</span>
                              </li>
                              <li className="flex gap-3">
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-trust-green/10 flex items-center justify-center">
                                  <span className="text-sm font-bold text-trust-green">4</span>
                                </div>
                                <span>Wait for DNS propagation (typically 24-48 hours)</span>
                              </li>
                              <li className="flex gap-3">
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-trust-green/10 flex items-center justify-center">
                                  <span className="text-sm font-bold text-trust-green">5</span>
                                </div>
                                <span>Verify using SPF record checker tools</span>
                              </li>
                            </ol>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Container>
          </Section>

          {/* CTA Section */}
          <Section padding="lg" className="bg-transparent">
            <Container>
              <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-trust-green to-trust-green-dark rounded-2xl p-8 lg:p-12 text-white">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                  Need Help with Email Authentication?
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  COLDINFRA handles all DNS configuration including SPF, DMARC, and DKIM setup for optimal deliverability.
                </p>
                <a
                  href="/book-call"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-trust-green font-semibold rounded-xl hover:bg-slate-50 transition-colors duration-200 shadow-lg"
                >
                  Get Expert Help
                  <ArrowRight className="w-4 h-4" />
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
