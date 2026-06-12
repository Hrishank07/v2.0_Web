import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const { error: sendError } = await getResend().emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'hchhatba@usc.edu',
      subject: `Portfolio Contact: ${escapeHtml(name)}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #8fa392; }
            .container { background: #f8f9fa; padding: 20px; border-radius: 8px; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; color: #2c3e50; }
            .value { margin-left: 10px; }
            .message { background: white; padding: 15px; border-left: 4px solid #8fa392; margin-top: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <h2>New Contact Form Submission</h2>
          <div class="container">
            <div class="field">
              <span class="label">From:</span>
              <span class="value">${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</span>
            </div>
            <div class="field">
              <span class="label">Date:</span>
              <span class="value">${new Date().toLocaleString()}</span>
            </div>
          </div>
          <div class="message">
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
          </div>
          <div class="footer">
            <p>This message was sent from your portfolio website contact form.</p>
          </div>
        </body>
        </html>
      `,
    })

    // Resend's SDK does not throw on API errors — it returns { data, error }
    if (sendError) {
      console.error('Resend send error:', sendError)
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
