import { Page } from "@playwright/test";

export class AddRemoveElementsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(
      "https://the-internet.herokuapp.com/add_remove_elements/"
    );
  }

  async clickAddElement() {
    await this.page.click('button[onclick="addElement()"]');
  }

  async clickDeleteButton() {
    await this.page.click("button.added-manually");
  }

  async getDeleteButtonsCount(): Promise<number> {
    return this.page.locator("button.added-manually").count();
  }
}
