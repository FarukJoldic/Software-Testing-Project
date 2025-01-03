import { Page } from "@playwright/test";

export class ContextMenuPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://the-internet.herokuapp.com/context_menu");
  }

  async rightClickHotSpot() {
    // Right-click on the element using button: 'right'
    await this.page.click("#hot-spot", { button: "right" });
  }
}
