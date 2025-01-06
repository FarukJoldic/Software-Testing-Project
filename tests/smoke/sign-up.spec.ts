import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../page-objects/SignUpPage";

test.describe("Smoke Test - Sign-Up Functionality", () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.navigateToSignUpPage();
  });

  test("Sign up with valid username and password", async ({ page }) => {
    const username = `testuser_${Date.now()}`;
    const password = "testpassword123";

    // Perform sign-up
    await signUpPage.signUp(username, password);

    // Assert successful sign-up dialog
    await signUpPage.assertSignUpSuccess();
  });
});
