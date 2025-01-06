import { Page, Locator, expect } from "@playwright/test";

export class SignUpPage {
  readonly page: Page;
  readonly signUpButton: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = page.locator("#signin2");
    this.usernameField = page.locator("#sign-username");
    this.passwordField = page.locator("#sign-password");
    this.submitButton = page.locator('button:has-text("Sign up")');
    this.closeButton = page.locator('button:has-text("Close")');
  }

  async navigateToSignUpPage() {
    await this.page.goto("https://www.demoblaze.com");
    await this.signUpButton.click();
    await this.page.waitForSelector("#sign-username", { state: "visible" });
  }

  async signUp(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }

  async assertSignUpSuccess() {
    // Handle the confirmation dialog
    this.page.once("dialog", async (dialog) => {
      await expect(dialog.message()).toBe("Sign up successful.");
      await dialog.accept();
    });
  }

  async closeSignUpModal() {
    await this.closeButton.click();
  }
}
