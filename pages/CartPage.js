import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);

    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');

    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShopping = page.locator('[data-test="continue-shopping"]');
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async getAllItemPrices() {
    const texts = await this.itemPrices.allTextContents();
    return texts.map(t => parseFloat(t.replace('$', '')));
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}