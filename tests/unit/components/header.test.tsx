import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '@/components/header'

jest.mock('@/components/theme-toggle', () => ({
    ThemeToggle: () => <button aria-label="Toggle theme" />,
}))

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
        <a href={href} {...props}>{children}</a>
    ),
}))

describe('Header', () => {
    it('renders the logo', () => {
        render(<Header />)
        expect(screen.getByText('Hrishank')).toBeInTheDocument()
    })

    it('renders all nav links', () => {
        render(<Header />)
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('About')).toBeInTheDocument()
        expect(screen.getByText('Projects')).toBeInTheDocument()
        expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('renders mobile menu toggle button', () => {
        render(<Header />)
        expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
    })

    it('opens mobile menu when toggle is clicked', () => {
        render(<Header />)
        fireEvent.click(screen.getByLabelText('Toggle menu'))
        const mobileLinks = screen.getAllByText('Home')
        expect(mobileLinks.length).toBeGreaterThan(1)
    })

    it('closes mobile menu when a nav link is clicked', () => {
        render(<Header />)
        fireEvent.click(screen.getByLabelText('Toggle menu'))
        const mobileLinks = screen.getAllByText('Home')
        fireEvent.click(mobileLinks[mobileLinks.length - 1])
        expect(screen.getAllByText('Home').length).toBe(1)
    })
})