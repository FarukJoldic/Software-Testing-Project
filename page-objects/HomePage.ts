import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly homeUrl: string;
  readonly categoryLinks: Locator;
  readonly featuredProducts: Locator;
  readonly aboutUsLink: Locator;
  readonly videoModal: Locator;
  readonly playButton: Locator;
  readonly videoElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeUrl = "https://demoblaze.com";
    this.categoryLinks = page.locator(".list-group-item");
    this.featuredProducts = page.locator(".card-title");
    this.aboutUsLink = page.locator("text=About us");
    this.videoModal = page.locator("#videoModal");
    this.playButton = page.locator('#videoModal button:has-text("Play")');
    this.videoElement = page.locator("#videoModal video");
  }

  async navigateToHomePage() {
    await this.page.goto(this.homeUrl);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async assertHomePageLoaded() {
    await expect(this.page).toHaveURL(this.homeUrl);
    await expect(this.categoryLinks.first()).toBeVisible();
    await expect(this.featuredProducts.first()).toBeVisible();
  }

  async selectCategory(category: string) {
    const categorySelector = `.list-group-item:has-text("${category}")`;
    const categoryLink = this.page.locator(categorySelector);
    await categoryLink.click();

    // Wait for the category page to load
    await this.page.waitForLoadState("networkidle");
  }

  async openFirstFeaturedProduct() {
    const firstProduct = this.featuredProducts.first();
    await firstProduct.click();

    // Wait for the product page to load
    await this.page.waitForLoadState("networkidle");
  }

  async selectProduct(productName: string) {
    const productLocator = this.page.locator(
      `.card-title:has-text("${productName}")`
    );
    await expect(productLocator).toBeVisible({ timeout: 10000 }); // Ensure the product is visible
    await productLocator.click();

    // Wait for the product page to load
    await this.page.waitForLoadState("domcontentloaded");
  }

  async openAboutUsModal() {
    await this.aboutUsLink.click();
    await this.videoModal.waitFor({ state: "visible" });
  }

  async playAboutUsVideo() {
    await this.playButton.click();
  }

  async isAboutUsVideoPlaying(): Promise<boolean> {
    const isPaused = await this.videoElement.evaluate(
      (video: HTMLVideoElement) => video.paused
    );
    return !isPaused;
  }
}
