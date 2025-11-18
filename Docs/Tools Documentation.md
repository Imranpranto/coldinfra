# COLDINFRA Application Documentation

## Application Overview

**Goal:** Cold Email Infrastructure Setup in Minutes
**Main Value Proposition:** Get instant access to Google Workspace accounts optimized for cold email, with maximum deliverability for your cold outreach campaigns.

### Key Features
- Instant access to optimized mailboxes
- Maximum deliverability for cold outreach
- Affordable pricing (Starting at just $2.50 per mailbox)
- Quick setup (Setup in under 10 minutes)
- One-click export to popular cold email platforms (Instantly, Smartlead.ai, Reachinbox, Lemlist, Reply.io)

### Social Proof
- 14,000+ Cold Email Mailboxes served
- 6,000+ Cold Email Domains served

## Tools and Their Main Logic

### 1. Cold Email Cost Calculator
**Purpose:** Calculate the total cost of your cold email infrastructure.

**Inputs:**
- Email Service Provider (ESP) costs (provider, cost per user, number of users)
- Email Sequencer costs (provider, monthly cost)
- Additional infrastructure costs (servers, security, maintenance, backup, other)

**Logic:**
- Calculates total monthly cost based on all inputs
- Provides cost breakdown by category (ESP, Sequencer, Infrastructure)
- Allows viewing costs over different timeframes (1, 3, 6, 9 months, or annually)
- Visual breakdown of costs with percentage distribution
- Downloadable cost analysis as image

### 2. Cold Email ROI Calculator
**Purpose:** Calculate the expected return on investment (ROI) for cold email campaigns.

**Inputs:**
- Campaign Metrics: Monthly prospects, email open rate, positive reply rate
- Conversion Metrics: Close rate, average deal value

**Logic:**
- Calculates expected opened emails, positive replies, and closed deals
- Calculates total expected revenue
- Determines required number of mailboxes and domains based on prospects
- Visual display of results with key metrics
- Downloadable ROI analysis as image

### 3. Cold Email Volume Calculator
**Purpose:** Calculate total email volume and contact attrition through your sequence.

**Inputs:**
- Initial contact list size
- Bounce rate (%)
- Reply rate (%)
- Unsubscribe rate (%)
- Not sent rate (%)
- Number of follow-ups

**Logic:**
- Calculates step-by-step breakdown of email sequence (Initial Email + Follow-ups)
- Shows emails sent, bounces, replies, unsubscribes, and remaining contacts at each step
- Calculates totals for emails sent and remaining active contacts
- Determines infrastructure requirements (required mailboxes and domains)
- Downloadable volume analysis as image

### 4. Cold Email Domain Generator
**Purpose:** Generate domain name suggestions for cold email campaigns.

**Inputs:**
- Main domain (e.g., "coldinfra.com")
- Suggestion type (Mixed, Prefix Only, Suffix Only)
- Number of suggestions (1-30)

**Logic:**
- Generates domain suggestions by combining main domain with predefined prefixes/suffixes
- Provides copy functionality for individual and all suggestions
- Export to CSV functionality
- Uses predefined terms for creative domain combinations

### 5. DMARC Generator for Cold Email
**Purpose:** Create DMARC records to protect domains from email spoofing.

**Inputs:**
- Basic Configuration: Domain, Policy type (None, Quarantine, Reject), Percentage of messages
- Reporting Configuration: Aggregate reports email, Advanced options (Subdomain policy, SPF/DKIM alignment, reporting interval, failure reporting options, failure reports email)

**Logic:**
- Generates DMARC DNS TXT record for domain authentication
- Validates domain and email inputs
- Provides status check for generated record
- Instructions for publishing DNS record

### 6. Email Generator for Cold Email (Username Generator)
**Purpose:** Generate professional email addresses from full names.

**Inputs:**
- Domain
- Full name
- Number of users (1-5)

**Logic:**
- Creates email username variations based on full name patterns
- Combines usernames with domain to create full email addresses
- Patterns: First name only, first name + 1-4 letters from last name
- Copy functionality for generated emails
- Guidance on next steps for email setup

