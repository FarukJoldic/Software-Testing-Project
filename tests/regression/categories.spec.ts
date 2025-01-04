import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { CategoryPage } from "../../page-objects/CategoryPage";

test.describe("Regression Test - Categories", () => {
  let homePage: HomePage;
  let categoryPage: CategoryPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    categoryPage = new CategoryPage(page);
    await homePage.navigateToHomePage();
    await homePage.assertHomePageLoaded();
  });

  test("Validate products in Phone category", async () => {
    await categoryPage.navigateToCategory("Phones");

    // Verify that the products belong to the Phones category
    await categoryPage.assertProductsDisplayed();
    await categoryPage.assertProductsBelongToCategory([
      "Samsung galaxy s6",
      "Nokia lumia 1520",
      "Nexus 6",
    ]);
  });

  test("Validate products in Laptop category", async () => {
    await categoryPage.navigateToCategory("Laptops");

    // Verify that the products belong to the Laptops category
    await categoryPage.assertProductsDisplayed();
    await categoryPage.assertProductsBelongToCategory([
      "Sony vaio i5",
      "MacBook Pro",
      "Dell i7 8gb",
    ]);
  });

  test("Validate products in Monitor category", async () => {
    await categoryPage.navigateToCategory("Monitors");

    // Verify that the products belong to the Monitors category
    await categoryPage.assertProductsDisplayed();
    await categoryPage.assertProductsBelongToCategory([
      "Apple monitor 24",
      "ASUS Full HD",
    ]);
  });
});
