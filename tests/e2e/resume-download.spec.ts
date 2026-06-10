import { test, expect } from '@playwright/test'

test.describe('Resume Download (Decrypt Button)', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/') })

  test('decrypt button is visible on load', async ({ page }) => {
    await expect(page.getByRole('button', { name: /decrypt your access/i })).toBeVisible()
  })

  test('clicking decrypt starts progress animation', async ({ page }) => {
    await page.getByRole('button', { name: /decrypt your access/i }).click()
    await expect(page.getByText(/initializing/i)).toBeVisible({ timeout: 2000 })
  })

  test('download link appears after decryption and points to resume.pdf', async ({ page }) => {
    await page.getByRole('button', { name: /decrypt your access/i }).click()
    const link = page.getByRole('link', { name: /access granted/i })
    await expect(link).toBeVisible({ timeout: 8000 })
    await expect(link).toHaveAttribute('href', '/resume.pdf')
  })
})
