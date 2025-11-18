// Google Analytics 4 Integration for COLDINFRA
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// Track specific events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Enhanced ecommerce tracking for conversions
export const trackConversion = (conversionType: string, value?: number) => {
  event({
    action: 'conversion',
    category: 'Engagement',
    label: conversionType,
    value: value,
  })
}

// Track CTA clicks with context
export const trackCTAClick = (ctaText: string, section: string, position?: string) => {
  event({
    action: 'cta_click',
    category: 'CTA',
    label: `${ctaText} - ${section}${position ? ` - ${position}` : ''}`,
  })
}

// Track tool usage
export const trackToolUsage = (toolName: string, action: string) => {
  event({
    action: 'tool_usage',
    category: 'Tools',
    label: `${toolName} - ${action}`,
  })
}

// Track pricing interactions
export const trackPricingInteraction = (planName: string, action: string) => {
  event({
    action: 'pricing_interaction',
    category: 'Pricing',
    label: `${planName} - ${action}`,
  })
}

// Track form interactions
export const trackFormInteraction = (formName: string, action: string) => {
  event({
    action: 'form_interaction',
    category: 'Forms',
    label: `${formName} - ${action}`,
  })
}

// Track scroll depth for engagement
export const trackScrollDepth = (percentage: number) => {
  event({
    action: 'scroll_depth',
    category: 'Engagement',
    label: `${percentage}%`,
    value: percentage,
  })
}

// Track time on page
export const trackTimeOnPage = (seconds: number) => {
  event({
    action: 'time_on_page',
    category: 'Engagement',
    label: 'seconds',
    value: seconds,
  })
}

// Core Web Vitals tracking
export const trackWebVitals = ({ name, delta, id }: {
  name: string
  delta: number
  id: string
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      non_interaction: true,
    })
  }
}

// Set up automatic scroll depth tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return

  let maxScroll = 0
  const thresholds = [25, 50, 75, 90, 100]

  const handleScroll = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.round((scrollTop / docHeight) * 100)

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent

      // Track milestone percentages
      thresholds.forEach(threshold => {
        if (maxScroll >= threshold && !sessionStorage.getItem(`scroll_${threshold}`)) {
          trackScrollDepth(threshold)
          sessionStorage.setItem(`scroll_${threshold}`, 'true')
        }
      })
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => window.removeEventListener('scroll', handleScroll)
}

// Set up automatic time tracking
export const initTimeTracking = () => {
  if (typeof window === 'undefined') return

  const startTime = Date.now()
  
  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    trackTimeOnPage(timeSpent)
  }

  // Track time when user leaves page
  window.addEventListener('beforeunload', trackTime)
  window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      trackTime()
    }
  })

  return trackTime
}