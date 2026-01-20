import {type Page, type Locator, expect} from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly title: Locator;        
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.getByRole('button', { name: 'Finish' })
    }
    
    async expectTitle(Title: string) {
        await expect(this.title).toBeVisible();
        await expect(this.title).toHaveText(Title);
    }
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }
    async continueToNextStep() {
        await this.continueButton.click();
    }
    async finishCheckout() {
        await this.finishButton.click();
    }
}