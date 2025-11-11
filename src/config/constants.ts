/**
 * Application Constants
 * Centralized constants for COLDINFRA landing page
 */

// ============================================================================
// API Constants
// ============================================================================

export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.coldinfra.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const

export const API_ENDPOINTS = {
  CONTACT: '/contact',
  NEWSLETTER: '/newsletter',
  PRICING: '/pricing',
  CALCULATE_ROI: '/tools/roi',
  VALIDATE_EMAIL: '/validate/email',
  VALIDATE_DOMAIN: '/validate/domain',
} as const

// ============================================================================
// Routes
// ============================================================================

export const ROUTES = {
  HOME: '/',
  PRICING: '#pricing',
  FEATURES: '#features',
  TOOLS: '#tools',
  FAQ: '#faq',
  DOCS: '/docs',
  BLOG: '/blog',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
} as const

// ============================================================================
// Analytics Events
// ============================================================================

export const ANALYTICS_EVENTS = {
  // Navigation
  NAV_CLICK: 'navigation_click',
  LOGO_CLICK: 'logo_click',

  // CTA Actions
  CTA_CLICK: 'cta_click',
  GET_STARTED: 'get_started_click',
  WATCH_DEMO: 'watch_demo_click',
  CONTACT_US: 'contact_us_click',

  // Pricing
  PRICING_VIEW: 'pricing_view',
  PRICING_TIER_SELECT: 'pricing_tier_select',
  PRICING_CALCULATE: 'pricing_calculate',

  // Forms
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',
  FORM_SUCCESS: 'form_success',

  // Tools
  TOOL_OPEN: 'tool_open',
  TOOL_CALCULATE: 'tool_calculate',
  TOOL_EXPORT: 'tool_export',

  // Engagement
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  VIDEO_PLAY: 'video_play',
  VIDEO_COMPLETE: 'video_complete',

  // Social
  SOCIAL_SHARE: 'social_share',
  SOCIAL_CLICK: 'social_click',
} as const

// ============================================================================
// Performance Metrics
// ============================================================================

export const PERFORMANCE_THRESHOLDS = {
  // Core Web Vitals
  LCP_GOOD: 2500, // ms
  LCP_NEEDS_IMPROVEMENT: 4000,

  FID_GOOD: 100, // ms
  FID_NEEDS_IMPROVEMENT: 300,

  CLS_GOOD: 0.1,
  CLS_NEEDS_IMPROVEMENT: 0.25,

  // Custom Metrics
  TTI_TARGET: 3500, // ms (Time to Interactive)
  BUNDLE_SIZE_LIMIT: 500, // KB
  IMAGE_SIZE_LIMIT: 200, // KB
} as const

// ============================================================================
// Validation Rules
// ============================================================================

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  URL_REGEX: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,

  // Field Length Limits
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 254,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 1000,
  COMPANY_MAX: 100,

  // Password Rules
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 128,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
} as const

// ============================================================================
// Error Messages
// ============================================================================

export const ERROR_MESSAGES = {
  // Required Fields
  REQUIRED: 'This field is required',
  REQUIRED_EMAIL: 'Email address is required',
  REQUIRED_NAME: 'Name is required',
  REQUIRED_MESSAGE: 'Message is required',

  // Format Errors
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL',

  // Length Errors
  NAME_TOO_SHORT: `Name must be at least ${VALIDATION.NAME_MIN} characters`,
  NAME_TOO_LONG: `Name must be less than ${VALIDATION.NAME_MAX} characters`,
  MESSAGE_TOO_SHORT: `Message must be at least ${VALIDATION.MESSAGE_MIN} characters`,
  MESSAGE_TOO_LONG: `Message must be less than ${VALIDATION.MESSAGE_MAX} characters`,

  // Network Errors
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',

  // Form Errors
  FORM_SUBMISSION_FAILED: 'Failed to submit form. Please try again.',
  INVALID_FORM_DATA: 'Please check your input and try again.',

  // Generic
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
} as const

// ============================================================================
// Success Messages
// ============================================================================

export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Thank you! We\'ll get back to you soon.',
  NEWSLETTER_SUBSCRIBED: 'Successfully subscribed to newsletter!',
  CONTACT_SENT: 'Message sent successfully!',
  ACCOUNT_CREATED: 'Account created successfully!',
  PASSWORD_RESET: 'Password reset email sent!',
} as const

// ============================================================================
// UI Constants
// ============================================================================

