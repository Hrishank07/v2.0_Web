import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/#contact') })

  test('form fields are visible', async ({ page }) => {
    await expect(page.getByPlaceholder('"Your Name"')).toBeVisible()
    await expect(page.getByPlaceholder('"your@email.com"')).toBeVisible()
    await expect(page.getByPlaceholder('"Your message here..."')).toBeVisible()
  })

  test('shows processing state during submission', async ({ page }) => {
    await page.route('/api/contact', async route => {
      await new Promise(r => setTimeout(r, 500))
      await route.fulfill({ json: { success: true }, status: 200 })
    })
    await page.getByPlaceholder('"Your Name"').fill('Test User')
    await page.getByPlaceholder('"your@email.com"').fill('test@example.com')
    await page.getByPlaceholder('"Your message here..."').fill('Hello from Playwright!')
    await page.getByRole('button', { name: /execute send command/i }).click()
    await expect(page.getByText(/processing/i)).toBeVisible()
  })

  test('shows success state after successful submission', async ({ page }) => {
    await page.route('/api/contact', route =>
      route.fulfill({ json: { success: true }, status: 200 })
    )
    await page.getByPlaceholder('"Your Name"').fill('Test User')
    await page.getByPlaceholder('"your@email.com"').fill('test@example.com')
    await page.getByPlaceholder('"Your message here..."').fill('Hello from Playwright!')
    await page.getByRole('button', { name: /execute send command/i }).click()
    await expect(page.getByText(/message delivered successfully/i)).toBeVisible({ timeout: 10_000 })
  })

  test('shows error output on API failure', async ({ page }) => {
    await page.route('/api/contact', route =>
      route.fulfill({ json: { error: 'Failed to send message' }, status: 500 })
    )
    await page.getByPlaceholder('"Your Name"').fill('Test User')
    await page.getByPlaceholder('"your@email.com"').fill('test@example.com')
    await page.getByPlaceholder('"Your message here..."').fill('Hello from Playwright!')
    await page.getByRole('button', { name: /execute send command/i }).click()
    await expect(page.getByText(/failed to send message/i)).toBeVisible({ timeout: 10_000 })
  })
})
