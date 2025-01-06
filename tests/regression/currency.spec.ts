import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { ProductDetailsPage } from "../../page-objects/ProductDetailsPage";
import { CartPage } from "../../page-objects/CartPage";

test.describe("Currency Consistency Test", () => {
  let homePage: HomePage;
  let productDetailsPage: ProductDetailsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productDetailsPage = new ProductDetailsPage(page);
    cartPage = new CartPage(page);

    await homePage.navigateToHomePage();
  });

  test("Verify currency consistency across pages", async () => {
    const productName = "Nokia lumia 1520";
    const expectedCurrency = "$"; // Expected currency symbol
  
    // **Step 1: Verify currency on the homepage**
    const homepagePrices = await homePage.page.locator(".card-block h5").allTextContents();
    homepagePrices.forEach((price) => {
      expect(price.trim()).toContain(expectedCurrency);
    });
  
    // **Step 2: Verify currency on the product details page**
    await homePage.selectProduct(productName);
    const productDetailsPrice = await productDetailsPage.productPrice.innerText();
    expect(productDetailsPrice).toContain(expectedCurrency);
  
    // **Step 3: Verify individual product price in the cart (format only)**
    await productDetailsPage.addToCart();
    await cartPage.navigateToCart();
    const cartProductPrice = await cartPage.cartTableBody.locator("tr td:nth-child(3)").innerText();
    expect(cartProductPrice).toMatch(/^\d+$/); // Verifies the price is a numeric value (e.g., "820")
  
    // **Step 4: Verify total price in the cart (format only)**
    const totalCartPrice = await cartPage.totalElement.innerText();
    expect(totalCartPrice).toMatch(/^\d+$/); // Verifies the total is a numeric value (e.g., "820)
  
  });
});
