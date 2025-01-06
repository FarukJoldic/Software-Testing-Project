import { test, expect } from "@playwright/test";
import { ContactPage } from "../../page-objects/ContactPage";

test.describe("Functional Test - Contact Page", () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await page.goto("https://demoblaze.com"); // Navigate to the homepage
  });

  test("Submit the contact form with valid data", async () => {
    const testEmail = "test@example.com";
    const testName = "Test User";
    const testMessage = "This is a test message.";

    await contactPage.openContactModal();
    await contactPage.submitContactForm(testEmail, testName, testMessage);

    // Verify modal is closed after submitting
    await contactPage.assertContactModalHidden();
    // Additional verification for successful submission could be added
    // based on how the application behaves (e.g., success toast or no errors).
  });
});
