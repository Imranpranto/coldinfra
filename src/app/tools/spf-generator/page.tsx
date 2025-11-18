'use client'

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Copy, CheckCircle2, Shield, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
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
            <span className="text-sm font-medium text-slate-700">SPF Generator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-trust-green via-emerald-600 to-trust-green-dark bg-clip-text text-transparent">
            SPF Generator for Cold Email
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Create SPF records for email authentication and deliverability
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
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Service Provider
                    </label>
                    <select
                      value={espProvider}
                      onChange={(e) => setEspProvider(e.target.value as keyof typeof ESP_PROVIDERS)}
                      className="w-full px-4 py-2 bg-white/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-trust-green"
                    >
                      {Object.keys(ESP_PROVIDERS).map((provider) => (
                        <option key={provider} value={provider}>
                          {provider}
                        </option>
                      ))}
                    </select>
                  </div>

                  {espProvider === 'Custom' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Custom Include
                      </label>
                      <Input
                        type="text"
                        value={customInclude}
                        onChange={(e) => setCustomInclude(e.target.value)}
                        placeholder="e.g., include:_spf.example.com"
                        className="bg-white/50 border-slate-200"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        Enter the full include directive
                      </p>
                    </div>
                  )}
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
                        Mechanisms
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 p-3 bg-white/50 rounded-lg cursor-pointer hover:bg-white/80">
                          <input
                            type="checkbox"
                            checked={includeMX}
                            onChange={(e) => setIncludeMX(e.target.checked)}
                            className="w-4 h-4 text-trust-green rounded"
                          />
                          <div>
                            <span className="text-sm font-medium text-slate-700">MX Records</span>
                            <p className="text-xs text-slate-500">Allow domain's MX servers to send email</p>
                          </div>
                        </label>

                        <label className="flex items-center gap-2 p-3 bg-white/50 rounded-lg cursor-pointer hover:bg-white/80">
                          <input
                            type="checkbox"
                            checked={includeA}
                            onChange={(e) => setIncludeA(e.target.checked)}
                            className="w-4 h-4 text-trust-green rounded"
                          />
                          <div>
                            <span className="text-sm font-medium text-slate-700">A Records</span>
                            <p className="text-xs text-slate-500">Allow domain's A record IP to send email</p>
                          </div>
                        </label>

                        <label className="flex items-center gap-2 p-3 bg-white/50 rounded-lg cursor-pointer hover:bg-white/80">
                          <input
                            type="checkbox"
                            checked={includePTR}
                            onChange={(e) => setIncludePTR(e.target.checked)}
                            className="w-4 h-4 text-trust-green rounded"
                          />
                          <div>
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
                                className="border-red-300 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          onClick={addIPField}
                          variant="outline"
                          size="sm"
                          className="w-full border-trust-green/30 hover:bg-trust-green/10"
                        >
                          Add IP Address
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Add IPv4 addresses or CIDR ranges
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>

            <Button
              onClick={generateSpfRecord}
              className="w-full bg-gradient-to-r from-trust-green to-emerald-600 hover:from-emerald-600 hover:to-trust-green text-white shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              <Shield className="w-5 h-5 mr-2" />
              Generate SPF Record
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
                      Generated SPF Record
                    </CardTitle>
                    {spfRecord && (
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
                    {!spfRecord ? (
                      <div className="text-center py-12">
                        <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">
                          Configure settings and generate your SPF record
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

                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                          <h4 className="font-semibold text-emerald-900 mb-2">
                            Status Check
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-emerald-800">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>SPF record generated successfully</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instructions */}
            {spfRecord && (
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
                        <span>Log in to your DNS provider</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        <span>Navigate to DNS records section for your domain</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          3
                        </span>
                        <span>Add a new TXT record with host "@" and the generated value</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          4
                        </span>
                        <span>Wait for DNS propagation (typically 24-48 hours)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                          5
                        </span>
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
    </div>
  )
}