### 7. SPF Generator for Cold Email
**Purpose:** Create SPF records for email authentication.

**Inputs:**
- Domain
- Email Service Provider (Microsoft 365, Google Workspace, Amazon SES, etc.)
- Advanced options (mechanisms: mx, a, ptr; IP addresses)

**Logic:**
- Generates SPF DNS TXT record for domain protection
- Validates domain input
- Provides status information about generated record
- Instructions for publishing DNS record

### 8. Marketing Budget Calculator
**Purpose:** Plan and optimize marketing budget across different channels.

**Inputs:**
- General Information: Company name, currency, initial capital, launch date
- Business Model: ARPU, billing cycle, churn rate
- Paid Traffic: Starting budget, monthly budget increase, maximum budget, expected CAC, monthly CAC change, minimum CAC
- Organic Traffic: Kickoff date, launch traffic, monthly increase, maximum traffic, conversion rate
- Brand Awareness: Starting budget, monthly increase, maximum budget

**Logic:**
- Calculates LTV (Lifetime Customer Value) based on ARPU and churn rate
- Provides financial projections and monthly forecasts
- Calculates key metrics: Total Budget, Customer LTV, LTV:CAC Ratio, Monthly Growth
- Downloadable budget analysis as image

### 9. Sales Pipeline Calculator
**Purpose:** Analyze sales pipeline velocity and performance.

**Inputs:**
- Number of open deals
- Total value of open deals
- Number of won deals
- Number of lost deals
- Time period (30, 60, or 90 days)
- Industry (SaaS, Consulting, Enterprise)
- Deal complexity (Low, Medium, High)

**Logic:**
- Calculates pipeline velocity (average time to close deals)
- Calculates win rate (percentage of deals won)
- Calculates average deal value
- Compares performance to industry benchmarks
- Provides analysis and recommendations
- Downloadable pipeline analysis as image

### 10. Sales Compensation Calculator
**Purpose:** Design and analyze sales compensation plans.

**Inputs:**
- Role Configuration: Sales Role (SDR, BDR, AE, Enterprise), Territory Level (SMB, Mid-Market, Enterprise), Product Complexity (Low, Medium, High)
- Compensation Structure: Base Salary, Annual Quota, Commission Rate, Accelerator Threshold, Accelerator Rate

**Logic:**
- Calculates OTE (On-Target Earnings) = Base Salary + (Quota * Commission Rate)
- Calculates variable compensation and pay mix ratios
- Calculates accelerated earnings potential
- Provides quarterly quota distribution
- Downloadable compensation plan analysis as image

### 11. Sales Forecasting Calculator
**Purpose:** Forecast future sales revenue based on historical data and pipeline metrics.

**Inputs:**
- Current Period Sales
- Expected Monthly Growth Rate (%)
- Number of Opportunities
- Average Deal Size
- Closing Rate (%)

**Logic:**
- Calculates pipeline revenue (Opportunities * Deal Size * Closing Rate)
- Calculates growth forecast (Current Sales * (1 + Growth Rate))
- Provides pipeline metrics and growth analysis
- Downloadable forecast analysis as image

### 12. Email Signature Generator
**Purpose:** Create professional email signatures for cold email campaigns.

**Inputs:**
- Personal Details: Full Name, Job Title, Company, Email, Phone, Website
- Images: Profile Photo URL
- Design: Template Style (Modern, Minimal, Professional, Compact), Colors

**Logic:**
- Generates HTML code for email signatures based on selected template
- Customizable colors and design options
- Preview functionality
- Copy HTML and download as HTML file capabilities

### 13. Cold Email Deliverability Analyzer (Word Counter)
**Purpose:** Analyze cold email content for spam triggers, readability, and deliverability.

**Inputs:**
- Email content (pasted text)

**Logic:**
- Counts words, characters, and sentences
- Detects spam trigger words and provides alternatives
- Calculates spam score (0-100%)
- Calculates readability score using Flesch-Kincaid formula
- Calculates deliverability score (0-100) based on multiple factors
- Keyword density analysis
- Downloadable analysis report as image
