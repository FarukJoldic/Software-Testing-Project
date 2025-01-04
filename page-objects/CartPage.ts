import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;
  readonly cartTableBody: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('a:has-text("Add to cart")'); // Updated locator for the Add to cart button
    this.cartLink = page.locator('#cartur'); // Locator for the "Cart" link
    this.cartTableBody = page.locator('#tbodyid'); // Locator for the table body in the cart
  }

  async addProductToCart() {
    await expect(this.addToCartButton).toBeVisible({ timeout: 10000 }); // Ensure visibility
    await this.addToCartButton.click();

    // Handle dialog for confirmation
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    // Allow time for action to be processed
    await this.page.waitForTimeout(2000);
  }

  async navigateToCart() {
    await this.cartLink.click();
    await this.page.waitForLoadState('domcontentloaded'); // Wait for cart page to load
  }

  async assertProductInCart(productName: string) {
    const productRow = this.cartTableBody.locator(`tr:has-text("${productName}")`);
    await expect(productRow).toBeVisible(); // Verify that the product row exists
  }
}
