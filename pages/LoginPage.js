// pages/LoginPage.js
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton   = page.locator('[data-test="login-button"]');

    this.errorMessage  = page.locator('[data-test="error"]');
    this.errorCloseBtn = page.locator('.error-button');

    this.inventoryList = page.locator('.inventory_list');
  }

  async goto() {
    
  await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    
  }

  
  async login(username, password) {
    await this.usernameInput.fill(username ?? '');
    await this.passwordInput.fill(password ?? '');
    await this.loginButton.click();
  }

  async loginWithCredentials(creds) {
    await this.login(creds.username, creds.password);
  }

  async loginWithEnter(username, password) {
    await this.usernameInput.fill(username ?? '');
    await this.passwordInput.fill(password ?? '');
    await this.passwordInput.press('Enter');
  }

  async dismissError() {
    await this.errorCloseBtn.click();
  }

  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }

  async getPasswordInputType() {
    return await this.passwordInput.getAttribute('type');
  }

  // SUCCESS 
  async expectLoginSuccess() {
    await this.page.waitForURL(/inventory/);
    await expect(this.inventoryList).toBeVisible();
  }

  // FAIL 
  async expectLoginError(message) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}