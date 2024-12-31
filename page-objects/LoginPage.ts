import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page; // Store the page instance for later use
  }

  async navigateTo() {
    await this.page.goto('https://the-internet.herokuapp.com/login'); // Replace with your login page URL
  }

  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
