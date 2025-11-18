'use client'

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Copy, CheckCircle2, Globe, Sparkles } from 'lucide-react'
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
            <Globe className="w-4 h-4 text-trust-green" />
            <span className="text-sm font-medium text-slate-700">Domain Generator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-trust-green via-emerald-600 to-trust-green-dark bg-clip-text text-transparent">
            Cold Email Domain Generator
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Generate creative domain name suggestions for your cold email campaigns
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Domain Input */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Globe className="w-6 h-6 text-trust-green" />
                    Main Domain
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Your Domain
                    </label>
                    <Input
                      type="text"
                      value={mainDomain}
                      onChange={(e) => setMainDomain(e.target.value)}
                      placeholder="e.g., coldinfra.com"
                      className="bg-white/50 border-slate-200"
                    />
                    <p className="text-sm text-slate-500 mt-1">
                      Enter your main domain (e.g., coldinfra.com)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Configuration */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-trust-green" />
                    Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Suggestion Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['mixed', 'prefix', 'suffix'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setSuggestionType(type)}
                          className={`px-4 py-2 rounded-xl font-medium transition-all ${
                            suggestionType === type
                              ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                              : 'bg-white/50 text-slate-700 hover:bg-white/80'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Number of Suggestions: {numSuggestions}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={numSuggestions}
                      onChange={(e) => setNumSuggestions(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-trust-green"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>1</span>
                      <span>30</span>
                    </div>
                  </div>

                  <Button
                    onClick={generateSuggestions}
                    className="w-full bg-gradient-to-r from-trust-green to-emerald-600 hover:from-emerald-600 hover:to-trust-green text-white shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Suggestions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Results Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
            <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Globe className="w-6 h-6 text-trust-green" />
                    Domain Suggestions
                  </CardTitle>
                  {suggestions.length > 0 && (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleCopyAll}
                        variant="outline"
                        size="sm"
                        className="border-trust-green/30 hover:bg-trust-green/10"
                      >
                        {copiedAll ? (
                          <CheckCircle2 className="w-4 h-4 text-trust-green" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        onClick={handleExportCSV}
                        variant="outline"
                        size="sm"
                        className="border-trust-green/30 hover:bg-trust-green/10"
                      >
                        <Download className="w-4 h-4" />
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
                <div ref={resultsRef} className="space-y-3">
                  {suggestions.length === 0 ? (
                    <div className="text-center py-12">
                      <Globe className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">
                        Generate suggestions to see domain ideas
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl hover:shadow-md transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-trust-green to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">
                                {suggestion.domain}
                              </p>
                              <p className="text-xs text-slate-500 capitalize">
                                {suggestion.type}
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleCopy(suggestion.domain, index)}
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
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

        {/* Info Section */}
        {suggestions.length > 0 && (
          <div className="mt-8 max-w-7xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    Next Steps
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white/50 rounded-xl">
                      <h4 className="font-semibold text-trust-green mb-2">
                        1. Check Availability
                      </h4>
                      <p className="text-sm text-slate-600">
                        Use a domain registrar to check if domains are available
                      </p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl">
                      <h4 className="font-semibold text-trust-green mb-2">
                        2. Register Domains
                      </h4>
                      <p className="text-sm text-slate-600">
                        Register your chosen domains for cold email campaigns
                      </p>
                    </div>
                    <div className="p-4 bg-white/50 rounded-xl">
                      <h4 className="font-semibold text-trust-green mb-2">
                        3. Setup Email
                      </h4>
                      <p className="text-sm text-slate-600">
                        Configure email accounts and warm up your domains
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
