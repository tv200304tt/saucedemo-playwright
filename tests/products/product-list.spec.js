// tests/products/product-list.spec.js
import { test, expect } from '../../fixtures/pages.fixture';

import { PRODUCT_NAMES_AZ, PRODUCT_PRICES_LOHI } from '../../helpers/test-data';
import { SortOption } from '../../helpers/constants';

test.describe('Module PRODUCT LIST – 10 Test Cases', () => {

  // ── TC-013: Đúng 6 sản phẩm ──────────────────────────────
  test('TC-013: Hiển thị đúng 6 sản phẩm sau login', async ({ loggedInPage }) => {
    await expect(loggedInPage.productItems).toHaveCount(6);
  });

  // ── TC-014: Mỗi sp đủ thành phần ─────────────────────────
  test('TC-014: Mỗi sản phẩm có ảnh, tên, mô tả, giá, nút', async ({ loggedInPage }) => {
    const items = await loggedInPage.productItems.all();
    for (const item of items) {
      await expect(item.locator('img')).toBeVisible();
      await expect(item.locator('.inventory_item_name')).toBeVisible();
      await expect(item.locator('.inventory_item_desc')).toBeVisible();
      await expect(item.locator('.inventory_item_price')).toBeVisible();
      await expect(item.locator('button')).toBeVisible();
    }
  });

  // ── TC-015: Sort A→Z ──────────────────────────────────────
  test('TC-015: Sort A→Z – item đầu là Sauce Labs Backpack', async ({ loggedInPage }) => {
    await loggedInPage.sortBy(SortOption.NameAZ);
    const firstName = await loggedInPage.getFirstProductName();
    expect(firstName).toBe('Sauce Labs Backpack');
  });

  // ── TC-016: Sort Z→A ──────────────────────────────────────
  test('TC-016: Sort Z→A – item đầu là Test.allTheThings()', async ({ loggedInPage }) => {
    await loggedInPage.sortBy(SortOption.NameZA);
    const firstName = await loggedInPage.getFirstProductName();
    expect(firstName).toContain('Test.allTheThings');
  });

  // ── TC-017: Sort giá thấp→cao ─────────────────────────────
  test('TC-017: Sort Price Low→High – giá đầu $7.99', async ({ loggedInPage }) => {
    await loggedInPage.sortBy(SortOption.PriceLowHigh);
    const price = await loggedInPage.getFirstProductPrice();
    expect(price).toBe(7.99);
  });

  // ── TC-018: Sort giá cao→thấp ─────────────────────────────
  test('TC-018: Sort Price High→Low – giá đầu $49.99', async ({ loggedInPage }) => {
    await loggedInPage.sortBy(SortOption.PriceHighLow);
    const price = await loggedInPage.getFirstProductPrice();
    expect(price).toBe(49.99);
  });

  // ── TC-019: Toàn bộ mảng giá tăng dần ───────────────────
  test('TC-019: Sort lohi – mảng giá hoàn toàn tăng dần', async ({ loggedInPage }) => {
    await loggedInPage.sortBy(SortOption.PriceLowHigh);
    const prices = await loggedInPage.getAllPrices();
    expect(prices).toEqual([...PRODUCT_PRICES_LOHI]);
    // Kiểm tra thứ tự: mỗi phần tử <= phần tử kế tiếp
    prices.forEach((p, i) => {
      if (i > 0) expect(prices[i - 1]).toBeLessThanOrEqual(p);
    });
  });

  // ── TC-020: Toàn bộ mảng giá giảm dần ───────────────────
  test('TC-020: Sort hilo – mảng giá hoàn toàn giảm dần', async ({ loggedInPage }) => {
    await loggedInPage.sortBy(SortOption.PriceHighLow);
    const prices = await loggedInPage.getAllPrices();
    prices.forEach((p, i) => {
      if (i > 0) expect(prices[i - 1]).toBeGreaterThanOrEqual(p);
    });
  });

  // ── TC-021: Click tên sp → detail ─────────────────────────
  test('TC-021: Click tên sản phẩm → mở trang chi tiết', async ({ loggedInPage }) => {
    const productName = await loggedInPage.getFirstProductName();
    await loggedInPage.clickProductName(0);
    await expect(loggedInPage.page).toHaveURL(/.*inventory-item/);
    // Xác nhận tên hiển thị đúng trên trang detail
    await expect(loggedInPage.page.locator('.inventory_details_name'))
      .toHaveText(productName);
  });

  // ── TC-022: Click ảnh sp → detail ─────────────────────────
  test('TC-022: Click ảnh sản phẩm → mở trang chi tiết', async ({ loggedInPage }) => {
    await loggedInPage.clickProductImage(0);
    await expect(loggedInPage.page).toHaveURL(/.*inventory-item/);
  });

});
