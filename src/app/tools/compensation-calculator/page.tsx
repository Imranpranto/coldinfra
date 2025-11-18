'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Download, DollarSign, Users, Award, TrendingUp, ArrowRight, Mail } from 'lucide-react'
import html2canvas from 'html2canvas'

interface CompensationResults {
  ote: number
  baseSalary: number
  quota: number
  targetCommission: number
  variableComp: number
  baseMix: number
  variableMix: number
  acceleratedOTE: number
  quarterlyQuota: number
}

const SALES_ROLES = ['SDR', 'BDR', 'AE', 'Enterprise']
const TERRITORY_LEVELS = ['SMB', 'Mid-Market', 'Enterprise']
const PRODUCT_COMPLEXITY = ['Low', 'Medium', 'High']

export default function CompensationCalculatorPage() {
  const [salesRole, setSalesRole] = useState('AE')
  const [territoryLevel, setTerritoryLevel] = useState('Mid-Market')
  const [productComplexity, setProductComplexity] = useState('Medium')
  const [baseSalary, setBaseSalary] = useState([80000])
  const [annualQuota, setAnnualQuota] = useState([500000])
  const [commissionRate, setCommissionRate] = useState([10])
  const [acceleratorThreshold, setAcceleratorThreshold] = useState([100])
  const [acceleratorRate, setAcceleratorRate] = useState([15])
  const [results, setResults] = useState<CompensationResults | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const calculateCompensation = () => {
    const base = baseSalary[0]
    const quota = annualQuota[0]
    const commission = commissionRate[0] / 100

    // Calculate target commission (commission on full quota)
    const targetCommission = quota * commission

    // Calculate OTE (On-Target Earnings)
    const ote = base + targetCommission

    // Calculate variable compensation
    const variableComp = targetCommission

    // Calculate pay mix
    const baseMix = (base / ote) * 100
    const variableMix = (variableComp / ote) * 100

    // Calculate accelerated earnings (if exceeding threshold)
    const acceleratorThresholdAmount = quota * (acceleratorThreshold[0] / 100)
    const acceleratorCommission = acceleratorRate[0] / 100
    const overageAmount = Math.max(0, quota * 0.2) // Assume 20% overachievement
    const acceleratedEarnings = overageAmount * acceleratorCommission
    const acceleratedOTE = ote + acceleratedEarnings

    // Calculate quarterly quota
    const quarterlyQuota = quota / 4

    setResults({
      ote,
      baseSalary: base,
      quota,
      targetCommission,
      variableComp,
      baseMix,
      variableMix,
      acceleratedOTE,
      quarterlyQuota
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
      link.download = `compensation-plan-${Date.now()}.png`
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
                    Sales Compensation Calculator
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Design competitive sales compensation plans with accurate OTE calculations and commission structures.
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
                            <DollarSign className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl font-bold text-slate-900">
                              Compensation Plan
                            </CardTitle>
                            <CardDescription className="text-slate-600">
                              Configure compensation structure
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        {/* Role Configuration */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Sales Role
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                            {SALES_ROLES.map((role) => (
                              <button
                                key={role}
                                onClick={() => setSalesRole(role)}
                                className={`px-3 py-3 sm:py-2 rounded-xl font-medium transition-all text-sm ${
                                  salesRole === role
                                    ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                                    : 'bg-white/50 text-slate-700 hover:bg-white/80 border border-slate-200'
                                }`}
                              >
                                {role}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Territory Level
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {TERRITORY_LEVELS.map((level) => (
                              <button
                                key={level}
                                onClick={() => setTerritoryLevel(level)}
                                className={`px-2 py-3 sm:py-2 rounded-xl font-medium transition-all text-xs ${
                                  territoryLevel === level
                                    ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                                    : 'bg-white/50 text-slate-700 hover:bg-white/80 border border-slate-200'
                                }`}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Product Complexity
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {PRODUCT_COMPLEXITY.map((complexity) => (
                              <button
                                key={complexity}
                                onClick={() => setProductComplexity(complexity)}
                                className={`px-3 py-3 sm:py-2 rounded-xl font-medium transition-all text-sm ${
                                  productComplexity === complexity
                                    ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                                    : 'bg-white/50 text-slate-700 hover:bg-white/80 border border-slate-200'
                                }`}
                              >
                                {complexity}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Compensation Sliders */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Base Salary: {formatCurrency(baseSalary[0])}
                    </label>
                    <Slider
                      value={baseSalary}
                      onValueChange={setBaseSalary}
                      min={30000}
                      max={200000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>$30K</span>
                      <span>$200K</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Annual Quota: {formatCurrency(annualQuota[0])}
                    </label>
                    <Slider
                      value={annualQuota}
                      onValueChange={setAnnualQuota}
                      min={100000}
                      max={2000000}
                      step={50000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>$100K</span>
                      <span>$2M</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Commission Rate: {commissionRate[0]}%
                    </label>
                    <Slider
                      value={commissionRate}
                      onValueChange={setCommissionRate}
                      min={1}
                      max={30}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Accelerator Threshold: {acceleratorThreshold[0]}%
                    </label>
                    <Slider
                      value={acceleratorThreshold}
                      onValueChange={setAcceleratorThreshold}
                      min={80}
                      max={120}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>80%</span>
                      <span>120%</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Quota achievement % when accelerated rate kicks in
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Accelerator Rate: {acceleratorRate[0]}%
                    </label>
                    <Slider
                      value={acceleratorRate}
                      onValueChange={setAcceleratorRate}
                      min={1}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>1%</span>
                      <span>50%</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Commission rate after reaching accelerator threshold
                    </p>
                  </div>

                        <Button
                          onClick={calculateCompensation}
                          className="w-full bg-gradient-to-r from-trust-green to-emerald-600 hover:from-emerald-600 hover:to-trust-green text-white shadow-lg hover:shadow-xl transition-all"
                          size="lg"
                        >
                          <DollarSign className="w-5 h-5 mr-2" />
                          Calculate Compensation Plan
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
                              Plan Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-trust-green">{formatCurrency(results.ote)}</div>
                                <div className="text-xs text-slate-600 mt-1">OTE</div>
                              </div>
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-emerald-600">{formatCurrency(results.quota)}</div>
                                <div className="text-xs text-slate-600 mt-1">Annual Quota</div>
                              </div>
                              <div className="text-center p-3 bg-white/50 rounded-lg border border-slate-100">
                                <div className="text-2xl font-bold text-blue-600">{salesRole}</div>
                                <div className="text-xs text-slate-600 mt-1">Role</div>
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
                                  <Award className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <CardTitle className="text-2xl font-bold text-slate-900">
                                    Compensation Details
                                  </CardTitle>
                                  <CardDescription className="text-slate-600">
                                    Detailed compensation breakdown
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
                        {/* Key Metrics Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2 p-6 bg-gradient-to-br from-trust-green/20 to-emerald-600/20 rounded-xl border-2 border-trust-green/30">
                            <div className="flex items-center gap-2 mb-2">
                              <DollarSign className="w-5 h-5 text-trust-green" />
                              <p className="text-sm font-medium text-slate-600">On-Target Earnings (OTE)</p>
                            </div>
                            <p className="text-4xl font-bold text-slate-800">
                              {formatCurrency(results.ote)}
                            </p>
                            <p className="text-sm text-slate-600 mt-2">
                              Base + Target Commission
                            </p>
                          </div>

                          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-trust-green/10 rounded-xl border border-blue-500/20">
                            <p className="text-xs font-medium text-slate-600 mb-2">Base Salary</p>
                            <p className="text-2xl font-bold text-slate-800">
                              {formatCurrency(results.baseSalary)}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {results.baseMix.toFixed(0)}% of OTE
                            </p>
                          </div>

                          <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-trust-green/10 rounded-xl border border-emerald-500/20">
                            <p className="text-xs font-medium text-slate-600 mb-2">Variable Comp</p>
                            <p className="text-2xl font-bold text-slate-800">
                              {formatCurrency(results.variableComp)}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {results.variableMix.toFixed(0)}% of OTE
                            </p>
                          </div>

                          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-trust-green/10 rounded-xl border border-purple-500/20">
                            <p className="text-xs font-medium text-slate-600 mb-2">Annual Quota</p>
                            <p className="text-2xl font-bold text-slate-800">
                              {formatCurrency(results.quota)}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Revenue target
                            </p>
                          </div>

                          <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-trust-green/10 rounded-xl border border-yellow-500/20">
                            <p className="text-xs font-medium text-slate-600 mb-2">Quarterly Quota</p>
                            <p className="text-2xl font-bold text-slate-800">
                              {formatCurrency(results.quarterlyQuota)}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Per quarter
                            </p>
                          </div>
                        </div>

                        {/* Pay Mix Visualization */}
                        <div className="p-4 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-xl">
                          <h4 className="font-semibold text-slate-800 mb-3">Pay Mix Ratio</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-l-lg"
                              style={{ width: `${results.baseMix}%` }}
                            />
                            <div
                              className="h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-r-lg"
                              style={{ width: `${results.variableMix}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-blue-500 rounded" />
                              <span className="text-slate-600">Base: {results.baseMix.toFixed(0)}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-emerald-500 rounded" />
                              <span className="text-slate-600">Variable: {results.variableMix.toFixed(0)}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Accelerated Earnings */}
                        <div className="p-4 bg-gradient-to-br from-trust-green/10 to-emerald-600/10 rounded-xl border border-trust-green/20">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-trust-green" />
                            <h4 className="font-semibold text-slate-800">Accelerated Earnings Potential</h4>
                          </div>
                          <p className="text-3xl font-bold text-trust-green mb-1">
                            {formatCurrency(results.acceleratedOTE)}
                          </p>
                          <p className="text-sm text-slate-600">
                            At {acceleratorThreshold[0]}% quota achievement with {acceleratorRate[0]}% accelerator rate
                          </p>
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
                              <DollarSign className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                              No plan calculated yet
                            </h3>
                            <p className="text-slate-500 text-sm">
                              Configure your compensation structure and calculate the plan
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
                  Need Help Setting Up Your Sales Comp Plan?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Get expert guidance on designing competitive compensation structures that attract top sales talent.
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
