import { Page } from "@playwright/test";

export class CheckboxesPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://the-internet.herokuapp.com/checkboxes");
  }

  async checkFirstCheckbox() {
    await this.page.check('input[type="checkbox"]:nth-of-type(1)');
  }

  async uncheckSecondCheckbox() {
    await this.page.uncheck('input[type="checkbox"]:nth-of-type(2)');
  }

  async isFirstCheckboxChecked(): Promise<boolean> {
    return this.page.isChecked('input[type="checkbox"]:nth-of-type(1)');
  }

  async isSecondCheckboxChecked(): Promise<boolean> {
    return this.page.isChecked('input[type="checkbox"]:nth-of-type(2)');
  }
}
