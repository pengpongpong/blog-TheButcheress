import { test, expect } from '@playwright/test';

test.describe("Cookie banner", () => {
    test.beforeEach(async ({ page }, testInfo) => {
      console.log(`Testing ${testInfo}`)
  
      await page.goto("http://localhost:3000/de/")
    })
  
    test("should display cookie settings modal", async ({ page }) => {
      await page.getByRole('button', { name: 'Einstellungen' }).click();
  
      await expect(page.getByRole('heading', { name: 'Cookie Einstellung' })).toBeVisible();
      await expect(page.getByLabel('Funktionale Cookies')).toBeVisible();
      await expect(page.getByLabel('Analyse Cookies')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Akzeptieren' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Speicher Einstellungen' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Ablehnen' })).toBeVisible();
  
      await page.goto('http://localhost:3000/en');
  
      await page.getByRole('button', { name: 'Settings' }).click();
  
      await expect(page.getByRole('heading', { name: 'Cookie Preference' })).toBeVisible();
  
      await expect(page.getByLabel('Functional cookies')).toBeVisible();
      await expect(page.getByLabel('Analytics cookies')).toBeVisible();
  
      await expect(page.getByRole('button', { name: 'Accept' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Save Settings' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Deny' })).toBeVisible();
    })
  
    test("should display cookie banner", async ({ page }) => {
      await expect(page.getByText('DatenschutzCookies verbessern')).toBeVisible();
  
      await expect(page.getByRole('button', { name: 'Ablehnen' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Einstellungen' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Akzeptieren' })).toBeVisible();
  
      await expect(page.getByRole('link', { name: 'Datenschutz' })).toHaveCount(2);
  
      await page.goto('http://localhost:3000/en');
  
      await expect(page.getByText('Privacy policyCookies enhance')).toBeVisible();
  
      await expect(page.getByRole('button', { name: 'Accept' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Settings' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Deny' })).toBeVisible();
  
      await expect(page.getByRole('link', { name: 'Privacy policy', exact: true })).toBeVisible();
    })
  })