export const UI = {
  // Timing
  TOAST_DURATION: 5000, // ms
  DEBOUNCE_DELAY: 300, // ms
  ANIMATION_DURATION: 300, // ms
  MODAL_ANIMATION_DURATION: 200, // ms

  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,

  // File Upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],

  // Search
  MIN_SEARCH_LENGTH: 3,
  SEARCH_DEBOUNCE: 500, // ms
} as const

// ============================================================================
// Business Constants
// ============================================================================

export const BUSINESS = {
  // Pricing
  MIN_MAILBOXES: 1,
  MAX_MAILBOXES: 10000,
  DEFAULT_MAILBOXES: 10,

  STARTER_PRICE_PER_MAILBOX: 2.50,
  PROFESSIONAL_PRICE_PER_MAILBOX: 2.25,
  ENTERPRISE_MIN_MAILBOXES: 100,

  // Discounts
  VOLUME_DISCOUNT_THRESHOLD: 50, // mailboxes
  VOLUME_DISCOUNT_PERCENTAGE: 10, // %

  // Trial
  TRIAL_DAYS: 30,
  MONEY_BACK_GUARANTEE_DAYS: 30,

  // Metrics
  AVERAGE_SETUP_TIME: 10, // minutes
  DELIVERY_RATE: 98.7, // %
  UPTIME_GUARANTEE: 99.9, // %

  // Support
  SUPPORT_HOURS: '24/7',
  RESPONSE_TIME_SLA: 1, // hours
} as const

// ============================================================================
// Feature Flags
// ============================================================================

export const FEATURES = {
  ENABLE_CHAT: true,
  ENABLE_BLOG: false,
  ENABLE_DARK_MODE: false,
  ENABLE_MULTI_LANGUAGE: false,
  ENABLE_A_B_TESTING: false,
  ENABLE_ANALYTICS: true,
  ENABLE_ERROR_TRACKING: true,
} as const

// ============================================================================
// Social Media
// ============================================================================

export const SOCIAL_MEDIA = {
  TWITTER: 'https://twitter.com/coldinfra',
  LINKEDIN: 'https://linkedin.com/company/coldinfra',
  GITHUB: 'https://github.com/coldinfra',
  FACEBOOK: 'https://facebook.com/coldinfra',
  YOUTUBE: 'https://youtube.com/@coldinfra',
} as const

// ============================================================================
// Meta Tags
// ============================================================================

export const META_TAGS = {
  DEFAULT_TITLE: 'COLDINFRA - Complete Cold Email Infrastructure Setup',
  TITLE_TEMPLATE: '%s | COLDINFRA',
  DEFAULT_DESCRIPTION: 'Professional cold email infrastructure setup service. Starting at $2.50/mailbox with 14,000+ mailboxes served.',
  DEFAULT_OG_IMAGE: '/og-image.jpg',
  TWITTER_HANDLE: '@coldinfra',
  SITE_NAME: 'COLDINFRA',
} as const

// ============================================================================
// Regex Patterns
// ============================================================================

export const PATTERNS = {
  EMAIL: VALIDATION.EMAIL_REGEX,
  PHONE: VALIDATION.PHONE_REGEX,
  URL: VALIDATION.URL_REGEX,
  DOMAIN: /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i,
  IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const

// ============================================================================
// HTTP Status Codes
// ============================================================================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const

// ============================================================================
// Storage Keys
// ============================================================================

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'coldinfra_user_prefs',
  THEME: 'coldinfra_theme',
  CART: 'coldinfra_cart',
  RECENT_SEARCHES: 'coldinfra_recent_searches',
  VIEWED_TOOLS: 'coldinfra_viewed_tools',
  CONSENT: 'coldinfra_cookie_consent',
} as const

// ============================================================================
// Date Formats
// ============================================================================

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_LONG: 'MMMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
  API: "yyyy-MM-dd'T'HH:mm:ss'Z'",
} as const

// ============================================================================
// Type Exports for Constants
// ============================================================================

export type APIEndpoint = ValueOf<typeof API_ENDPOINTS>
export type Route = ValueOf<typeof ROUTES>
export type AnalyticsEvent = ValueOf<typeof ANALYTICS_EVENTS>
export type ErrorMessage = ValueOf<typeof ERROR_MESSAGES>
export type SuccessMessage = ValueOf<typeof SUCCESS_MESSAGES>
export type SocialMedia = ValueOf<typeof SOCIAL_MEDIA>
export type StorageKey = ValueOf<typeof STORAGE_KEYS>

type ValueOf<T> = T[keyof T]
