'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Download, TrendingUp, Target, DollarSign, Percent, ArrowRight, Mail } from 'lucide-react'
import html2canvas from 'html2canvas'

interface ForecastResults {
  currentSales: number
  growthRate: number
  pipelineRevenue: number
  growthForecast: number
  totalForecast: number
  opportunities: number
  avgDealSize: number
  closingRate: number
  confidenceLevel: 'High' | 'Medium' | 'Low'
  insights: string[]
}

export default function ForecastingCalculatorPage() {
  const [currentSales, setCurrentSales] = useState([100000])
  const [growthRate, setGrowthRate] = useState([10])
  const [numOpportunities, setNumOpportunities] = useState([50])
  const [avgDealSize, setAvgDealSize] = useState([5000])
  const [closingRate, setClosingRate] = useState([25])
  const [results, setResults] = useState<ForecastResults | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const calculateForecast = () => {
    const current = currentSales[0]
    const growth = growthRate[0] / 100
    const opportunities = numOpportunities[0]
    const dealSize = avgDealSize[0]
    const closing = closingRate[0] / 100

    // Calculate pipeline revenue
    const pipelineRevenue = opportunities * dealSize * closing

    // Calculate growth-based forecast
    const growthForecast = current * (1 + growth)

    // Total forecast combines pipeline and growth
    const totalForecast = growthForecast + pipelineRevenue

    // Determine confidence level
    let confidenceLevel: 'High' | 'Medium' | 'Low'
    if (closing >= 0.25 && opportunities >= 40 && growth >= 0.1) {
      confidenceLevel = 'High'
    } else if (closing >= 0.15 && opportunities >= 20 && growth >= 0.05) {
      confidenceLevel = 'Medium'
    } else {
      confidenceLevel = 'Low'
    }

    // Generate insights
    const insights: string[] = []

    if (pipelineRevenue > current * 0.5) {
      insights.push('Strong pipeline coverage - pipeline revenue exceeds 50% of current sales')
    }
    if (growth > 0.15) {
      insights.push('Aggressive growth target - ensure adequate resources to support expansion')
    }
    if (closing < 0.2) {
      insights.push('Low closing rate - focus on improving qualification and sales process')
    }
    if (closing > 0.3) {
      insights.push('Excellent closing rate - maintain current sales strategies')
    }
    if (opportunities < 30) {
      insights.push('Limited pipeline - increase lead generation activities')
    }
    if (opportunities > 60) {
      insights.push('Healthy pipeline volume - ensure adequate sales capacity')
    }
    if (dealSize > 10000) {
      insights.push('High-value deals - ensure longer sales cycles are accounted for')
    }
    if (totalForecast > current * 2) {
      insights.push('Ambitious forecast - consider phased approach and milestone tracking')
    }

    if (insights.length === 0) {
      insights.push('Forecast appears balanced - monitor key metrics regularly')
    }

    setResults({
      currentSales: current,
      growthRate: growthRate[0],
      pipelineRevenue,
      growthForecast,
      totalForecast,
      opportunities,
      avgDealSize: dealSize,
      closingRate: closingRate[0],
      confidenceLevel,
      insights: insights.slice(0, 4) // Limit to 4 insights
    })
  }

  const handleDownload = async () => {
    if (resultsRef.current) {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      })

      const link = document.createElement('a')
      link.download = `sales-forecast-${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
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
                    Sales Forecasting Calculator
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Predict future revenue with accuracy using pipeline metrics and growth trends.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-trust-green/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50" />

                    <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                      <CardHeader className="space-y-1 pb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-trust-green to-emerald-600 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl font-bold text-slate-900">
                              Forecast Inputs
                            </CardTitle>
                            <CardDescription className="text-slate-600">
                              Enter your sales metrics
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Period Sales: {formatCurrency(currentSales[0])}
                    </label>
                    <Slider
                      value={currentSales}
                      onValueChange={setCurrentSales}
                      min={10000}
                      max={1000000}
                      step={10000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>$10K</span>
                      <span>$1M</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Expected Monthly Growth Rate: {growthRate[0]}%
                    </label>
                    <Slider
                      value={growthRate}
                      onValueChange={setGrowthRate}
                      min={0}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                    </div>
                  </div>

                  {/* Pipeline Metrics Section */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Number of Opportunities: {numOpportunities[0]}
                    </label>
                    <Slider
                      value={numOpportunities}
                      onValueChange={setNumOpportunities}
                      min={0}
                      max={200}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>0</span>
                      <span>200</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Average Deal Size: {formatCurrency(avgDealSize[0])}
                    </label>
                    <Slider
                      value={avgDealSize}
                      onValueChange={setAvgDealSize}
                      min={1000}
                      max={50000}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>$1K</span>
                      <span>$50K</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Closing Rate: {closingRate[0]}%
                    </label>
                    <Slider
                      value={closingRate}
                      onValueChange={setClosingRate}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <Button
                    onClick={calculateForecast}
                    className="w-full bg-gradient-to-r from-trust-green to-emerald-600 hover:from-emerald-600 hover:to-trust-green text-white shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Generate Sales Forecast
                  </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Results Section */}
                  <div className="space-y-6">
                    {/* Row 1: Summary Stats (only show when results calculated) */}
                    {results && (
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />

                        <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-semibold text-slate-900">
                              Forecast Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-trust-green">{formatCurrency(results.totalForecast)}</div>
                                <div className="text-xs text-slate-600 mt-1">Total Forecast</div>
                              </div>
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-emerald-600">{results.growthRate}%</div>
                                <div className="text-xs text-slate-600 mt-1">Growth Rate</div>
                              </div>
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <Badge
                                  variant={results.confidenceLevel === 'High' ? 'default' : results.confidenceLevel === 'Medium' ? 'secondary' : 'outline'}
                                  className={`text-sm ${
                                    results.confidenceLevel === 'High'
                                      ? 'bg-trust-green text-white'
                                      : results.confidenceLevel === 'Medium'
                                      ? 'bg-emerald-500 text-white'
                                      : 'bg-slate-200 text-slate-700'
                                  }`}
                                >
                                  {results.confidenceLevel}
                                </Badge>
                                <div className="text-xs text-slate-600 mt-1">Confidence</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {/* Row 2: Detailed Results */}
                    {results ? (
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />

                        <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10">
                          <CardHeader className="space-y-1 pb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-trust-green to-emerald-600 rounded-xl flex items-center justify-center">
                                  <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <CardTitle className="text-2xl font-bold text-slate-900">
                                    Forecast Details
                                  </CardTitle>
                                  <CardDescription className="text-slate-600">
                                    Revenue predictions and insights
                                  </CardDescription>
                                </div>
                              </div>
                              <Button
                                onClick={handleDownload}
                                variant="outline"
                                size="sm"
                                className="border-trust-green/30 hover:bg-trust-green/10 text-trust-green"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Export
                              </Button>
                            </div>
                          </CardHeader>
                    <CardContent>
                      <div ref={resultsRef} className="space-y-6">
                        {/* Total Forecast */}
                        <div className="p-6 bg-gradient-to-br from-trust-green/20 to-emerald-600/20 rounded-xl border-2 border-trust-green/30">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-5 h-5 text-trust-green" />
                            <p className="text-sm font-medium text-slate-600">Total Forecasted Revenue</p>
                          </div>
                          <p className="text-4xl font-bold text-slate-800">
                            {formatCurrency(results.totalForecast)}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              results.confidenceLevel === 'High' ? 'bg-green-100 text-green-800' :
                              results.confidenceLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {results.confidenceLevel} Confidence
                            </span>
                          </div>
                        </div>

                        {/* Breakdown Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-trust-green/10 rounded-xl border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-4 h-4 text-blue-600" />
                              <p className="text-xs font-medium text-slate-600">Pipeline Revenue</p>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">
                              {formatCurrency(results.pipelineRevenue)}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              From {results.opportunities} opportunities
                            </p>
                          </div>

                          <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-trust-green/10 rounded-xl border border-emerald-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Percent className="w-4 h-4 text-emerald-600" />
                              <p className="text-xs font-medium text-slate-600">Growth Forecast</p>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">
                              {formatCurrency(results.growthForecast)}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {results.growthRate}% growth
                            </p>
                          </div>

                          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-trust-green/10 rounded-xl border border-purple-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="w-4 h-4 text-purple-600" />
                              <p className="text-xs font-medium text-slate-600">Avg Deal Size</p>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">
                              {formatCurrency(results.avgDealSize)}
                            </p>
                          </div>

                          <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-trust-green/10 rounded-xl border border-yellow-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-4 h-4 text-yellow-600" />
                              <p className="text-xs font-medium text-slate-600">Close Rate</p>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">
                              {results.closingRate}%
                            </p>
                          </div>
                        </div>

                        {/* Revenue Mix */}
                        <div className="p-4 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl">
                          <h4 className="font-semibold text-slate-800 mb-3">Revenue Mix</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-slate-600">Pipeline Revenue</span>
                                <span className="font-medium text-slate-800">
                                  {((results.pipelineRevenue / results.totalForecast) * 100).toFixed(0)}%
                                </span>
                              </div>
                              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                                  style={{ width: `${(results.pipelineRevenue / results.totalForecast) * 100}%` }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-slate-600">Growth-Based Revenue</span>
                                <span className="font-medium text-slate-800">
                                  {((results.growthForecast / results.totalForecast) * 100).toFixed(0)}%
                                </span>
                              </div>
                              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                                  style={{ width: `${(results.growthForecast / results.totalForecast) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Insights */}
                        <div className="p-4 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl">
                          <h4 className="font-semibold text-slate-800 mb-3">Forecast Insights</h4>
                          <ul className="space-y-3">
                            {results.insights.map((insight, index) => (
                              <li key={index} className="flex gap-3 text-sm text-slate-700">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                                  {index + 1}
                                </span>
                                <span>{insight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />

                        <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-slate-900/10 h-full flex items-center justify-center min-h-[400px]">
                          <div className="text-center py-16">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <TrendingUp className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                              No forecast generated yet
                            </h3>
                            <p className="text-slate-500 text-sm">
                              Enter your sales metrics and generate a forecast
                            </p>
                          </div>
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
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Need Help with Sales Forecasting?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Get expert guidance on building accurate sales forecasts and predictable revenue models.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-trust-green hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
                  >
                    <a href="/book-call">
                      Book a Call
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <a href="/tools">
                      <Mail className="mr-2 w-5 h-5" />
                      More Tools
                    </a>
                  </Button>
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
