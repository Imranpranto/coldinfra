# ScaledMail Design Inspiration → COLDINFRA Adaptation

Complete design system documentation based on ScaledMail.com, adapted for COLDINFRA landing page.

---

## 🎨 COLOR SYSTEM

### ScaledMail Original
```css
Primary Green:   #28D27A  (brand accent, CTAs, progress)
Dark Teal:       #032B23  (primary text, navigation)
White:           #FFFFFF  (backgrounds, contrast)
```

### COLDINFRA Adaptation
```css
/* Keep existing COLDINFRA colors, enhance with green accent */

/* Primary Palette */
--primary-navy:      #1A2746  /* Main brand color */
--primary-teal:      #0A3D35  /* Inspired by ScaledMail dark teal */
--primary-mint:      #28D27A  /* ScaledMail green for accents */

/* Trust & Conversion */
--trust-gold:        #F2B705  /* Keep for established CTAs */
--trust-green:       #28D27A  /* Alternative CTA, success states */
--trust-mint-light:  #E8FAF1  /* Subtle backgrounds */

/* Success & Growth */
--success-green:     #28D27A  /* Update to match ScaledMail */
--success-dark:      #1FB864  /* Hover state */
--success-light:     #E8FAF1  /* Backgrounds */

/* Text Colors */
--text-primary:      #032B23  /* ScaledMail dark teal for headings */
--text-secondary:    #475569  /* Body text */
--text-muted:        #64748B  /* Supporting text */

/* Backgrounds */
--bg-primary:        #FFFFFF  /* Clean white */
--bg-secondary:      #F8FAFC  /* Subtle gray */
--bg-mint:           #F0FDF7  /* Mint tint sections */
```

### Color Usage Guidelines

