import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export function Container({ 
  children, 
  size = 'xl',
  className 
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-screen-sm',     // 640px
    md: 'max-w-screen-md',     // 768px
    lg: 'max-w-screen-lg',     // 1024px
    xl: 'max-w-screen-xl',     // 1280px
    full: 'max-w-none'
  }

  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      sizes[size],
      className
    )}>
      {children}
    </div>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'default' | 'gray' | 'gradient' | 'dark'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
}

export function Section({ 
  children, 
  className,
  background = 'default',
  padding = 'lg',
  id
}: SectionProps) {
  const backgrounds = {
    default: 'bg-white',
    gray: 'bg-professional-50',
    gradient: 'bg-gradient-primary',
    dark: 'bg-primary-navy text-white'
  }
  
  const paddings = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-20 lg:py-24',
    xl: 'py-20 sm:py-24 lg:py-32'
  }

  return (
    <section 
      id={id}
      className={cn(
        backgrounds[background],
        paddings[padding],
        className
      )}
    >
      {children}
    </section>
  )
}

interface GridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4 | 6
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Grid({ 
  children, 
  cols = 3,
  gap = 'lg',
  className 
}: GridProps) {
  const columns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  }
  
  const gaps = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  }

  return (
    <div className={cn(
      'grid',
      columns[cols],
      gaps[gap],
      className
    )}>
      {children}
    </div>
  )
}

interface FlexProps {
  children: React.ReactNode
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  wrap?: boolean
  className?: string
}

export function Flex({ 
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  gap = 'md',
  wrap = false,
  className 
}: FlexProps) {
  const directions = {
    row: 'flex-row',
    col: 'flex-col'
  }
  
  const alignments = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }
  
  const justifications = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }
  
  const gaps = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8'
  }

  return (
    <div className={cn(
      'flex',
      directions[direction],
      alignments[align],
      justifications[justify],
      gaps[gap],
      wrap && 'flex-wrap',
      className
    )}>
      {children}
    </div>
  )
}