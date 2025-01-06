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
  readonly nextButton: Locator;
  readonly prevButton: Locator;
  readonly footer: Locator;
  readonly carouselImage: Locator;
  readonly carouselNextButton: Locator;
  readonly carouselPrevButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeUrl = "https://demoblaze.com";
    this.categoryLinks = page.locator(".list-group-item");
    this.featuredProducts = page.locator(".card-title");
    this.aboutUsLink = page.locator("text=About us");
    this.videoModal = page.locator("#videoModal");
    this.playButton = page.locator('#videoModal button:has-text("Play")');
    this.videoElement = page.locator("#videoModal video");
    this.nextButton = page.locator('.page-link:has-text("Next")');
    this.prevButton = page.locator('.page-link:has-text("Previous")');
    this.footer = page.locator("#footc");
    this.carouselImage = page.locator("#carouselExampleIndicators .carousel-inner .carousel-item.active img");
    this.carouselNextButton = page.locator(".carousel-control-next");
    this.carouselPrevButton = page.locator(".carousel-control-prev");
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

  async clickNextPage() {
    await this.nextButton.waitFor({ state: "visible" });
    await this.nextButton.click();
    await this.page.waitForLoadState("networkidle", { timeout: 10000 });
  }

  async clickPreviousPage() {
    await this.prevButton.waitFor({ state: "visible" });
    if (!(await this.prevButton.isEnabled())) {
      throw new Error("Previous button is not enabled.");
    }
    await this.prevButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async assertPaginationChanges(previousProductNames: string[]) {
    const currentProductNames = await this.getProductTitles();
    expect(currentProductNames).not.toEqual(previousProductNames);
    expect(currentProductNames.length).toBeGreaterThan(0);
  }

  async getProductTitles(): Promise<string[]> {
    return this.featuredProducts.allTextContents();
  }

  async isNextButtonDisabled(): Promise<boolean> {
    return await this.nextButton.evaluate(
      (button: HTMLButtonElement) => button.disabled || button.style.display === "none"
    );
  }

  async isPrevButtonDisabled(): Promise<boolean> {
    return await this.prevButton.evaluate(
      (button: HTMLButtonElement) => button.disabled || button.style.display === "none"
    );
  }

  async selectProduct(productName: string) {
    const productLocator = this.page.locator(
      `.card-title:has-text("${productName}")`
    );
    await expect(productLocator).toBeVisible({ timeout: 10000 });
    await productLocator.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async openFirstFeaturedProduct() {
    const firstProduct = this.featuredProducts.first();
    await firstProduct.click();
    await this.page.waitForLoadState("networkidle");
  }

  async isFooterVisible(): Promise<boolean> {
    return await this.footer.isVisible();
  }

  async getFooterText(): Promise<string> {
    return await this.footer.innerText();
  }

  async getCurrentCarouselImageSrc(): Promise<string> {
    const activeImage = this.page.locator(".carousel-inner .carousel-item.active img");
    await activeImage.waitFor({ state: "attached" });
    const src = await activeImage.getAttribute("src");
    if (!src) {
      throw new Error("Failed to retrieve the 'src' attribute from the active carousel image.");
    }
    return src;
  }

  async clickNextCarouselButton() {
    await this.carouselNextButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickPrevCarouselButton() {
    await this.carouselPrevButton.click();
    await this.page.waitForTimeout(1000);
  }
}
