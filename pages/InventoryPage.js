// pages/InventoryPage.js
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.productItems     = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.removeButtons    = page.locator('[data-test^="remove"]');
    this.cartBadge        = page.locator('.shopping_cart_badge');
    this.cartLink         = page.locator('.shopping_cart_link');
    this.sortDropdown     = page.locator('[data-test="product-sort-container"]');
    this.productNames     = page.locator('.inventory_item_name');
    this.productPrices    = page.locator('.inventory_item_price');
    this.productImages    = page.locator('.inventory_item_img img');
  }

  // ── Actions ──────────────────────────────────────────────────────────
  async addToCart(index) {
    await this.addToCartButtons.nth(index).click();
  }

  async addMultipleToCart(indices) {
    for (const i of indices) {
      await this.addToCart(i);
    }
  }

  async addAllToCart() {
    const count = await this.addToCartButtons.count();
    for (let i = 0; i < count; i++) {
      // Luôn click nút đầu tiên vì sau mỗi lần click nút đó biến mất
      await this.addToCartButtons.first().click();
    }
  }

  async removeFromCart(index) {
    await this.removeButtons.nth(index).click();
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
    await this.page.waitForTimeout(300);
  }

  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForURL(/.*cart/);
  }

  async clickProductName(index) {
  const item = this.productItems.nth(index);

  await item.locator('.inventory_item_name').click();
}

  async clickProductImage(index) {
    await this.productImages.nth(index).click();
  }

  // ── Getters ───────────────────────────────────────────────────────────
  async getProductCount() {
    return this.productItems.count();
  }

  async getCartBadgeText() {
    return this.getTextContent(this.cartBadge);
  }

  async getAllProductNames() {
    return this.productNames.allTextContents();
  }

  async getAllPrices() {
    const texts = await this.productPrices.allTextContents();
    return texts.map(t => parseFloat(t.replace('$', '')));
  }

  async getFirstProductName() {
    return this.getTextContent(this.productNames.first());
  }

  async getFirstProductPrice() {
    return this.parsePrice(this.productPrices.first());
  }

  // ── Assertions ────────────────────────────────────────────────────────
  async expectBadgeCount(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectBadgeNotVisible() {
    await expect(this.cartBadge).not.toBeVisible();
  }
}

module.exports = { InventoryPage };