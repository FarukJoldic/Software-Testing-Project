import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Smoke Test - Home Page', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
    });

    test('Verify homepage loads successfully', async () => {
        await homePage.assertHomePageLoaded();
    });

    test('Navigate to a category', async () => {
        await homePage.selectCategory('Laptops');

        const categoryHeader = homePage.page.locator('h2:has-text("Laptops")');
        await expect(categoryHeader).toBeVisible({ timeout: 5000 });
    });

    test('Open the first featured product', async () => {
        await homePage.openFirstFeaturedProduct();

        const productDescription = homePage.page.locator('#more-information'); // Adjust selector as needed
        await expect(productDescription).toBeVisible({ timeout: 5000 });
    });
});
