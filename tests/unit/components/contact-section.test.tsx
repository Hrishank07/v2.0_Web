import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactSection } from '@/components/contact-section'

describe('ContactSection', () => {
  it('renders all form fields', () => {
    render(<ContactSection />)
    expect(screen.getByPlaceholderText('"Your Name"')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('"your@email.com"')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('"Your message here..."')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<ContactSection />)
    expect(screen.getByRole('button', { name: /execute send command/i })).toBeInTheDocument()
  })

  it('renders social links for linkedin, github, email', () => {
    render(<ContactSection />)
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /email/i })).toBeInTheDocument()
  })

  it('calls fetch on valid form submission', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    })
    render(<ContactSection />)
    fireEvent.change(screen.getByPlaceholderText('"Your Name"'), { target: { value: 'Alice' } })
    fireEvent.change(screen.getByPlaceholderText('"your@email.com"'), { target: { value: 'alice@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('"Your message here..."'), { target: { value: 'Hello!' } })
    fireEvent.submit(screen.getByRole('button', { name: /execute send command/i }).closest('form')!)
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }))
    )
  })

  it('shows error output when fetch returns non-ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Failed to send message' }),
    })
    render(<ContactSection />)
    fireEvent.change(screen.getByPlaceholderText('"Your Name"'), { target: { value: 'Alice' } })
    fireEvent.change(screen.getByPlaceholderText('"your@email.com"'), { target: { value: 'alice@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('"Your message here..."'), { target: { value: 'Hello!' } })
    fireEvent.submit(screen.getByRole('button', { name: /execute send command/i }).closest('form')!)
    // commandOutput is populated asynchronously with setTimeout delays; use findBy with generous timeout
    await expect(screen.findByText(/failed to send message/i, {}, { timeout: 8000 })).resolves.toBeInTheDocument()
  })
})
