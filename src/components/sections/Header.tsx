'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { name: 'Home', href: '#' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Tools', href: '/tools' },
    { name: 'Resources', href: '/resources' }
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-700 ease-out",
        isScrolled ? "py-2" : "py-3"
      )}
    >
      <Container>
        <div
          className={cn(
            "relative px-4 transition-all duration-700 ease-out",
            "bg-gradient-to-r from-primary-teal/98 to-[#0d483f]/98",
            "backdrop-blur-2xl border",
            isScrolled
              ? "py-2 rounded-2xl shadow-[0_4px_24px_rgba(10,61,53,0.5)] border-trust-green/20 scale-[0.98]"
              : "py-2.5 rounded-[24px] shadow-[0_8px_32px_rgba(10,61,53,0.4)] border-white/10"
          )}
        >
          {/* Animated gradient overlay */}
          <div className={cn(
            "absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none transition-opacity duration-700",
            isScrolled && "opacity-60"
          )} />

          {/* Subtle animated shine effect */}
          <div className={cn(
            "absolute inset-0 rounded-[24px] pointer-events-none transition-opacity duration-1000",
            isScrolled
              ? "opacity-0 bg-gradient-to-r from-transparent via-trust-green/5 to-transparent"
              : "opacity-100 bg-gradient-to-r from-transparent via-trust-green/10 to-transparent animate-pulse-slow"
          )} />

          <div className="relative flex items-center justify-between">
            {/* Logo with Icon */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2.5 group">
                <div className={cn(
                  "rounded-xl bg-trust-green/10 backdrop-blur-sm flex items-center justify-center",
                  "group-hover:bg-trust-green/20 transition-all duration-500",
                  "shadow-lg ring-1 ring-trust-green/30 group-hover:ring-trust-green/50",
                  "group-hover:scale-110 group-hover:rotate-3",
                  isScrolled ? "w-9 h-9" : "w-10 h-10"
                )}>
                  <Image
                    src="/logo.svg"
                    alt="COLDINFRA Logo"
                    width={isScrolled ? 22 : 26}
                    height={isScrolled ? 22 : 26}
                    className="object-contain transition-all duration-700"
                  />
                </div>
                <span className={cn(
                  "font-bold text-slate-900 tracking-tight transition-all duration-700",
                  "group-hover:text-trust-green",
                  isScrolled ? "text-[22px]" : "text-[24px]"
                )} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  COLDINFRA
                </span>
              </Link>
            </div>

            {/* Desktop Navigation + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <nav className="flex items-center gap-1">
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-slate-900 hover:text-trust-green font-semibold transition-all duration-500",
                      "hover:bg-white/10 rounded-xl relative group",
                      "transform hover:scale-105",
                      isScrolled ? "text-[14px]" : "text-[15px]"
                    )}
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      transitionDelay: `${index * 50}ms`
                    }}
                  >
                    {item.name}
                    <span className="absolute inset-0 rounded-xl ring-1 ring-trust-green/0 group-hover:ring-trust-green/40 transition-all duration-500" />
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-trust-green group-hover:w-3/4 transition-all duration-500" />
                  </Link>
                ))}
              </nav>

              <Link href="/book-call">
                <Button
                  className={cn(
                    "bg-gradient-to-r from-trust-green to-[#22c55e]",
                    "hover:from-[#22c55e] hover:to-trust-green",
                    "text-white font-semibold h-auto rounded-full",
                    "shadow-lg shadow-trust-green/40 hover:shadow-trust-green/60",
                    "hover:scale-110 transition-all duration-500",
                    "ring-1 ring-trust-green/30 hover:ring-trust-green/50",
                    "relative overflow-hidden group",
                    isScrolled ? "px-6 py-1.5 text-[14px]" : "px-7 py-2 text-[15px]"
                  )}
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  <span className="relative z-10">Book a Call</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "lg:hidden p-1.5 rounded-xl text-white",
                "hover:bg-trust-green/15 transition-all duration-500",
                "ring-1 ring-trust-green/20 hover:ring-trust-green/40",
                "hover:scale-110 transform"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <svg className={cn("transition-all duration-500", isScrolled ? "w-5 h-5" : "w-6 h-6")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <Container className="lg:hidden mt-2">
          <div
            id="mobile-menu"
            className="relative bg-gradient-to-br from-primary-teal/98 to-[#0d483f]/98 backdrop-blur-2xl rounded-[24px] shadow-2xl px-5 py-5 animate-slide-down border border-trust-green/20"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            <div className="relative space-y-1.5">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2.5 px-4 text-slate-900 hover:text-trust-green hover:bg-white/10 font-semibold rounded-xl transition-all duration-500 ring-1 ring-trust-green/0 hover:ring-trust-green/40 transform hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-3">
                <Link href="/book-call" className="block" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    className="w-full bg-gradient-to-r from-trust-green to-[#22c55e] hover:from-[#22c55e] hover:to-trust-green text-white font-semibold rounded-full shadow-lg shadow-trust-green/40 hover:shadow-trust-green/60 transition-all duration-500 ring-1 ring-trust-green/30 relative overflow-hidden group"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    <span className="relative z-10">Book a Call</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      )}
    </header>
  )
}