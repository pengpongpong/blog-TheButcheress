import { test, expect } from '@playwright/test';


test.describe("Test blogs page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:3000/de/blog")
  })


  test("should have heading", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
  })
  test("should have project link", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Die Kunst des Selbstgemachten' })).toBeVisible();
  })
})

test.describe("Test blog content page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:3000/de/blog/die-kunst-des-selbstgemachten-burgers-ein-kulinarisches-abenteuer")
  })

  test("should have heading", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Die Kunst des Selbstgemachten Burgers: Ein Kulinarisches Abenteuer' })).toBeVisible();
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

  test("should have clog info", async ({ page }) => {
    await expect(page.getByText('Von Blogger')).toBeVisible();
    await expect(page.getByText('Veröffentlicht am')).toBeVisible();
  })

  test("should have blog heading", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Einleitung' })).toBeVisible();
  })
  test("should have intern recipe link in blog post", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'selbstgemachten Burgern' })).toBeVisible();
  })

  test("should have hashtag links", async ({ page }) => {
    await expect(page.locator('li').filter({ hasText: '#Mittagessen' })).toBeVisible();
    await expect(page.locator('li').filter({ hasText: '#Brunch' })).toBeVisible();
    await expect(page.locator('li').filter({ hasText: '#Grillen' })).toBeVisible();
    await expect(page.locator('li').filter({ hasText: '#Rind' })).toBeVisible();
    await expect(page.locator('li').filter({ hasText: '#Kochen' })).toBeVisible();
  });
})

