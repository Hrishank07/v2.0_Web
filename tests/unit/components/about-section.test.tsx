import React from 'react'
import { render, screen } from '@testing-library/react'
import { AboutSection } from '@/components/about-section'

describe('AboutSection', () => {
  it('renders the About Me heading', () => {
    render(<AboutSection />)
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
  })

  it('renders Key Highlights section', () => {
    render(<AboutSection />)
    expect(screen.getByRole('heading', { name: /key highlights/i })).toBeInTheDocument()
  })

  it('renders Core Competencies section', () => {
    render(<AboutSection />)
    expect(screen.getByRole('heading', { name: /core competencies/i })).toBeInTheDocument()
  })

  it('renders all four skill cards', () => {
    render(<AboutSection />)
    expect(screen.getByText('Cloud Architecture')).toBeInTheDocument()
    expect(screen.getByText('Full Stack Development')).toBeInTheDocument()
    expect(screen.getByText('AWS & Serverless')).toBeInTheDocument()
    expect(screen.getByText('AI Integration')).toBeInTheDocument()
  })

  it('does not contain raw "Im " without apostrophe (copy bug regression)', () => {
    const { container } = render(<AboutSection />)
    expect(container.textContent).not.toMatch(/\bIm [a-z]/)
  })

  it('mentions USC', () => {
    render(<AboutSection />)
    expect(screen.getAllByText(/USC/).length).toBeGreaterThan(0)
  })
})
