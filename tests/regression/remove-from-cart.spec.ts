import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { CartPage } from "../../page-objects/CartPage";

test.describe("Functional Test - Remove Item from Cart", () => {
  let homePage: HomePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.navigateToHomePage();
  });

  test("Remove a product from the cart", async () => {
    // Step 1: Add a product to the cart
    const productName = "Nokia lumia 1520";
    await homePage.selectProduct(productName);
    await cartPage.addProductToCart();
  
    // Step 2: Navigate to the cart
    await cartPage.navigateToCart();
  
    // Step 3: Verify product is in the cart
    await cartPage.assertProductInCart(productName);
  
    // Step 4: Remove the product from the cart
    await cartPage.removeProductFromCart(productName);
  
    // Step 5: Verify product is no longer in the cart
    await cartPage.assertProductNotInCart(productName);
  
    // Step 6: Verify total price is updated or hidden
    const totalPrice = await cartPage.getTotalPrice();
    expect(totalPrice).toBe(0); // Total should be 0 if the cart is empty
  });
});
