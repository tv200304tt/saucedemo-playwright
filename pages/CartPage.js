// pages/CartPage.js
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems          = page.locator('.cart_item');
    this.removeButtons      = page.locator('[data-test^="remove"]');
    this.checkoutButton     = page.locator('[data-test="checkout"]');
    this.continueShoppingBtn= page.locator('[data-test="continue-shopping"]');
    this.itemNames          = page.locator('.inventory_item_name');
    this.itemPrices         = page.locator('.inventory_item_price');
    this.itemQtys           = page.locator('.cart_quantity');
  }

  // ── Actions ──────────────────────────────────────────────────────────
  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
    await this.page.waitForURL(/.*inventory/);
  }

  // alias để tương thích tên cũ nếu có
  async clickContinueShopping() {
    await this.continueShopping();
  }

  async removeItem(index = 0) {
    await this.removeButtons.nth(index).click();
  }

  // ── Getters ───────────────────────────────────────────────────────────
  async getItemCount() {
    return this.cartItems.count();
  }

  async getAllItemPrices() {
    const texts = await this.itemPrices.allTextContents();
    return texts.map(t => parseFloat(t.replace('$', '')));
  }

  async getAllItemNames() {
    return this.itemNames.allTextContents();
  }

  async getItemName(index = 0) {
    return this.getTextContent(this.itemNames.nth(index));
  }

  async getItemPrice(index = 0) {
    return this.parsePrice(this.itemPrices.nth(index));
  }
}

module.exports = { CartPage };