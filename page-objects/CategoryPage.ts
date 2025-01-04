import { expect, Locator, Page } from "@playwright/test";

export class CategoryPage {
  readonly page: Page;
  readonly categoryLinks: Locator;
  readonly productCards: Locator;
  readonly productTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryLinks = page.locator(".list-group-item"); // Locator for category links
    this.productCards = page.locator(".card"); // Locator for product cards
    this.productTitles = page.locator(".card-title"); // Locator for product titles
  }

  async navigateToCategory(category: string) {
    const categoryLink = this.categoryLinks.locator(`text=${category}`);
    await expect(categoryLink).toBeVisible(); // Ensure the category link is visible
    await categoryLink.click();
    await this.page.waitForLoadState("networkidle"); // Wait for the page to fully load
  }

  async assertProductsBelongToCategory(expectedProducts: string[]) {
    const displayedProducts = await this.productTitles.allTextContents(); // Get all displayed product titles
    for (const product of expectedProducts) {
      expect(displayedProducts).toContain(product); // Assert that each expected product is displayed
    }
  }

  async assertProductsDisplayed() {
    await expect(this.productCards.first()).toBeVisible(); // Ensure at least one product card is visible
  }
}
