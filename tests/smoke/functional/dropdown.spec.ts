import { test, expect } from "@playwright/test";
import { DropdownPage } from "../../../page-objects/DropdownPage";

test("Dropdown test", async ({ page }) => {
  const dropdownPage = new DropdownPage(page);

  // 1. Navigate to Dropdown page
  await dropdownPage.navigate();

  // 2. Select Option 1
  await dropdownPage.selectOption("1");
  expect(await dropdownPage.getSelectedOptionValue()).toBe("1");

  // 3. Select Option 2
  await dropdownPage.selectOption("2");
  expect(await dropdownPage.getSelectedOptionValue()).toBe("2");
});
