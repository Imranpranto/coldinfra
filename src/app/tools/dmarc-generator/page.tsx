'use client'

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Copy, CheckCircle2, Shield, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
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
            <Shield className="w-4 h-4 text-trust-green" />
            <span className="text-sm font-medium text-slate-700">DMARC Generator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-trust-green via-emerald-600 to-trust-green-dark bg-clip-text text-transparent">
            DMARC Generator for Cold Email
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Create DMARC records to protect your domains from email spoofing
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Basic Configuration */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Shield className="w-6 h-6 text-trust-green" />
                    Basic Configuration
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Policy Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['none', 'quarantine', 'reject'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPolicy(p)}
                          className={`px-3 py-2 rounded-xl font-medium transition-all text-sm ${
                            policy === p
                              ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                              : 'bg-white/50 text-slate-700 hover:bg-white/80'
                          }`}
                        >
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      {policy === 'none' && 'Monitor only - no action taken'}
                      {policy === 'quarantine' && 'Move suspicious emails to spam'}
                      {policy === 'reject' && 'Block suspicious emails entirely'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Percentage of Messages: {percentage}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={percentage}
                      onChange={(e) => setPercentage(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-trust-green"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Aggregate Reports Email
                    </label>
                    <Input
                      type="email"
                      value={aggregateEmail}
                      onChange={(e) => setAggregateEmail(e.target.value.toLowerCase())}
                      placeholder="e.g., dmarc-reports@example.com"
                      className="bg-white/50 border-slate-200"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Email address to receive aggregate reports
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Options */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full flex items-center justify-between"
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
                                : 'bg-white/50 text-slate-700 hover:bg-white/80'
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
                                  : 'bg-white/50 text-slate-700 hover:bg-white/80'
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
                                  : 'bg-white/50 text-slate-700 hover:bg-white/80'
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
                            className="flex items-center gap-2 p-2 bg-white/50 rounded-lg cursor-pointer hover:bg-white/80"
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
              className="w-full bg-gradient-to-r from-trust-green to-emerald-600 hover:from-emerald-600 hover:to-trust-green text-white shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              <Shield className="w-5 h-5 mr-2" />
              Generate DMARC Record
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

          {/* Results Section */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Shield className="w-6 h-6 text-trust-green" />
                      Generated DMARC Record
                    </CardTitle>
                    {dmarcRecord && (
                      <div className="flex gap-2">
                        <Button
                          onClick={handleCopy}
                          variant="outline"
                          size="sm"
                          className="border-trust-green/30 hover:bg-trust-green/10"
                        >
                          {copied ? (
                            <CheckCircle2 className="w-4 h-4 text-trust-green" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          onClick={handleDownload}
                          variant="outline"
                          size="sm"
                          className="border-trust-green/30 hover:bg-trust-green/10"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div ref={resultsRef}>
                    {!dmarcRecord ? (
                      <div className="text-center py-12">
                        <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">
                          Configure settings and generate your DMARC record
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
                          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
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

                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                          <h4 className="font-semibold text-emerald-900 mb-2">
                            Status Check
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-emerald-800">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>DMARC record generated successfully</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instructions */}
            {dmarcRecord && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
                <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl">How to Publish</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3 text-sm text-slate-700">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          1
                        </span>
                        <span>Log in to your DNS provider (where you manage your domain)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        <span>Navigate to your DNS management or DNS records section</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          3
                        </span>
                        <span>Add a new TXT record with the information above</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          4
                        </span>
                        <span>Wait for DNS propagation (can take 24-48 hours)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          5
                        </span>
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
    </div>
  )
}
