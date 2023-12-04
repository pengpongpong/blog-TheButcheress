import { test, expect } from '@playwright/test';


test.describe("Test recipes page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:3000/de/rezepte")
  })

  test("should have heading", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Rezepte' })).toBeVisible();
  })

  test("should have project card", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Klassischer Selbstgemachter' })).toBeVisible();
  })
})

test.describe("Test recipe content page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:3000/de/rezepte/klassischer-selbstgemachter-burger")
  })

  test("should have sharing bar", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Share PDF' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Share by email' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Share on Facebook' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Share on Twitter' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Share on Whatsapp' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Share on Telegram' })).toBeVisible();
  })

  test("should display recipe info", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Klassischer Selbstgemachter' })).toBeVisible();
    await expect(page.getByText('Vorbereitung')).toBeVisible();
    await expect(page.getByText('Gesamt')).toBeVisible();
    await expect(page.getByText('Portionen', { exact: true })).toBeVisible();

    await expect(page.getByRole('img', { name: 'Klassischer Selbstgemachter' })).toBeVisible();
  })

  test("should have ingredient list", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Zutaten' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'BURGER', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: '4' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Burgerbrötchen' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '450 g' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Rinderhackfleisch (80% mager)' })).toBeVisible();
  })

  test("should display instruction", async ({ page }) => {
    await expect(page.locator('svg').filter({ hasText: '1' }).locator('circle')).toBeVisible();
    await expect(page.getByText('1Burger-Patties vorbereitenIn')).toBeVisible();
    await expect(page.getByText('Burger-Patties vorbereiten')).toBeVisible();
    await expect(page.getByText('In einer großen Schüssel 450')).toBeVisible();
  })

  test("should display image in instruction", async ({ page }) => {
    await expect(page.locator('div').filter({ hasText: '7Servieren und Genieß' }).getByRole('img')).toBeVisible();
  })

  test("should display tip", async ({ page }) => {
    await expect(page.getByText('Nach deinem Geschmack anpassenDu kannst deine Burger nach Belieben anpassen,')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Nach deinem Geschmack anpassen' })).toBeVisible();
    await expect(page.getByText('Du kannst deine Burger nach')).toBeVisible();
  })

  test("should have hashtag links", async ({ page }) => {
    await expect(page.locator('li').filter({ hasText: '#Mittagessen' })).toBeVisible();
    await expect(page.locator('li').filter({ hasText: '#Abendessen' })).toBeVisible();
    await expect(page.locator('li').filter({ hasText: '#Grillen' })).toBeVisible();
    await expect(page.locator('li').filter({ hasText: '#Rind' })).toBeVisible();
  })
})
