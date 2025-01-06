import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

test.describe('Smoke Test - Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
    });

    test('Login with valid username and password', async ({ page }) => {
        await loginPage.signIn('farukjoldic', '123'); // Replace with a valid username/password
        await loginPage.assertSuccessMessage();
    });
});
