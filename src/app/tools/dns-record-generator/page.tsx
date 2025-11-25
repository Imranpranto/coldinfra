'use client'

import React, { useState } from 'react'
import { Copy, CheckCircle, AlertCircle, FileText, Table, BookOpen, ExternalLink, X } from 'lucide-react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Email provider configurations
const EMAIL_PROVIDERS = {
  'google-workspace': {
    name: 'Google Workspace',
    mx: [
      { priority: 1, value: 'ASPMX.L.GOOGLE.COM' },
      { priority: 5, value: 'ALT1.ASPMX.L.GOOGLE.COM' },
      { priority: 5, value: 'ALT2.ASPMX.L.GOOGLE.COM' },
      { priority: 10, value: 'ALT3.ASPMX.L.GOOGLE.COM' },
      { priority: 10, value: 'ALT4.ASPMX.L.GOOGLE.COM' },
    ],
    spf: 'v=spf1 include:_spf.google.com ~all',
    dkim: {
      selector: 'google',
      note: 'Retrieve from Google Workspace Admin Console',
      selectors: ['google'],
    },
  },
  'microsoft-365': {
    name: 'Microsoft 365',
    mx: [{ priority: 0, value: '{domain}-{hash}.mail.protection.outlook.com' }],
    spf: 'v=spf1 include:spf.protection.outlook.com -all',
    dkim: {
      selector: 'selector1',
      selector2: 'selector2',
      note: 'Retrieve from Microsoft 365 Admin Center',
      selectors: ['selector1', 'selector2'],
    },
    additional: [
      {
        type: 'CNAME',
        name: 'autodiscover',
        value: 'autodiscover.outlook.com',
        description: 'Autodiscover for email client configuration',
      },
    ],
  },
  'zoho-mail': {
    name: 'Zoho Mail',
    mx: [
      { priority: 10, value: 'mx.zoho.com' },
      { priority: 20, value: 'mx2.zoho.com' },
      { priority: 50, value: 'mx3.zoho.com' },
    ],
    spf: 'v=spf1 include:zoho.com ~all',
    dkim: {
      selector: 'zoho',
      note: 'Retrieve from Zoho Mail Admin Panel',
      selectors: ['zoho'],
    },
  },
  'proton-mail': {
    name: 'Proton Mail',
    mx: [
      { priority: 10, value: 'mail.protonmail.ch' },
      { priority: 20, value: 'mailsec.protonmail.ch' },
    ],
    spf: 'v=spf1 include:_spf.protonmail.ch ~all',
    dkim: {
      selector: 'protonmail',
      selector2: 'protonmail2',
      selector3: 'protonmail3',
      note: 'Retrieve from Proton Mail Settings',
      selectors: ['protonmail', 'protonmail2', 'protonmail3'],
    },
    additional: [
      {
        type: 'TXT',
        name: '@',
        value: 'protonmail-verification={verification-code}',
        description: 'Domain verification',
      },
    ],
  },
  'custom': {
    name: 'Custom Email Server',
    mx: [{ priority: 10, value: 'mail.yourdomain.com' }],
    spf: 'v=spf1 mx ~all',
    dkim: {
      selector: 'default',
      note: 'Generate from your email server',
      selectors: ['default'],
    },
  },
}

interface DNSRecord {
  type: string
  name: string
  value: string
  priority?: number
  ttl?: number
  description?: string
}

interface DomainRecords {
  domain: string
  records: DNSRecord[]
}

type DomainInputMode = 'single' | 'bulk'
type DocsTab = 'mx' | 'spf' | 'dmarc' | 'dkim'

