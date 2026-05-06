const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) { this.page = page; }

  async navigate(path = '/') {
    await this.page.goto(path);
  }

  async getTextContent(locator) {
    return ((await locator.textContent()) || '').trim();
  }

  async parsePrice(locator) {
    const text = await this.getTextContent(locator);
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  async openSidebar() {
    const menuButton = this.page.locator('#react-burger-menu-btn');

    await menuButton.click();

    // Wait menu item usable
    await expect(
      this.page.locator('#logout_sidebar_link')
    ).toBeVisible();
  }


  


  async logout() {
    await this.openSidebar();
    await this.page.locator('#logout_sidebar_link').click();
    await this.page.waitForURL('/');
  }

  async resetAppState() {
    await this.openSidebar();
    await this.page.locator('#reset_sidebar_link').click();
    await this.page.locator('#react-burger-cross-btn').click();
  }
}

module.exports = { BasePage };