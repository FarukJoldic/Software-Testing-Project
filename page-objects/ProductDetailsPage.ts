import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;
  readonly productImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator(".product-content .name");
    this.productPrice = page.locator(".price-container");
    this.productDescription = page.locator("#more-information p");
    this.addToCartButton = page.locator('a.btn-success:has-text("Add to cart")');
    this.productImage = page.locator(".carousel-inner .item.active img");
  }

  async assertProductDetails(name: string, price: string, description: string) {
    await expect(this.productName).toHaveText(name);
    await expect(this.productPrice).toHaveText(price);
    await expect(this.productDescription).toHaveText(description);
  }

  async verifyProductImage(src: string) {
    const imgSrc = await this.productImage.getAttribute("src");
    expect(imgSrc).toBe(src);
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
