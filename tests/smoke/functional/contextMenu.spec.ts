import { test, expect } from "@playwright/test";
import { ContextMenuPage } from "../../../page-objects/ContextMenuPage";

test("Context Menu test", async ({ page }) => {
  const contextMenuPage = new ContextMenuPage(page);

  // 1. Navigate to Context Menu page
  await contextMenuPage.navigate();

  // 2. Right-click on the hotspot
  page.once("dialog", async (dialog) => {
    // 3. Validate the alert text
    expect(dialog.message()).toBe("You selected a context menu");
    await dialog.accept();
  });
  await contextMenuPage.rightClickHotSpot();
});
