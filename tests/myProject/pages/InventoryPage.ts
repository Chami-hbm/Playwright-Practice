import {type Page, type Locator, expect} from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly title: Locator;
    readonly shoppingcart: Locator;
    readonly inventoryItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="item-4-title-link"]');
        this.shoppingcart = page.locator('[data-test="shopping-cart-link"]');
        this.inventoryItems = page.locator('.inventory_item');
    }
    async expectTitle() {
        await expect(this.title).toBeVisible();
    }
    async addItemToCart(productName: string) {
        await this.inventoryItems
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }
    async goToCart() {
        await this.shoppingcart.click();
    }

}