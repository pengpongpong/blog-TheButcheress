import { test, expect } from '@playwright/test';

test.describe("Test landing page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:3000/de")
  })

  test("should have navbar", async ({ page }) => {
    await expect(page.getByText('DE/ENTheButcheress_HomeRezeptRezeptkategorieFood for FiftyNach MahlzeitFrühstü')).toBeVisible();

    await page.getByRole('link', { name: 'DE/EN' }).click();

    await expect(page.getByText('DE/ENTheButcheress_HomeRecipeRecipe categoryFood for FiftyBy')).toBeVisible();
  })

  test("should have social bar in navbar", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'search icon' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'instagram icon' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'youtube icon' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'tiktok icon' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'twitter icon' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'facebook icon' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'twitch icon' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'DE/EN' })).toBeVisible();

    await page.getByRole('link', { name: 'DE/EN' }).click();

    await expect(page.getByRole('link', { name: 'search icon' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'instagram icon' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'youtube icon' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'tiktok icon' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'twitter icon' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'facebook icon' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'twitch icon' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'DE/EN' })).toBeVisible();
  })

  test("should have swiper iamge", async ({ page }) => {
    await expect(page.locator('.swiper-slide > img').first()).toBeVisible();
  })

  test("should have about-me, recipes and travel links", async ({ page }) => {
    await expect(page.getByRole('main').getByRole('link', { name: 'Über mich' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Alle Rezepte' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Alle Reisen' })).toBeVisible();

    await page.getByRole('link', { name: 'DE/EN' }).click();

    await expect(page.getByRole('main').getByRole('link', { name: 'About me' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'All recipes' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'All travels' })).toBeVisible();
  })

  test("should have footer", async ({ page }) => {
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Über mich' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Kontakt' })).toBeVisible();
    // await expect(page.getByRole('link', { name: 'Datenschutz' })).toBeVisible();

    await page.getByRole('link', { name: 'DE/EN' }).click();

    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'About me' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Contact' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toHaveCount(2);
  })

  test("should have social bar footer", async ({ page }) => {
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'instagram icon' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'youtube icon' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'tiktok icon' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'twitter icon' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'facebook icon' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'twitch icon' })).toBeVisible();

    await page.getByRole('link', { name: 'DE/EN' }).click();

    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'instagram icon' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'youtube icon' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'tiktok icon' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'twitter icon' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'facebook icon' })).toBeVisible();
    await expect(page.getByRole('contentinfo').getByRole('link', { name: 'twitch icon' })).toBeVisible();
  })
})

