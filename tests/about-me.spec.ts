import { test, expect } from '@playwright/test';

test.describe("Test about-me page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:3000/de/ueber-mich")
  })


  test("should have heading", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Hey!' })).toBeVisible();
  })

  test("should have about me image", async ({ page }) => {
    await expect(page.getByRole('img', { name: 'about me' })).toBeVisible();
  })

  test("should have about me text", async ({ page }) => {
    await expect(page.getByText('Eine leidenschaftliche')).toBeVisible();

  })
})
