import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";

test.describe("Functional Test - Pagination", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test("Verify clicking 'Next' changes products", async () => {
    const initialProductTitles = await homePage.getProductTitles();
    await homePage.clickNextPage();
    const updatedProductTitles = await homePage.getProductTitles();

    expect(updatedProductTitles).not.toEqual(initialProductTitles);
  });

  test("Verify clicking 'Previous' changes products", async () => {
    // Step 1: Navigate to the second page
    await homePage.clickNextPage();
    await homePage.page.waitForTimeout(1000); // Allow time for the page to update
    const secondPageProductTitles = await homePage.getProductTitles();
  
    // Step 2: Navigate back to the first page
    await homePage.clickPreviousPage();
    await homePage.page.waitForTimeout(1000); // Allow time for the page to update
    const firstPageProductTitles = await homePage.getProductTitles();
  
  
    // Assertion
    expect(firstPageProductTitles).not.toEqual(secondPageProductTitles);
  });  
});
