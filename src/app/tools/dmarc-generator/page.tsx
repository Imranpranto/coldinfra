'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Download, Copy, CheckCircle2, Shield, ChevronDown, ChevronUp, AlertCircle, ArrowRight } from 'lucide-react'
import html2canvas from 'html2canvas'

export default function DmarcGeneratorPage() {
  const [domain, setDomain] = useState('')
  const [policy, setPolicy] = useState<'none' | 'quarantine' | 'reject'>('none')
  const [percentage, setPercentage] = useState(100)
  const [aggregateEmail, setAggregateEmail] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Advanced options
  const [subdomainPolicy, setSubdomainPolicy] = useState<'none' | 'quarantine' | 'reject'>('none')
  const [spfAlignment, setSpfAlignment] = useState<'relaxed' | 'strict'>('relaxed')
  const [dkimAlignment, setDkimAlignment] = useState<'relaxed' | 'strict'>('relaxed')
  const [reportingInterval, setReportingInterval] = useState(86400) // in seconds
  const [failureReporting, setFailureReporting] = useState<string[]>([])
  const [failureEmail, setFailureEmail] = useState('')

  const [dmarcRecord, setDmarcRecord] = useState('')
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

    if (!aggregateEmail.trim()) {
      newErrors.push('Aggregate reports email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(aggregateEmail)) {
      newErrors.push('Invalid aggregate email format')
    }

    if (failureEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(failureEmail)) {
      newErrors.push('Invalid failure email format')
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const generateDmarcRecord = () => {
    if (!validateInputs()) return

    let record = 'v=DMARC1'

    // Policy
    record += `; p=${policy}`

    // Subdomain policy
    if (showAdvanced && subdomainPolicy !== 'none') {
      record += `; sp=${subdomainPolicy}`
    }

    // Percentage
    if (percentage < 100) {
      record += `; pct=${percentage}`
    }

    // Aggregate reports
    record += `; rua=mailto:${aggregateEmail}`

    // Failure reports
    if (showAdvanced && failureEmail) {
      record += `; ruf=mailto:${failureEmail}`
    }

    // Alignment modes
    if (showAdvanced) {
      if (spfAlignment === 'strict') {
        record += `; aspf=s`
      }
      if (dkimAlignment === 'strict') {
        record += `; adkim=s`
      }
    }

    // Reporting interval
    if (showAdvanced && reportingInterval !== 86400) {
      record += `; ri=${reportingInterval}`
    }

    // Failure reporting options
    if (showAdvanced && failureReporting.length > 0) {
      record += `; fo=${failureReporting.join(':')}`
    }

    setDmarcRecord(record)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(dmarcRecord)
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
      link.download = `dmarc-record-${domain}-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const toggleFailureReporting = (option: string) => {
    setFailureReporting(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    )
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
                    <span className="text-sm font-semibold text-trust-green">Free Security Tool</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                    DMARC Generator for Cold Email
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Create DMARC records to protect your domains from email spoofing and improve deliverability.
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
                                Configure your DMARC policy
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

                          <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-700">
                              Policy Type
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {(['none', 'quarantine', 'reject'] as const).map((p) => (
                                <button
                                  key={p}
                                  onClick={() => setPolicy(p)}
                                  className={`px-3 py-2.5 rounded-xl font-medium transition-all text-sm ${
                                    policy === p
                                      ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                                      : 'bg-white/50 text-slate-700 hover:bg-white/80 border border-slate-200'
                                  }`}
                                >
                                  {p.charAt(0).toUpperCase() + p.slice(1)}
                                </button>
                              ))}
                            </div>
                            <p className="text-xs text-slate-500">
                              {policy === 'none' && 'Monitor only - no action taken'}
                              {policy === 'quarantine' && 'Move suspicious emails to spam'}
                              {policy === 'reject' && 'Block suspicious emails entirely'}
                            </p>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium text-slate-700">
                                Percentage of Messages
                              </label>
                              <Badge variant="secondary" className="bg-trust-green/10 text-trust-green border-trust-green/20">
                                {percentage}%
                              </Badge>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={percentage}
                              onChange={(e) => setPercentage(parseInt(e.target.value))}
                              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-trust-green"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                              <span>0%</span>
                              <span>100%</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">
                              Aggregate Reports Email
                            </label>
                            <Input
                              type="email"
                              value={aggregateEmail}
                              onChange={(e) => setAggregateEmail(e.target.value.toLowerCase())}
                              placeholder="e.g., dmarc-reports@example.com"
                              className="bg-white/50 border-slate-200 h-12"
                            />
                            <p className="text-xs text-slate-500">
                              Email address to receive aggregate reports
                            </p>
                          </div>
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
                                Subdomain Policy
                              </label>
                              <div className="grid grid-cols-3 gap-2">
                                {(['none', 'quarantine', 'reject'] as const).map((p) => (
                                  <button
                                    key={p}
                                    onClick={() => setSubdomainPolicy(p)}
                                    className={`px-3 py-2 rounded-xl font-medium transition-all text-sm ${
                                      subdomainPolicy === p
                                        ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                                        : 'bg-white/50 text-slate-700 hover:bg-white/80 border border-slate-200'
                                    }`}
                                  >
                                    {p.charAt(0).toUpperCase() + p.slice(1)}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  SPF Alignment
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {(['relaxed', 'strict'] as const).map((mode) => (
                                    <button
                                      key={mode}
                                      onClick={() => setSpfAlignment(mode)}
                                      className={`px-3 py-2 rounded-xl font-medium transition-all text-xs ${
                                        spfAlignment === mode
                                          ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                                          : 'bg-white/50 text-slate-700 hover:bg-white/80 border border-slate-200'
                                      }`}
                                    >
                                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  DKIM Alignment
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {(['relaxed', 'strict'] as const).map((mode) => (
                                    <button
                                      key={mode}
                                      onClick={() => setDkimAlignment(mode)}
                                      className={`px-3 py-2 rounded-xl font-medium transition-all text-xs ${
                                        dkimAlignment === mode
                                          ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                                          : 'bg-white/50 text-slate-700 hover:bg-white/80 border border-slate-200'
                                      }`}
                                    >
                                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Reporting Interval (seconds)
                              </label>
                              <Input
                                type="number"
                                value={reportingInterval}
                                onChange={(e) => setReportingInterval(parseInt(e.target.value))}
                                className="bg-white/50 border-slate-200"
                              />
                              <p className="text-xs text-slate-500 mt-1">
                                Default: 86400 (24 hours)
                              </p>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Failure Reporting Options
                              </label>
                              <div className="space-y-2">
                                {[
                                  { value: '0', label: 'Generate reports if all mechanisms fail' },
                                  { value: '1', label: 'Generate reports if any mechanism fails' },
                                  { value: 'd', label: 'Generate reports if DKIM fails' },
                                  { value: 's', label: 'Generate reports if SPF fails' },
                                ].map((option) => (
                                  <label
                                    key={option.value}
                                    className="flex items-center gap-2 p-2 bg-white/50 rounded-lg cursor-pointer hover:bg-white/80 border border-slate-200/50"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={failureReporting.includes(option.value)}
                                      onChange={() => toggleFailureReporting(option.value)}
                                      className="w-4 h-4 text-trust-green rounded"
                                    />
                                    <span className="text-sm text-slate-700">{option.label}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Failure Reports Email (Optional)
                              </label>
                              <Input
                                type="email"
                                value={failureEmail}
                                onChange={(e) => setFailureEmail(e.target.value.toLowerCase())}
                                placeholder="e.g., dmarc-failures@example.com"
                                className="bg-white/50 border-slate-200"
                              />
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    </div>

                    <Button
                      onClick={generateDmarcRecord}
                      className="w-full bg-gradient-to-r from-trust-green to-trust-green-dark hover:from-trust-green-dark hover:to-trust-green text-white shadow-lg shadow-trust-green/30 group h-12"
                      size="lg"
                    >
                      <span>Generate DMARC Record</span>
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
                    {dmarcRecord && (
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
                                <div className="text-2xl font-bold text-trust-green capitalize">{policy}</div>
                                <div className="text-xs text-slate-600 mt-1">Policy</div>
                              </div>
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-emerald-600">{percentage}%</div>
                                <div className="text-xs text-slate-600 mt-1">Coverage</div>
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
                              Generated DMARC Record
                            </CardTitle>
                            {dmarcRecord && (
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
                            {dmarcRecord
                              ? 'Your DMARC record is ready to publish'
                              : 'Configure settings and generate your DMARC record'
                            }
                          </CardDescription>
                        </CardHeader>

                        <CardContent>
                          <div ref={resultsRef}>
                            {!dmarcRecord ? (
                              <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200/50">
                                  <Shield className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Generate</h3>
                                <p className="text-slate-600">
                                  Fill in your domain details and click Generate to create your DMARC record.
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <div className="p-4 bg-slate-900 rounded-xl">
                                  <code className="text-sm text-emerald-400 break-all">
                                    {dmarcRecord}
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
                                      <span className="col-span-2 font-mono">_dmarc.{domain || 'your-domain.com'}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                      <span className="font-medium">Value:</span>
                                      <span className="col-span-2 font-mono break-all">{dmarcRecord}</span>
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
                    {dmarcRecord && (
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />

                        <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                          <CardHeader>
                            <CardTitle className="text-xl font-bold text-slate-900">
                              How to Publish
                            </CardTitle>
                            <CardDescription>
                              Follow these steps to add your DMARC record
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
                                <span>Navigate to your DNS management or DNS records section</span>
                              </li>
                              <li className="flex gap-3">
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-trust-green/10 flex items-center justify-center">
                                  <span className="text-sm font-bold text-trust-green">3</span>
                                </div>
                                <span>Add a new TXT record with the information above</span>
                              </li>
                              <li className="flex gap-3">
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-trust-green/10 flex items-center justify-center">
                                  <span className="text-sm font-bold text-trust-green">4</span>
                                </div>
                                <span>Wait for DNS propagation (can take 24-48 hours)</span>
                              </li>
                              <li className="flex gap-3">
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-trust-green/10 flex items-center justify-center">
                                  <span className="text-sm font-bold text-trust-green">5</span>
                                </div>
                                <span>Verify your DMARC record using online validation tools</span>
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
