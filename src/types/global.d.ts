// Global type definitions for COLDINFRA landing page

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void
    dataLayer: Record<string, any>[]
  }
}

// Component Props Types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// SEO and Meta Types
export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  openGraph?: {
    title: string
    description: string
    image: string
    url: string
  }
  twitter?: {
    title: string
    description: string
    image: string
  }
}

// Analytics Types
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

// Pricing Types
export interface PricingPlan {
  id: string
  name: string
  price: number
  period: 'monthly' | 'annual'
  features: string[]
  popular?: boolean
  cta: string
}

// Tool Types
export interface Tool {
  id: string
  name: string
  description: string
  category: string
  popular?: boolean
  href: string
}

// Testimonial Types
export interface Testimonial {
  id: string
  quote: string
  author: string
  company: string
  title: string
  image?: string
  rating: number
  verified?: boolean
}

// FAQ Types
export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
}

// Form Types
export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  source?: string
}

export interface NewsletterFormData {
  email: string
  firstName?: string
  source?: string
}

// API Response Types
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Feature Types
export interface Feature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  highlight?: string
  category?: string
}

// Social Proof Types
export interface SocialProofMetric {
  value: string
  label: string
  description?: string
  trend?: 'up' | 'down' | 'stable'
}

// Navigation Types
export interface NavigationItem {
  name: string
  href: string
  external?: boolean
  dropdown?: NavigationItem[]
}

// Performance Types
export interface WebVital {
  name: string
  value: number
  delta: number
  id: string
  rating: 'good' | 'needs-improvement' | 'poor'
}

// Animation Types
export interface AnimationConfig {
  duration?: number
  delay?: number
  easing?: string
  repeat?: boolean
}

// Theme Types
export interface ThemeColors {
  primary: {
    navy: string
    'navy-dark': string
    'navy-light': string
  }
  trust: {
    gold: string
    'gold-dark': string
    'gold-light': string
  }
  success: {
    green: string
    'green-dark': string
    'green-light': string
  }
  professional: {
    50: string
    100: string
    200: string
    600: string
    900: string
  }
}

// Error Types
export interface ApplicationError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: Date
}

// Configuration Types
export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
    linkedin: string
  }
  keywords: string[]
}

export {}