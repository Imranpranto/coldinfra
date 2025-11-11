
# COLDINFRA Landing Page Design Doc

As a senior web developer, here’s a comprehensive design document that outlines best-in-class suggestions for typography, colors, boldness, UI/UX, and landing page section ideas referencing the content and brand positioning of ScaledMail. This guide enables your designer to create an impactful, conversion-focused application or website landing page.[1]

***

## 1. Typography

- **Primary Font:** Inter, Montserrat, or [SF Pro Text](https://developer.apple.com/fonts/) for clean, modern feel.
- **Secondary Font:** Roboto or Open Sans for body and long-form text.
- **Font Sizes:**
    - Headline/Hero: 48–64px, bold
    - Subheadline: 32px, medium or semi-bold
    - Section Title: 24–28px, semi-bold
    - Body: 16–18px, regular
    - Captions/Meta: 14px, regular
- **Font Weight Usage:**
    - Use bold for critical CTAs and key headers.
    - Medium/Semi-bold for section headers and feature highlights.
    - Regular for descriptions and supporting info.

**Hierarchy Example:**

```markdown
h1 - Inter, 64px, bold
h2 - Montserrat, 32px, semi-bold
h3 - Montserrat, 24px, semi-bold
body - Open Sans, 16px, regular
```

***

## 2. Color Palette

- **Primary:** #1A2746 (Navy Blue) – For main backgrounds and bold titles.
- **Accent:** #F2B705 (Yellow/Gold) – Draw attention to CTAs and highlights.
- **Secondary:** #32A852 (Green) – Represents growth, success; use for secondary actions.
- **Text Black:** #222B45 or #141414 – Main readable copy.
- **Background:** #F8FAFC (Very Light Gray) – Clean, fresh, maximizes contrast.
- **Error/Alert:** #E25757 (Red) – Warnings, alerts.
- **Link/Text Accent:** #2952EA (Bright Blue) – Hyperlinks, secondary accents.

**Usage Guidelines:**
- CTAs should use Accent or Secondary with bold white text.
- Areas needing emphasis (e.g., reply rate stats, steps) use Accent color backgrounds.
- Body backgrounds should be clean, minimal and easy on the eyes.

***

## 3. Boldness & Visual Weight

- Reserve bold weights for the most important headers, claims, CTAs (e.g., "Unlock Unlimited Cold Email").
- Use lighter font weights for supporting details and informational text.
- Card/design elements should have subtle shadow for elevation, but keep the feel modern.

***

## 4. UI Guidelines

- **Navigation:**
    - Sticky top navigation bar with a minimal logo, core navigation links, and a standout CTA ("Get Started" or "Book Demo").
    - Mobile-first: collapsible hamburger menu.
- **Hero Section:**
    - Large, eye-catching headline.
    - Subheadline clearly stating value proposition.
    - CTA button above the fold (“Get Started”, “See Demo”).
    - Supporting image/graphic showing dashboard or email volume metric.
- **Visual Icons:**
    - Use iconography for service features (Google/Microsoft, white-glove, DNS, tenant isolation).
    - Each “step” (4 Easy Steps...) gets its own number + icon.
- **Cards:**
    - Features and plans presented in easy-to-scan cards, with hover state animations.

***

## 5. UX Guidelines

- **Conversion Focused:**
    - Hero includes a prominent CTA.
    - Steps guide the user visually through the process.
    - Short, compelling copy for easy scanning.
    - Trust badges/certifications (optimized inbox, customer testimonials).
- **Micro-interactions:**
    - Button hover and press animations.
    - Smooth scroll; anchor links for sections like FAQ.
- **Responsiveness:**
    - 100% mobile and tablet responsive.
    - Images and content stack gracefully.
- **Accessibility:**
    - Sufficient contrast ratio for all text/background combinations.
    - Alt text for images/icons.

***

## 6. Section Ideas

### 1. Hero Section
- Headline: “Unlock Unlimited Cold Email”
- Subheadline: “Precision-Engineered Infrastructure For Predictable Revenue”
- CTA & Supporting image

### 2. Value Proposition
- 3–4 feature highlights in horizontal card row
    - Universal Platform Dominance
    - Inbox configuration mastery
    - No technical headaches
    - Lightning-fast deployment

### 3. How It Works (Process Steps)
- Four-column or vertical stepper layout:
    1. Register Your Domains
    2. White Glove Upload
    3. Warmup Strategy or Fast Sending Option
    4. Precision Sending Volumes

### 4. Plans & Pricing
- Cards for “Boutique”, “Growing Team”, “Enterprise”

### 5. Deliverability & Infrastructure Section
- Visual: Infographic or chart comparing deliverability
- Key stats: Inboxes per domain, sending volumes, account isolation

### 6. FAQ
- Accordion list
- Answers to most common user concerns

### 7. Testimonial/Review Section
- Customer logos or written testimonials.

### 8. Final CTA / Contact
- “Talk to Our Team”, “Book Demo”, “Get Started”

***

## 7. Sample Color/Font Implementation Snippet (CSS)

```css
:root {
  --primary: #1A2746;
  --accent: #F2B705;
  --secondary: #32A852;
  --text-main: #222B45;
  --background: #F8FAFC;
  --danger: #E25757;
  --link: #2952EA;
  --font-main: 'Inter', 'Montserrat', 'SF Pro Text', sans-serif;
  --font-secondary: 'Open Sans', 'Roboto', sans-serif;
}

/* Example */
h1 {
  font-family: var(--font-main);
  font-size: 64px;
  font-weight: bold;
  color: var(--primary);
}

.hero-cta {
  background: var(--accent);
  color: white;
  font-weight: bold;
  border-radius: 8px;
}
```

***

## 8. Additional Notes

- Use abundant white space for clarity.
- Prefer simple animation for step transitions.
- Imagery should be business professional—avoid stock clichés, use tech-focused illustrations.
- All vents/sections should end with actionable CTA.

***

This guide empowers your designer to deliver an elegant, high-conversion landing page tailored to ScaledMail’s competitive email infrastructure value proposition.[1]
