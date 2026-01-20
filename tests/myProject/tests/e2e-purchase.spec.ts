import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {InventoryPage} from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CartPage } from '../pages/CartPage';

test('End-to-End Purchase Flow', async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await inventoryPage.expectTitle();

    // Add items to cart
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    // Go to cart
    await inventoryPage.goToCart();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    // Verify items in cart
    await cartPage.expectTitle('Your Cart');

    // Proceed to checkout
    await cartPage.clickCheckoutButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await checkoutPage.expectTitle('Checkout: Your Information');

    // Fill in checkout information
    await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutPage.continueToNextStep();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    // Finalize purchase
    await checkoutPage.finishCheckout()
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});
