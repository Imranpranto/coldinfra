'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Download, ArrowRight, TrendingUp, Mail, Users, DollarSign } from 'lucide-react'
import html2canvas from 'html2canvas'

interface ROIResults {
  openedEmails: number
  positiveReplies: number
  closedDeals: number
  totalRevenue: number
  requiredMailboxes: number
  requiredDomains: number
  revenuePerMailbox: number
  roi: number
  monthlyCost: number
  profitMargin: number
  costPerMailbox: number
}

export default function ROICalculatorPage() {
  const [monthlyProspects, setMonthlyProspects] = useState([5000])
  const [openRate, setOpenRate] = useState([50])
  const [replyRate, setReplyRate] = useState([5])
  const [closeRate, setCloseRate] = useState([5])
  const [avgDealValue, setAvgDealValue] = useState([5000])
  const [results, setResults] = useState<ROIResults | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const calculateROI = () => {
    const prospects = monthlyProspects[0]
    const open = openRate[0]
    const reply = replyRate[0]
    const close = closeRate[0]
    const dealValue = avgDealValue[0]

    // Calculate campaign metrics (correct flow)
    // Step 1: Calculate opened emails from total prospects
    const openedEmails = Math.round((prospects * open) / 100)

    // Step 2: Calculate positive replies from OPENED emails (not total prospects)
    const positiveReplies = Math.round((openedEmails * reply) / 100)

    // Step 3: Calculate closed deals from positive replies
    const closedDeals = Math.round((positiveReplies * close) / 100)

    // Step 4: Calculate total revenue from closed deals
    const totalRevenue = closedDeals * dealValue

    // Calculate infrastructure requirements
    // Best practice: 50 emails per day per mailbox = 1,500 emails/month per mailbox
    const emailsPerMailboxPerMonth = 1500
    const requiredMailboxes = Math.max(1, Math.ceil(prospects / emailsPerMailboxPerMonth))

    // Best practice: 3-5 mailboxes per domain for optimal deliverability
    const mailboxesPerDomain = 4
    const requiredDomains = Math.ceil(requiredMailboxes / mailboxesPerDomain)

    // Calculate costs (COLDINFRA tiered pricing)
    let costPerMailbox: number
    if (requiredMailboxes >= 10 && requiredMailboxes <= 29) {
      costPerMailbox = 3.00
    } else if (requiredMailboxes >= 30 && requiredMailboxes <= 99) {
      costPerMailbox = 2.80
    } else if (requiredMailboxes >= 100) {
      costPerMailbox = 2.50
    } else {
      // For less than 10 mailboxes, use highest tier
      costPerMailbox = 3.00
    }
    const monthlyCost = requiredMailboxes * costPerMailbox

    // Calculate ROI and profitability metrics
    const revenuePerMailbox = requiredMailboxes > 0 ? totalRevenue / requiredMailboxes : 0
    const profit = totalRevenue - monthlyCost
    const roi = monthlyCost > 0 ? (profit / monthlyCost) * 100 : 0
    const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0

    setResults({
      openedEmails,
      positiveReplies,
      closedDeals,
      totalRevenue,
      requiredMailboxes,
      requiredDomains,
      revenuePerMailbox,
      roi,
      monthlyCost,
      profitMargin,
      costPerMailbox
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
      link.download = 'cold-email-roi-analysis.png'
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
                    Cold Email ROI Calculator
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Calculate the expected return on investment for your cold email campaigns and determine infrastructure requirements.
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
                            ROI Calculator
                          </CardTitle>
                          <Badge variant="secondary" className="bg-trust-green/10 text-trust-green border-trust-green/20 hover:bg-trust-green/20">
                            Campaign
                          </Badge>
                        </div>
                        <CardDescription className="text-slate-600">
                          Calculate your cold email campaign ROI
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Monthly Prospects Slider */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">
                              Monthly Prospects
                            </label>
                            <div className="text-2xl font-bold bg-gradient-to-r from-trust-green to-trust-green-dark bg-clip-text text-transparent">
                              {monthlyProspects[0].toLocaleString()}
                            </div>
                          </div>
                          <Slider
                            value={monthlyProspects}
                            onValueChange={setMonthlyProspects}
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

                        {/* Open Rate Slider */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">
                              Email Open Rate
                            </label>
                            <div className="text-xl font-bold text-slate-900">
                              {openRate[0]}%
                            </div>
                          </div>
                          <Slider
                            value={openRate}
                            onValueChange={setOpenRate}
                            min={10}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        {/* Reply Rate Slider */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">
                              Positive Reply Rate
                            </label>
                            <div className="text-xl font-bold text-slate-900">
                              {replyRate[0]}%
                            </div>
                          </div>
                          <Slider
                            value={replyRate}
                            onValueChange={setReplyRate}
                            min={1}
                            max={30}
                            step={0.5}
                            className="w-full"
                          />
                        </div>

                        {/* Close Rate Slider */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">
                              Close Rate
                            </label>
                            <div className="text-xl font-bold text-slate-900">
                              {closeRate[0]}%
                            </div>
                          </div>
                          <Slider
                            value={closeRate}
                            onValueChange={setCloseRate}
                            min={5}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        {/* Average Deal Value Slider */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">
                              Average Deal Value
                            </label>
                            <div className="text-xl font-bold bg-gradient-to-r from-trust-green to-trust-green-dark bg-clip-text text-transparent">
                              ${avgDealValue[0].toLocaleString()}
                            </div>
                          </div>
                          <Slider
                            value={avgDealValue}
                            onValueChange={setAvgDealValue}
                            min={500}
                            max={50000}
                            step={500}
                            className="w-full"
                          />
                          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                            <span>$500</span>
                            <span className="text-slate-500">$25K</span>
                            <span>$50K</span>
                          </div>
                        </div>

                        <Button
                          onClick={calculateROI}
                          className="w-full bg-gradient-to-r from-trust-green to-trust-green-dark hover:from-trust-green-dark hover:to-trust-green text-white shadow-lg shadow-trust-green/30 group"
                          size="lg"
                        >
                          <span>Calculate ROI</span>
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
                                  ROI Analysis
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
                              {/* Expected Value Stats - Two Row Grid */}
                              <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-slate-900 mb-3">Expected Campaign Results:</h3>

                                {/* First Row - 2 columns */}
                                <div className="grid grid-cols-2 gap-2.5">
                                  {/* Opened Emails */}
                                  <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    <div className="relative p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                      <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                          <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                            <Mail className="w-4 h-4 text-blue-600" />
                                          </div>
                                          <div className="text-xs text-slate-600 leading-tight">prospects who will open</div>
                                        </div>
                                        <div className="text-xl font-bold text-slate-900">
                                          {results.openedEmails.toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Positive Replies */}
                                  <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    <div className="relative p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                      <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                          <div className="flex-shrink-0 w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                                            <Users className="w-4 h-4 text-purple-600" />
                                          </div>
                                          <div className="text-xs text-slate-600 leading-tight">positive replies</div>
                                        </div>
                                        <div className="text-xl font-bold text-slate-900">
                                          {results.positiveReplies.toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Second Row - 2 columns */}
                                <div className="grid grid-cols-2 gap-2.5">
                                  {/* Closed Deals */}
                                  <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    <div className="relative p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                      <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                          <div className="flex-shrink-0 w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                                            <TrendingUp className="w-4 h-4 text-orange-600" />
                                          </div>
                                          <div className="text-xs text-slate-600 leading-tight">closed deals</div>
                                        </div>
                                        <div className="text-xl font-bold text-slate-900">
                                          {results.closedDeals}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Total Revenue - Highlighted */}
                                  <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-trust-green via-emerald-600 to-trust-green-dark p-[2px] shadow-lg">
                                    <div className="bg-white rounded-[7px] p-3">
                                      <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-trust-green to-emerald-600 rounded-lg flex items-center justify-center">
                                            <DollarSign className="w-4 h-4 text-white" />
                                          </div>
                                          <div className="text-xs font-medium text-slate-700 leading-tight">expected revenue</div>
                                        </div>
                                        <div className="text-xl font-bold bg-gradient-to-r from-trust-green to-emerald-600 bg-clip-text text-transparent">
                                          ${results.totalRevenue.toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Infrastructure Requirements */}
                              <div className="pt-3 border-t border-slate-200">
                                <h3 className="text-sm font-semibold text-slate-900 mb-3">Infrastructure Needed:</h3>
                                <div className="space-y-2.5">
                                  {/* Grid - Mailboxes and Domains */}
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

                                  {/* Cost Highlight with Tiered Pricing Info - Full Width */}
                                  <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-trust-green via-emerald-600 to-trust-green-dark p-[2px] shadow-lg">
                                    <div className="bg-white rounded-[7px] p-3">
                                      <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                          <div className="w-7 h-7 bg-gradient-to-br from-trust-green to-emerald-600 rounded-lg flex items-center justify-center">
                                            <DollarSign className="w-3.5 h-3.5 text-white" />
                                          </div>
                                          <span className="text-xs font-semibold text-slate-700">Monthly Investment</span>
                                        </div>
                                        <span className="text-xl font-bold bg-gradient-to-r from-trust-green to-emerald-600 bg-clip-text text-transparent">
                                          ${results.monthlyCost.toLocaleString()}
                                        </span>
                                      </div>
                                      <div className="pl-9 text-[10px] text-slate-600 leading-relaxed">
                                        At ${results.costPerMailbox.toFixed(2)}/mailbox
                                        {results.requiredMailboxes >= 10 && results.requiredMailboxes <= 29 && " (10-29 mailboxes tier)"}
                                        {results.requiredMailboxes >= 30 && results.requiredMailboxes <= 99 && " (30-99 mailboxes tier)"}
                                        {results.requiredMailboxes >= 100 && " (100+ mailboxes tier)"}
                                        {results.requiredMailboxes < 10 && " (starter tier)"}
                                      </div>
                                    </div>
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
                              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Calculate</h3>
                            <p className="text-slate-600">
                              Enter your campaign metrics and click Calculate ROI to see your expected results.
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
                    <p><strong>Infrastructure Calculation:</strong> Based on sending 50 emails per day per mailbox (1,500/month) for optimal deliverability.</p>
                    <p><strong>Domain Requirements:</strong> We recommend 3-5 mailboxes per domain to maintain sender reputation.</p>
                    <p><strong>Tiered Pricing:</strong> COLDINFRA offers volume-based pricing:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>10-29 mailboxes: $3.00/mailbox/month</li>
                      <li>30-99 mailboxes: $2.80/mailbox/month</li>
                      <li>100+ mailboxes: $2.50/mailbox/month</li>
                    </ul>
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
                  Ready to Launch Your Campaign?
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  Get your cold email infrastructure set up in minutes with COLDINFRA at just $2.50/mailbox.
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
