import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '@/components/theme-toggle'

const mockSetTheme = jest.fn()

jest.mock('next-themes', () => ({
    useTheme: () => ({ theme: 'light', setTheme: mockSetTheme }),
}))

describe('ThemeToggle', () => {
    beforeEach(() => mockSetTheme.mockClear())

    it('renders toggle button', () => {
        render(<ThemeToggle />)
        expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument()
    })

    it('switches to dark when current theme is light', () => {
        render(<ThemeToggle />)
        fireEvent.click(screen.getByLabelText('Toggle theme'))
        expect(mockSetTheme).toHaveBeenCalledWith('dark')
    })
})