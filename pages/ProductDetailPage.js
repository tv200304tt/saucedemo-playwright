import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);

    // ── Locators ─────────────────────────────
    this.productName   = page.locator('.inventory_details_name');
    this.productDesc   = page.locator('.inventory_details_desc');
    this.productPrice  = page.locator('.inventory_details_price');
    this.productImage  = page.locator('.inventory_details_img img');

    this.addToCartBtn  = page.locator('[data-test^="add-to-cart"]');
    this.removeBtn     = page.locator('[data-test^="remove"]');

    this.backButton    = page.locator('[data-test="back-to-products"]');
    this.cartBadge     = page.locator('.shopping_cart_badge');
    this.cartLink      = page.locator('.shopping_cart_link');
  }

  // ── Actions ───────────────────────────────
  async addToCart() {
    await this.addToCartBtn.click();
  }

  async removeFromCart() {
    await this.removeBtn.click();
  }

  async goBackToProducts() {
    await this.backButton.click();
    await this.page.waitForURL(/.*inventory/);
  }

  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForURL(/.*cart/);
  }

  // ── Getters ───────────────────────────────
  async getProductName() {
    return await this.getTextContent(this.productName);
  }

  async getProductDescription() {
    return await this.getTextContent(this.productDesc);
  }

  async getProductPrice() {
    return await this.parsePrice(this.productPrice);
  }

  async getCartBadgeCount() {
    return await this.getTextContent(this.cartBadge);
  }

  // ── Assertions ────────────────────────────
  async expectProductDetailVisible() {
    await expect(this.productName).toBeVisible();
    await expect(this.productDesc).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productImage).toBeVisible();
  }

  async expectProductName(name) {
    await expect(this.productName).toHaveText(name);
  }

  async expectPrice(price) {
    const actual = await this.getProductPrice();
    expect(actual).toBe(price);
  }

  async expectAddedToCart() {
    await expect(this.removeBtn).toBeVisible();
  }

  async expectRemovedFromCart() {
    await expect(this.addToCartBtn).toBeVisible();
  }

  async expectCartBadge(count) {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}