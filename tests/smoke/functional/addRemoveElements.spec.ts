import { test, expect } from "@playwright/test";
import { AddRemoveElementsPage } from "../../../page-objects/AddRemoveElementsPage";

test("Add/Remove Elements test", async ({ page }) => {
  const addRemovePage = new AddRemoveElementsPage(page);

  // 1. Navigate to Add/Remove Elements page
  await addRemovePage.navigate();

  // 2. Click "Add Element"
  await addRemovePage.clickAddElement();
  let deleteBtnCount = await addRemovePage.getDeleteButtonsCount();
  expect(deleteBtnCount).toBe(1); // Verify one delete button is present

  // 3. Click "Delete" button
  await addRemovePage.clickDeleteButton();
  deleteBtnCount = await addRemovePage.getDeleteButtonsCount();
  expect(deleteBtnCount).toBe(0); // Verify no delete buttons are present
});
