import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../page-objects/LoginPage';

test('Login page navigation test', async ({ page }) => {
  const loginPage = new LoginPage(page); // Pass the page instance to the LoginPage class

  // Navigate to the login page
  await loginPage.navigateTo();

  // Verify that the URL is correct after navigation
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/login'); // Replace with your expected URL
});
