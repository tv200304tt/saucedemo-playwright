// fixtures/pages.fixture.js
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
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

    const inventory = new InventoryPage(page);
    await use(inventory);
  },

  // ── Cart with items ─────────────────────────
  cartWithItems: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      USERS[UserType.Standard].username,
      USERS[UserType.Standard].password
    );

    await page.waitForURL(/.*inventory/);

    const inventory = new InventoryPage(page);

    // add 2 items (có thể chỉnh)
    await inventory.addToCart(0);
    await inventory.addToCart(1);

    await inventory.goToCart();

    const cart = new CartPage(page);

    // ✔ QUAN TRỌNG: phải gọi use()
    await use(cart);
  }

});

export { expect };