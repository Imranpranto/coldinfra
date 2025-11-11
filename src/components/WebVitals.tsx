'use client'

import { useEffect } from 'react'
import { trackWebVitals } from '@/lib/analytics'

export function WebVitals() {
  useEffect(() => {
    // Dynamically import web-vitals to reduce bundle size
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(trackWebVitals)
      getFID(trackWebVitals)
      getFCP(trackWebVitals)
      getLCP(trackWebVitals)
      getTTFB(trackWebVitals)
    })
  }, [])

  return null
}

// Export performance monitoring hook
export function usePerformanceMonitoring() {
  useEffect(() => {
    // Track page load time
    const trackPageLoad = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart
        
        if (loadTime > 0) {
          trackWebVitals({
            name: 'page_load_time',
            delta: loadTime,
            id: 'page_load'
          })
        }
      }
    }

    // Track when page is fully loaded
    if (document.readyState === 'complete') {
      trackPageLoad()
    } else {
      window.addEventListener('load', trackPageLoad)
      return () => window.removeEventListener('load', trackPageLoad)
    }
  }, [])

  return {
    trackCustomMetric: (name: string, value: number, id?: string) => {
      trackWebVitals({
        name,
        delta: value,
        id: id || name
      })
    }
  }
}