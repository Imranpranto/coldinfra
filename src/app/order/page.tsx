'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { Container, Section } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, Zap, Package, Crown, ChevronRight } from 'lucide-react'

// Package definitions with pricing (matching website pricing)
const PACKAGES = {
  starter: {
    name: 'Starter',
    inboxes: 10,
    price: 30,
    pricePerMailbox: 3.00,
    features: ['10 Mailboxes at $3/mailbox', 'Additional Mailboxes at $3/Mailbox', 'Send Up to 8,000 Emails Per Month', 'Support'],
    description: 'Best for Freelancers Looking to Startup',
    icon: Package,
    popular: false,
  },
  growth: {
    name: 'Growth',
    inboxes: 30,
    price: 84,
    pricePerMailbox: 2.80,
    features: ['30 Mailboxes at $2.8/mailbox', 'Additional Mailboxes at $3/Mailbox', 'Send Up to 24,000 Emails Per Month', 'Support'],
    description: 'Best for Mid-Size Agencies',
    icon: Zap,
    popular: true,
  },
  scale: {
    name: 'Scale',
    inboxes: 100,
    price: 250,
    pricePerMailbox: 2.50,
    features: ['100 Mailboxes at $2.5/mailbox', 'Additional Mailboxes at $2.5/Mailbox', 'Send Up to 80,000 Emails Per Month', 'Priority Support'],
    description: 'Best for Agencies with Multiple Clients',
    icon: Crown,
    popular: false,
  },
} as const

type PackageType = keyof typeof PACKAGES | 'custom'

// Validation schemas for each step
const step1Schema = z.object({
  customerType: z.enum(['new', 'existing'], {
    required_error: 'Please select customer type',
  }),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
})

const step2Schema = z.object({
  packageType: z.enum(['starter', 'growth', 'scale', 'custom'], {
    required_error: 'Please select a package',
  }),
  customInboxes: z.string().optional(),
  domainProvider: z.enum(['porkbun', 'godaddy', 'namecheap', 'other'], {
    required_error: 'Please select a domain provider',
  }),
  domainStage: z.enum(['old', 'new'], {
    required_error: 'Please select domain stage',
  }),
  address: z.string().min(10, 'Please enter a valid address for invoicing'),
})

const step4Schema = z.object({
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions to proceed',
  }),
})

const fullSchema = step1Schema.merge(step2Schema).merge(step4Schema)

type FormData = z.infer<typeof fullSchema>

// Step names for better UX
const STEP_NAMES = {
  1: 'Contact Details',
  2: 'Package Selection',
  3: 'Pricing Review',
  4: 'Final Review',
}

