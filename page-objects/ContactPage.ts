import { expect, Locator, Page } from "@playwright/test";

export class ContactPage {
  readonly page: Page;
  readonly contactLink: Locator;
  readonly contactModal: Locator;
  readonly contactEmailInput: Locator;
  readonly contactNameInput: Locator;
  readonly contactMessageTextarea: Locator;
  readonly sendMessageButton: Locator;
  readonly closeModalButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactLink = page.locator('a:has-text("Contact")');
    this.contactModal = page.locator("#exampleModal");
    this.contactEmailInput = page.locator("#recipient-email");
    this.contactNameInput = page.locator("#recipient-name");
    this.contactMessageTextarea = page.locator("#message-text");
    this.sendMessageButton = page.locator('button:has-text("Send message")');
    this.closeModalButton = page.locator('button:has-text("Close")');
  }

  async openContactModal() {
    await this.contactLink.click();
    await this.contactModal.waitFor({ state: "visible" });
  }

  async submitContactForm(email: string, name: string, message: string) {
    await this.contactEmailInput.fill(email);
    await this.contactNameInput.fill(name);
    await this.contactMessageTextarea.fill(message);
    await this.sendMessageButton.click();

    // Wait for the modal to close after sending the message
    await this.contactModal.waitFor({ state: "hidden" });
  }

  async closeContactModal() {
    await this.closeModalButton.click();
    await this.contactModal.waitFor({ state: "hidden" });
  }

  async assertContactModalVisible() {
    await expect(this.contactModal).toBeVisible();
  }

  async assertContactModalHidden() {
    await expect(this.contactModal).toBeHidden();
  }
}
