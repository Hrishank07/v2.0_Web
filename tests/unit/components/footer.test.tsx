import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/footer'

describe('Footer', () => {
    it('renders copyright text', () => {
        render(<Footer />)
        expect(screen.getByText(/Hrishank Chhatbar/)).toBeInTheDocument()
    })

    it('renders footer element', () => {
        const { container } = render(<Footer />)
        expect(container.querySelector('footer')).toBeInTheDocument()
    })
})