'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Download, ArrowRight, Mail, Users, TrendingDown, AlertCircle } from 'lucide-react'
import html2canvas from 'html2canvas'

interface SequenceStep {
  step: number
  emailsSent: number
  bounces: number
  replies: number
  unsubscribes: number
  remaining: number
}

interface VolumeResults {
  totalEmailsSent: number
  totalBounces: number
  totalReplies: number
  totalUnsubscribes: number
  remainingContacts: number
  requiredMailboxes: number
  requiredDomains: number
  sequence: SequenceStep[]
}

export default function EmailVolumeCalculatorPage() {
  const [contactListSize, setContactListSize] = useState([10000])
  const [bounceRate, setBounceRate] = useState([5])
  const [replyRate, setReplyRate] = useState([3])
  const [unsubscribeRate, setUnsubscribeRate] = useState([1])
  const [notSentRate, setNotSentRate] = useState([2])
  const [numFollowUps, setNumFollowUps] = useState([3])

  const [results, setResults] = useState<VolumeResults | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const calculateVolume = () => {
    const contacts = contactListSize[0]
    const bounce = bounceRate[0] / 100
    const reply = replyRate[0] / 100
    const unsub = unsubscribeRate[0] / 100
    const notSent = notSentRate[0] / 100
    const followUps = numFollowUps[0]

    const sequence: SequenceStep[] = []
    let remaining = contacts
    let totalEmailsSent = 0
    let totalBounces = 0
    let totalReplies = 0
    let totalUnsubscribes = 0

    // Calculate for initial email + follow-ups
    for (let i = 0; i <= followUps; i++) {
      const emailsSent = Math.round(remaining * (1 - notSent))
      const bounces = Math.round(emailsSent * bounce)
      const replies = Math.round(emailsSent * reply)
      const unsubscribes = Math.round(emailsSent * unsub)

      // Remove bounces, replies, and unsubscribes from remaining
      remaining = remaining - bounces - replies - unsubscribes

      sequence.push({
        step: i,
        emailsSent,
        bounces,
        replies,
        unsubscribes,
        remaining
      })

      totalEmailsSent += emailsSent
      totalBounces += bounces
      totalReplies += replies
      totalUnsubscribes += unsubscribes
    }

    // Calculate infrastructure requirements
    const emailsPerMailboxPerMonth = 1500
    const requiredMailboxes = Math.max(1, Math.ceil(totalEmailsSent / emailsPerMailboxPerMonth))
    const mailboxesPerDomain = 4
    const requiredDomains = Math.ceil(requiredMailboxes / mailboxesPerDomain)

    setResults({
      totalEmailsSent,
      totalBounces,
      totalReplies,
      totalUnsubscribes,
      remainingContacts: remaining,
      requiredMailboxes,
      requiredDomains,
      sequence
    })
  }

  const downloadResults = async () => {
    if (!resultsRef.current) return

    try {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      })

      const link = document.createElement('a')
      link.download = 'email-volume-analysis.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error generating image:', error)
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
                    <span className="text-sm font-semibold text-trust-green">Free Calculator Tool</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                    Email Volume Calculator
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Calculate total email volume and contact attrition through your sequence to optimize campaign planning.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input Form - Glassmorphic Style */}
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />

                    <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                      <CardHeader className="space-y-1 pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-2xl font-bold text-slate-900">
                            Volume Calculator
                          </CardTitle>
                          <Badge variant="secondary" className="bg-trust-green/10 text-trust-green border-trust-green/20 hover:bg-trust-green/20">
                            Campaign
                          </Badge>
                        </div>
                        <CardDescription className="text-slate-600">
                          Calculate email volume and attrition
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Contact List Size */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">
                              Contact List Size
                            </label>
                            <div className="text-2xl font-bold bg-gradient-to-r from-trust-green to-trust-green-dark bg-clip-text text-transparent">
                              {contactListSize[0].toLocaleString()}
                            </div>
                          </div>
                          <Slider
                            value={contactListSize}
                            onValueChange={setContactListSize}
                            min={100}
                            max={100000}
                            step={100}
                            className="w-full"
                          />
                          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                            <span>100</span>
                            <span className="text-slate-500">50K</span>
                            <span>100K</span>
                          </div>
                        </div>

                        {/* Bounce Rate */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">
                              Bounce Rate
                            </label>
                            <div className="text-xl font-bold text-slate-900">
                              {bounceRate[0]}%
                            </div>
                          </div>
                          <Slider
                            value={bounceRate}
                            onValueChange={setBounceRate}
                            min={0}
                            max={20}
                            step={0.5}
                            className="w-full"
                          />
                        </div>

                        {/* Reply Rate */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">
                              Reply Rate
                            </label>
                            <div className="text-xl font-bold text-slate-900">
                              {replyRate[0]}%
                            </div>
                          </div>
                          <Slider
                            value={replyRate}
                            onValueChange={setReplyRate}
                            min={0}
                            max={30}
                            step={0.5}
                            className="w-full"
                          />
                        </div>

                        {/* Unsubscribe Rate */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">
                              Unsubscribe Rate
                            </label>
                            <div className="text-xl font-bold text-slate-900">
                              {unsubscribeRate[0]}%
                            </div>
                          </div>
                          <Slider
                            value={unsubscribeRate}
                            onValueChange={setUnsubscribeRate}
                            min={0}
                            max={10}
                            step={0.1}
                            className="w-full"
                          />
                        </div>

                        {/* Number of Follow-ups */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">
                              Number of Follow-ups
                            </label>
                            <div className="text-xl font-bold bg-gradient-to-r from-trust-green to-trust-green-dark bg-clip-text text-transparent">
                              {numFollowUps[0]}
                            </div>
                          </div>
                          <Slider
                            value={numFollowUps}
                            onValueChange={setNumFollowUps}
                            min={1}
                            max={10}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                            <span>1</span>
                            <span className="text-slate-500">5</span>
                            <span>10</span>
                          </div>
                        </div>

                        <Button
                          onClick={calculateVolume}
                          className="w-full bg-gradient-to-r from-trust-green to-trust-green-dark hover:from-trust-green-dark hover:to-trust-green text-white shadow-lg shadow-trust-green/30 group"
                          size="lg"
                        >
                          <span>Calculate Volume</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Results Display - Glassmorphic Style */}
                  <div className="relative">
                    {results ? (
                      <>
                        {/* Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />

                        <div ref={resultsRef} className="relative">
                          <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                            <CardHeader className="space-y-1 pb-4">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold text-slate-900">
                                  Volume Analysis
                                </CardTitle>
                                <Button
                                  onClick={downloadResults}
                                  variant="outline"
                                  size="sm"
                                  className="gap-2 bg-white/50 hover:bg-white/80 backdrop-blur-sm border-slate-200/50"
                                >
                                  <Download className="w-4 h-4" />
                                  Download
                                </Button>
                              </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                              {/* Campaign Summary Stats - Single Row with 4 Cards */}
                              <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-slate-900 mb-3">Campaign Summary:</h3>

                                {/* Single Row - 4 columns */}
                                <div className="grid grid-cols-4 gap-2">
                                  {/* Total Sent */}
                                  <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    <div className="relative p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                      <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-center">
                                          <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                                            <Mail className="w-3.5 h-3.5 text-blue-600" />
                                          </div>
                                        </div>
                                        <div className="text-[10px] text-slate-600 text-center leading-tight">Sent</div>
                                        <div className="text-lg font-bold text-slate-900 text-center">
                                          {results.totalEmailsSent.toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Replies */}
                                  <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    <div className="relative p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                      <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-center">
                                          <div className="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center">
                                            <Users className="w-3.5 h-3.5 text-purple-600" />
                                          </div>
                                        </div>
                                        <div className="text-[10px] text-slate-600 text-center leading-tight">Replies</div>
                                        <div className="text-lg font-bold text-purple-700 text-center">
                                          {results.totalReplies.toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Bounces */}
                                  <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    <div className="relative p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                      <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-center">
                                          <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center">
                                            <TrendingDown className="w-3.5 h-3.5 text-orange-600" />
                                          </div>
                                        </div>
                                        <div className="text-[10px] text-slate-600 text-center leading-tight">Bounces</div>
                                        <div className="text-lg font-bold text-orange-700 text-center">
                                          {results.totalBounces.toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Remaining Contacts - Highlighted */}
                                  <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-trust-green via-emerald-600 to-trust-green-dark p-[2px] shadow-lg">
                                    <div className="bg-white rounded-[7px] p-2.5">
                                      <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-center">
                                          <div className="w-7 h-7 bg-gradient-to-br from-trust-green to-emerald-600 rounded-lg flex items-center justify-center">
                                            <AlertCircle className="w-3.5 h-3.5 text-white" />
                                          </div>
                                        </div>
                                        <div className="text-[10px] font-medium text-slate-700 text-center leading-tight">Remaining</div>
                                        <div className="text-lg font-bold bg-gradient-to-r from-trust-green to-emerald-600 bg-clip-text text-transparent text-center">
                                          {results.remainingContacts.toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Infrastructure Requirements */}
                              <div className="pt-3 border-t border-slate-200">
                                <h3 className="text-sm font-semibold text-slate-900 mb-3">Infrastructure Needed:</h3>
                                <div className="grid grid-cols-2 gap-2.5">
                                  {/* Mailboxes Card */}
                                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center">
                                          <Mail className="w-3.5 h-3.5 text-slate-600" />
                                        </div>
                                        <span className="text-[10px] font-medium text-slate-700 leading-tight">Mailboxes</span>
                                      </div>
                                      <span className="text-lg font-bold text-slate-900">{results.requiredMailboxes}</span>
                                    </div>
                                  </div>

                                  {/* Domains Card */}
                                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center">
                                          <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                          </svg>
                                        </div>
                                        <span className="text-[10px] font-medium text-slate-700 leading-tight">Domains</span>
                                      </div>
                                      <span className="text-lg font-bold text-slate-900">{results.requiredDomains}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Sequence Steps - Modern Spreadsheet Table */}
                              <div className="pt-3 border-t border-slate-200">
                                <h3 className="text-sm font-semibold text-slate-900 mb-3">Sequence Breakdown:</h3>
                                <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                                  {/* Table Header */}
                                  <div className="grid grid-cols-5 gap-px bg-slate-200 border-b border-slate-200">
                                    <div className="bg-slate-50 px-3 py-2 text-[10px] font-semibold text-slate-700 uppercase tracking-wider">
                                      Step
                                    </div>
                                    <div className="bg-slate-50 px-3 py-2 text-[10px] font-semibold text-slate-700 uppercase tracking-wider text-right">
                                      Sent
                                    </div>
                                    <div className="bg-slate-50 px-3 py-2 text-[10px] font-semibold text-slate-700 uppercase tracking-wider text-right">
                                      Replies
                                    </div>
                                    <div className="bg-slate-50 px-3 py-2 text-[10px] font-semibold text-slate-700 uppercase tracking-wider text-right">
                                      Bounces
                                    </div>
                                    <div className="bg-slate-50 px-3 py-2 text-[10px] font-semibold text-slate-700 uppercase tracking-wider text-right">
                                      Remaining
                                    </div>
                                  </div>

                                  {/* Table Body - Scrollable */}
                                  <div className="max-h-48 overflow-y-auto">
                                    {results.sequence.map((step, index) => (
                                      <div
                                        key={step.step}
                                        className={`grid grid-cols-5 gap-px bg-slate-100 ${
                                          index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                                        } hover:bg-emerald-50/30 transition-colors duration-150`}
                                      >
                                        <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} px-3 py-2.5 text-xs font-medium text-slate-900 hover:bg-emerald-50/30 transition-colors duration-150`}>
                                          {step.step === 0 ? 'Initial' : `Follow-up ${step.step}`}
                                        </div>
                                        <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} px-3 py-2.5 text-xs text-slate-700 text-right font-mono hover:bg-emerald-50/30 transition-colors duration-150`}>
                                          {step.emailsSent.toLocaleString()}
                                        </div>
                                        <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} px-3 py-2.5 text-xs text-emerald-700 text-right font-mono font-medium hover:bg-emerald-50/30 transition-colors duration-150`}>
                                          {step.replies.toLocaleString()}
                                        </div>
                                        <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} px-3 py-2.5 text-xs text-orange-700 text-right font-mono hover:bg-emerald-50/30 transition-colors duration-150`}>
                                          {step.bounces.toLocaleString()}
                                        </div>
                                        <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} px-3 py-2.5 text-xs text-slate-900 text-right font-mono font-semibold hover:bg-emerald-50/30 transition-colors duration-150`}>
                                          {step.remaining.toLocaleString()}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </>
                    ) : (
                      <div className="relative">
                        <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                          <CardContent className="p-12 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200/50">
                              <Mail className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Calculate</h3>
                            <p className="text-slate-600">
                              Set your campaign parameters and click Calculate to see email volume breakdown.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Section */}
                <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    How This Calculator Works
                  </h3>
                  <div className="text-blue-800 space-y-2 text-sm">
                    <p><strong>Volume Calculation:</strong> Shows total emails sent across your entire sequence including all follow-ups.</p>
                    <p><strong>Contact Attrition:</strong> Accounts for bounces, replies, and unsubscribes reducing contacts at each step.</p>
                    <p><strong>Infrastructure Requirements:</strong> Based on 50 emails per day per mailbox (1,500/month) with 3-5 mailboxes per domain.</p>
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
                  Ready to Scale Your Campaigns?
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  Get the infrastructure you need at COLDINFRA's competitive pricing.
                </p>
                <a
                  href="/book-call"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-trust-green font-semibold rounded-xl hover:bg-slate-50 transition-colors duration-200 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
