import { Page } from "@playwright/test";

export class FloatingMenuPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://the-internet.herokuapp.com/floating_menu");
  }

  async isMenuVisible(): Promise<boolean> {
    return this.page.isVisible("#menu");
  }

  async scrollToBottom() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }
}
