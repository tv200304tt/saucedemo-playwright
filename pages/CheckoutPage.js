// pages/CheckoutPage.js
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    // Step 1
    this.firstNameInput  = page.locator('[data-test="firstName"]');
    this.lastNameInput   = page.locator('[data-test="lastName"]');
    this.zipCodeInput    = page.locator('[data-test="postalCode"]');
    this.continueButton  = page.locator('[data-test="continue"]');
    this.cancelButton    = page.locator('[data-test="cancel"]');
    this.errorMessage    = page.locator('[data-test="error"]');
    this.errorClose      = page.locator('.error-button');

    // Step 2
    this.overviewItems   = page.locator('.cart_item');
    this.itemTotal       = page.locator('.summary_subtotal_label');
    this.taxLabel        = page.locator('.summary_tax_label');
    this.totalLabel      = page.locator('.summary_total_label');
    this.finishButton    = page.locator('[data-test="finish"]');
    this.overviewCancel  = page.locator('[data-test="cancel"]');

    // Confirmation
    this.confirmHeader   = page.locator('[data-test="complete-header"]');
    this.confirmText     = page.locator('[data-test="complete-text"]');
    this.backHomeButton  = page.locator('[data-test="back-to-products"]');
  }

  // ── Actions ───────────────────────────────────────────────
  async fillInfo(info) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.zipCodeInput.fill(info.zipCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async dismissError() {
    await this.errorClose.click();
  }

  async completeCheckout(info) {
    await this.fillInfo(info);
    await this.continue();
    await this.page.waitForURL(/.*checkout-step-two/);
    await this.finish();
    await this.page.waitForURL(/.*checkout-complete/);
  }

  // ── Getters ───────────────────────────────────────────────
  async getErrorMessage() {
    return await this.getTextContent(this.errorMessage);
  }

  async getItemTotal() {
    return await this.parsePrice(this.itemTotal);
  }

  async getTax() {
    return await this.parsePrice(this.taxLabel);
  }

  async getTotal() {
    return await this.parsePrice(this.totalLabel);
  }

  async getPriceBreakdown() {
    const [itemTotal, tax, total] = await Promise.all([
      this.getItemTotal(),
      this.getTax(),
      this.getTotal(),
    ]);
    return { itemTotal, tax, total };
  }

  // ── Assertions ────────────────────────────────────────────
  async expectOrderComplete() {
    await expect(this.confirmHeader).toContainText('Thank you for your order');
    await this.expectURL(/.*checkout-complete/);
  }

  async expectErrorMessage(message) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}