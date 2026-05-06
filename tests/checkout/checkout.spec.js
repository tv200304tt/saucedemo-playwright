// tests/checkout/checkout.spec.js
import { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/pages.fixture';
import {
  VALID_CHECKOUT, INVALID_CHECKOUT_CASES, generateCheckoutInfo
} from '../../helpers/test-data';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Module CHECKOUT – 11 Test Cases ', () => {

  // Helper: đưa hệ thống về trạng thái 'đang ở checkout step 1'
  async function navigateToCheckout(page) {
    const cartPage = new CartPage(page);
    await cartPage.checkout();
    await page.waitForURL(/.*checkout-step-one/);
    return new CheckoutPage(page);
  }

  // ── TC-041: Checkout thành công ───────────────────────────
  test('TC-041: E2E – Checkout hoàn chỉnh với thông tin hợp lệ',
    async ({ cartWithItems }) => {
      const chk = await navigateToCheckout(cartWithItems.page);
      await chk.completeCheckout(VALID_CHECKOUT);
      await chk.expectOrderComplete();
    }
  );

  // ── TC-042–045: DATA-DRIVEN Validation ───────────────────
  // Sử dụng for..of để tạo 4 test cases từ INVALID_CHECKOUT_CASES
  for (const { desc, data, expectedError } of INVALID_CHECKOUT_CASES) {
    test(`TC Validation – ${desc}`, async ({ cartWithItems }) => {
      const chk = await navigateToCheckout(cartWithItems.page);
      await chk.fillInfo(data);
      await chk.continue();
      await chk.expectErrorMessage(expectedError);
    });
  }

  // ── TC-046: Đóng lỗi bằng X ──────────────────────────────
  test('TC-046: Dismiss error message bằng nút X', async ({ cartWithItems }) => {
    const chk = await navigateToCheckout(cartWithItems.page);
    await chk.fillInfo({ firstName: '', lastName: '', zipCode: '' });
    await chk.continue();
    await expect(chk.errorMessage).toBeVisible();
    await chk.dismissError();
    await expect(chk.errorMessage).not.toBeVisible();
  });

  // ── TC-047: Cancel step 1 → cart ──────────────────────────
  test('TC-047: Cancel step 1 → quay về cart',
    async ({ cartWithItems }) => {
      const chk = await navigateToCheckout(cartWithItems.page);
      // Click trực tiếp để không phụ thuộc CheckoutPage.cancel()
      await chk.page.locator('[data-test="cancel"]').click();
      await expect(chk.page).toHaveURL(/.*cart/);
      // Giỏ hàng vẫn còn sản phẩm
      const cart = new CartPage(chk.page);
      expect(await cart.getItemCount()).toBeGreaterThan(0);
    }
  );

  // ── TC-048: Cancel step 2 → inventory ─────────────────────
test('TC-048: Cancel step 2 (Overview) → về Inventory',
    async ({ cartWithItems }) => {
      const chk = await navigateToCheckout(cartWithItems.page);
      await chk.fillInfo(VALID_CHECKOUT);
      await chk.continue();
      await chk.page.waitForURL(/.*checkout-step-two/);
      // Click trực tiếp để không phụ thuộc CheckoutPage.cancel()
      await chk.page.locator('[data-test="cancel"]').click();
      await expect(chk.page).toHaveURL(/.*inventory/);
    }
  );

  // ── TC-049: Item Total = tổng giá ─────────────────────────
  test('TC-049: Item Total = tổng giá sản phẩm (trước thuế)',
    async ({ loggedInPage }) => {
      // Add 2 sản phẩm biết trước giá
      await loggedInPage.addMultipleToCart([0, 1]); // backpack $29.99 + bike $9.99
      await loggedInPage.goToCart();
      const cart = new CartPage(loggedInPage.page);
      const prices = await cart.getAllItemPrices();
      const expectedTotal = prices.reduce((a, b) => a + b, 0);
      await cart.checkout();
      const chk = new CheckoutPage(loggedInPage.page);
      await chk.fillInfo(VALID_CHECKOUT);
      await chk.continue();
      const itemTotal = await chk.getItemTotal();
      expect(itemTotal).toBeCloseTo(expectedTotal, 2);
    }
  );

  // ── TC-050: Tax > 0 ───────────────────────────────────────
  test('TC-050: Tax hiển thị và có giá trị > 0', async ({ cartWithItems }) => {
    const chk = await navigateToCheckout(cartWithItems.page);
    await chk.fillInfo(VALID_CHECKOUT);
    await chk.continue();
    const tax = await chk.getTax();
    expect(tax).toBeGreaterThan(0);
  });

  // ── TC-051: Total = ItemTotal + Tax ───────────────────────
  test('TC-051: Total = Item Total + Tax (chênh lệch ≤ $0.01)',
    async ({ cartWithItems }) => {
      const chk = await navigateToCheckout(cartWithItems.page);
      await chk.fillInfo(VALID_CHECKOUT);
      await chk.continue();
      const { itemTotal, tax, total } = await chk.getPriceBreakdown();
      const expected = parseFloat((itemTotal + tax).toFixed(2));
      expect(Math.abs(total - expected)).toBeLessThanOrEqual(0.01);
    }
  );

  // ── TC-052: Back Home → inventory, cart rỗng ─────────────
  test('TC-052: Back Home sau xác nhận → Inventory và cart rỗng',
    async ({ cartWithItems }) => {
      const chk = await navigateToCheckout(cartWithItems.page);
      await chk.completeCheckout(VALID_CHECKOUT);
      await chk.backHomeButton.click();
      await expect(chk.page).toHaveURL(/.*inventory/);
      const inv = new (require('../../pages/InventoryPage').InventoryPage)(chk.page);
      await expect(inv.cartBadge).not.toBeVisible();
    }
  );

  // ── TC-053: Checkout nhiều sản phẩm ──────────────────────
  test('TC-053: E2E checkout với 3 sản phẩm – xác nhận thành công',
    async ({ loggedInPage }) => {
      await loggedInPage.addMultipleToCart([0, 1, 2]);
      await loggedInPage.goToCart();
      const cart = new CartPage(loggedInPage.page);
      expect(await cart.getItemCount()).toBe(3);
      await cart.checkout();
      const chk = new CheckoutPage(loggedInPage.page);
      await chk.completeCheckout(VALID_CHECKOUT);
      await chk.expectOrderComplete();
    }
  );

});
