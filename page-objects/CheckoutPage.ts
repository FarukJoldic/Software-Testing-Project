import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly placeOrderButton: Locator;
  readonly purchaseModal: Locator;
  readonly nameField: Locator;
  readonly countryField: Locator;
  readonly cityField: Locator;
  readonly creditCardField: Locator;
  readonly monthField: Locator;
  readonly yearField: Locator;
  readonly purchaseButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.placeOrderButton = page.locator('button:has-text("Place Order")');
    this.purchaseModal = page.locator("#orderModal");
    this.nameField = page.locator("#name");
    this.countryField = page.locator("#country");
    this.cityField = page.locator("#city");
    this.creditCardField = page.locator("#card");
    this.monthField = page.locator("#month");
    this.yearField = page.locator("#year");
    this.purchaseButton = page.locator('button:has-text("Purchase")');
    this.confirmationMessage = page.locator(".sweet-alert h2");
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
    await expect(this.purchaseModal).toBeVisible(); // Ensure modal is visible
  }

  async fillPurchaseForm(details: {
    name: string;
    country: string;
    city: string;
    creditCard: string;
    month: string;
    year: string;
  }) {
    await this.nameField.fill(details.name);
    await this.countryField.fill(details.country);
    await this.cityField.fill(details.city);
    await this.creditCardField.fill(details.creditCard);
    await this.monthField.fill(details.month);
    await this.yearField.fill(details.year);
  }

  async completePurchase() {
    await this.purchaseButton.click();
    await expect(this.confirmationMessage).toBeVisible(); // Ensure confirmation is displayed
  }

  async assertConfirmationMessage(expectedMessage: string) {
    const message = await this.confirmationMessage.textContent();
    expect(message?.trim()).toBe(expectedMessage); // Verify confirmation message
  }
}
