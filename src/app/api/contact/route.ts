import { NextRequest, NextResponse } from 'next/server'

interface ContactData {
  name: string
  email: string
  subject: string
  message: string
}

function createEmailTemplate(data: ContactData): string {
  const subjectBadges: { [key: string]: { color: string; label: string } } = {
    sales: { color: '#10b981', label: 'Sales Inquiry' },
    support: { color: '#3b82f6', label: 'Technical Support' },
    billing: { color: '#f59e0b', label: 'Billing Question' },
    partnership: { color: '#8b5cf6', label: 'Partnership' },
    other: { color: '#6b7280', label: 'Other' }
  }

  const subjectInfo = subjectBadges[data.subject] || subjectBadges.other
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
  })

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message - ColdInfra</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc; line-height: 1.6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc;">
          <tr>
            <td style="padding: 40px 20px;">
              <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">

                <!-- Header with Gradient -->
                <tr>
                  <td style="background: linear-gradient(135deg, #0a3d35 0%, #10b981 100%); padding: 32px 24px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                      📬 New Contact Message
                    </h1>
                    <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                      ${timestamp}
                    </p>
                  </td>
                </tr>

                <!-- Subject Badge -->
                <tr>
                  <td style="padding: 24px 24px 0 24px;">
                    <div style="display: inline-block; background-color: ${subjectInfo.color}20; border: 2px solid ${subjectInfo.color}40; border-radius: 12px; padding: 10px 20px;">
                      <span style="color: ${subjectInfo.color}; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                        ${subjectInfo.label}
                      </span>
                    </div>
                  </td>
                </tr>

                <!-- Contact Information -->
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 16px; background-color: #f8fafc; border-radius: 12px;">
                          <table role="presentation" style="width: 100%;">
                            <tr>
                              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                                <strong style="color: #475569; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Name</strong>
                                <p style="margin: 4px 0 0 0; color: #0f172a; font-size: 16px; font-weight: 500;">${data.name}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <strong style="color: #475569; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                                <p style="margin: 4px 0 0 0;">
                                  <a href="mailto:${data.email}" style="color: #10b981; font-size: 16px; font-weight: 500; text-decoration: none;">
                                    ${data.email}
                                  </a>
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message Content -->
                <tr>
                  <td style="padding: 0 24px 24px 24px;">
                    <div style="background-color: #f8fafc; border-left: 4px solid #10b981; border-radius: 8px; padding: 20px;">
                      <strong style="color: #475569; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 12px;">Message</strong>
                      <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
                    </div>
                  </td>
                </tr>

                <!-- Quick Reply Button -->
                <tr>
                  <td style="padding: 0 24px 32px 24px; text-align: center;">
                    <a href="mailto:${data.email}?subject=Re: ${subjectInfo.label}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);">
                      📧 Reply to ${data.name.split(' ')[0]}
                    </a>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px;">
                      <strong style="color: #0a3d35; font-weight: 600;">COLDINFRA</strong> Contact Management
                    </p>
                    <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                      This message was sent via coldinfra.com contact form
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const emailHtml = createEmailTemplate(data)

    const emailitApiKey = process.env.EMAILIT_API_KEY
    const adminEmail = process.env.ADMIN_EMAIL || 'coldinfra@gmail.com'

    if (!emailitApiKey) {
      console.error('EMAILIT_API_KEY not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const subjectLabels: { [key: string]: string } = {
      sales: 'Sales Inquiry',
      support: 'Technical Support',
      billing: 'Billing Question',
      partnership: 'Partnership Opportunity',
      other: 'General Inquiry'
    }

    const subjectLabel = subjectLabels[data.subject] || 'Contact Form'

    const emailPayload = {
      from: `ColdInfra Contact <contact@coldinfra.com>`,
      to: adminEmail,
      reply_to: data.email,
      subject: `📬 ${subjectLabel} from ${data.name}`,
      html: emailHtml,
    }

    console.log('Sending contact email to EmailIt API...')
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
      message: 'Contact message sent successfully',
      data: result,
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
