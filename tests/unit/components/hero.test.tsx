import React from 'react'
import { render, screen } from '@testing-library/react'
import { HeroSection } from '@/components/hero'

jest.mock('next-themes', () => ({ useTheme: () => ({ theme: 'dark' }) }))

jest.mock('@/components/hero/floating-card', () => ({
  FloatingCard: () => React.createElement('div', { 'data-testid': 'floating-card' }),
}))

jest.mock('@/components/hero/decrypt-button', () => ({
  DecryptButton: () => React.createElement('button', null, 'Decrypt Your Access'),
}))

describe('HeroSection', () => {
  it('renders the dev tag markup', () => {
    render(<HeroSection />)
    expect(screen.getByText('<dev>')).toBeInTheDocument()
  })

  it('renders the role subtitle', () => {
    render(<HeroSection />)
    expect(screen.getByText(/Software Engineer & Cloud Architect/i)).toBeInTheDocument()
  })

  it('renders the Learn More CTA link pointing to #about', () => {
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute('href', '#about')
  })

  it('renders the Decrypt button', () => {
    render(<HeroSection />)
    expect(screen.getByRole('button', { name: /decrypt/i })).toBeInTheDocument()
  })

  it('renders GPA stat values', () => {
    render(<HeroSection />)
    expect(screen.getByText('3.97')).toBeInTheDocument()
    expect(screen.getByText('3.9')).toBeInTheDocument()
  })
})
