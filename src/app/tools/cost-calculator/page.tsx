'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Download, ArrowRight, DollarSign, Server, Shield } from 'lucide-react'
import html2canvas from 'html2canvas'

interface CostResults {
  espCost: number
  sequencerCost: number
  infrastructureCost: number
  totalMonthlyCost: number
  totalCost: number
  timeframe: number
}

export default function CostCalculatorPage() {
  // ESP Costs
  const [espProvider, setEspProvider] = useState('Google Workspace')
  const [espCostPerUser, setEspCostPerUser] = useState(6)
  const [numUsers, setNumUsers] = useState(10)

  // Sequencer Costs
  const [sequencerProvider, setSequencerProvider] = useState('Instantly')
  const [sequencerMonthlyCost, setSequencerMonthlyCost] = useState(97)

  // Infrastructure Costs
  const [serverCost, setServerCost] = useState(0)
  const [securityCost, setSecurityCost] = useState(0)
  const [maintenanceCost, setMaintenanceCost] = useState(0)
  const [backupCost, setBackupCost] = useState(0)
  const [otherCost, setOtherCost] = useState(0)

  // Timeframe
  const [timeframe, setTimeframe] = useState(1)

  const [results, setResults] = useState<CostResults | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const calculateCosts = () => {
    const espCost = espCostPerUser * numUsers
    const sequencerCost = sequencerMonthlyCost
    const infrastructureCost = serverCost + securityCost + maintenanceCost + backupCost + otherCost
    const totalMonthlyCost = espCost + sequencerCost + infrastructureCost
    const totalCost = totalMonthlyCost * timeframe

    setResults({
      espCost,
      sequencerCost,
      infrastructureCost,
      totalMonthlyCost,
      totalCost,
      timeframe
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
      link.download = 'cold-email-cost-analysis.png'
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
                    Cold Email Cost Calculator
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Calculate the total cost of your cold email infrastructure across ESP, sequencer, and additional services.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <div className="space-y-6">
                    {/* ESP Costs */}
                    <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Server className="w-5 h-5 text-blue-600" />
                          Email Service Provider
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-2 block">Provider</label>
                          <Input
                            type="text"
                            value={espProvider}
                            onChange={(e) => setEspProvider(e.target.value)}
                            placeholder="e.g., Google Workspace"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-2 block">Cost per User/Month ($)</label>
                          <Input
                            type="number"
                            value={espCostPerUser}
                            onChange={(e) => setEspCostPerUser(Number(e.target.value))}
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-2 block">Number of Users</label>
                          <Input
                            type="number"
                            value={numUsers}
                            onChange={(e) => setNumUsers(Number(e.target.value))}
                            min="1"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Sequencer Costs */}
                    <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <ArrowRight className="w-5 h-5 text-purple-600" />
                          Email Sequencer
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-2 block">Provider</label>
                          <Input
                            type="text"
                            value={sequencerProvider}
                            onChange={(e) => setSequencerProvider(e.target.value)}
                            placeholder="e.g., Instantly, Smartlead"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 mb-2 block">Monthly Cost ($)</label>
                          <Input
                            type="number"
                            value={sequencerMonthlyCost}
                            onChange={(e) => setSequencerMonthlyCost(Number(e.target.value))}
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Infrastructure Costs */}
                    <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Shield className="w-5 h-5 text-orange-600" />
                          Additional Infrastructure
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Servers ($)</label>
                            <Input
                              type="number"
                              value={serverCost}
                              onChange={(e) => setServerCost(Number(e.target.value))}
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Security ($)</label>
                            <Input
                              type="number"
                              value={securityCost}
                              onChange={(e) => setSecurityCost(Number(e.target.value))}
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Maintenance ($)</label>
                            <Input
                              type="number"
                              value={maintenanceCost}
                              onChange={(e) => setMaintenanceCost(Number(e.target.value))}
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Backup ($)</label>
                            <Input
                              type="number"
                              value={backupCost}
                              onChange={(e) => setBackupCost(Number(e.target.value))}
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="text-sm font-medium text-slate-700 mb-2 block">Other ($)</label>
                            <Input
                              type="number"
                              value={otherCost}
                              onChange={(e) => setOtherCost(Number(e.target.value))}
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Timeframe */}
                    <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-lg">Timeframe</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <select
                          value={timeframe}
                          onChange={(e) => setTimeframe(Number(e.target.value))}
                          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-trust-green"
                        >
                          <option value={1}>1 Month</option>
                          <option value={3}>3 Months</option>
                          <option value={6}>6 Months</option>
                          <option value={9}>9 Months</option>
                          <option value={12}>12 Months (Annual)</option>
                        </select>
                      </CardContent>
                    </Card>

                    <Button
                      onClick={calculateCosts}
                      className="w-full bg-gradient-to-r from-trust-green to-trust-green-dark hover:from-trust-green-dark hover:to-trust-green text-white shadow-lg shadow-trust-green/30 group"
                      size="lg"
                    >
                      <span>Calculate Total Cost</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
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
                                  Cost Analysis
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
                              {/* Total Cost Highlight */}
                              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-trust-green via-emerald-600 to-trust-green-dark p-[2px] shadow-lg">
                                <div className="bg-white rounded-[10px] p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-10 h-10 bg-gradient-to-br from-trust-green to-emerald-600 rounded-lg flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-white" />
                                      </div>
                                      <div>
                                        <div className="text-xs font-medium text-slate-700">Total Cost ({timeframe} month{timeframe > 1 ? 's' : ''})</div>
                                        <div className="text-2xl font-bold bg-gradient-to-r from-trust-green to-emerald-600 bg-clip-text text-transparent">
                                          ${results.totalCost.toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Cost Breakdown */}
                              <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-slate-900">Monthly Breakdown:</h3>

                                <div className="grid grid-cols-2 gap-2.5">
                                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <div className="flex flex-col gap-1">
                                      <div className="text-[10px] font-medium text-slate-600">ESP Cost</div>
                                      <div className="text-lg font-bold text-slate-900">${results.espCost.toLocaleString()}</div>
                                      <div className="text-[10px] text-slate-500">{Math.round((results.espCost / results.totalMonthlyCost) * 100)}%</div>
                                    </div>
                                  </div>

                                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <div className="flex flex-col gap-1">
                                      <div className="text-[10px] font-medium text-slate-600">Sequencer</div>
                                      <div className="text-lg font-bold text-slate-900">${results.sequencerCost.toLocaleString()}</div>
                                      <div className="text-[10px] text-slate-500">{Math.round((results.sequencerCost / results.totalMonthlyCost) * 100)}%</div>
                                    </div>
                                  </div>

                                  <div className="col-span-2 p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                    <div className="flex flex-col gap-1">
                                      <div className="text-[10px] font-medium text-slate-600">Infrastructure</div>
                                      <div className="text-lg font-bold text-slate-900">${results.infrastructureCost.toLocaleString()}</div>
                                      <div className="text-[10px] text-slate-500">{Math.round((results.infrastructureCost / results.totalMonthlyCost) * 100)}%</div>
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-3 border-t border-slate-200">
                                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <span className="text-sm font-semibold text-slate-700">Monthly Total</span>
                                    <span className="text-xl font-bold text-slate-900">${results.totalMonthlyCost.toLocaleString()}</span>
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
                              <DollarSign className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Calculate</h3>
                            <p className="text-slate-600">
                              Enter your infrastructure costs and click Calculate to see your total expenses.
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
                  Save on Infrastructure Costs
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  COLDINFRA offers optimized Google Workspace mailboxes at just $2.50 each.
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
