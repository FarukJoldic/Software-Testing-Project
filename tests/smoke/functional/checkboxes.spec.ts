import { test, expect } from "@playwright/test";
import { CheckboxesPage } from "../../../page-objects/CheckboxesPage";

test("Checkboxes test", async ({ page }) => {
  const checkboxesPage = new CheckboxesPage(page);

  // 1. Navigate to Checkboxes page
  await checkboxesPage.navigate();

  // 2. Check the first checkbox
  await checkboxesPage.checkFirstCheckbox();
  expect(await checkboxesPage.isFirstCheckboxChecked()).toBe(true);

  // 3. Uncheck the second checkbox
  await checkboxesPage.uncheckSecondCheckbox();
  expect(await checkboxesPage.isSecondCheckboxChecked()).toBe(false);
});
