import { test, expect } from '@playwright/test';


test.describe("Test travels page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:3000/de/reisen")
  })

  test("should have heading", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Reisen' })).toBeVisible();
  })

  test("should have project card link", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Wanderlust Entfesselt: Die' })).toBeVisible();
  })
})

test.describe("Test travel content page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:3000/de/reisen/wanderlust-entfesselt-die-transformative-kraft-des-reisens")
  })

  test("should have heading", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Wanderlust Entfesselt: Die' })).toBeVisible();
  })

  test("should have blog image", async ({ page }) => {
    await expect(page.getByRole('img', { name: 'Blog image' })).toBeVisible();
  })

  test("should have share bar", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Share by email' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Share on Facebook' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Share on Twitter' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Share on Whatsapp' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Share on Telegram' })).toBeVisible();
  })

  test("should have blog info", async ({ page }) => {
    await expect(page.getByText('Von Blogger')).toBeVisible();
    await expect(page.getByText('Veröffentlicht am')).toBeVisible();
  })

  test("should have blog content heading and text", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Einleitung' })).toBeVisible();
    await expect(page.getByText('Reisen in all ihren Formen')).toBeVisible();
  })

  test("should have hashtag links", async ({ page }) => {
    await expect(page.locator('li').filter({ hasText: '#Japan' })).toBeVisible();
    await expect(page.locator('li').filter({ hasText: '#Vietnam' })).toBeVisible();
    await expect(page.locator('li').filter({ hasText: '#Österreich' })).toBeVisible();
  })
})