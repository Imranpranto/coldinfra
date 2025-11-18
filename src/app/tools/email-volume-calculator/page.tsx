'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Download, ArrowRight, Mail, Users, TrendingDown } from 'lucide-react'
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
    const requiredDomains = Math.ceil(requiredMailboxes / 4)

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
                  {/* Input Form */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />

                    <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                      <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl font-bold text-slate-900">
                          Campaign Settings
                        </CardTitle>
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

                        {/* Not Sent Rate */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">
                              Not Sent Rate
                            </label>
                            <div className="text-xl font-bold text-slate-900">
                              {notSentRate[0]}%
                            </div>
                          </div>
                          <Slider
                            value={notSentRate}
                            onValueChange={setNotSentRate}
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
                            <div className="text-xl font-bold text-slate-900">
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

                  {/* Results Display */}
                  <div className="relative">
                    {results ? (
                      <>
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
                              {/* Summary Stats */}
                              <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-slate-900 mb-3">Campaign Summary:</h3>

                                <div className="grid grid-cols-2 gap-2.5">
                                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                          <Mail className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="text-xs text-slate-600 leading-tight">total sent</div>
                                      </div>
                                      <div className="text-xl font-bold text-slate-900">
                                        {results.totalEmailsSent.toLocaleString()}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                                          <Users className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div className="text-xs text-slate-600 leading-tight">replies</div>
                                      </div>
                                      <div className="text-xl font-bold text-slate-900">
                                        {results.totalReplies.toLocaleString()}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                                          <TrendingDown className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <div className="text-xs text-slate-600 leading-tight">bounces</div>
                                      </div>
                                      <div className="text-xl font-bold text-slate-900">
                                        {results.totalBounces.toLocaleString()}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-trust-green via-emerald-600 to-trust-green-dark p-[2px] shadow-lg">
                                    <div className="bg-white rounded-[7px] p-3">
                                      <div className="flex flex-col gap-2">
                                        <div className="text-xs font-medium text-slate-700 leading-tight">remaining</div>
                                        <div className="text-xl font-bold bg-gradient-to-r from-trust-green to-emerald-600 bg-clip-text text-transparent">
                                          {results.remainingContacts.toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Infrastructure */}
                              <div className="pt-3 border-t border-slate-200">
                                <h3 className="text-sm font-semibold text-slate-900 mb-3">Infrastructure Needed:</h3>
                                <div className="grid grid-cols-2 gap-2.5">
                                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <div className="text-[10px] font-medium text-slate-700 mb-1">Mailboxes</div>
                                    <div className="text-lg font-bold text-slate-900">{results.requiredMailboxes}</div>
                                  </div>
                                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <div className="text-[10px] font-medium text-slate-700 mb-1">Domains</div>
                                    <div className="text-lg font-bold text-slate-900">{results.requiredDomains}</div>
                                  </div>
                                </div>
                              </div>

                              {/* Sequence Steps */}
                              <div className="pt-3 border-t border-slate-200">
                                <h3 className="text-sm font-semibold text-slate-900 mb-3">Sequence Breakdown:</h3>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                  {results.sequence.map((step) => (
                                    <div key={step.step} className="p-2 bg-slate-50 rounded-lg text-xs">
                                      <div className="font-semibold text-slate-900 mb-1">
                                        {step.step === 0 ? 'Initial Email' : `Follow-up ${step.step}`}
                                      </div>
                                      <div className="grid grid-cols-2 gap-1 text-slate-600">
                                        <div>Sent: {step.emailsSent.toLocaleString()}</div>
                                        <div>Replies: {step.replies.toLocaleString()}</div>
                                        <div>Bounces: {step.bounces.toLocaleString()}</div>
                                        <div>Remaining: {step.remaining.toLocaleString()}</div>
                                      </div>
                                    </div>
                                  ))}
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
