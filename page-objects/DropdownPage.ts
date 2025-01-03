import { Page } from "@playwright/test";

export class DropdownPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://the-internet.herokuapp.com/dropdown");
  }

  async selectOption(value: string) {
    await this.page.selectOption("#dropdown", value);
  }

  async getSelectedOptionValue(): Promise<string> {
    return this.page.$eval(
      "#dropdown",
      (el) => (el as HTMLSelectElement).value
    );
  }
}
