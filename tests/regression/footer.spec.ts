import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";

test("Verify footer visibility and content", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigateToHomePage();
  const isFooterVisible = await homePage.isFooterVisible();
  expect(isFooterVisible).toBeTruthy(); // Footer should be visible

  const footerText = await homePage.getFooterText();

  // Add specific assertions based on expected footer content
  expect(footerText).toContain("About Us");
  expect(footerText).toContain("Get in Touch");
  expect(footerText).toContain("Address: 2390 El Camino Real");
  expect(footerText).toContain("Email: demo@blazemeter.com");
});
