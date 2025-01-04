import { expect, Locator, Page } from "@playwright/test";

export class LogoPage {
  readonly page: Page;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    // Logo Locator
    this.logo = page.locator("a.navbar-brand");
  }

  async navigateToLogoPage() {
    await this.page.goto("https://demoblaze.com");
    await this.page.waitForLoadState("networkidle"); // Ensure the page is fully loaded
  }

  async assertLogoPageLoaded() {
    await expect(this.page).toHaveURL(
      /(index.html|https:\/\/demoblaze\.com\/)/
    ); // Match homepage URL
    await expect(this.logo).toBeVisible(); // Ensure the logo is visible
  }

  async clickLogo() {
    await this.logo.click(); // Click the logo
    await this.page.waitForLoadState("networkidle"); // Wait for navigation to complete
  }
}
