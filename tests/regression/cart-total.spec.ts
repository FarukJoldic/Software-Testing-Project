import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { CartPage } from "../../page-objects/CartPage";

test.describe("Cart Total Calculation Tests", () => {
  let homePage: HomePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.navigateToHomePage();
  });

  test("Verify cart total calculation", async () => {
    // Add multiple products to the cart
    const productsToAdd = ["Samsung galaxy s6", "Nokia lumia 1520"];
    for (const productName of productsToAdd) {
      await test.step(`Add product "${productName}" to cart`, async () => {
        // Use the existing HomePage method to select the product
        await homePage.selectProduct(productName);
        await cartPage.addProductToCart();
        await homePage.navigateToHomePage(); // Navigate back to home after adding to cart
      });
    }

    // Navigate to the cart page
    await cartPage.navigateToCart();

    // Assert all products are in the cart
    for (const productName of productsToAdd) {
      await cartPage.assertProductInCart(productName);
    }

    // Verify the total price matches the sum of individual product prices
    const productPrices = await cartPage.getProductPrices();
    const expectedTotal = productPrices.reduce((acc, price) => acc + price, 0);
    const actualTotal = await cartPage.getTotalPrice();
    expect(actualTotal).toBe(expectedTotal);
  });
});
