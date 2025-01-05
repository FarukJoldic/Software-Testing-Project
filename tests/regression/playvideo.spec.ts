import { test, expect } from "@playwright/test";
import { VideoPage } from "../../page-objects/VideoPage";

test("About us video plays correctly", async ({ page }) => {
  const videoPage = new VideoPage(page);

  // Navigate to the homepage
  await page.goto("https://demoblaze.com");

  // Open the "About Us" modal
  await videoPage.openAboutUsModal();

  // Verify the modal title
  await expect(videoPage.modalTitle).toHaveText("About us");

  // Play the video
  await videoPage.playVideo();

  // Assert that the video is playing
  const isPlaying = await videoPage.isVideoPlaying();
  expect(isPlaying).toBe(true);

  // Close the modal
  await videoPage.closeModal();

  // Ensure the modal is closed
  await expect(videoPage.videoModal).toBeHidden();
});
