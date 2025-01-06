import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { ProductDetailsPage } from "../../page-objects/ProductDetailsPage";

test("Verify product details page displays correct information and image", async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  // Navigate to the home page
  await homePage.navigateToHomePage();

  // Open the first featured product
  const productName = await homePage.featuredProducts.first().textContent();
  await homePage.openFirstFeaturedProduct();

  // Expected product details
  const expectedName = "Samsung galaxy s6";
  const expectedPrice = "$360 *includes tax";
  const expectedDescription =
    "The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage cannot be expanded.";
  const expectedImageSrc = "imgs/galaxy_s6.jpg";

  // Validate product details
  await productDetailsPage.assertProductDetails(expectedName, expectedPrice, expectedDescription);

  // Verify product image
  await productDetailsPage.verifyProductImage(expectedImageSrc);
});