**Primary Actions:**
- Use `trust-green` (#28D27A) for main CTAs
- Reserve `trust-gold` (#F2B705) for alternative CTAs
- Both colors tested for high conversion

**Text Hierarchy:**
- H1: `text-primary` (#032B23) - Dark teal
- H2-H4: `primary-navy` (#1A2746) - Navy
- Body: `text-secondary` (#475569) - Gray
- Muted: `text-muted` (#64748B) - Light gray

**Backgrounds:**
- Hero sections: White with mint gradient overlay
- Alternating sections: White → `bg-mint` → White
- Cards: White with subtle shadows

---

## ✍️ TYPOGRAPHY SYSTEM

### ScaledMail Font Stack
```css
font-family: 'Space Grotesk', sans-serif;
weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
```

### COLDINFRA Implementation

**Option 1: Keep Inter (Current)**
```typescript
// Inter is excellent, modern, and similar to Space Grotesk
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter'
})
```

**Option 2: Adopt Space Grotesk (ScaledMail Style)**
```typescript
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk'
})
```

**Recommendation:** Keep Inter (similar aesthetic, better performance, already loaded)

### Typography Scale

```css
/* Hero Headlines */
.hero-headline {
  font-size: 4rem;        /* 64px */
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

/* Section Headlines */
.section-headline {
  font-size: 3rem;        /* 48px */
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--primary-navy);
}

/* Subheadlines */
.subheadline {
  font-size: 1.5rem;      /* 24px */
  line-height: 1.5;
  font-weight: 400;
  color: var(--text-secondary);
}

/* Body Text */
.body-text {
  font-size: 1.125rem;    /* 18px */
  line-height: 1.7;
  font-weight: 400;
  color: var(--text-secondary);
}

/* Small Text */
.small-text {
  font-size: 0.875rem;    /* 14px */
  line-height: 1.5;
  font-weight: 500;
  color: var(--text-muted);
}
```

---

## 🧩 COMPONENT PATTERNS

### 1. Button System (ScaledMail Style)

```typescript
// Primary Green Button (ScaledMail)
.btn-primary-green {
  background: #28D27A;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.222s ease;
}

.btn-primary-green:hover {
  background: #1FB864;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(40, 210, 122, 0.25);
}

// Secondary Button (Outlined)
.btn-secondary-green {
  background: transparent;
  color: #28D27A;
  border: 2px solid #28D27A;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
}

.btn-secondary-green:hover {
  background: #E8FAF1;
  border-color: #1FB864;
}

// Button with Icon Animation
.btn-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-with-icon svg {
  transition: transform 0.222s ease;
}

.btn-with-icon:hover svg {
  transform: translateX(3px);
}
```

**CTA Text Patterns (ScaledMail):**
- "Book a Call"
- "Get Started"
- "Get a Price"
- "View Pricing"

**COLDINFRA Adaptation:**
- "Get Started" (primary)
- "View Pricing" (secondary)
- "Book a Demo"
- "Start Free Trial"

---

### 2. Navigation Pattern

```tsx
// ScaledMail-Inspired Navigation
<nav className="border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="text-primary-teal font-bold text-xl">
        COLDINFRA
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <a className="nav-link">Features</a>
        <a className="nav-link">Pricing</a>
        <a className="nav-link">Resources</a>
      </div>

      {/* CTA */}
      <button className="btn-primary-green">
        Get Started
      </button>
    </div>
  </div>
</nav>

<style>
.nav-link {
  color: var(--text-primary);
  font-weight: 500;
  position: relative;
  transition: color 0.222s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--trust-green);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
</style>
```

---

### 3. Hero Section Pattern

```tsx
// ScaledMail-Style Hero
<section className="relative min-h-[90vh] flex items-center overflow-hidden">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-white via-mint-50 to-white" />

  {/* Green Accent Glow */}
  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-trust-green/10 rounded-full blur-3xl" />

  <div className="relative max-w-6xl mx-auto px-4 text-center">
    {/* Trust Badge */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-light border border-success-green/20 text-success-green mb-8">
      ✓ Trusted by 6,000+ businesses
    </div>

    {/* Headline */}
    <h1 className="text-6xl lg:text-7xl font-bold text-primary-teal leading-tight mb-6">
      Unlock Unlimited Cold Email
      <span className="block text-trust-green">Infrastructure in 10 Minutes</span>
    </h1>

    {/* Subheadline */}
    <p className="text-2xl text-text-secondary mb-10 max-w-3xl mx-auto">
      Go from zero to sending with precision-engineered email infrastructure.
      Professional deliverability, zero hassle.
    </p>

    {/* CTAs */}
    <div className="flex gap-4 justify-center">
      <button className="btn-primary-green">
        Get Started
        <svg>→</svg>
      </button>
      <button className="btn-secondary-green">
        View Pricing
      </button>
    </div>

    {/* Trust Line */}
    <p className="mt-6 text-sm text-text-muted">
      No credit card required • 30-day money-back guarantee
    </p>
  </div>
</section>
```

---

### 4. Feature Section Pattern

```tsx
// ScaledMail Feature List Style
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-primary-navy mb-4">
        Why COLDINFRA?
      </h2>
      <p className="text-xl text-text-secondary">
        Everything you need for cold email success
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {features.map(feature => (
        <div className="p-8 rounded-xl border border-gray-200 hover:border-trust-green transition-colors">
          {/* Green Check Icon */}
          <div className="w-12 h-12 rounded-full bg-success-light flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-success-green">✓</svg>
          </div>

          <h3 className="text-xl font-semibold text-primary-navy mb-2">
            {feature.title}
          </h3>

          <p className="text-text-secondary">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

### 5. Stats Section Pattern

```tsx
// ScaledMail Social Proof Style
<section className="py-16 border-y border-gray-200">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div>
        <div className="text-5xl font-bold text-trust-green mb-2">14K+</div>
        <div className="text-sm text-text-muted uppercase tracking-wide">Mailboxes Served</div>
      </div>
      <div>
        <div className="text-5xl font-bold text-trust-green mb-2">98.7%</div>
        <div className="text-sm text-text-muted uppercase tracking-wide">Delivery Rate</div>
      </div>
      <div>
        <div className="text-5xl font-bold text-trust-green mb-2">$2.50</div>
        <div className="text-sm text-text-muted uppercase tracking-wide">Per Mailbox</div>
      </div>
      <div>
        <div className="text-5xl font-bold text-trust-green mb-2">10 min</div>
        <div className="text-sm text-text-muted uppercase tracking-wide">Setup Time</div>
      </div>
    </div>
  </div>
</section>
```

---

### 6. FAQ Accordion Pattern

```tsx
// ScaledMail Accordion with Rotation Animation
const [openIndex, setOpenIndex] = useState<number | null>(null)

<section className="py-20 bg-bg-secondary">
  <div className="max-w-3xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center text-primary-navy mb-12">
      Frequently Asked Questions
    </h2>

    {faqs.map((faq, index) => (
      <div key={index} className="mb-4 bg-white rounded-lg border border-gray-200">
        <button
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
          className="w-full px-6 py-4 flex items-center justify-between text-left"
        >
          <span className="font-semibold text-primary-navy">{faq.question}</span>
          <svg
            className={`w-5 h-5 text-trust-green transition-transform duration-300 ${
              openIndex === index ? 'rotate-45' : ''
            }`}
          >
            +
          </svg>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <p className="px-6 text-text-secondary">{faq.answer}</p>
        </div>
      </div>
    ))}
  </div>
</section>
```

---

## 📝 DYNAMIC COPY PATTERNS

### Headline Formulas (ScaledMail Style)

**Pattern 1: "Unlock [Benefit] with [Method]"**
- ScaledMail: "Unlock Unlimited Cold Email with Precision-Engineered Infrastructure"
- COLDINFRA: "Unlock Maximum Deliverability with Professional Email Infrastructure"

**Pattern 2: "Go from [Current State] to [Desired State] in [Timeframe]"**
- ScaledMail: "Go from Zero to Sending in Just 4 Days"
- COLDINFRA: "Go from Setup to Sending in Just 10 Minutes"

**Pattern 3: "[Action Verb] [Specific Metric] [Timeframe]"**
- ScaledMail: "Scale to 11,000 Emails Per Month"
- COLDINFRA: "Deploy 100 Mailboxes in One Click"

### Value Proposition Structure

```
[Headline: Big Promise]
    ↓
[Subheadline: Specific Method/Benefit]
    ↓
[Social Proof: Numbers/Trust Signal]
    ↓
[CTA: Clear Next Step]
```

**Example:**
```
Headline:    "Cold Email Infrastructure Ready in 10 Minutes"
Subhead:     "Complete setup with authentication, warming, and optimization"
Social:      "Trusted by 6,000+ businesses • 14K+ mailboxes served"
CTA:         "Get Started" / "View Pricing"
```

### Feature Description Pattern

**ScaledMail Formula:**
```
[Specific Action] → [Concrete Result] → [Time/Metric]

Example: "4 domains = 11,000 emails/month"
```

**COLDINFRA Adaptation:**
```
- "One-click setup → 100 mailboxes configured → 10 minutes"
- "Professional authentication → 98.7% inbox rate → Guaranteed"
- "Automated warming → Full deliverability → 14 days"
```

### Trust Signal Format

**Pattern:**
```
[Number] [Unit] [Context]

Examples:
- "14,000+ mailboxes served"
- "6,000+ businesses trust us"
- "98.7% delivery rate guaranteed"
- "$2.50 per mailbox (most affordable)"
```

---

## 🎬 ANIMATION PATTERNS

### ScaledMail Animation System

```css
/* Scroll-Triggered Fade In */
.fade-in-up {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hover State Transitions */
.hover-lift {
  transition: transform 0.222s ease, box-shadow 0.222s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* Icon Slide Animation */
.icon-slide {
  transition: transform 0.3s ease;
}

.btn:hover .icon-slide {
  transform: translateX(3px);
}

/* Accordion Rotation */
.accordion-icon {
  transition: transform 0.3s ease-in-out;
}

.accordion-icon.open {
  transform: rotate(-45deg);
}

/* Progress Bar Fill */
.progress-fill {
  width: 0;
  transition: width 0.5s ease;
}

.progress-fill.active {
  width: 100%;
}
```

### Implementation with Framer Motion

```typescript
import { motion } from 'framer-motion'

// Fade In Up
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  {children}
</motion.div>

// Stagger Children
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>
  {items.map(item => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## 📐 SPACING & LAYOUT

### Section Spacing (ScaledMail Pattern)

```css
/* Generous vertical spacing */
.section {
  padding-top: 5rem;     /* 80px */
  padding-bottom: 5rem;
}

.section-large {
  padding-top: 7rem;     /* 112px */
  padding-bottom: 7rem;
}

/* Hero section */
.hero {
  min-height: 90vh;
  padding-top: 6rem;
  padding-bottom: 6rem;
}

/* Component spacing */
.component-gap {
  gap: 2rem;  /* 32px between elements */
}

.section-gap {
  margin-bottom: 4rem;  /* 64px between sections */
}
```

### Grid Patterns

```css
/* 3-Column Feature Grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}
```

---

## 🎨 VISUAL STYLE GUIDELINES

### Border Radius
```css
--radius-sm:  0.375rem;  /* 6px - badges */
--radius-md:  0.5rem;    /* 8px - buttons */
--radius-lg:  0.75rem;   /* 12px - cards */
--radius-xl:  1rem;      /* 16px - sections */
--radius-full: 9999px;   /* full - pills */
```

### Box Shadows
```css
--shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md:  0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg:  0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-green: 0 8px 16px rgba(40, 210, 122, 0.25);
```

### Transition Timing
```css
--transition-fast:    0.15s ease;
--transition-base:    0.222s ease;  /* ScaledMail standard */
--transition-slow:    0.3s ease-in-out;
--transition-slower:  0.6s ease;
```

---

## 📋 IMPLEMENTATION CHECKLIST

### Phase 1: Color System
- [ ] Update CSS variables with green accents
- [ ] Add `trust-green` and `primary-teal` colors
- [ ] Create `bg-mint` background utility
- [ ] Update success colors to #28D27A

### Phase 2: Typography
- [ ] Keep Inter font (similar to Space Grotesk)
- [ ] Add font weights 300, 500, 600, 700
- [ ] Update heading colors to `text-primary` (#032B23)
- [ ] Implement tighter letter spacing

### Phase 3: Components
- [ ] Create green button variants
- [ ] Add icon slide animations
- [ ] Build FAQ accordion with rotation
- [ ] Update navigation with underline effect
- [ ] Add scroll-triggered animations

### Phase 4: Copy & Messaging
- [ ] Rewrite headlines with "Unlock..." pattern
- [ ] Add "Go from...to..." subheadlines
- [ ] Update CTAs to "Get Started" / "Book a Demo"
- [ ] Enhance feature descriptions with metrics
- [ ] Format social proof consistently

### Phase 5: Visual Polish
- [ ] Add subtle green gradient overlays
- [ ] Update button hover states
- [ ] Implement generous spacing
- [ ] Add border-radius consistency
- [ ] Create smooth transitions

---

## 🎯 KEY TAKEAWAYS

**What Made ScaledMail Work:**
1. ✅ Strong green brand color (#28D27A) for trust and growth
2. ✅ Clean typography with Space Grotesk (modern, readable)
3. ✅ Action-oriented copy with specific metrics
4. ✅ Generous spacing and breathing room
5. ✅ Smooth animations (0.222s standard timing)
6. ✅ Clear CTA hierarchy and placement
7. ✅ Professional trust signals throughout

**How to Adapt for COLDINFRA:**
- Keep existing navy brand color as primary
- Add green as accent for CTAs and success states
- Maintain clean, minimal aesthetic
- Use specific metrics in copy (14K+ mailboxes, 98.7%)
- Implement smooth transitions and animations
- Focus on "speed to value" messaging

---

*This design system combines the best of ScaledMail's modern aesthetic with COLDINFRA's established brand identity.*
