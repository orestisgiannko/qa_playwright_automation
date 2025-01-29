import { Page } from '@playwright/test';

export class ProductPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getProductCount() {
    return this.page.locator('.inventory_item').count();
  }

  async addProductToCart(index: number) {
    await this.page.click(`.inventory_item:nth-child(${index}) button`);
  }

  async removeProductFromCart(index: number) {
    await this.page.click(`.inventory_item:nth-child(${index}) button`);
  }

  async getCartBadgeCount() {
    const cartBadge = this.page.locator('.shopping_cart_badge');
    if (await cartBadge.isVisible()) {
      return parseInt(await cartBadge.textContent() || '0', 10);
    }
    return 0;
  }
}
