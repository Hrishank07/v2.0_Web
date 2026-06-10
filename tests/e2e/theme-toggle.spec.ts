import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/') })

  test('theme toggle button is present in header', async ({ page }) => {
    await expect(page.getByRole('button', { name: /toggle theme/i })).toBeVisible()
  })

  test('clicking toggle changes the html class', async ({ page }) => {
    const html = page.locator('html')
    const before = await html.getAttribute('class')
    await page.getByRole('button', { name: /toggle theme/i }).click()
    await page.waitForTimeout(200)
    const after = await html.getAttribute('class')
    expect(after).not.toBe(before)
  })
})
