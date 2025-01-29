import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Tests', () => {
  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    const loggedIn = await loginPage.isLoggedIn();
    expect(loggedIn).toBeTruthy();
  });

  test('Invalid username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('invalid_user', 'wrong_password');

    const errorMsg = loginPage.getErrorMessage();
    //console.log(errorMsg);
    await expect(await errorMsg).toBeVisible();
    await expect(await errorMsg).toHaveText(/Epic sadface: Username and password do not match any user in this service/);
  });

  test('Log in with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', '');

    const errorMsg = loginPage.getErrorMessage();
    await expect(await errorMsg).toBeVisible
    await expect(await errorMsg).toHaveText(/Epic sadface: Password is required/);
  });

  test('Log in with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('', 'secret_sauce');

    const errorMsg = loginPage.getErrorMessage();
    await expect(await errorMsg).toBeVisible();
    await expect(await errorMsg).toHaveText(/Epic sadface: Username is required/);
  });
});
