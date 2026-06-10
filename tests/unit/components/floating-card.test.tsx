import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { FloatingCard } from '@/components/hero/floating-card'
import { Cloud } from 'lucide-react'
import type { FloatingCardData } from '@/components/hero/types'

jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', systemTheme: 'dark' }),
}))

const mockCard: FloatingCardData = {
  icon: Cloud,
  title: 'Cloud Architecture',
  description: 'Scalable, fault-tolerant systems',
  stat: '99.9%',
  statLabel: 'Uptime',
  progress: 95,
  color: 'from-green-400 to-green-600',
  bgColor: 'from-green-400/15 to-green-600/15',
}

describe('FloatingCard', () => {
  it('renders the card title after mount', async () => {
    await act(async () => { render(<FloatingCard card={mockCard} style={{}} delay={0} />) })
    expect(screen.getByText('Cloud Architecture')).toBeInTheDocument()
  })

  it('renders the stat value', async () => {
    await act(async () => { render(<FloatingCard card={mockCard} style={{}} delay={0} />) })
    expect(screen.getByText('99.9%')).toBeInTheDocument()
  })

  it('renders the stat label', async () => {
    await act(async () => { render(<FloatingCard card={mockCard} style={{}} delay={0} />) })
    expect(screen.getByText('Uptime')).toBeInTheDocument()
  })
})
