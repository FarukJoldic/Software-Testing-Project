import { expect, Locator, Page } from "@playwright/test";

export class VideoPage {
  readonly page: Page;
  readonly aboutUsLink: Locator;
  readonly videoModal: Locator;
  readonly modalTitle: Locator;
  readonly closeButton: Locator;
  readonly videoElement: Locator;
  readonly playButtonOverlay: Locator;
  readonly modalFooterCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.aboutUsLink = page.locator('a.nav-link[data-target="#videoModal"]');
    this.videoModal = page.locator("#videoModal");
    this.modalTitle = page.locator("#videoModalLabel");
    this.closeButton = page.locator("#videoModal .modal-header .close");
    this.videoElement = page.locator("#example-video_html5_api");
    this.playButtonOverlay = page.locator(".vjs-big-play-button");
    this.modalFooterCloseButton = page.locator(
      "#videoModal .modal-footer .btn-secondary"
    );
  }

  async openAboutUsModal() {
    await this.aboutUsLink.click();
    await this.videoModal.waitFor({ state: "visible" });
  }

  async playVideo() {
    // Wait for the play button to appear
    await this.playButtonOverlay.waitFor({
      state: "attached",
      timeout: 1000000,
    });

    // Ensure the video is ready
    const videoReady = await this.waitForVideoReady(1000000); // Timeout of 10 seconds
    if (!videoReady) {
      throw new Error("Video is not ready to play.");
    }

    // Play the video
    await this.playButtonOverlay.click();
  }

  async waitForVideoReady(timeout: number): Promise<boolean> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const readyState = await this.videoElement.evaluate(
        (video: HTMLVideoElement) => video.readyState
      );
      if (readyState >= 2) {
        return true; // Video is ready to play
      }
      await this.page.waitForTimeout(200); // Poll every 200ms
    }
    return false; // Timed out
  }

  async isVideoPlaying(): Promise<boolean> {
    const isPaused = await this.videoElement.evaluate(
      (video: HTMLVideoElement) => video.paused
    );
    return !isPaused;
  }

  async closeModal() {
    await this.modalFooterCloseButton.click();
    await this.videoModal.waitFor({ state: "hidden" });
  }
}
