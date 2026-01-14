import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly searchBox: Locator;
  readonly button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.button = page.getByRole('button', { name: 'Search (Ctrl+K)' });
    this.searchBox = page.getByRole('searchbox', { name: 'Search' });
  }
  
    async goto() {
    await this.page.goto('/');
  }
    async search(text: string) {
    await this.button.click();
    await this.searchBox.waitFor({ state: 'visible' });
    await this.searchBox.fill(text);
    await this.page.waitForTimeout(1000);
    await this.searchBox.press('Enter');
  }
}