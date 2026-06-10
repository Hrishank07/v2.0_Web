/**
 * @jest-environment node
 *
 * Unit tests for /api/contact route.
 * Uses Node environment so NextRequest (Web Fetch API) is available.
 * Resend is mocked — no real emails are sent.
 */
import { NextRequest } from 'next/server'

const mockSend = jest.fn()
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockSend },
  })),
}))

const getRoute = () => import('@/app/api/contact/route').then(m => m.POST)

function makeRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  mockSend.mockReset()
  mockSend.mockResolvedValue({ id: 'mock-id' })
})

describe('POST /api/contact', () => {
  it('returns 400 when name is missing', async () => {
    const POST = await getRoute()
    const res = await POST(makeRequest({ email: 'a@b.com', message: 'hello' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toMatch(/required/i)
  })

  it('returns 400 when email is missing', async () => {
    const POST = await getRoute()
    const res = await POST(makeRequest({ name: 'Alice', message: 'hello' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when message is missing', async () => {
    const POST = await getRoute()
    const res = await POST(makeRequest({ name: 'Alice', email: 'a@b.com' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for invalid email format', async () => {
    const POST = await getRoute()
    const res = await POST(makeRequest({ name: 'Alice', email: 'not-an-email', message: 'hi' }))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toMatch(/email/i)
  })

  it('returns 200 on successful submission', async () => {
    const POST = await getRoute()
    const res = await POST(makeRequest({ name: 'Alice', email: 'a@b.com', message: 'Hello!' }))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
  })

  it('calls resend.emails.send with correct recipient', async () => {
    const POST = await getRoute()
    await POST(makeRequest({ name: 'Alice', email: 'a@b.com', message: 'Hello!' }))
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'hchhatba@usc.edu' })
    )
  })

  it('returns 500 when email sending throws', async () => {
    mockSend.mockRejectedValue(new Error('Resend API error'))
    const POST = await getRoute()
    const res = await POST(makeRequest({ name: 'Alice', email: 'a@b.com', message: 'Hello!' }))
    expect(res.status).toBe(500)
  })

  it('escapes HTML tags in name field before sending email', async () => {
    const POST = await getRoute()
    await POST(makeRequest({
      name: '<script>alert(1)</script>',
      email: 'a@b.com',
      message: 'Hello',
    }))
    const sentHtml: string = mockSend.mock.calls[0][0].html
    expect(sentHtml).not.toContain('<script>')
    expect(sentHtml).toContain('&lt;script&gt;')
  })

  it('escapes HTML tags in message field before sending email', async () => {
    const POST = await getRoute()
    await POST(makeRequest({
      name: 'Alice',
      email: 'a@b.com',
      message: '<img src=x onerror=alert(1)>',
    }))
    const sentHtml: string = mockSend.mock.calls[0][0].html
    expect(sentHtml).not.toContain('<img')
    expect(sentHtml).toContain('&lt;img')
  })
})
