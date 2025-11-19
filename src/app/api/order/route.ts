import { NextRequest, NextResponse } from 'next/server'

interface OrderData {
  customerType: 'new' | 'existing'
  name: string
  companyName: string
  email: string
  phone?: string
  packageType: 'starter' | 'growth' | 'scale' | 'custom'
  customInboxes?: string
  domainProvider: 'porkbun' | 'godaddy' | 'namecheap' | 'other'
  domainStage: 'old' | 'new'
  address: string
}

// Package pricing information
const PACKAGES = {
  starter: { name: 'Starter', inboxes: 10, price: 30 },
  growth: { name: 'Growth', inboxes: 30, price: 84 },
  scale: { name: 'Scale', inboxes: 100, price: 250 },
}

// Calculate pricing based on package type
function calculatePricing(data: OrderData) {
  let monthlyPrice = 0
  let inboxCount = 0

  if (data.packageType === 'custom') {
    inboxCount = parseInt(data.customInboxes || '10')
    let pricePerMailbox: number

    if (inboxCount >= 100) {
      pricePerMailbox = 2.50
    } else if (inboxCount >= 30) {
      pricePerMailbox = 2.80
    } else {
      pricePerMailbox = 3.00
    }

    monthlyPrice = inboxCount * pricePerMailbox
  } else {
    const pkg = PACKAGES[data.packageType]
    monthlyPrice = pkg.price
    inboxCount = pkg.inboxes
  }

  const setupFee = data.customerType === 'existing' ? 0 : 24.99
  const totalDue = monthlyPrice + setupFee

  return { monthlyPrice, setupFee, totalDue, inboxCount }
}

// Create sleek HTML email template
function createEmailTemplate(data: OrderData, pricing: ReturnType<typeof calculatePricing>): string {
  const packageName = data.packageType === 'custom'
    ? 'Custom Package'
    : PACKAGES[data.packageType as keyof typeof PACKAGES].name

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Request - ColdInfra</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; line-height: 1.6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #28D27A 0%, #1fb768 100%); padding: 40px 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                🎉 New Order Request
              </h1>
              <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.95); font-size: 16px;">
                ColdInfra Order Management System
              </p>
            </td>
          </tr>

          <!-- Customer Type Badge -->
          <tr>
            <td style="padding: 30px 40px 20px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <span style="display: inline-block; padding: 8px 20px; background-color: ${data.customerType === 'new' ? '#3B82F6' : '#28D27A'}; color: #ffffff; border-radius: 20px; font-size: 14px; font-weight: 600;">
                  ${data.customerType === 'new' ? '🆕 New Customer' : '✅ Existing Customer'}
                </span>
              </div>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1e293b; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                📋 Contact Information
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Full Name</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Company</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${data.companyName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Email</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right; border-bottom: 1px solid #f1f5f9;">
                    <a href="mailto:${data.email}" style="color: #28D27A; font-size: 14px; font-weight: 600; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Phone</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right;">
                    <a href="tel:${data.phone}" style="color: #28D27A; font-size: 14px; font-weight: 600; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Package Details -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1e293b; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                📦 Package Details
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Package Type</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${packageName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Number of Inboxes</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600;">${pricing.inboxCount} inboxes</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Domain Provider</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600; text-transform: capitalize;">${data.domainProvider}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Domain Stage</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right;">
                    <span style="color: #1e293b; font-size: 14px; font-weight: 600; text-transform: capitalize;">${data.domainStage === 'new' ? 'New Domain' : 'Existing/Old Domain'}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Billing Address -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 15px; color: #1e293b; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                📍 Billing Address
              </h2>
              <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.8; white-space: pre-line; background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #28D27A;">
                ${data.address}
              </p>
            </td>
          </tr>

          <!-- Pricing Summary -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #1e293b; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
                💰 Pricing Summary
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 14px; font-weight: 500;">Monthly Recurring</span>
                  </td>
                  <td style="padding: 15px 20px; text-align: right; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #1e293b; font-size: 16px; font-weight: 700;">$${pricing.monthlyPrice.toFixed(2)}/mo</span>
                  </td>
                </tr>
                ${pricing.setupFee > 0 ? `
                <tr>
                  <td style="padding: 15px 20px; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #3B82F6; font-size: 14px; font-weight: 500;">One-Time Setup Fee</span>
                  </td>
                  <td style="padding: 15px 20px; text-align: right; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #3B82F6; font-size: 16px; font-weight: 700;">$${pricing.setupFee.toFixed(2)}</span>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 20px 20px;">
                    <span style="color: #1e293b; font-size: 16px; font-weight: 700;">Total Due Today</span>
                  </td>
                  <td style="padding: 20px 20px; text-align: right;">
                    <span style="color: #28D27A; font-size: 24px; font-weight: 800;">$${pricing.totalDue.toFixed(2)}</span>
                  </td>
                </tr>
              </table>
              ${data.customerType === 'existing' ? `
              <div style="margin-top: 15px; padding: 12px; background-color: #DCFCE7; border-radius: 8px; text-align: center;">
                <span style="color: #166534; font-size: 14px; font-weight: 600;">✨ No setup fee for existing customers!</span>
              </div>
              ` : ''}
            </td>
          </tr>

          <!-- Action Required -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <div style="background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); padding: 20px; border-radius: 12px; border-left: 4px solid #F59E0B;">
                <p style="margin: 0 0 10px; color: #92400E; font-size: 16px; font-weight: 700;">
                  ⚡ Action Required
                </p>
                <p style="margin: 0; color: #92400E; font-size: 14px; line-height: 1.6;">
                  Please review this order request and respond to <strong>${data.email}</strong> within 24 hours with a custom quote.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px 40px; text-align: center; border-radius: 0 0 16px 16px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px; color: #64748b; font-size: 13px;">
                This email was generated automatically from the ColdInfra order request system.
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                © ${new Date().getFullYear()} ColdInfra. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export async function POST(request: NextRequest) {
  try {
    const data: OrderData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.companyName || !data.packageType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate pricing
    const pricing = calculatePricing(data)

    // Create email HTML
    const emailHtml = createEmailTemplate(data, pricing)

    // Send email via EmailIt API
    const emailitApiKey = process.env.EMAILIT_API_KEY
    const adminEmail = process.env.ADMIN_EMAIL || 'coldinfra@gmail.com'

    if (!emailitApiKey) {
      console.error('EMAILIT_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const emailPayload = {
      from: `ColdInfra Orders <orders@coldinfra.com>`,
      to: adminEmail,
      reply_to: data.email,
      subject: `🎉 New Order Request from ${data.companyName} - $${pricing.totalDue.toFixed(2)}`,
      html: emailHtml,
    }

    console.log('Sending email to EmailIt API...')
    console.log('Payload:', { ...emailPayload, html: '[HTML content]' })

    const response = await fetch('https://api.emailit.com/v1/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${emailitApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    })

    console.log('EmailIt API response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('EmailIt API error response:', errorData)
      return NextResponse.json(
        { error: 'Failed to send email', details: errorData },
        { status: response.status }
      )
    }

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: 'Order request sent successfully',
      data: result,
    })
  } catch (error) {
    console.error('Order submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
