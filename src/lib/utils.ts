import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Analytics tracking placeholder - integrate with your analytics service
  if (typeof window !== 'undefined') {
    console.log('Track Event:', eventName, properties)
    // TODO: Integrate with Google Analytics, Mixpanel, etc.
    // Example: gtag('event', eventName, properties)
  }
}
