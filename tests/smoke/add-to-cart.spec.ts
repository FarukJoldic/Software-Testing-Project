import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { CartPage } from '../../page-objects/CartPage';

test.describe('Smoke Test - Add to Cart', () => {
  let homePage: HomePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.navigateToHomePage();
  });

  test('Add a product to the cart', async () => {
    // Select a specific product
    await homePage.selectProduct('Samsung galaxy s6');

    // Add the product to the cart
    await cartPage.addProductToCart();

    // Navigate to the cart
    await cartPage.navigateToCart();

    // Assert that the product is present in the cart
    await cartPage.assertProductInCart('Samsung galaxy s6');
  });
});
