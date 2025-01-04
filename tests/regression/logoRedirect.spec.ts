import { test, expect } from "@playwright/test";
import { LogoPage } from "../../page-objects/LogoPage";

test.describe("Regression Test - Logo Redirection", () => {
  let logoPage: LogoPage;

  test.beforeEach(async ({ page }) => {
    logoPage = new LogoPage(page);
    await logoPage.navigateToLogoPage();
  });

  test("Verify clicking the logo redirects to the homepage", async () => {
    // Ensure the homepage is loaded
    await logoPage.assertLogoPageLoaded();

    // Click the logo
    await logoPage.clickLogo();

    // Verify redirection to the homepage
    await logoPage.assertLogoPageLoaded();
  });
});