export default function OrderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null)
  const totalSteps = 4

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(
      currentStep === 1
        ? step1Schema
        : currentStep === 2
          ? step2Schema
          : currentStep === 4
            ? fullSchema
            : fullSchema
    ),
    mode: 'onBlur',
    defaultValues: {
      agreeToTerms: false,
    },
  })

  const formData = watch()
  const customInboxes = watch('customInboxes')

  // Calculate pricing (tier-based like website calculator)
  const calculatePrice = () => {
    if (!formData.packageType) return 0

    if (formData.packageType === 'custom') {
      const inboxCount = parseInt(formData.customInboxes || '10')
      let pricePerMailbox: number

      // Tier-based pricing matching website
      if (inboxCount >= 100) {
        pricePerMailbox = 2.50  // Scale tier
      } else if (inboxCount >= 30) {
        pricePerMailbox = 2.80  // Growth tier
      } else {
        pricePerMailbox = 3.00  // Starter tier
      }

      return inboxCount * pricePerMailbox
    }

    return PACKAGES[formData.packageType].price
  }

  const getInboxCount = () => {
    if (!formData.packageType) return 0

    if (formData.packageType === 'custom') {
      return parseInt(formData.customInboxes || '10')
    }

    return PACKAGES[formData.packageType].inboxes
  }

  const handlePackageSelect = (packageType: PackageType) => {
    setSelectedPackage(packageType)
    setValue('packageType', packageType as any)
    if (packageType !== 'custom') {
      setValue('customInboxes', '')
    }
  }

  const handleNext = async () => {
    // Validate current step fields
    let fieldsToValidate: any[] = []

    if (currentStep === 1) {
      fieldsToValidate = ['customerType', 'name', 'companyName', 'email', 'phone']
    } else if (currentStep === 2) {
      fieldsToValidate = ['packageType', 'domainProvider', 'domainStage', 'address']
      if (formData.packageType === 'custom') {
        fieldsToValidate.push('customInboxes')
      }
    } else if (currentStep === 3) {
      // Step 3 (Pricing Review) has no validation - it's just a review page
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const isValid = await trigger(fieldsToValidate)

    if (isValid) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit order')
      }

      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Order submission error:', err)
      setError(err instanceof Error ? err.message : 'Failed to submit order. Please try again.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalPrice = calculatePrice()
  const setupFee = formData.customerType === 'existing' ? 0 : 24.99 // One-time setup fee for new customers only
  const monthlyPrice = totalPrice
  const totalDue = setupFee + monthlyPrice

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Animated Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-trust-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-navy/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <Header />

        <main id="main-content">
          <Section padding="xl" className="bg-transparent">
            <Container>
              <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12 animate-fade-in px-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight">
                    Order Request
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
                    Choose your perfect plan and get a custom quote within 24 hours
                  </p>
                </div>

                {/* Form Container */}
                <div className="max-w-3xl mx-auto">
                  {submitted ? (
                    /* Success Message */
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-12 shadow-2xl shadow-trust-green/10 animate-scale-in">
                      <div className="p-8 bg-gradient-to-br from-trust-green/10 to-trust-green/5 border border-trust-green/30 rounded-2xl text-center">
                        <div className="w-20 h-20 bg-trust-green rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
                          <Check className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Order Request Received!</h3>
                        <p className="text-slate-600 mb-6 text-lg">
                          Thank you for choosing ColdInfra. We'll contact you within 24 hours with your personalized quote.
                        </p>

                        {/* Order Summary */}
                        <div className="bg-white rounded-xl p-6 text-left space-y-4">
                          <h4 className="font-semibold text-slate-900 text-lg mb-4 pb-3 border-b border-slate-200">Order Summary</h4>
                          <div className="grid gap-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Customer Type:</span>
                              <span className="font-semibold text-slate-900">
                                {formData.customerType === 'new' ? 'New Customer' : 'Existing Customer'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Name:</span>
                              <span className="font-semibold text-slate-900">{formData.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Company:</span>
                              <span className="font-semibold text-slate-900">{formData.companyName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Email:</span>
                              <span className="font-semibold text-slate-900">{formData.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Package:</span>
                              <span className="font-semibold text-slate-900">
                                {formData.packageType === 'custom'
                                  ? 'Custom Package'
                                  : PACKAGES[formData.packageType as keyof typeof PACKAGES].name}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Inboxes:</span>
                              <span className="font-semibold text-slate-900">{getInboxCount()}</span>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-slate-200">
                              <span className="text-slate-900 font-semibold">Estimated Monthly:</span>
                              <span className="font-bold text-trust-green text-lg">${monthlyPrice}/mo</span>
                            </div>
                            {formData.customerType === 'new' && (
                              <div className="flex justify-between">
                                <span className="text-slate-900 font-semibold">Setup Fee:</span>
                                <span className="font-bold text-blue-600 text-lg">${setupFee.toFixed(2)}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <Button
                          onClick={() => window.location.href = '/'}
                          className="mt-6 bg-trust-green hover:bg-trust-green-dark text-white"
                        >
                          Back to Home
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Progress Indicator */}
                      <div className="mb-6 md:mb-8 animate-slide-down px-4">
                        <div className="flex flex-col items-center gap-3 md:gap-4">
                          <div className="flex items-center gap-2 md:gap-3">
                            {[1, 2, 3, 4].map((step) => (
                              <div key={step} className="flex items-center gap-1.5 md:gap-2">
                                <div className="flex flex-col items-center gap-1.5 md:gap-2">
                                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all duration-300 ${currentStep === step
                                    ? 'bg-trust-green text-white shadow-lg shadow-trust-green/30 scale-110'
                                    : currentStep > step
                                      ? 'bg-trust-green/20 text-trust-green'
                                      : 'bg-slate-200 text-slate-500'
                                    }`}>
                                    {currentStep > step ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : step}
                                  </div>
                                  <span className={`hidden md:block text-xs font-medium transition-colors ${currentStep === step
                                    ? 'text-trust-green'
                                    : currentStep > step
                                      ? 'text-trust-green'
                                      : 'text-slate-400'
                                    }`}>
                                    {STEP_NAMES[step as keyof typeof STEP_NAMES]}
                                  </span>
                                </div>
                                {step < 4 && (
                                  <div className={`w-8 md:w-12 h-1 rounded-full transition-all duration-300 ${currentStep > step ? 'bg-trust-green' : 'bg-slate-200'
                                    }`} />
                                )}
                              </div>
                            ))}
                          </div>
                          <span className="text-xs md:text-sm font-medium text-slate-500 text-center">
                            Step {currentStep} of {totalSteps}: {STEP_NAMES[currentStep as keyof typeof STEP_NAMES]}
                          </span>
                        </div>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-shake">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold text-red-800 mb-1">Submission Failed</h3>
                              <p className="text-sm text-red-700">{error}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setError(null)}
                              className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Form */}
                      <div className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-slate-200 p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl shadow-slate-900/5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          {/* Step 1: User Details */}
                          {currentStep === 1 && (
                            <div className="space-y-6 animate-fade-in">
                              <div className="mb-6 md:mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 md:mb-3">Your Information</h2>
                                <p className="text-slate-600 text-base md:text-lg">Let's start with your basic details</p>
                              </div>

                              {/* Customer Type */}
                              <div>
                                <Label htmlFor="customerType" className="mb-2 block text-slate-700">
                                  Customer Type <span className="text-danger">*</span>
                                </Label>
                                <select
                                  id="customerType"
                                  {...register('customerType')}
                                  className={`w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors text-slate-700 ${errors.customerType ? 'border-danger' : 'border-slate-300'
                                    }`}
                                >
                                  <option value="" className="text-slate-500">Select customer type</option>
                                  <option value="new" className="text-slate-900">New Customer</option>
                                  <option value="existing" className="text-slate-900">Existing Customer</option>
                                </select>
                                {errors.customerType && (
                                  <p className="text-danger text-sm mt-1.5">{errors.customerType.message}</p>
                                )}
                                <p className="text-xs text-slate-500 mt-1.5">
                                  {formData.customerType === 'existing'
                                    ? '✓ No setup fee for existing customers'
                                    : formData.customerType === 'new'
                                      ? 'One-time setup fee of $24.99 applies'
                                      : 'Setup fee applies only to new customers'}
                                </p>
                              </div>

                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <Label htmlFor="name" className="mb-2 block text-slate-700">
                                    Full Name <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    {...register('name')}
                                    className={`h-12 text-slate-700 placeholder:text-slate-700 ${errors.name ? 'border-danger' : 'border-slate-300'}`}
                                  />
                                  {errors.name && (
                                    <p className="text-danger text-sm mt-1.5">{errors.name.message}</p>
                                  )}
                                </div>

                                <div>
                                  <Label htmlFor="companyName" className="mb-2 block text-slate-700">
                                    Company Name <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    id="companyName"
                                    type="text"
                                    placeholder="Acme Inc."
                                    {...register('companyName')}
                                    className={`h-12 text-slate-700 placeholder:text-slate-700 ${errors.companyName ? 'border-danger' : 'border-slate-300'}`}
                                  />
                                  {errors.companyName && (
                                    <p className="text-danger text-sm mt-1.5">{errors.companyName.message}</p>
                                  )}
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="email" className="mb-2 block text-slate-700">
                                  Email Address <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="john@acme.com"
                                  {...register('email')}
                                  className={`h-12 text-slate-700 placeholder:text-slate-700 ${errors.email ? 'border-danger' : 'border-slate-300'}`}
                                />
                                {errors.email && (
                                  <p className="text-danger text-sm mt-1.5">{errors.email.message}</p>
                                )}
                              </div>

                              <div>
                                <Label htmlFor="phone" className="mb-2 block text-slate-700">
                                  Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                                </Label>
                                <Input
                                  id="phone"
                                  type="tel"
                                  placeholder="+1 (555) 123-4567"
                                  {...register('phone')}
                                  className="h-12 text-slate-700 placeholder:text-slate-700 border-slate-300"
                                />
                              </div>
                            </div>
                          )}

                          {/* Step 2: Package & Service Details */}
                          {currentStep === 2 && (
                            <div className="space-y-6 md:space-y-8 animate-fade-in">
                              <div className="mb-6 md:mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 md:mb-3">Choose Your Package</h2>
                                <p className="text-slate-600 text-base md:text-lg">Select the perfect plan for your needs</p>
                              </div>

                              {/* Package Selection */}
                              <div>
                                <Label className="mb-6 block text-slate-700 text-base">
                                  Package Type <span className="text-danger">*</span>
                                </Label>
                                <div className="grid md:grid-cols-2 gap-6">
                                  {Object.entries(PACKAGES).map(([key, pkg]) => {
                                    const Icon = pkg.icon
                                    const isSelected = selectedPackage === key
                                    return (
                                      <button
                                        key={key}
                                        type="button"
                                        onClick={() => handlePackageSelect(key as PackageType)}
                                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-center ${isSelected
                                          ? 'border-trust-green bg-trust-green/5 shadow-xl scale-105'
                                          : pkg.popular
                                            ? 'border-trust-green/50 bg-white hover:border-trust-green hover:shadow-lg scale-100'
                                            : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                                          }`}
                                      >
                                        {pkg.popular && (
                                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <div className="px-4 py-1 bg-trust-green text-white text-xs font-semibold rounded-full">
                                              Most Popular
                                            </div>
                                          </div>
                                        )}

                                        {isSelected && (
                                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-trust-green flex items-center justify-center shadow-lg">
                                            <Check className="w-5 h-5 text-white" />
                                          </div>
                                        )}

                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${isSelected ? 'bg-trust-green text-white' : 'bg-slate-100 text-slate-600'
                                          } transition-colors`}>
                                          <Icon className="w-6 h-6" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>

                                        <div className="mb-3">
                                          <span className="text-4xl font-bold text-slate-900">${pkg.price}</span>
                                          <span className="text-slate-600">/month</span>
                                        </div>

                                        <p className="text-sm text-slate-600 mb-4">{pkg.description}</p>

                                        <ul className="space-y-2 text-sm text-slate-700 text-left">
                                          {pkg.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                              <Check className="w-4 h-4 text-trust-green mt-0.5 flex-shrink-0" />
                                              <span>{feature}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </button>
                                    )
                                  })}

                                  {/* Custom Package Option */}
                                  <button
                                    type="button"
                                    onClick={() => handlePackageSelect('custom')}
                                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-center ${selectedPackage === 'custom'
                                      ? 'border-primary-navy bg-primary-navy/5 shadow-xl scale-105'
                                      : 'border-slate-200 bg-white hover:border-primary-navy/50 hover:shadow-md'
                                      }`}
                                  >
                                    {selectedPackage === 'custom' && (
                                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary-navy flex items-center justify-center shadow-lg">
                                        <Check className="w-5 h-5 text-white" />
                                      </div>
                                    )}

                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${selectedPackage === 'custom' ? 'bg-primary-navy text-white' : 'bg-slate-100 text-slate-600'
                                      } transition-colors`}>
                                      <Zap className="w-6 h-6" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Custom Package</h3>

                                    <div className="mb-3">
                                      <span className="text-4xl font-bold text-slate-900">Custom</span>
                                    </div>

                                    <p className="text-sm text-slate-600 mb-4">Flexible pricing tailored to your needs</p>

                                    <ul className="space-y-2 text-sm text-slate-700 text-left">
                                      <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-primary-navy mt-0.5 flex-shrink-0" />
                                        <span>Starting from 10 mailboxes</span>
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-primary-navy mt-0.5 flex-shrink-0" />
                                        <span>Tier-based pricing ($2.50-$3/mailbox)</span>
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-primary-navy mt-0.5 flex-shrink-0" />
                                        <span>Scales with your business</span>
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-primary-navy mt-0.5 flex-shrink-0" />
                                        <span>All standard features included</span>
                                      </li>
                                    </ul>
                                  </button>
                                </div>

                                {/* Custom Inbox Input */}
                                {selectedPackage === 'custom' && (
                                  <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200 animate-slide-down">
                                    <Label htmlFor="customInboxes" className="mb-3 block text-slate-700">
                                      Number of Inboxes <span className="text-danger">*</span>
                                    </Label>
                                    <Input
                                      id="customInboxes"
                                      type="number"
                                      min="10"
                                      placeholder="Enter number of inboxes (min. 10)"
                                      {...register('customInboxes', {
                                        validate: (value) => {
                                          if (selectedPackage === 'custom' && (!value || parseInt(value) < 10)) {
                                            return 'Minimum 10 inboxes required for custom package'
                                          }
                                          return true
                                        }
                                      })}
                                      className="h-12 text-slate-700 placeholder:text-slate-700 border-slate-300"
                                    />
                                    {errors.customInboxes && (
                                      <p className="text-danger text-sm mt-1.5">{errors.customInboxes.message}</p>
                                    )}
                                    {customInboxes && parseInt(customInboxes) >= 10 && (() => {
                                      const count = parseInt(customInboxes)
                                      let pricePerMailbox: number
                                      let tierName: string

                                      if (count >= 100) {
                                        pricePerMailbox = 2.50
                                        tierName = 'Scale Tier'
                                      } else if (count >= 30) {
                                        pricePerMailbox = 2.80
                                        tierName = 'Growth Tier'
                                      } else {
                                        pricePerMailbox = 3.00
                                        tierName = 'Starter Tier'
                                      }

                                      return (
                                        <div className="mt-4 p-4 bg-white rounded-lg border border-trust-green/30">
                                          <div className="flex justify-between items-center mb-2">
                                            <span className="text-slate-700">Estimated Price:</span>
                                            <span className="text-2xl font-bold text-trust-green">
                                              ${(count * pricePerMailbox).toFixed(0)}/month
                                            </span>
                                          </div>
                                          <div className="flex justify-between items-center text-xs text-slate-500">
                                            <span>{tierName}</span>
                                            <span>${pricePerMailbox.toFixed(2)} per mailbox × {count} inboxes</span>
                                          </div>
                                        </div>
                                      )
                                    })()}
                                  </div>
                                )}

                                {errors.packageType && (
                                  <p className="text-danger text-sm mt-2">{errors.packageType.message}</p>
                                )}
                              </div>

                              {/* Domain Details */}
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <Label htmlFor="domainProvider" className="mb-2 block text-slate-700">
                                    Domain Provider <span className="text-danger">*</span>
                                  </Label>
                                  <select
                                    id="domainProvider"
                                    {...register('domainProvider')}
                                    className={`w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors text-slate-700 ${errors.domainProvider ? 'border-danger' : 'border-slate-300'
                                      }`}
                                  >
                                    <option value="" className="text-slate-500">Select provider</option>
                                    <option value="porkbun" className="text-slate-900">Porkbun</option>
                                    <option value="godaddy" className="text-slate-900">GoDaddy</option>
                                    <option value="namecheap" className="text-slate-900">Namecheap</option>
                                    <option value="other" className="text-slate-900">Other</option>
                                  </select>
                                  {errors.domainProvider && (
                                    <p className="text-danger text-sm mt-1.5">{errors.domainProvider.message}</p>
                                  )}
                                </div>

                                <div>
                                  <Label htmlFor="domainStage" className="mb-2 block text-slate-700">
                                    Domain Stage <span className="text-danger">*</span>
                                  </Label>
                                  <select
                                    id="domainStage"
                                    {...register('domainStage')}
                                    className={`w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors text-slate-700 ${errors.domainStage ? 'border-danger' : 'border-slate-300'
                                      }`}
                                  >
                                    <option value="" className="text-slate-500">Select stage</option>
                                    <option value="new" className="text-slate-900">New Domain</option>
                                    <option value="old" className="text-slate-900">Existing/Old Domain</option>
                                  </select>
                                  {errors.domainStage && (
                                    <p className="text-danger text-sm mt-1.5">{errors.domainStage.message}</p>
                                  )}
                                </div>
                              </div>

                              {/* Billing Address */}
                              <div>
                                <Label htmlFor="address" className="mb-2 block text-slate-700">
                                  Billing Address <span className="text-danger">*</span>
                                </Label>
                                <textarea
                                  id="address"
                                  rows={4}
                                  placeholder="123 Main St, Suite 100&#10;San Francisco, CA 94105&#10;United States"
                                  {...register('address')}
                                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-trust-green focus:border-trust-green transition-colors resize-none text-slate-700 placeholder:text-slate-700 ${errors.address ? 'border-danger' : 'border-slate-300'
                                    }`}
                                />
                                {errors.address && (
                                  <p className="text-danger text-sm mt-1.5">{errors.address.message}</p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Step 3: Pricing Review */}
                          {currentStep === 3 && (
                            <div className="space-y-4 md:space-y-6 animate-fade-in">
                              <div className="mb-4 md:mb-6 text-center">
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Pricing Summary</h2>
                                <p className="text-sm md:text-base text-slate-600">Review your pricing at a glance</p>
                              </div>

                              {/* Compact Pricing Grid */}
                              <div className="space-y-4">
                                {/* Package Info */}
                                <div className="bg-gradient-to-br from-trust-green/5 to-trust-green/10 rounded-xl p-5 border-2 border-trust-green/30">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 bg-trust-green rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Package className="w-6 h-6 text-white" />
                                      </div>
                                      <div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                          {formData.packageType === 'custom'
                                            ? 'Custom Package'
                                            : PACKAGES[formData.packageType as keyof typeof PACKAGES]?.name}
                                        </h3>
                                        <p className="text-sm text-slate-600">{getInboxCount()} Professional Inboxes</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Pricing Breakdown Cards - Horizontal Grid */}
                                <div className={`grid gap-4 ${formData.customerType === 'existing' ? 'md:grid-cols-1' : 'md:grid-cols-2'}`}>
                                  {/* Monthly Recurring */}
                                  <div className="bg-white rounded-xl p-5 border-2 border-slate-200 shadow">
                                    <div className="flex items-center justify-between mb-3">
                                      <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Monthly Recurring</p>
                                        <p className="text-xs text-slate-600">Billed every month</p>
                                      </div>
                                      <div className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">Recurring</div>
                                    </div>
                                    <div className="text-center py-3 border-t border-slate-200">
                                      <p className="text-4xl font-bold text-slate-900">${monthlyPrice}</p>
                                      <p className="text-sm text-slate-500 mt-1">/month</p>
                                    </div>
                                    <ul className="space-y-2 mt-3 text-xs text-slate-700">
                                      <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-trust-green flex-shrink-0" />
                                        <span>{getInboxCount()} professional inboxes</span>
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-trust-green flex-shrink-0" />
                                        <span>Full DNS configuration</span>
                                      </li>
                                      <li className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-trust-green flex-shrink-0" />
                                        <span>24/7 support & monitoring</span>
                                      </li>
                                    </ul>
                                  </div>

                                  {/* One-Time Setup Fee - Only for new customers */}
                                  {formData.customerType === 'new' && (
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-300 shadow">
                                      <div className="flex items-center justify-between mb-3">
                                        <div>
                                          <p className="text-xs text-blue-700 uppercase tracking-wide font-bold mb-1">One-Time Setup</p>
                                          <p className="text-xs text-slate-700">Pay once during signup</p>
                                        </div>
                                        <div className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-semibold">Pay Once</div>
                                      </div>
                                      <div className="text-center py-3 border-t border-blue-300">
                                        <p className="text-4xl font-bold text-blue-600">${setupFee.toFixed(2)}</p>
                                        <p className="text-sm text-slate-600 mt-1">one-time</p>
                                      </div>
                                      <ul className="space-y-2 mt-3 text-xs text-slate-700">
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                          <span>Expert infrastructure setup</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                          <span>SPF, DKIM, DMARC config</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                          <span>Domain authentication</span>
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                                </div>

                                {/* Total Due Today - Compact */}
                                <div className="bg-gradient-to-r from-trust-green to-trust-green-dark rounded-xl p-5 text-white shadow-lg">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-xs text-white/70 uppercase tracking-wider mb-1">Total Due Today</p>
                                      <p className="text-sm text-white/90">
                                        {formData.customerType === 'existing' ? 'First month' : 'First month + setup fee'}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-4xl font-extrabold">${totalDue.toFixed(2)}</p>
                                    </div>
                                  </div>
                                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mt-4">
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-white/90">Then ${monthlyPrice}/month recurring</span>
                                      <span className="text-white/70 text-xs">Cancel anytime</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Value Badges - Compact */}
                                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 py-3">

                                  <div className="flex items-center gap-1.5">
                                    <Check className="w-3.5 h-3.5 text-trust-green" />
                                    <span>99.9% uptime SLA</span>
                                  </div>
                                  <span className="text-slate-300">•</span>
                                  <div className="flex items-center gap-1.5">
                                    <Check className="w-3.5 h-3.5 text-trust-green" />
                                    <span>Enterprise security</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Step 4: Final Review & Confirmation */}
                          {currentStep === 4 && (
                            <div className="space-y-4 md:space-y-6 animate-fade-in">
                              <div className="mb-6 md:mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 md:mb-3">Review Your Order</h2>
                                <p className="text-slate-600 text-base md:text-lg">Please confirm your order details before submitting</p>
                              </div>

                              {/* Order Summary Cards */}
                              <div className="space-y-4">
                                {/* Contact Information */}
                                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-trust-green/10 rounded-lg flex items-center justify-center">
                                      <Check className="w-4 h-4 text-trust-green" />
                                    </div>
                                    Contact Information
                                  </h3>
                                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="text-slate-500 mb-1">Customer Type</p>
                                      <p className="font-semibold text-slate-900">
                                        {formData.customerType === 'new' ? 'New Customer' : 'Existing Customer'}
                                        {formData.customerType === 'existing' && (
                                          <span className="ml-2 text-xs bg-trust-green/10 text-trust-green px-2 py-0.5 rounded-full">No setup fee</span>
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-slate-500 mb-1">Full Name</p>
                                      <p className="font-semibold text-slate-900">{formData.name}</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-500 mb-1">Company</p>
                                      <p className="font-semibold text-slate-900">{formData.companyName}</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-500 mb-1">Email</p>
                                      <p className="font-semibold text-slate-900">{formData.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-slate-500 mb-1">Phone</p>
                                      <p className="font-semibold text-slate-900">{formData.phone || 'Not provided'}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Package Details */}
                                <div className="bg-gradient-to-br from-trust-green/5 to-trust-green/10 rounded-xl p-6 border border-trust-green/30">
                                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-trust-green rounded-lg flex items-center justify-center">
                                      <Package className="w-4 h-4 text-white" />
                                    </div>
                                    Package Details
                                  </h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-600">Package Type</span>
                                      <span className="font-semibold text-slate-900">
                                        {formData.packageType === 'custom'
                                          ? 'Custom Package'
                                          : PACKAGES[formData.packageType as keyof typeof PACKAGES].name}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-600">Number of Inboxes</span>
                                      <span className="font-semibold text-slate-900">{getInboxCount()} inboxes</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-600">Domain Provider</span>
                                      <span className="font-semibold text-slate-900 capitalize">{formData.domainProvider}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-slate-600">Domain Stage</span>
                                      <span className="font-semibold text-slate-900 capitalize">{formData.domainStage}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Pricing Breakdown */}
                                <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 border-2 border-trust-green/30 shadow-lg">
                                  <h3 className="font-semibold text-slate-900 mb-5 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-trust-green/10 rounded-lg flex items-center justify-center">
                                      <ChevronRight className="w-4 h-4 text-trust-green" />
                                    </div>
                                    Pricing Summary
                                  </h3>
                                  <div className="space-y-4">
                                    {/* Monthly Recurring */}
                                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                                      <div className="flex justify-between items-center mb-2">
                                        <div>
                                          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Monthly Recurring</p>
                                          <p className="text-sm text-slate-600">Billed every month</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-2xl font-bold text-slate-900">${monthlyPrice}</p>
                                          <p className="text-xs text-slate-500">/month</p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* One-Time Setup Fee - Only for new customers */}
                                    {formData.customerType === 'new' && (
                                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                        <div className="flex justify-between items-center mb-2">
                                          <div>
                                            <p className="text-xs text-blue-600 uppercase tracking-wide mb-1 font-semibold">One-Time Setup Fee</p>
                                            <p className="text-sm text-slate-600">Pay once during signup</p>
                                          </div>
                                          <div className="text-right">
                                            <p className="text-2xl font-bold text-blue-600">${setupFee.toFixed(2)}</p>
                                            <div className="inline-block mt-1">
                                              <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-semibold">One-Time</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {/* Total Due Today */}
                                    <div className="bg-gradient-to-r from-trust-green to-trust-green-dark rounded-lg p-5 text-white">
                                      <div className="flex justify-between items-center">
                                        <div>
                                          <p className="text-xs text-white/70 uppercase tracking-wide mb-1">Total Due Today</p>
                                          <p className="text-sm text-white/90">
                                            {formData.customerType === 'existing' ? 'First month' : 'First month + setup fee'}
                                          </p>
                                        </div>
                                        <p className="text-4xl font-bold">${totalDue.toFixed(2)}</p>
                                      </div>
                                    </div>

                                    {/* Future Billing Info */}
                                    <div className="bg-slate-100 rounded-lg p-3 text-center">
                                      <p className="text-sm text-slate-700">
                                        <span className="font-semibold">Then ${monthlyPrice}/month</span> recurring
                                      </p>
                                      <p className="text-xs text-slate-500 mt-1">Cancel anytime, no long-term contracts</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Billing Address */}
                                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                  <h3 className="font-semibold text-slate-900 mb-3">Billing Address</h3>
                                  <p className="text-sm text-slate-700 whitespace-pre-line">{formData.address}</p>
                                </div>
                              </div>

                              {/* Terms and Conditions Checkbox */}
                              <div className="border-2 border-slate-200 rounded-xl p-6 bg-slate-50">
                                <div className="flex items-start gap-3">
                                  <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    {...register('agreeToTerms')}
                                    className="w-5 h-5 mt-0.5 rounded border-slate-300 text-trust-green focus:ring-trust-green focus:ring-2 cursor-pointer"
                                  />
                                  <label htmlFor="agreeToTerms" className="text-sm text-slate-700 cursor-pointer">
                                    I agree to the{' '}
                                    <a
                                      href="/terms"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-trust-green font-semibold hover:underline"
                                    >
                                      Terms & Conditions
                                    </a>{' '}
                                    and{' '}
                                    <a
                                      href="/refund-policy"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-trust-green font-semibold hover:underline"
                                    >
                                      Refund Policy
                                    </a>
                                    . I understand that by submitting this order request, I will receive a custom quote via email
                                    within 24 hours.
                                  </label>
                                </div>
                                {errors.agreeToTerms && (
                                  <p className="text-danger text-sm mt-2 ml-8">{errors.agreeToTerms.message}</p>
                                )}
                              </div>

                              {/* Information Notice */}
                              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-slate-700">
                                <p className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <span>
                                    No payment is required at this time. This is just a quote request and our team will reach out
                                    within 24 hours with your personalized pricing.
                                  </span>
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Navigation Buttons */}
                          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handlePrevious}
                              disabled={currentStep === 1}
                              className={`h-12 text-slate-700 ${currentStep === 1 ? 'invisible' : ''}`}
                            >
                              Previous
                            </Button>

                            {currentStep < totalSteps ? (
                              <Button
                                type="button"
                                onClick={handleNext}
                                className="h-12 bg-trust-green hover:bg-trust-green-dark text-white px-8"
                              >
                                Next Step
                                <ChevronRight className="w-5 h-5 ml-1" />
                              </Button>
                            ) : (
                              <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="h-12 bg-trust-green hover:bg-trust-green-dark text-white px-8 shadow-lg shadow-trust-green/30 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isSubmitting ? (
                                  <>
                                    <svg
                                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Submitting...
                                  </>
                                ) : (
                                  <>
                                    Submit Order Request
                                    <Check className="w-5 h-5 ml-2" />
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </form>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Container>
          </Section>

          {/* CTA Section */}
          {!submitted && (
            <Section padding="lg" className="bg-transparent">
              <Container>
                <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary-navy to-primary-navy-dark rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Questions? We're Here to Help
                  </h2>
                  <p className="text-lg text-white/90 mb-6">
                    Book a free consultation call with our team to discuss your specific needs.
                  </p>
                  <a
                    href="/book-call"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-navy font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Schedule a Free Call
                  </a>
                </div>
              </Container>
            </Section>
          )}
        </main>

        <Footer />
      </div>
    </div>
  )
}