export default function DNSRecordGenerator() {
  const [domainInputMode, setDomainInputMode] = useState<DomainInputMode>('single')
  const [singleDomain, setSingleDomain] = useState('')
  const [bulkDomains, setBulkDomains] = useState('')
  const [provider, setProvider] = useState<keyof typeof EMAIL_PROVIDERS>('google-workspace')
  const [dmarcEmail, setDmarcEmail] = useState('')
  const [dmarcPolicy, setDmarcPolicy] = useState<'none' | 'quarantine' | 'reject'>('quarantine')
  const [dkimValues, setDkimValues] = useState<Record<string, string>>({})
  const [generatedRecords, setGeneratedRecords] = useState<DomainRecords[]>([])
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [showDocsPrompt, setShowDocsPrompt] = useState(false)
  const [docsRead, setDocsRead] = useState(false)
  const [activeDocsTab, setActiveDocsTab] = useState<DocsTab>('mx')
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const validateDomain = (domain: string): boolean => {
    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/
    return domainRegex.test(domain.toLowerCase().trim())
  }

  const getDomains = (): string[] => {
    if (domainInputMode === 'single') {
      const trimmed = singleDomain.toLowerCase().trim()
      return trimmed ? [trimmed] : []
    } else {
      return bulkDomains
        .split('\n')
        .map(d => d.toLowerCase().trim())
        .filter(d => d.length > 0)
    }
  }

  const getDkimSelectors = () => {
    const providerConfig = EMAIL_PROVIDERS[provider]
    return providerConfig.dkim.selectors || []
  }

  const handleGenerateClick = () => {
    const domains = getDomains()

    // Show error modal if no domains entered
    if (domains.length === 0) {
      setErrorMessage('Please enter at least one domain name')
      setShowErrorModal(true)
      return
    }

    const validDomains = domains.filter((d) => validateDomain(d))
    const invalidDomains = domains.filter((d) => !validateDomain(d))

    // Show error modal for invalid domains
    if (invalidDomains.length > 0) {
      setErrorMessage(`Invalid domain(s): ${invalidDomains.join(', ')}. Please check and try again.`)
      setShowErrorModal(true)
      return
    }

    // Show confirmation modal
    setShowConfirmModal(true)
  }

  const generateRecords = () => {
    const domains = getDomains()
    const validDomains = domains.filter((d) => validateDomain(d))

    const providerConfig = EMAIL_PROVIDERS[provider]
    const allRecords: DomainRecords[] = []

    validDomains.forEach((domain) => {
      const records: DNSRecord[] = []

      // MX Records
      providerConfig.mx.forEach((mx) => {
        records.push({
          type: 'MX',
          name: '@',
          value: mx.value.replace('{domain}', domain.split('.')[0]),
          priority: mx.priority,
          ttl: 3600,
          description: 'Mail Exchange',
        })
      })

      // SPF Record
      records.push({
        type: 'TXT',
        name: '@',
        value: providerConfig.spf,
        ttl: 3600,
        description: 'SPF - Sender Policy Framework',
      })

      // DMARC Record
      const dmarcValue = `v=DMARC1; p=${dmarcPolicy}; rua=mailto:dmarc@${domain}${
        dmarcEmail ? `; ruf=mailto:${dmarcEmail}` : ''
      }; fo=1; adkim=s; aspf=s; pct=100`

      records.push({
        type: 'TXT',
        name: '_dmarc',
        value: dmarcValue,
        ttl: 3600,
        description: 'DMARC - Domain-based Message Authentication',
      })

      // DKIM Records
      const selectors = getDkimSelectors()
      selectors.forEach((selector) => {
        const customValue = dkimValues[selector]
        records.push({
          type: 'TXT',
          name: `${selector}._domainkey`,
          value: customValue || 'DKIM_PUBLIC_KEY_HERE',
          ttl: 3600,
          description: `DKIM - ${selector}`,
        })
      })

      // Additional Records
      if ('additional' in providerConfig && providerConfig.additional) {
        providerConfig.additional.forEach((record: { type: string; name: string; value: string; description?: string }) => {
          records.push({
            ...record,
            ttl: 3600,
          })
        })
      }

      allRecords.push({ domain, records })
    })

    setGeneratedRecords(allRecords)
    setShowDocsPrompt(true)
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopySuccess(id)
    setTimeout(() => setCopySuccess(null), 2000)
  }

  const exportAsCSV = () => {
    if (generatedRecords.length === 0) return

    let csv = 'Domain,Type,Name,Value,Priority,TTL,Description\n'

    generatedRecords.forEach(({ domain, records }) => {
      records.forEach((record) => {
        const priority = record.priority || ''
        const description = record.description?.replace(/,/g, ';') || ''
        csv += `"${domain}","${record.type}","${record.name}","${record.value}","${priority}","${record.ttl}","${description}"\n`
      })
    })

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const date = new Date().toISOString().split('T')[0]
    a.download = `COLDINFRA - DNS Record Generator - ${date}.csv`
    a.click()
  }

  const exportAsText = () => {
    if (generatedRecords.length === 0) return

    let text = '# DNS Records for Email Configuration\n\n'

    generatedRecords.forEach(({ domain, records }) => {
      text += `\n## ${domain.toUpperCase()}\n\n`

      const recordsByType = records.reduce(
        (acc, record) => {
          if (!acc[record.type]) acc[record.type] = []
          acc[record.type].push(record)
          return acc
        },
        {} as Record<string, DNSRecord[]>
      )

      Object.entries(recordsByType).forEach(([type, typeRecords]) => {
        text += `### ${type} Records\n\n`
        typeRecords.forEach((record) => {
          text += `**Host/Name:** ${record.name === '@' ? domain : record.name + '.' + domain}\n`
          text += `**Type:** ${record.type}\n`
          if (record.priority) text += `**Priority:** ${record.priority}\n`
          text += `**Value:** ${record.value}\n`
          text += `**TTL:** ${record.ttl} seconds\n`
          if (record.description) text += `**Description:** ${record.description}\n`
          text += `\n`
        })
      })
    })

    const blob = new Blob([text], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const date = new Date().toISOString().split('T')[0]
    a.download = `COLDINFRA - DNS Record Generator - ${date}.txt`
    a.click()
  }

  const getRecordsByType = (records: DNSRecord[]) => {
    const grouped: Record<string, DNSRecord[]> = {
      MX: [],
      SPF: [],
      DMARC: [],
      DKIM: [],
      OTHER: [],
    }

    records.forEach((record) => {
      if (record.type === 'MX') {
        grouped.MX.push(record)
      } else if (record.description?.includes('SPF')) {
        grouped.SPF.push(record)
      } else if (record.name === '_dmarc') {
        grouped.DMARC.push(record)
      } else if (record.name.includes('._domainkey')) {
        grouped.DKIM.push(record)
      } else {
        grouped.OTHER.push(record)
      }
    })

    return grouped
  }

  const scrollToDocs = () => {
    const docsSection = document.getElementById('dns-documentation')
    if (docsSection) {
      docsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowErrorModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Validation Error</h3>
                <p className="text-sm text-slate-600 mb-6">{errorMessage}</p>
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="w-full h-10 bg-trust-green text-white rounded-lg font-medium hover:bg-trust-green-dark transition-colors"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Documentation Check</h3>
                <p className="text-sm text-slate-600 mb-6">
                  Did you check the documentation on how to add DNS records?
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setShowConfirmModal(false)
                      generateRecords()
                    }}
                    className="w-full h-10 bg-trust-green text-white rounded-lg font-medium hover:bg-trust-green-dark transition-colors"
                  >
                    Already Read - Generate Records
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmModal(false)
                      scrollToDocs()
                    }}
                    className="w-full h-10 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Read Documentation First
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10">
        <Header />

        <main id="main-content">
          <Section padding="xl" className="bg-transparent">
            <Container>
              <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-green/10 rounded-full mb-4">
                    <div className="w-2 h-2 bg-trust-green rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-trust-green">Free DNS Tool</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 md:mb-4 tracking-tight">
                    DNS Record Generator
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-4">
                    Generate complete DNS records for email providers (MX, SPF, DMARC, DKIM)
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                  {/* Configuration Panel */}
                  <div className="space-y-6">
                    {/* Domain Input with Tabs - MOVED TO FIRST */}
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />
                      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl shadow-slate-900/5">
                        <Label className="block text-sm font-semibold text-slate-900 mb-3">
                          Domain(s)
                        </Label>

                        <div className="flex gap-2 mb-4">
                          <button
                            onClick={() => setDomainInputMode('single')}
                            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                              domainInputMode === 'single'
                                ? 'bg-trust-green text-white shadow-md'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Single Domain
                          </button>
                          <button
                            onClick={() => setDomainInputMode('bulk')}
                            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                              domainInputMode === 'bulk'
                                ? 'bg-trust-green text-white shadow-md'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Bulk Domains
                          </button>
                        </div>

                        {domainInputMode === 'single' ? (
                          <Input
                            type="text"
                            value={singleDomain}
                            onChange={(e) => setSingleDomain(e.target.value)}
                            placeholder="example.com"
                            className="h-12 text-slate-700 placeholder:text-slate-400 border-slate-300"
                          />
                        ) : (
                          <div>
                            <textarea
                              value={bulkDomains}
                              onChange={(e) => setBulkDomains(e.target.value)}
                              placeholder="example1.com&#10;example2.com&#10;example3.com"
                              rows={6}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors text-slate-700 placeholder:text-slate-400 bg-white resize-none"
                            />
                            <p className="text-xs text-slate-500 mt-2">
                              Enter one domain per line (max 50 domains)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email Provider Dropdown - MOVED TO SECOND */}
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />
                      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl shadow-slate-900/5">
                        <Label className="block text-sm font-semibold text-slate-900 mb-3">
                          Email Provider
                        </Label>
                        <select
                          value={provider}
                          onChange={(e) => {
                            setProvider(e.target.value as keyof typeof EMAIL_PROVIDERS)
                            setDkimValues({})
                          }}
                          className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors text-slate-700 bg-white"
                        >
                          {Object.entries(EMAIL_PROVIDERS).map(([key, config]) => (
                            <option key={key} value={key} className="text-slate-900">
                              {config.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* DMARC Configuration */}
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />
                      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl shadow-slate-900/5">
                        <Label className="block text-sm font-semibold text-slate-900 mb-3">
                          DMARC Configuration
                        </Label>

                        <div className="space-y-4">
                          <div>
                            <Label className="block text-xs text-slate-600 mb-2">Policy</Label>
                            <select
                              value={dmarcPolicy}
                              onChange={(e) =>
                                setDmarcPolicy(e.target.value as 'none' | 'quarantine' | 'reject')
                              }
                              className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors text-slate-700 bg-white"
                            >
                              <option value="none" className="text-slate-900">None (Monitor only)</option>
                              <option value="quarantine" className="text-slate-900">Quarantine (Recommended)</option>
                              <option value="reject" className="text-slate-900">Reject (Strict)</option>
                            </select>
                          </div>

                          <div>
                            <Label className="block text-xs text-slate-600 mb-2">
                              Forensic Report Email (Optional)
                            </Label>
                            <Input
                              type="email"
                              value={dmarcEmail}
                              onChange={(e) => setDmarcEmail(e.target.value)}
                              placeholder="reports@example.com"
                              className="h-12 text-slate-700 placeholder:text-slate-400 border-slate-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Platform-Specific DKIM Configuration */}
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />
                      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl shadow-slate-900/5">
                        <Label className="block text-sm font-semibold text-slate-900 mb-2">
                          DKIM Records (Optional)
                        </Label>
                        <p className="text-xs text-slate-500 mb-4">
                          {EMAIL_PROVIDERS[provider].dkim.note}
                        </p>

                        <div className="space-y-3">
                          {getDkimSelectors().map((selector) => (
                            <div key={selector}>
                              <Label className="block text-xs text-slate-600 mb-2 capitalize">
                                {selector} Selector
                              </Label>
                              <Input
                                type="text"
                                value={dkimValues[selector] || ''}
                                onChange={(e) => setDkimValues({ ...dkimValues, [selector]: e.target.value })}
                                placeholder="v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3..."
                                className="h-10 text-sm text-slate-700 placeholder:text-slate-400 border-slate-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Generate Button */}
                    <Button
                      onClick={handleGenerateClick}
                      className="w-full h-12 bg-trust-green hover:bg-trust-green-dark text-white font-semibold shadow-lg shadow-trust-green/30"
                    >
                      Generate DNS Records
                    </Button>
                  </div>

                  {/* Results Panel */}
                  <div className="space-y-4">
                    {generatedRecords.length > 0 ? (
                      <>
                        {/* Show export-focused UI for 2+ domains, preview for single domain */}
                        {generatedRecords.length > 1 ? (
                          <div className="space-y-4">
                            {/* Success Message for Multiple Domains */}
                            <div className="relative">
                              <div className="absolute -inset-2 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />
                              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-200 shadow-xl shadow-slate-900/5 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-trust-green/10 flex items-center justify-center">
                                  <CheckCircle className="w-8 h-8 text-trust-green" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                  DNS Records Generated Successfully!
                                </h3>
                                <p className="text-sm text-slate-600 mb-1">
                                  Generated records for <span className="font-semibold text-trust-green">{generatedRecords.length} domains</span>
                                </p>
                                <p className="text-xs text-slate-500">
                                  Download your records using the buttons below
                                </p>

                                {/* Domain List */}
                                <div className="mt-4 flex flex-wrap justify-center gap-2">
                                  {generatedRecords.map(({ domain }) => (
                                    <span key={domain} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                                      {domain}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Export Buttons - Prominent for 2+ domains */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <button
                                onClick={exportAsText}
                                className="h-14 px-6 bg-trust-green text-white rounded-xl font-semibold hover:bg-trust-green-dark transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-trust-green/30 hover:shadow-xl hover:shadow-trust-green/40 hover:scale-105"
                              >
                                <FileText className="w-5 h-5" />
                                <div className="text-left">
                                  <div className="text-sm">Download TXT</div>
                                  <div className="text-xs opacity-90">Readable format</div>
                                </div>
                              </button>
                              <button
                                onClick={exportAsCSV}
                                className="h-14 px-6 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:scale-105"
                              >
                                <Table className="w-5 h-5" />
                                <div className="text-left">
                                  <div className="text-sm">Download CSV</div>
                                  <div className="text-xs opacity-90">Import to DNS manager</div>
                                </div>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Export Buttons - Compact for single domain */}
                            <div className="flex gap-3">
                              <button
                                onClick={exportAsText}
                                className="flex-1 h-11 px-4 bg-trust-green text-white rounded-xl font-medium hover:bg-trust-green-dark transition-colors flex items-center justify-center gap-2 shadow-md"
                              >
                                <FileText className="w-4 h-4" />
                                Export TXT
                              </button>
                              <button
                                onClick={exportAsCSV}
                                className="flex-1 h-11 px-4 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                              >
                                <Table className="w-4 h-4" />
                                Export CSV
                              </button>
                            </div>

                            {/* Preview Cards - Only for single domain */}
                            {generatedRecords.map(({ domain, records }) => {
                          const grouped = getRecordsByType(records)

                          return (
                            <div key={domain} className="space-y-3">
                              {/* Domain Header */}
                              <div className="bg-trust-green rounded-lg px-4 py-2.5 shadow-sm">
                                <h3 className="text-base font-bold text-white">{domain}</h3>
                              </div>

                              {/* MX Records */}
                              {grouped.MX.length > 0 && (
                                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-200">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">MX</span>
                                        <span className="text-xs font-medium text-slate-700">Mail Exchange Record</span>
                                      </div>
                                      <span className="text-xs text-slate-500">{grouped.MX.length}</span>
                                    </div>
                                  </div>
                                  <div className="divide-y divide-slate-100">
                                    {grouped.MX.map((record, idx) => (
                                      <div key={idx} className="px-3 py-2.5 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-start justify-between gap-2">
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                              <span className="text-xs text-slate-500">Type:</span>
                                              <span className="text-xs font-semibold text-slate-700">MX</span>
                                              <span className="text-xs text-slate-400">|</span>
                                              <span className="text-xs text-slate-500">Priority:</span>
                                              <span className="text-xs font-semibold text-slate-700">{record.priority}</span>
                                            </div>
                                            <p className="text-xs font-mono text-slate-900 break-all">{record.value}</p>
                                          </div>
                                          <button
                                            onClick={() => copyToClipboard(record.value, `${domain}-mx-${idx}`)}
                                            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors flex-shrink-0"
                                          >
                                            {copySuccess === `${domain}-mx-${idx}` ? (
                                              <CheckCircle className="w-3.5 h-3.5 text-trust-green" />
                                            ) : (
                                              <Copy className="w-3.5 h-3.5" />
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* SPF Records */}
                              {grouped.SPF.length > 0 && (
                                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-200">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">TXT</span>
                                      <span className="text-xs font-medium text-slate-700">SPF - Sender Policy Framework</span>
                                    </div>
                                  </div>
                                  {grouped.SPF.map((record, idx) => (
                                    <div key={idx} className="px-3 py-2.5 hover:bg-slate-50 transition-colors">
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs text-slate-500">Type:</span>
                                            <span className="text-xs font-semibold text-slate-700">TXT</span>
                                            <span className="text-xs text-slate-400">|</span>
                                            <span className="text-xs text-slate-500">Name:</span>
                                            <span className="text-xs font-semibold text-slate-700">@</span>
                                          </div>
                                          <p className="text-xs font-mono text-slate-900 break-all">{record.value}</p>
                                        </div>
                                        <button
                                          onClick={() => copyToClipboard(record.value, `${domain}-spf-${idx}`)}
                                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors flex-shrink-0"
                                        >
                                          {copySuccess === `${domain}-spf-${idx}` ? (
                                            <CheckCircle className="w-3.5 h-3.5 text-trust-green" />
                                          ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* DMARC Records */}
                              {grouped.DMARC.length > 0 && (
                                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-200">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">TXT</span>
                                      <span className="text-xs font-medium text-slate-700">DMARC - Authentication Policy</span>
                                    </div>
                                  </div>
                                  {grouped.DMARC.map((record, idx) => (
                                    <div key={idx} className="px-3 py-2.5 hover:bg-slate-50 transition-colors">
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs text-slate-500">Type:</span>
                                            <span className="text-xs font-semibold text-slate-700">TXT</span>
                                            <span className="text-xs text-slate-400">|</span>
                                            <span className="text-xs text-slate-500">Name:</span>
                                            <span className="text-xs font-semibold text-slate-700">_dmarc</span>
                                          </div>
                                          <p className="text-xs font-mono text-slate-900 break-all">{record.value}</p>
                                        </div>
                                        <button
                                          onClick={() => copyToClipboard(record.value, `${domain}-dmarc-${idx}`)}
                                          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors flex-shrink-0"
                                        >
                                          {copySuccess === `${domain}-dmarc-${idx}` ? (
                                            <CheckCircle className="w-3.5 h-3.5 text-trust-green" />
                                          ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* DKIM Records */}
                              {grouped.DKIM.length > 0 && (
                                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-200">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">TXT</span>
                                        <span className="text-xs font-medium text-slate-700">DKIM - Domain Keys</span>
                                      </div>
                                      <span className="text-xs text-slate-500">{grouped.DKIM.length}</span>
                                    </div>
                                  </div>
                                  <div className="divide-y divide-slate-100">
                                    {grouped.DKIM.map((record, idx) => (
                                      <div key={idx} className="px-3 py-2.5 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                              <span className="text-xs text-slate-500">Type:</span>
                                              <span className="text-xs font-semibold text-slate-700">TXT</span>
                                              <span className="text-xs text-slate-400">|</span>
                                              <span className="text-xs text-slate-500">Name:</span>
                                              <span className="text-xs font-semibold text-slate-700">{record.name}</span>
                                            </div>
                                            <p className="text-xs font-mono text-slate-900 break-all">{record.value}</p>
                                          </div>
                                          <button
                                            onClick={() => copyToClipboard(record.value, `${domain}-dkim-${idx}`)}
                                            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors flex-shrink-0"
                                          >
                                            {copySuccess === `${domain}-dkim-${idx}` ? (
                                              <CheckCircle className="w-3.5 h-3.5 text-trust-green" />
                                            ) : (
                                              <Copy className="w-3.5 h-3.5" />
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Other Records */}
                              {grouped.OTHER.length > 0 && (
                                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-200">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-medium text-slate-700">Additional Records</span>
                                      <span className="text-xs text-slate-500">{grouped.OTHER.length}</span>
                                    </div>
                                  </div>
                                  <div className="divide-y divide-slate-100">
                                    {grouped.OTHER.map((record, idx) => (
                                      <div key={idx} className="px-3 py-2.5 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-start justify-between gap-2">
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                              <span className="text-xs text-slate-500">Type:</span>
                                              <span className="text-xs font-semibold text-slate-700">{record.type}</span>
                                              <span className="text-xs text-slate-400">|</span>
                                              <span className="text-xs text-slate-500">Name:</span>
                                              <span className="text-xs font-semibold text-slate-700">{record.name}</span>
                                            </div>
                                            <p className="text-xs font-mono text-slate-900 break-all">{record.value}</p>
                                            {record.description && (
                                              <p className="text-xs text-slate-500 mt-1">{record.description}</p>
                                            )}
                                          </div>
                                          <button
                                            onClick={() => copyToClipboard(record.value, `${domain}-other-${idx}`)}
                                            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors flex-shrink-0"
                                          >
                                            {copySuccess === `${domain}-other-${idx}` ? (
                                              <CheckCircle className="w-3.5 h-3.5 text-trust-green" />
                                            ) : (
                                              <Copy className="w-3.5 h-3.5" />
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                          </>
                        )}
                      </>
                    ) : (
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-slate-200/50 to-slate-300/50 rounded-3xl blur-2xl opacity-50" />
                        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-900/5 text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-slate-400" />
                          </div>
                          <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2">No Records Generated</h3>
                          <p className="text-sm md:text-base text-slate-600">
                            Configure your settings and click Generate DNS Records
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* DNS Documentation Section with Tabs */}
                <div id="dns-documentation" className="mt-12 relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-trust-green/10 to-emerald-500/10 rounded-3xl blur-2xl opacity-50" />
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl shadow-slate-900/5">
                    <div className="flex items-center gap-3 mb-6">
                      <BookOpen className="w-6 h-6 text-trust-green" />
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900">How to Add DNS Records</h2>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200">
                      {[
                        { key: 'mx' as DocsTab, label: 'MX Records', color: 'blue' },
                        { key: 'spf' as DocsTab, label: 'SPF Records', color: 'emerald' },
                        { key: 'dmarc' as DocsTab, label: 'DMARC Records', color: 'purple' },
                        { key: 'dkim' as DocsTab, label: 'DKIM Records', color: 'orange' },
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveDocsTab(tab.key)}
                          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                            activeDocsTab === tab.key
                              ? 'bg-trust-green text-white'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-4">
                      {activeDocsTab === 'mx' && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-base font-semibold text-slate-900 mb-2">What is MX Record?</h3>
                            <p className="text-sm text-slate-600">
                              MX (Mail Exchange) records direct email to your mail servers. They specify which servers handle email for your domain and in what priority order.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-slate-900 mb-3">How to Add MX Records:</h3>
                            <ol className="space-y-2">
                              {[
                                'Login to your DNS provider (GoDaddy, Cloudflare, Namecheap, etc.)',
                                'Navigate to DNS Management section for your domain',
                                'Click "Add Record" and select "MX" as the record type',
                                'Set Name/Host field to "@" (represents your root domain)',
                                'Copy the MX server value from the generated record above',
                                'Set the Priority value (lower numbers = higher priority)',
                                'Set TTL to 3600 seconds (1 hour) or use default',
                                'Save the record and repeat for all MX entries',
                              ].map((step, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-slate-700">
                                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                                    {idx + 1}
                                  </span>
                                  <span className="pt-0.5">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-xs font-semibold text-blue-900 mb-1">Important:</p>
                            <p className="text-xs text-blue-800">Multiple MX records provide backup mail servers. If the first server is unavailable, email is routed to the next priority server.</p>
                          </div>
                        </div>
                      )}

                      {activeDocsTab === 'spf' && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-base font-semibold text-slate-900 mb-2">What is SPF Record?</h3>
                            <p className="text-sm text-slate-600">
                              SPF (Sender Policy Framework) is a TXT record that specifies which mail servers are authorized to send email on behalf of your domain.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-slate-900 mb-3">How to Add SPF Records:</h3>
                            <ol className="space-y-2">
                              {[
                                'Login to your DNS provider',
                                'Go to DNS Management for your domain',
                                'Click "Add Record" and select "TXT" as the record type',
                                'Set Name/Host field to "@"',
                                'Copy the entire SPF value from above (starts with "v=spf1")',
                                'Paste it into the Value/Content field',
                                'Set TTL to 3600 seconds or use default',
                                'Save the record',
                              ].map((step, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-slate-700">
                                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">
                                    {idx + 1}
                                  </span>
                                  <span className="pt-0.5">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                            <p className="text-xs font-semibold text-emerald-900 mb-1">Important:</p>
                            <p className="text-xs text-emerald-800">Only add ONE SPF record per domain. Multiple SPF records will cause validation failures.</p>
                          </div>
                        </div>
                      )}

                      {activeDocsTab === 'dmarc' && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-base font-semibold text-slate-900 mb-2">What is DMARC Record?</h3>
                            <p className="text-sm text-slate-600">
                              DMARC (Domain-based Message Authentication) tells receiving servers what to do with emails that fail SPF/DKIM checks and where to send reports.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-slate-900 mb-3">How to Add DMARC Records:</h3>
                            <ol className="space-y-2">
                              {[
                                'Login to your DNS provider',
                                'Navigate to DNS Management',
                                'Click "Add Record" and select "TXT" as the record type',
                                'Set Name/Host field to "_dmarc"',
                                'Copy the DMARC value from above (starts with "v=DMARC1")',
                                'Paste it into the Value/Content field',
                                'Set TTL to 3600 seconds',
                                'Save the record',
                              ].map((step, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-slate-700">
                                  <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">
                                    {idx + 1}
                                  </span>
                                  <span className="pt-0.5">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                            <p className="text-xs font-semibold text-purple-900 mb-1">Policy Levels:</p>
                            <ul className="text-xs text-purple-800 space-y-1">
                              <li>• <strong>None:</strong> Monitor only, no action taken</li>
                              <li>• <strong>Quarantine:</strong> Move suspicious emails to spam</li>
                              <li>• <strong>Reject:</strong> Block suspicious emails completely</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {activeDocsTab === 'dkim' && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-base font-semibold text-slate-900 mb-2">What is DKIM Record?</h3>
                            <p className="text-sm text-slate-600">
                              DKIM (DomainKeys Identified Mail) adds a digital signature to your emails, verifying they haven't been tampered with and come from your domain.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-slate-900 mb-3">How to Add DKIM Records:</h3>
                            <ol className="space-y-2">
                              {[
                                'First, retrieve your DKIM public key from your email provider dashboard',
                                'Login to your DNS provider',
                                'Go to DNS Management',
                                'Click "Add Record" and select "TXT" as the record type',
                                'Set Name/Host field to the selector (e.g., "google._domainkey")',
                                'Paste the DKIM public key into the Value field',
                                'Set TTL to 3600 seconds',
                                'Save and repeat for each DKIM selector',
                              ].map((step, idx) => (
                                <li key={idx} className="flex gap-3 text-sm text-slate-700">
                                  <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">
                                    {idx + 1}
                                  </span>
                                  <span className="pt-0.5">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                            <p className="text-xs font-semibold text-orange-900 mb-1">Where to find DKIM keys:</p>
                            <ul className="text-xs text-orange-800 space-y-1">
                              <li>• <strong>Google Workspace:</strong> Admin Console → Apps → Google Workspace → Gmail → Authenticate email</li>
                              <li>• <strong>Microsoft 365:</strong> Admin Center → Settings → Domains → DKIM</li>
                              <li>• <strong>Other providers:</strong> Check your email provider's documentation</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* General Important Notes */}
                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold text-yellow-900 mb-2">General Important Notes:</p>
                          <ul className="list-disc list-inside text-yellow-800 space-y-1">
                            <li>Always backup existing DNS records before making changes</li>
                            <li>DNS changes can take 24-48 hours to fully propagate worldwide</li>
                            <li>Test your email configuration after DNS propagation completes</li>
                            <li>Use DNS lookup tools to verify records are properly set</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
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
