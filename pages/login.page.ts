import { Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async getErrorMessage() {
    return this.page.locator('h3[data-test="error"]');
  }

  async isLoggedIn() {
    await this.page.waitForURL(/inventory.html/);
    return this.page.locator('.inventory_list').isVisible();
  }
}
