/**
 * Validation Schemas
 * Centralized validation using Zod for form validation and API requests
 */

import { z } from 'zod'
import { VALIDATION, ERROR_MESSAGES } from '@/config/constants'

// ============================================================================
// Base Validations
// ============================================================================

export const emailSchema = z
  .string()
  .min(1, ERROR_MESSAGES.REQUIRED_EMAIL)
  .max(VALIDATION.EMAIL_MAX, `Email must be less than ${VALIDATION.EMAIL_MAX} characters`)
  .email(ERROR_MESSAGES.INVALID_EMAIL)
  .transform((email) => email.toLowerCase().trim())

export const nameSchema = z
  .string()
  .min(VALIDATION.NAME_MIN, ERROR_MESSAGES.NAME_TOO_SHORT)
  .max(VALIDATION.NAME_MAX, ERROR_MESSAGES.NAME_TOO_LONG)
  .transform((name) => name.trim())

export const phoneSchema = z
  .string()
  .regex(VALIDATION.PHONE_REGEX, ERROR_MESSAGES.INVALID_PHONE)
  .optional()
  .or(z.literal(''))

export const urlSchema = z
  .string()
  .regex(VALIDATION.URL_REGEX, ERROR_MESSAGES.INVALID_URL)
  .optional()
  .or(z.literal(''))

export const messageSchema = z
  .string()
  .min(VALIDATION.MESSAGE_MIN, ERROR_MESSAGES.MESSAGE_TOO_SHORT)
  .max(VALIDATION.MESSAGE_MAX, ERROR_MESSAGES.MESSAGE_TOO_LONG)
  .transform((msg) => msg.trim())

// ============================================================================
// Contact Form Schema
// ============================================================================

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  company: z
    .string()
    .max(VALIDATION.COMPANY_MAX, `Company name must be less than ${VALIDATION.COMPANY_MAX} characters`)
    .optional()
    .or(z.literal(''))
    .transform((val) => val?.trim() || ''),
  phone: phoneSchema,
  message: messageSchema,
  mailboxCount: z
    .number()
    .int('Mailbox count must be a whole number')
    .min(1, 'Mailbox count must be at least 1')
    .max(10000, 'Mailbox count must be less than 10,000')
    .optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the privacy policy'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// ============================================================================
// Newsletter Subscription Schema
// ============================================================================

export const newsletterSchema = z.object({
  email: emailSchema,
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .optional()
    .transform((val) => val?.trim() || ''),
  consent: z
    .boolean()
    .refine((val) => val === true, 'You must agree to receive emails'),
})

export type NewsletterData = z.infer<typeof newsletterSchema>

// ============================================================================
// Pricing Calculator Schema
// ============================================================================

export const pricingCalculatorSchema = z.object({
  mailboxCount: z
    .number()
    .int('Mailbox count must be a whole number')
    .min(1, 'Minimum 1 mailbox required')
    .max(10000, 'Maximum 10,000 mailboxes allowed'),
  domainCount: z
    .number()
    .int('Domain count must be a whole number')
    .min(1, 'Minimum 1 domain required')
    .max(1000, 'Maximum 1,000 domains allowed')
    .optional(),
  billingPeriod: z.enum(['monthly', 'yearly'], {
    errorMap: () => ({ message: 'Please select a billing period' }),
  }),
  includeWarming: z.boolean().default(true),
  includeMonitoring: z.boolean().default(true),
})

export type PricingCalculatorData = z.infer<typeof pricingCalculatorSchema>

// ============================================================================
// ROI Calculator Schema
// ============================================================================

export const roiCalculatorSchema = z.object({
  emailsSentPerMonth: z
    .number()
    .int('Emails sent must be a whole number')
    .min(1, 'Minimum 1 email required')
    .max(1000000, 'Maximum 1,000,000 emails allowed'),
  currentDeliveryRate: z
    .number()
    .min(0, 'Delivery rate must be at least 0%')
    .max(100, 'Delivery rate cannot exceed 100%'),
  targetDeliveryRate: z
    .number()
    .min(0, 'Delivery rate must be at least 0%')
    .max(100, 'Delivery rate cannot exceed 100%'),
  averageDealValue: z
    .number()
    .min(0, 'Deal value must be positive')
    .max(1000000, 'Deal value must be less than $1,000,000'),
  conversionRate: z
    .number()
    .min(0, 'Conversion rate must be at least 0%')
    .max(100, 'Conversion rate cannot exceed 100%'),
})
  .refine(
    (data) => data.targetDeliveryRate > data.currentDeliveryRate,
    {
      message: 'Target delivery rate must be higher than current rate',
      path: ['targetDeliveryRate'],
    }
  )

