import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => { await page.goto('/') })

  test('page title contains name', async ({ page }) => {
    await expect(page).toHaveTitle(/Hrishank Chhatbar/i)
  })

  test('clicking About link scrolls to #about section', async ({ page }) => {
    await page.getByRole('link', { name: /about/i }).first().click()
    await expect(page.locator('#about')).toBeInViewport()
  })

  test('clicking Projects link scrolls to #projects section', async ({ page }) => {
    await page.getByRole('link', { name: /projects/i }).first().click()
    await expect(page.locator('#projects')).toBeInViewport()
  })

  test('clicking Contact link scrolls to #contact section', async ({ page }) => {
    await page.getByRole('link', { name: /contact/i }).first().click()
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('footer is present', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(page.locator('footer')).toBeVisible()
  })
})
