import {type Page, type Locator, expect} from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly title: Locator;        
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
    }

    async expectTitle(Title: string) {
        await expect(this.title).toBeVisible();
        await expect(this.title).toHaveText(Title);
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
}