export type ROICalculatorData = z.infer<typeof roiCalculatorSchema>

// ============================================================================
// DMARC Generator Schema
// ============================================================================

export const dmarcGeneratorSchema = z.object({
  domain: z
    .string()
    .min(3, 'Domain must be at least 3 characters')
    .regex(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i, 'Please enter a valid domain name'),
  policy: z.enum(['none', 'quarantine', 'reject'], {
    errorMap: () => ({ message: 'Please select a DMARC policy' }),
  }),
  subdomainPolicy: z.enum(['none', 'quarantine', 'reject']).optional(),
  percentage: z
    .number()
    .int('Percentage must be a whole number')
    .min(0, 'Percentage must be at least 0')
    .max(100, 'Percentage cannot exceed 100')
    .default(100),
  reportEmail: emailSchema,
  forensicReportEmail: emailSchema.optional(),
  alignment: z.object({
    spf: z.enum(['relaxed', 'strict']).default('relaxed'),
    dkim: z.enum(['relaxed', 'strict']).default('relaxed'),
  }).optional(),
})

export type DMARCGeneratorData = z.infer<typeof dmarcGeneratorSchema>

// ============================================================================
// Domain Validation Schema
// ============================================================================

export const domainValidationSchema = z.object({
  domain: z
    .string()
    .min(3, 'Domain must be at least 3 characters')
    .regex(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i, 'Please enter a valid domain name')
    .transform((domain) => domain.toLowerCase().trim()),
})

export type DomainValidationData = z.infer<typeof domainValidationSchema>

// ============================================================================
// Email Validation Schema
// ============================================================================

export const emailValidationSchema = z.object({
  email: emailSchema,
  checkMx: z.boolean().default(true),
  checkSmtp: z.boolean().default(false),
})

export type EmailValidationData = z.infer<typeof emailValidationSchema>

// ============================================================================
// Signup Form Schema
// ============================================================================

export const signupFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .transform((val) => val.trim()),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .transform((val) => val.trim()),
  email: emailSchema,
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters')
    .transform((val) => val.trim()),
  password: z
    .string()
    .min(VALIDATION.PASSWORD_MIN, `Password must be at least ${VALIDATION.PASSWORD_MIN} characters`)
    .max(VALIDATION.PASSWORD_MAX, `Password must be less than ${VALIDATION.PASSWORD_MAX} characters`)
    .regex(
      VALIDATION.PASSWORD_REGEX,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  confirmPassword: z.string(),
  phone: phoneSchema,
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, 'You must accept the terms and conditions'),
  marketingConsent: z.boolean().default(false),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type SignupFormData = z.infer<typeof signupFormSchema>

// ============================================================================
// Login Form Schema
// ============================================================================

export const loginFormSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
})

export type LoginFormData = z.infer<typeof loginFormSchema>

// ============================================================================
// Password Reset Schema
// ============================================================================

export const passwordResetSchema = z.object({
  email: emailSchema,
})

export type PasswordResetData = z.infer<typeof passwordResetSchema>

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(VALIDATION.PASSWORD_MIN, `Password must be at least ${VALIDATION.PASSWORD_MIN} characters`)
    .max(VALIDATION.PASSWORD_MAX, `Password must be less than ${VALIDATION.PASSWORD_MAX} characters`)
    .regex(
      VALIDATION.PASSWORD_REGEX,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  confirmPassword: z.string(),
  token: z.string().min(1, 'Reset token is required'),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type NewPasswordData = z.infer<typeof newPasswordSchema>

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Validate data against a schema and return formatted errors
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      error.errors.forEach((err) => {
        const path = err.path.join('.')
        errors[path] = err.message
      })
      return { success: false, errors }
    }
    return {
      success: false,
      errors: { _form: 'Validation failed. Please check your input.' },
    }
  }
}

/**
 * Validate a single field
 */
export function validateField<T>(
  schema: z.ZodSchema<T>,
  value: unknown
): { valid: true; value: T } | { valid: false; error: string } {
  try {
    const validatedValue = schema.parse(value)
    return { valid: true, value: validatedValue }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0]?.message || 'Invalid value' }
    }
    return { valid: false, error: 'Validation failed' }
  }
}

/**
 * Safe parse with default value
 */
export function safeParseWithDefault<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  defaultValue: T
): T {
  const result = schema.safeParse(data)
  return result.success ? result.data : defaultValue
}
