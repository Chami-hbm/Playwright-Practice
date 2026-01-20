import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';

test('Successful Login with standard users', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('Unsuccessful Login with locked_out_user', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectErrorMessage();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

test('Unsuccessful Login with invalid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_password');
    await loginPage.expectErrorMessage();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});