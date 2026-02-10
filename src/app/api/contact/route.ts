import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const resend = new Resend(RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Log the contact form submission
    console.log('=== CONTACT FORM SUBMISSION ===')
    console.log(`Name: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Message: ${message}`)
    console.log(`Timestamp: ${new Date().toISOString()}`)
    console.log('================================')

    // Send email using Resend
    try {
      const emailData = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>', // Use this for testing, or your verified domain
        to: 'hchhatba@usc.edu',
        subject: `Portfolio Contact: ${name}`,
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
            <h2>🚀 New Contact Form Submission</h2>
            <div class="container">
              <div class="field">
                <span class="label">From:</span>
                <span class="value">${name} &lt;${email}&gt;</span>
              </div>
              <div class="field">
                <span class="label">Date:</span>
                <span class="value">${new Date().toLocaleString()}</span>
              </div>
            </div>
            <div class="message">
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="footer">
              <p>This message was sent from your portfolio website contact form.</p>
            </div>
          </body>
          </html>
        `,
      })

      console.log('Email sent successfully:', emailData)
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the whole request if email fails, just log it
      console.warn('Email sending failed, but submission was logged')
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
