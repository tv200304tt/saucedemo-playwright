import { test, expect } from '../../fixtures/pages.fixture';
import { SortOption } from '../../helpers/constants';
import { PRODUCT_PRICES_LOHI } from '../../helpers/test-data';

test.describe('Module PRODUCT LIST', () => {

  test('TC-013: Hiển thị 6 sản phẩm', async ({ loggedInPage }) => {
    await expect(loggedInPage.productItems).toHaveCount(6);
  });

  test('TC-014: UI đầy đủ', async ({ loggedInPage }) => {
    const items = await loggedInPage.productItems.all();
    for (const item of items) {
      await expect(item.locator('img')).toBeVisible();
      await expect(item.locator('.inventory_item_name')).toBeVisible();
      await expect(item.locator('.inventory_item_price')).toBeVisible();
    }
  });

  test('TC-015: Sort A-Z', async ({ loggedInPage }) => {
    await loggedInPage.sortBy(SortOption.NameAZ);
    expect(await loggedInPage.getFirstProductName())
      .toBe('Sauce Labs Backpack');
  });

  test('TC-017: Sort Low-High', async ({ loggedInPage }) => {
    await loggedInPage.sortBy(SortOption.PriceLowHigh);
    expect(await loggedInPage.getFirstProductPrice()).toBe(7.99);
  });

  test('TC-019: Verify mảng giá tăng', async ({ loggedInPage }) => {
    await loggedInPage.sortBy(SortOption.PriceLowHigh);
    const prices = await loggedInPage.getAllPrices();
    expect(prices).toEqual([...PRODUCT_PRICES_LOHI]);
  });

});