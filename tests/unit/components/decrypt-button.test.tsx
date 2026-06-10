import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { DecryptButton } from '@/components/hero/decrypt-button'

describe('DecryptButton', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('renders the initial decrypt button', () => {
    render(<DecryptButton />)
    expect(screen.getByRole('button', { name: /decrypt your access/i })).toBeInTheDocument()
  })

  it('transitions to decrypting state on click', async () => {
    render(<DecryptButton />)
    fireEvent.click(screen.getByRole('button', { name: /decrypt your access/i }))
    await waitFor(() =>
      expect(screen.getByText(/initializing/i)).toBeInTheDocument()
    )
  })
})
