import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  constructor(page) {
    super(page);

    this.productItems     = page.locator('.inventory_item');
    this.cartBadge        = page.locator('.shopping_cart_badge');
    this.cartLink         = page.locator('.shopping_cart_link');
    this.sortDropdown     = page.locator('[data-test="product_sort_container"]');
  }

  // ── ACTIONS ─────────────────────────

 async sortBy(option) {
  // đảm bảo dropdown tồn tại
  await this.sortDropdown.waitFor({ state: 'visible', timeout: 10000 });

  const firstBefore = await this.getFirstProductName();

  await this.sortDropdown.selectOption(option);

  // wait sort apply
  await this.page.waitForFunction(
    ([selector, prev]) => {
      const el = document.querySelector(selector);
      return el && el.textContent !== prev;
    },
    ['.inventory_item_name', firstBefore]
  );
}

  async clickProductName(index) {
    await this.productItems.nth(index)
      .locator('.inventory_item_name')
      .click();
  }

  async clickProductImage(index) {
    await this.productItems.nth(index)
      .locator('.inventory_item_img img')
      .click();
  }

  // ── GETTERS ─────────────────────────

  async getProductCount() {
    return await this.productItems.count();
  }

  async getAllProductNames() {
    const names = [];
    const count = await this.productItems.count();

    for (let i = 0; i < count; i++) {
      const text = await this.productItems.nth(i)
        .locator('.inventory_item_name')
        .textContent();

      names.push(text.trim());
    }

    return names;
  }

  async getFirstProductName() {
    const text = await this.productItems.first()
      .locator('.inventory_item_name')
      .textContent();

    return text.trim();
  }

  async getAllPrices() {
    const prices = [];
    const count = await this.productItems.count();

    for (let i = 0; i < count; i++) {
      const text = await this.productItems.nth(i)
        .locator('.inventory_item_price')
        .textContent();

      prices.push(parseFloat(text.replace('$', '').trim()));
    }

    return prices;
  }

  async getFirstProductPrice() {
    const text = await this.productItems.first()
      .locator('.inventory_item_price')
      .textContent();

    return parseFloat(text.replace('$', '').trim());
  }

  // ── ASSERTIONS ─────────────────────

  async expectBadgeCount(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectBadgeNotVisible() {
    await expect(this.cartBadge).not.toBeVisible();
  }
} /*$ts = Get-Date -Format "yyyyMMdd-HHmmss"
npx playwright test  tests/products/product-list.spec.js  --reporter=html --output=reports/$ts*/