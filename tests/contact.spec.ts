import { test, expect } from '@playwright/test';

test.describe("Test contact page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:3000/de/kontakt")
  })

  test("should have heading", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Kontaktiere mich!' })).toBeVisible();
  })

  test("should have contact form", async ({ page }) => {
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByRole('group').locator('input[name="email"]')).toBeVisible();
    await expect(page.getByLabel('Nachricht')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Abschicken' })).toBeVisible();  
  })

  test("should display success message on form submit", async ({ page }) => {
    await page.getByLabel('Name').click();
    await page.getByLabel('Name').fill('playwright test');
    await page.getByLabel('Name').press('Tab');
    await page.getByRole('group').locator('input[name="email"]').fill('playwright@test.com');
    await page.getByRole('group').locator('input[name="email"]').press('Tab');
    await page.getByLabel('Nachricht').fill('test');
    await page.getByRole('button', { name: 'Abschicken' }).click();
    await expect(page.getByText('Erfolgreich übermittelt!')).toBeVisible();  
  })

  test("should show form error message", async ({ page }) => {
    await page.getByRole('button', { name: 'Abschicken' }).click();
    await expect(page.getByText('Bitte Name eingeben')).toBeVisible();
    await expect(page.getByText('Bitte gültige Email eingeben')).toBeVisible();
    await expect(page.getByText('Bitte hinterlasse mir eine')).toBeVisible();
  })
})

test.describe("Test contact page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:3000/en/kontakt")
  })

  test("should have heading EN", async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Contact me!' })).toBeVisible();
  });

  test("should show contact form errors", async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Please enter name')).toBeVisible();
    await expect(page.getByText('Please enter valid email')).toBeVisible();
    await expect(page.getByText('Please enter a message')).toBeVisible();
  })

  test("should have contact form EN", async ({ page }) => {
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  })
})

