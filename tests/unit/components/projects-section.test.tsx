import React from 'react'
import { render, screen } from '@testing-library/react'
import { ProjectsSection } from '@/components/projects-section'

describe('ProjectsSection', () => {
  it('renders the Featured Projects heading', () => {
    render(<ProjectsSection />)
    expect(screen.getByRole('heading', { name: /featured projects/i })).toBeInTheDocument()
  })

  it('renders all three project titles', () => {
    render(<ProjectsSection />)
    expect(screen.getByText(/Hybrid Semantic Acceleration Layer/i)).toBeInTheDocument()
    expect(screen.getByText(/AI-Powered Document Q&A/i)).toBeInTheDocument()
    expect(screen.getByText(/Distributed Key-Value Store/i)).toBeInTheDocument()
  })

  it('each project card links to GitHub', () => {
    render(<ProjectsSection />)
    const githubLinks = screen.getAllByRole('link').filter(
      l => l.getAttribute('href')?.includes('github.com/Hrishank07')
    )
    expect(githubLinks.length).toBe(3)
  })

  it('all GitHub links open in a new tab with noopener', () => {
    render(<ProjectsSection />)
    screen.getAllByRole('link')
      .filter(l => l.getAttribute('href')?.includes('github.com'))
      .forEach(link => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
  })
})
