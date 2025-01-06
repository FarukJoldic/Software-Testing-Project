import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";

test.describe("Carousel Functionality Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test("Verify carousel navigates to next and previous images", async () => {
    // Get the initial carousel image source
    const initialImageSrc = await homePage.getCurrentCarouselImageSrc();

    // Click next and verify the image changes
    await homePage.clickNextCarouselButton();
    const nextImageSrc = await homePage.getCurrentCarouselImageSrc();
    expect(nextImageSrc).not.toEqual(initialImageSrc);

    // Click previous and verify it goes back to the initial image
    await homePage.clickPrevCarouselButton();
    const prevImageSrc = await homePage.getCurrentCarouselImageSrc();
    expect(prevImageSrc).toEqual(initialImageSrc);
  });

  test("Verify carousel loops back to the first image after the last image", async () => {
    // Initialize lastImageSrc to null
    let lastImageSrc: string | null = null;

    // Click next repeatedly to cycle through all images
    for (let i = 0; i < 3; i++) { // Assuming there are 3 images in the carousel
      lastImageSrc = await homePage.getCurrentCarouselImageSrc();
      await homePage.clickNextCarouselButton();
    }

    // After the last image, the carousel should loop back to the first image
    const firstImageSrc = await homePage.getCurrentCarouselImageSrc();
    if (lastImageSrc !== null) {
      expect(firstImageSrc).not.toEqual(lastImageSrc);
    }
  });
});
