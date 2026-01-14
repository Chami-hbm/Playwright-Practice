import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage'; 

test('homepage search using POM', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();

  await home.search('Locators');

  await expect(page.getByRole('heading', { name: 'Locators', exact: true })).toBeVisible();

  // await expect(page).toHaveTitle(/Playwright/);
  // await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  // await page.getByRole('link', { name: 'Get started' }).click();
  // await page.getByRole('searchbox', { name: 'Search' }).fill('Locators'); 

});

