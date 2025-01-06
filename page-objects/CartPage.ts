import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;
  readonly cartTableBody: Locator;
  readonly totalElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('a:has-text("Add to cart")'); // Updated locator for the Add to cart button
    this.cartLink = page.locator("#cartur"); // Locator for the "Cart" link
    this.cartTableBody = page.locator("#tbodyid"); // Locator for the table body in the cart
    this.totalElement = page.locator("#totalp"); // Locator for the total price
  }

  async addProductToCart() {
    await expect(this.addToCartButton).toBeVisible({ timeout: 10000 }); // Ensure visibility
    await this.addToCartButton.click();

    // Handle dialog for confirmation
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    // Allow time for action to be processed
    await this.page.waitForTimeout(2000);
  }

  async navigateToCart() {
    await this.cartLink.click();
    await this.page.waitForLoadState("domcontentloaded"); // Wait for cart page to load
  }

  async assertProductInCart(productName: string) {
    const productRow = this.cartTableBody.locator(`tr:has-text("${productName}")`);
    await expect(productRow).toBeVisible(); // Verify that the product row exists
  }

  async getTotalPrice(): Promise<number> {
    const totalVisible = await this.totalElement.isVisible();
    if (!totalVisible) {
      return 0; // Return 0 if the total is not visible (cart is empty)
    }
  
    const totalText = await this.totalElement.innerText();
    const total = parseInt(totalText, 10);
    if (isNaN(total)) {
      throw new Error(`Failed to parse total price: ${totalText}`);
    }
    return total;
  }
  

  async getProductPrices(): Promise<number[]> {
    const priceCells = this.cartTableBody.locator("tr td:nth-child(3)"); // Assuming price is in the 3rd column
    const prices = await priceCells.allInnerTexts();
    return prices.map((price) => parseInt(price, 10));
  }

  async removeProductFromCart(productName: string) {
    const deleteLink = this.cartTableBody.locator(`tr:has-text("${productName}") a:has-text("Delete")`);
    await expect(deleteLink).toBeVisible(); // Ensure the delete link is visible
    await deleteLink.click(); // Click the delete link
    await this.page.waitForLoadState("domcontentloaded"); // Wait for the page to reflect changes
  }
  
  async assertProductNotInCart(productName: string) {
    const productRow = this.cartTableBody.locator(`tr:has-text("${productName}")`);
    await expect(productRow).toHaveCount(0); // Verify the product row no longer exists
  }  
}
