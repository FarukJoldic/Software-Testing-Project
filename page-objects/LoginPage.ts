import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginButton: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.locator('#login2');
        this.usernameField = page.locator('#loginusername');
        this.passwordField = page.locator('#loginpassword');
    }

    async navigateToLoginPage() {
        await this.page.goto('https://www.demoblaze.com');
        await this.loginButton.click();
    }

    async signIn(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.page.locator('button:has-text("Log in")').click();
    }

    async assertSuccessMessage() {
        // Explicit wait to ensure the element becomes visible
        await this.page.waitForSelector('#nameofuser', { state: 'visible', timeout: 10000 });
        await expect(this.page.locator('#nameofuser')).toBeVisible();
    }
}
