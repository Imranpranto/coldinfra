/**
 * Global Type Definitions
 * Centralized type system for COLDINFRA landing page
 */

// ============================================================================
// Component Props Types
// ============================================================================

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export interface WithTestId {
  testId?: string
  'data-testid'?: string
}

// ============================================================================
// Button Types
// ============================================================================

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ButtonProps
  extends BaseComponentProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

// ============================================================================
// Card Types
// ============================================================================

export type CardPadding = 'sm' | 'md' | 'lg' | 'xl'

export interface CardProps extends BaseComponentProps {
  hover?: boolean
  padding?: CardPadding
  border?: boolean
  shadow?: boolean
}

export interface FeatureCardProps extends BaseComponentProps {
  icon: React.ReactNode
  title: string
  description: string
  highlight?: string
}

export interface StatsCardProps extends BaseComponentProps {
  number: string
  label: string
  description?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export interface PricingCardProps extends BaseComponentProps {
  title: string
  price: string | number
  period?: string
  description: string
  features: string[]
  ctaText: string
  ctaAction: () => void
  featured?: boolean
  badge?: string
  popular?: boolean
}

// ============================================================================
// Container Types
// ============================================================================

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
export type SectionBackground = 'white' | 'gray' | 'gradient' | 'navy'
export type SectionPadding = 'sm' | 'md' | 'lg' | 'xl' | 'none'

export interface ContainerProps extends BaseComponentProps {
  size?: ContainerSize
  center?: boolean
}

export interface SectionProps extends BaseComponentProps {
  background?: SectionBackground
  padding?: SectionPadding
  id?: string
}

// ============================================================================
// Navigation Types
// ============================================================================

export interface NavItem {
  name: string
  href: string
  external?: boolean
  dropdown?: NavItem[]
}

export interface HeaderProps extends BaseComponentProps {
  sticky?: boolean
  transparent?: boolean
}

export interface FooterProps extends BaseComponentProps {
  showNewsletter?: boolean
}

// ============================================================================
// Form Types
// ============================================================================

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio'
  placeholder?: string
  required?: boolean
  validation?: ValidationRule[]
  options?: SelectOption[]
}

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface ValidationRule {
  type: 'required' | 'email' | 'min' | 'max' | 'pattern' | 'custom'
  value?: string | number | RegExp
  message: string
}

export interface FormState {
  values: Record<string, any>
  errors: Record<string, string>
  touched: Record<string, boolean>
  isSubmitting: boolean
  isValid: boolean
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  mailboxCount?: number
  consent: boolean
}

// ============================================================================
// Badge Types
// ============================================================================

export type BadgeVariant = 'trust' | 'security' | 'success' | 'warning' | 'info'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends BaseComponentProps {
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: React.ReactNode
}

// ============================================================================
// SEO Types
// ============================================================================

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  twitterCard?: 'summary' | 'summary_large_image'
  noindex?: boolean
  nofollow?: boolean
}

export interface StructuredDataProps {
  type: 'Organization' | 'WebPage' | 'Service' | 'FAQPage' | 'BreadcrumbList'
  data: Record<string, any>
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface AnalyticsEvent {
  event: string
  category?: string
  action?: string
  label?: string
  value?: number
  properties?: Record<string, any>
}

export interface PageView {
  page: string
  title: string
  referrer?: string
}

// ============================================================================
// Feature Types
// ============================================================================

export interface Feature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  highlight?: string
  details?: string[]
  ctaText?: string
  ctaAction?: () => void
}

export interface Tool {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  href: string
  category: 'calculator' | 'generator' | 'validator' | 'analyzer'
  popular?: boolean
}

// ============================================================================
// Pricing Types
// ============================================================================

export interface PricingTier {
  id: string
  name: string
  description: string
  price: number | 'Custom'
  period: 'mailbox' | 'month' | 'year'
  currency: string
  features: string[]
  highlighted?: boolean
  popular?: boolean
  badge?: string
  ctaText: string
  ctaAction: () => void
  limits?: {
    mailboxes?: number
    domains?: number
    users?: number
  }
}

export interface PricingComparison {
  feature: string
  starter: boolean | string
  professional: boolean | string
  enterprise: boolean | string
}

// ============================================================================
// FAQ Types
// ============================================================================

export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: 'general' | 'technical' | 'billing' | 'support'
}

export interface FAQCategory {
  name: string
  slug: string
  items: FAQItem[]
}

// ============================================================================
// Testimonial Types
// ============================================================================

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar?: string
  content: string
  rating?: 1 | 2 | 3 | 4 | 5
  verified?: boolean
}

export interface CaseStudy {
  id: string
  title: string
  company: string
  industry: string
  logo?: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    description: string
  }[]
  testimonial?: Testimonial
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: ApiMeta
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  statusCode: number
}

export interface ApiMeta {
  page?: number
  limit?: number
  total?: number
  timestamp: string
}

// ============================================================================
// State Management Types
// ============================================================================

export interface AppState {
  user?: User
  cart?: Cart
  ui: UIState
}

export interface User {
  id: string
  email: string
  name: string
  company?: string
  role: 'user' | 'admin'
  subscription?: {
    plan: string
    status: 'active' | 'inactive' | 'trial'
    expiresAt: string
  }
}

export interface Cart {
  items: CartItem[]
  total: number
  currency: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  mailboxCount?: number
}

export interface UIState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  modalOpen: boolean
  loading: boolean
  errors: string[]
}

// ============================================================================
// Utility Types
// ============================================================================

export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Maybe<T> = T | null | undefined

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

export type Await<T> = T extends Promise<infer U> ? U : T

export type ValueOf<T> = T[keyof T]

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

// Note: Window interface extensions for gtag and dataLayer are
// already provided by Next.js and @types/gtag.js
