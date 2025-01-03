import { test, expect } from "@playwright/test";
import { FloatingMenuPage } from "../../../page-objects/FloatingMenuPage";

test("Floating Menu visibility test", async ({ page }) => {
  const floatingMenuPage = new FloatingMenuPage(page);

  // 1. Navigate to Floating Menu page
  await floatingMenuPage.navigate();

  // 2. Verify that the menu is initially visible
  expect(await floatingMenuPage.isMenuVisible()).toBe(true);

  // 3. Scroll to the bottom of the page
  await floatingMenuPage.scrollToBottom();

  // 4. Verify that the menu remains visible after scrolling
  expect(await floatingMenuPage.isMenuVisible()).toBe(true);

  // 5. Scroll back to the top of the page
  await floatingMenuPage.scrollToTop();

  // 6. Verify that the menu is still visible
  expect(await floatingMenuPage.isMenuVisible()).toBe(true);
});
