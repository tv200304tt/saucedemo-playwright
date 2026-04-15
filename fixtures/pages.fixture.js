// fixtures/pages.fixture.js
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { USERS, UserType } from '../helpers/constants';

export const test = base.extend({
  // ── Basic fixtures ──────────────────────────
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  detailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // ── Logged in fixture ───────────────────────
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      USERS[UserType.Standard].username,
      USERS[UserType.Standard].password
    );

    await page.waitForURL(/.*inventory/);

    await use(new InventoryPage(page));
  },

  // ── Cart with items ─────────────────────────
  cartWithItems: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      USERS[UserType.Standard].username,
      USERS[UserType.Standard].password
    );

    const inv = new InventoryPage(page);
    await inv.addMultipleToCart([0, 1]);
    await inv.goToCart();

    await use(new CartPage(page));
  },
});

export { expect };