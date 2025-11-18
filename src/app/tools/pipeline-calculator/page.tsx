'use client'

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Download, TrendingUp, Target, Award, Clock } from 'lucide-react'
import html2canvas from 'html2canvas'

interface PipelineResults {
  pipelineVelocity: number
  winRate: number
  avgDealValue: number
  totalValue: number
  benchmarkComparison: {
    velocity: 'Above' | 'At' | 'Below'
    winRate: 'Above' | 'At' | 'Below'
  }
  recommendations: string[]
}

const INDUSTRY_BENCHMARKS = {
  'SaaS': { velocity: 30, winRate: 20 },
  'Consulting': { velocity: 45, winRate: 25 },
  'Enterprise': { velocity: 90, winRate: 15 }
}

const COMPLEXITY_MULTIPLIERS = {
  'Low': 0.8,
  'Medium': 1.0,
  'High': 1.3
}

export default function PipelineCalculatorPage() {
  const [openDeals, setOpenDeals] = useState([50])
  const [totalValue, setTotalValue] = useState([250000])
  const [wonDeals, setWonDeals] = useState([10])
  const [lostDeals, setLostDeals] = useState([15])
  const [timePeriod, setTimePeriod] = useState<30 | 60 | 90>(30)
  const [industry, setIndustry] = useState<keyof typeof INDUSTRY_BENCHMARKS>('SaaS')
  const [complexity, setComplexity] = useState<keyof typeof COMPLEXITY_MULTIPLIERS>('Medium')
  const [results, setResults] = useState<PipelineResults | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const calculatePipeline = () => {
    const totalDeals = wonDeals[0] + lostDeals[0]
    const winRate = totalDeals > 0 ? (wonDeals[0] / totalDeals) * 100 : 0
    const avgDealValue = wonDeals[0] > 0 ? totalValue[0] / wonDeals[0] : 0

    // Calculate pipeline velocity (days to close)
    const baseVelocity = (timePeriod / totalDeals) || timePeriod
    const complexityMultiplier = COMPLEXITY_MULTIPLIERS[complexity]
    const pipelineVelocity = baseVelocity * complexityMultiplier

    // Benchmark comparison
    const benchmark = INDUSTRY_BENCHMARKS[industry]
    const velocityComparison: 'Above' | 'At' | 'Below' =
      pipelineVelocity < benchmark.velocity ? 'Above' :
      pipelineVelocity > benchmark.velocity * 1.2 ? 'Below' : 'At'

    const winRateComparison: 'Above' | 'At' | 'Below' =
      winRate > benchmark.winRate * 1.1 ? 'Above' :
      winRate < benchmark.winRate * 0.9 ? 'Below' : 'At'

    // Generate recommendations
    const recommendations: string[] = []

    if (velocityComparison === 'Below') {
      recommendations.push('Focus on reducing sales cycle time through better qualification')
    }
    if (winRateComparison === 'Below') {
      recommendations.push('Improve win rate by refining your ideal customer profile')
    }
    if (openDeals[0] < 30) {
      recommendations.push('Increase top-of-funnel activities to build a healthier pipeline')
    }
    if (winRate > 0 && winRate < 15) {
      recommendations.push('Review and improve your sales process and qualification criteria')
    }
    if (pipelineVelocity > 60) {
      recommendations.push('Consider implementing better nurturing strategies to accelerate deals')
    }
    if (avgDealValue > 0 && totalDeals > 0 && avgDealValue < totalValue[0] / (totalDeals * 2)) {
      recommendations.push('Focus on upselling and cross-selling to increase average deal size')
    }

    if (recommendations.length === 0) {
      recommendations.push('Your pipeline metrics are strong - maintain current strategies')
    }

    setResults({
      pipelineVelocity,
      winRate,
      avgDealValue,
      totalValue: totalValue[0],
      benchmarkComparison: {
        velocity: velocityComparison,
        winRate: winRateComparison
      },
      recommendations
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
      link.download = `pipeline-analysis-${Date.now()}.png`
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
            <span className="text-sm font-medium text-slate-700">Pipeline Calculator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-trust-green via-emerald-600 to-trust-green-dark bg-clip-text text-transparent">
            Sales Pipeline Calculator
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Analyze your sales pipeline velocity and performance metrics
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6">
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
                      Open Deals: {openDeals[0]}
                    </label>
                    <Slider
                      value={openDeals}
                      onValueChange={setOpenDeals}
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
                      Total Value of Open Deals: {formatCurrency(totalValue[0])}
                    </label>
                    <Slider
                      value={totalValue}
                      onValueChange={setTotalValue}
                      min={0}
                      max={1000000}
                      step={10000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>$0</span>
                      <span>$1M</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Won Deals: {wonDeals[0]}
                    </label>
                    <Slider
                      value={wonDeals}
                      onValueChange={setWonDeals}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Lost Deals: {lostDeals[0]}
                    </label>
                    <Slider
                      value={lostDeals}
                      onValueChange={setLostDeals}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>0</span>
                      <span>100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Context Settings */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Clock className="w-6 h-6 text-trust-green" />
                    Context Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Time Period (Days)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {([30, 60, 90] as const).map((period) => (
                        <button
                          key={period}
                          onClick={() => setTimePeriod(period)}
                          className={`px-4 py-2 rounded-xl font-medium transition-all ${
                            timePeriod === period
                              ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                              : 'bg-white/50 text-slate-700 hover:bg-white/80'
                          }`}
                        >
                          {period} Days
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Industry
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(INDUSTRY_BENCHMARKS) as Array<keyof typeof INDUSTRY_BENCHMARKS>).map((ind) => (
                        <button
                          key={ind}
                          onClick={() => setIndustry(ind)}
                          className={`px-3 py-2 rounded-xl font-medium transition-all text-sm ${
                            industry === ind
                              ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                              : 'bg-white/50 text-slate-700 hover:bg-white/80'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Deal Complexity
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(COMPLEXITY_MULTIPLIERS) as Array<keyof typeof COMPLEXITY_MULTIPLIERS>).map((comp) => (
                        <button
                          key={comp}
                          onClick={() => setComplexity(comp)}
                          className={`px-3 py-2 rounded-xl font-medium transition-all text-sm ${
                            complexity === comp
                              ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                              : 'bg-white/50 text-slate-700 hover:bg-white/80'
                          }`}
                        >
                          {comp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={calculatePipeline}
                    className="w-full bg-gradient-to-r from-trust-green to-emerald-600 hover:from-emerald-600 hover:to-trust-green text-white shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Calculate Pipeline Metrics
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
                          <Award className="w-6 h-6 text-trust-green" />
                          Pipeline Analysis
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
                        {/* Key Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-gradient-to-br from-trust-green/10 to-emerald-600/10 rounded-xl border border-trust-green/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-trust-green" />
                              <p className="text-xs font-medium text-slate-600">Pipeline Velocity</p>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">
                              {results.pipelineVelocity.toFixed(0)} days
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {results.benchmarkComparison.velocity} industry avg
                            </p>
                          </div>

                          <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-trust-green/10 rounded-xl border border-emerald-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-4 h-4 text-emerald-600" />
                              <p className="text-xs font-medium text-slate-600">Win Rate</p>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">
                              {results.winRate.toFixed(1)}%
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {results.benchmarkComparison.winRate} industry avg
                            </p>
                          </div>

                          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-trust-green/10 rounded-xl border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-4 h-4 text-blue-600" />
                              <p className="text-xs font-medium text-slate-600">Avg Deal Value</p>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">
                              {formatCurrency(results.avgDealValue)}
                            </p>
                          </div>

                          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-trust-green/10 rounded-xl border border-purple-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Award className="w-4 h-4 text-purple-600" />
                              <p className="text-xs font-medium text-slate-600">Total Pipeline</p>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">
                              {formatCurrency(results.totalValue)}
                            </p>
                          </div>
                        </div>

                        {/* Benchmark Comparison */}
                        <div className="p-4 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl">
                          <h4 className="font-semibold text-slate-800 mb-3">
                            Industry Benchmark Comparison ({industry})
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Velocity Performance</span>
                              <span className={`text-sm font-medium ${
                                results.benchmarkComparison.velocity === 'Above' ? 'text-green-600' :
                                results.benchmarkComparison.velocity === 'Below' ? 'text-red-600' :
                                'text-yellow-600'
                              }`}>
                                {results.benchmarkComparison.velocity} Average
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600">Win Rate Performance</span>
                              <span className={`text-sm font-medium ${
                                results.benchmarkComparison.winRate === 'Above' ? 'text-green-600' :
                                results.benchmarkComparison.winRate === 'Below' ? 'text-red-600' :
                                'text-yellow-600'
                              }`}>
                                {results.benchmarkComparison.winRate} Average
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
                  <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {results.recommendations.map((rec, index) => (
                          <li key={index} className="flex gap-3 text-sm text-slate-700">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-trust-green text-white flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <span>{rec}</span>
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
                      Enter your pipeline metrics to see analysis
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
