'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Download, DollarSign, Users, Award, TrendingUp } from 'lucide-react'
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
            <DollarSign className="w-4 h-4 text-trust-green" />
            <span className="text-sm font-medium text-slate-700">Compensation Calculator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-trust-green via-emerald-600 to-trust-green-dark bg-clip-text text-transparent">
            Sales Compensation Calculator
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Design and analyze sales compensation plans
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Role Configuration */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Users className="w-6 h-6 text-trust-green" />
                    Role Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Sales Role
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {SALES_ROLES.map((role) => (
                        <button
                          key={role}
                          onClick={() => setSalesRole(role)}
                          className={`px-3 py-2 rounded-xl font-medium transition-all text-sm ${
                            salesRole === role
                              ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                              : 'bg-white/50 text-slate-700 hover:bg-white/80'
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
                    <div className="grid grid-cols-3 gap-2">
                      {TERRITORY_LEVELS.map((level) => (
                        <button
                          key={level}
                          onClick={() => setTerritoryLevel(level)}
                          className={`px-2 py-2 rounded-xl font-medium transition-all text-xs ${
                            territoryLevel === level
                              ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                              : 'bg-white/50 text-slate-700 hover:bg-white/80'
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
                    <div className="grid grid-cols-3 gap-2">
                      {PRODUCT_COMPLEXITY.map((complexity) => (
                        <button
                          key={complexity}
                          onClick={() => setProductComplexity(complexity)}
                          className={`px-3 py-2 rounded-xl font-medium transition-all text-sm ${
                            productComplexity === complexity
                              ? 'bg-gradient-to-r from-trust-green to-emerald-600 text-white shadow-lg'
                              : 'bg-white/50 text-slate-700 hover:bg-white/80'
                          }`}
                        >
                          {complexity}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compensation Structure */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
              <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-trust-green" />
                    Compensation Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                          Compensation Plan
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
                          <div className="col-span-2 p-6 bg-gradient-to-br from-trust-green/20 to-emerald-600/20 rounded-xl border-2 border-trust-green/30">
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

                {/* Plan Summary */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
                  <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-xl">Plan Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                          <span className="text-slate-600">Role</span>
                          <span className="font-semibold text-slate-800">{salesRole}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                          <span className="text-slate-600">Territory</span>
                          <span className="font-semibold text-slate-800">{territoryLevel}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                          <span className="text-slate-600">Product Complexity</span>
                          <span className="font-semibold text-slate-800">{productComplexity}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                          <span className="text-slate-600">Commission Rate</span>
                          <span className="font-semibold text-slate-800">{commissionRate[0]}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-trust-green/20 rounded-3xl blur-2xl opacity-50" />
                <Card className="relative bg-white/70 backdrop-blur-xl border-white/20 shadow-xl h-full flex items-center justify-center min-h-[400px]">
                  <div className="text-center py-12">
                    <DollarSign className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">
                      Configure compensation structure to see plan details
                    </p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
