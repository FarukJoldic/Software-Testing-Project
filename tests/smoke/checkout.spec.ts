import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { CartPage } from "../../page-objects/CartPage";
import { CheckoutPage } from "../../page-objects/CheckoutPage";

test.describe("Regression Test - Checkout Process", () => {
  let homePage: HomePage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await homePage.navigateToHomePage();
  });

  test("Complete a purchase", async () => {
    // Add a product to the cart
    await homePage.selectProduct("Samsung galaxy s6");
    await cartPage.addProductToCart();

    // Navigate to the cart
    await cartPage.navigateToCart();
    await cartPage.assertProductInCart("Samsung galaxy s6");

    // Proceed to checkout
    await checkoutPage.clickPlaceOrder();

    // Fill out the purchase form
    await checkoutPage.fillPurchaseForm({
      name: "John Doe",
      country: "USA",
      city: "New York",
      creditCard: "4111111111111111",
      month: "01",
      year: "2025",
    });

    // Complete the purchase and verify confirmation
    await checkoutPage.completePurchase();
    await checkoutPage.assertConfirmationMessage("Thank you for your purchase!");
  });
});
