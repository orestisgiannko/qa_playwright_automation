import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';

test.describe('Product Listing and Cart Management', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Log in before each test
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('should display all products on the product page', async ({ page }) => {
    const productPage = new ProductPage(page);

    const productCount = await productPage.getProductCount();
    expect(productCount).toBe(6); // Assuming there are 6 products
  });

  test('should add a product to the cart', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.addProductToCart(1); // Add the first product

    const cartBadgeCount = await productPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(1);
  });

  test('should remove a product from the cart', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.addProductToCart(1); // Add the first product
    await productPage.removeProductFromCart(1); // Remove the first product

    const cartBadgeCount = await productPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(0);
  });
});
