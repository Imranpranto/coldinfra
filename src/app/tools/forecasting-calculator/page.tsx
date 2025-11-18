'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Download, TrendingUp, Target, DollarSign, Percent } from 'lucide-react'
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
    <>
      <Header />
      <main id="main-content">
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
            <TrendingUp className="w-4 h-4 text-trust-green" />
            <span className="text-sm font-medium text-slate-700">Forecasting Calculator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-trust-green via-emerald-600 to-trust-green-dark bg-clip-text text-transparent">
            Sales Forecasting Calculator
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Forecast future sales revenue based on pipeline metrics and growth trends
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Current Performance */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-trust-green" />
                    Current Performance
                  </CardTitle>
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
                </CardContent>
              </Card>
            </div>

            {/* Pipeline Metrics */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Target className="w-6 h-6 text-trust-green" />
                    Pipeline Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
                  <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <TrendingUp className="w-6 h-6 text-trust-green" />
                          Forecast Results
                        </CardTitle>
                        <Button
                          onClick={handleDownload}
                          variant="outline"
                          size="sm"
                          className="border-trust-green/30 hover:bg-trust-green/10"
                        >
                          <Download className="w-4 h-4" />
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
                        <div className="grid grid-cols-2 gap-4">
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
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Insights */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
                  <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl">Forecast Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
                <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">
                      Enter your sales metrics to generate forecast
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
          </div>  {/* Close container */}
        </div>  {/* Close min-h-screen */}
      </main>
      <Footer />
    </>
  )
}
