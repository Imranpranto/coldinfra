'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Download, Copy, CheckCircle2, Globe, Sparkles, ArrowRight } from 'lucide-react'
import html2canvas from 'html2canvas'

interface DomainSuggestion {
  domain: string
  type: 'prefix' | 'suffix' | 'mixed'
}

const PREFIXES = [
  'get', 'try', 'go', 'my', 'use', 'hey', 'hi', 'meet', 'join', 'app',
  'mail', 'send', 'reach', 'grow', 'team', 'pro', 'super', 'smart', 'fast', 'best'
]

const SUFFIXES = [
  'app', 'hq', 'hub', 'io', 'labs', 'mail', 'pro', 'tech', 'tools', 'works',
  'online', 'mail', 'send', 'reach', 'grow', 'team', 'connect', 'engage', 'scale', 'boost'
]

export default function DomainGeneratorPage() {
  const [mainDomain, setMainDomain] = useState('coldinfra.com')
  const [suggestionType, setSuggestionType] = useState<'mixed' | 'prefix' | 'suffix'>('mixed')
  const [numSuggestions, setNumSuggestions] = useState(10)
  const [suggestions, setSuggestions] = useState<DomainSuggestion[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const extractBaseDomain = (domain: string): string => {
    // Remove protocol if present
    let cleaned = domain.replace(/^https?:\/\//, '')
    // Remove www if present
    cleaned = cleaned.replace(/^www\./, '')
    // Get domain name without extension
    const parts = cleaned.split('.')
    if (parts.length > 1) {
      return parts[0]
    }
    return cleaned
  }

  const getExtension = (domain: string): string => {
    const parts = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('.')
    if (parts.length > 1) {
      return parts.slice(1).join('.')
    }
    return 'com'
  }

  const generateSuggestions = () => {
    const baseDomain = extractBaseDomain(mainDomain)
    const extension = getExtension(mainDomain)
    const generated: DomainSuggestion[] = []
    const uniqueDomains = new Set<string>()

    const addSuggestion = (domain: string, type: 'prefix' | 'suffix' | 'mixed') => {
      if (!uniqueDomains.has(domain) && generated.length < numSuggestions) {
        uniqueDomains.add(domain)
        generated.push({ domain: `${domain}.${extension}`, type })
      }
    }

    // Shuffle arrays for randomness
    const shuffledPrefixes = [...PREFIXES].sort(() => Math.random() - 0.5)
    const shuffledSuffixes = [...SUFFIXES].sort(() => Math.random() - 0.5)

    let prefixIndex = 0
    let suffixIndex = 0

    while (generated.length < numSuggestions) {
      if (suggestionType === 'mixed' || suggestionType === 'prefix') {
        if (prefixIndex < shuffledPrefixes.length) {
          addSuggestion(`${shuffledPrefixes[prefixIndex]}${baseDomain}`, 'prefix')
          prefixIndex++
        }
      }

      if (generated.length >= numSuggestions) break

      if (suggestionType === 'mixed' || suggestionType === 'suffix') {
        if (suffixIndex < shuffledSuffixes.length) {
          addSuggestion(`${baseDomain}${shuffledSuffixes[suffixIndex]}`, 'suffix')
          suffixIndex++
        }
      }

      // Prevent infinite loop
      if (prefixIndex >= shuffledPrefixes.length && suffixIndex >= shuffledSuffixes.length) {
        break
      }
    }

    setSuggestions(generated)
  }

  const handleCopy = async (domain: string, index: number) => {
    await navigator.clipboard.writeText(domain)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleCopyAll = async () => {
    const allDomains = suggestions.map(s => s.domain).join('\n')
    await navigator.clipboard.writeText(allDomains)
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  const handleExportCSV = () => {
    const csvContent = [
      'Domain,Type',
      ...suggestions.map(s => `${s.domain},${s.type}`)
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `domain-suggestions-${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownload = async () => {
    if (resultsRef.current) {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `domain-suggestions-${Date.now()}.png`
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
                    <span className="text-sm font-semibold text-trust-green">Free Domain Tool</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                    Cold Email Domain Generator
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Generate creative domain name suggestions for your cold email campaigns to maximize deliverability and brand protection.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input Form - Glassmorphic Style */}
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />

                    <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                      <CardHeader className="space-y-1 pb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-trust-green to-emerald-600 rounded-xl flex items-center justify-center">
                            <Globe className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl font-bold text-slate-900">
                              Domain Configuration
                            </CardTitle>
                            <CardDescription className="text-slate-600">
                              Enter your main domain details
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Main Domain Input */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">
                            Your Main Domain
                          </label>
                          <Input
                            type="text"
                            value={mainDomain}
                            onChange={(e) => setMainDomain(e.target.value)}
                            placeholder="e.g., coldinfra.com"
                            className="bg-white/50 border-slate-200 h-12"
                          />
                          <p className="text-xs text-slate-500">
                            Enter your primary domain (e.g., coldinfra.com)
                          </p>
                        </div>

                        {/* Suggestion Type */}
                        <div className="space-y-3">
                          <label className="text-sm font-medium text-slate-700">
                            Suggestion Type
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {(['mixed', 'prefix', 'suffix'] as const).map((type) => (
                              <button
                                key={type}
                                onClick={() => setSuggestionType(type)}
                                className={`px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${
                                  suggestionType === type
                                    ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                                    : 'bg-white/50 text-slate-700 hover:bg-white/80 border border-slate-200'
                                }`}
                              >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Number of Suggestions */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">
                              Number of Suggestions
                            </label>
                            <Badge variant="secondary" className="bg-trust-green/10 text-trust-green border-trust-green/20">
                              {numSuggestions}
                            </Badge>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="30"
                            value={numSuggestions}
                            onChange={(e) => setNumSuggestions(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-trust-green"
                          />
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>1</span>
                            <span>30</span>
                          </div>
                        </div>

                        <Button
                          onClick={generateSuggestions}
                          className="w-full bg-gradient-to-r from-trust-green to-trust-green-dark hover:from-trust-green-dark hover:to-trust-green text-white shadow-lg shadow-trust-green/30 group h-12"
                          size="lg"
                        >
                          <span>Generate Domain Suggestions</span>
                          <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Results Display - Two Row Layout */}
                  <div className="space-y-6">
                    {/* Row 1: Summary Stats */}
                    {suggestions.length > 0 && (
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />

                        <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-semibold text-slate-900">
                              Generation Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-trust-green">{suggestions.length}</div>
                                <div className="text-xs text-slate-600 mt-1">Suggestions</div>
                              </div>
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-emerald-600">{suggestionType}</div>
                                <div className="text-xs text-slate-600 mt-1">Type</div>
                              </div>
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-blue-600">Ready</div>
                                <div className="text-xs text-slate-600 mt-1">Status</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {/* Row 2: Domain List */}
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />

                      <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                        <CardHeader className="space-y-1 pb-4">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl font-bold text-slate-900">
                              Domain Suggestions
                            </CardTitle>
                            {suggestions.length > 0 && (
                              <div className="flex gap-2">
                                <Button
                                  onClick={handleCopyAll}
                                  variant="outline"
                                  size="sm"
                                  className="gap-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm border-slate-200/50"
                                >
                                  {copiedAll ? (
                                    <CheckCircle2 className="w-4 h-4 text-trust-green" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                  All
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
                                <Button
                                  onClick={handleExportCSV}
                                  variant="outline"
                                  size="sm"
                                  className="gap-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm border-slate-200/50"
                                >
                                  <Download className="w-4 h-4" />
                                  CSV
                                </Button>
                              </div>
                            )}
                          </div>
                          <CardDescription className="text-slate-600">
                            {suggestions.length > 0
                              ? `${suggestions.length} creative domain variations for cold email campaigns`
                              : 'Generate suggestions to see domain ideas'
                            }
                          </CardDescription>
                        </CardHeader>

                        <CardContent>
                          <div ref={resultsRef}>
                            {suggestions.length === 0 ? (
                              <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200/50">
                                  <Globe className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Generate</h3>
                                <p className="text-slate-600">
                                  Enter your domain and click Generate to see creative suggestions.
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                                {suggestions.map((suggestion, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl hover:shadow-md hover:border-trust-green/20 transition-all group"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-trust-green to-emerald-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                        {index + 1}
                                      </div>
                                      <div className="min-w-0">
                                        <p className="font-semibold text-slate-800 truncate">
                                          {suggestion.domain}
                                        </p>
                                        <p className="text-xs text-slate-500 capitalize">
                                          {suggestion.type} variation
                                        </p>
                                      </div>
                                    </div>
                                    <Button
                                      onClick={() => handleCopy(suggestion.domain, index)}
                                      variant="ghost"
                                      size="sm"
                                      className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                    >
                                      {copiedIndex === index ? (
                                        <CheckCircle2 className="w-4 h-4 text-trust-green" />
                                      ) : (
                                        <Copy className="w-4 h-4" />
                                      )}
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Next Steps Section */}
                {suggestions.length > 0 && (
                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />

                      <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                        <CardHeader>
                          <CardTitle className="text-xl font-bold text-slate-900">
                            Next Steps
                          </CardTitle>
                          <CardDescription>
                            Follow these steps to register and set up your domains
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-white/50 rounded-xl border border-slate-200/50 hover:border-trust-green/30 transition-colors">
                              <div className="w-10 h-10 bg-trust-green/10 rounded-lg flex items-center justify-center mb-3">
                                <span className="text-lg font-bold text-trust-green">1</span>
                              </div>
                              <h4 className="font-semibold text-slate-900 mb-2">
                                Check Availability
                              </h4>
                              <p className="text-sm text-slate-600">
                                Use a domain registrar to verify which domains are available for registration
                              </p>
                            </div>
                            <div className="p-4 bg-white/50 rounded-xl border border-slate-200/50 hover:border-trust-green/30 transition-colors">
                              <div className="w-10 h-10 bg-trust-green/10 rounded-lg flex items-center justify-center mb-3">
                                <span className="text-lg font-bold text-trust-green">2</span>
                              </div>
                              <h4 className="font-semibold text-slate-900 mb-2">
                                Register Domains
                              </h4>
                              <p className="text-sm text-slate-600">
                                Register your chosen domains for cold email campaigns to protect your brand
                              </p>
                            </div>
                            <div className="p-4 bg-white/50 rounded-xl border border-slate-200/50 hover:border-trust-green/30 transition-colors">
                              <div className="w-10 h-10 bg-trust-green/10 rounded-lg flex items-center justify-center mb-3">
                                <span className="text-lg font-bold text-trust-green">3</span>
                              </div>
                              <h4 className="font-semibold text-slate-900 mb-2">
                                Setup Email Infrastructure
                              </h4>
                              <p className="text-sm text-slate-600">
                                Configure email accounts, DNS records, and warm up your domains properly
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </Container>
          </Section>

          {/* CTA Section */}
          <Section padding="lg" className="bg-transparent">
            <Container>
              <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-trust-green to-trust-green-dark rounded-2xl p-8 lg:p-12 text-white">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                  Need Help Setting Up Your Domains?
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  COLDINFRA offers complete domain setup and email infrastructure management at just $2.50 per mailbox.
                </p>
                <a
                  href="/book-call"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-trust-green font-semibold rounded-xl hover:bg-slate-50 transition-colors duration-200 shadow-lg"
                >
                  Book a Free Call
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
