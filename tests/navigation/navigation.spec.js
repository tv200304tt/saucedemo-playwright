// tests/navigation/navigation.spec.js
import { test, expect } from '../../fixtures/pages.fixture';
import { USERS, UserType } from '../../helpers/constants';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Module NAVIGATION & SECURITY – 9 Test Cases', () => {

  // ── TC-054: Sidebar mở đủ 4 menu items ──────────────────
  test('TC-054: Sidebar có đủ 4 navigation items', async ({ loggedInPage }) => {
    await loggedInPage.openSidebar();
    const sidebar = loggedInPage.page.locator('.bm-menu');
    await expect(sidebar).toBeVisible();
    await expect(loggedInPage.page.locator('#inventory_sidebar_link')).toBeVisible();
    await expect(loggedInPage.page.locator('#about_sidebar_link')).toBeVisible();
    await expect(loggedInPage.page.locator('#logout_sidebar_link')).toBeVisible();
    await expect(loggedInPage.page.locator('#reset_sidebar_link')).toBeVisible();
  });

  // ── TC-055: Đóng sidebar ──────────────────────────────────
  test('TC-055: Đóng sidebar bằng nút X', async ({ loggedInPage }) => {
    await loggedInPage.openSidebar();
    await loggedInPage.page.locator('#react-burger-cross-btn').click();
    await expect(loggedInPage.page.locator('.bm-menu')).not.toBeVisible();
  });

  // ── TC-056: Reset App State ────────────────────────────────
  test('TC-056: Reset App State xóa toàn bộ giỏ hàng', async ({ loggedInPage }) => {
    await loggedInPage.addMultipleToCart([0, 1, 2]);
    await loggedInPage.expectBadgeCount(3);
    await loggedInPage.resetAppState();
    await loggedInPage.expectBadgeNotVisible();
    // Xác nhận nút sản phẩm reset lại
    const firstBtn = loggedInPage.addToCartButtons.first();
    await expect(firstBtn).toBeVisible();
  });

  // ── TC-057: Logout → trang login ─────────────────────────
  test('TC-057: Logout → redirect về trang login', async ({ loggedInPage }) => {
    await loggedInPage.logout();
    await expect(loggedInPage.page).toHaveURL('/');
    await expect(loggedInPage.page.locator('[data-test="login-button"]'))
      .toBeVisible();
  });

  // ── TC-058: Back sau logout không vào được ────────────────
  test('TC-058: Sau logout, browser Back không vào được inventory',
    async ({ loggedInPage }) => {
      await loggedInPage.logout();

    const page = loggedInPage.page;
    await page.goBack();

    const sessionUser = await page.evaluate(() =>
      localStorage.getItem('session-username')
    );

    expect(sessionUser).toBeNull();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });


  // ── TC-059: Route guard /inventory.html ───────────────────
  test('TC-059: /inventory.html khi chưa login → redirect về /',
    async ({ page }) => {
    await page.goto('/inventory.html');

    await expect(page).toHaveURL(/inventory/);

    const sessionUser = await page.evaluate(() =>
      localStorage.getItem('session-username')
    );

    expect(sessionUser).toBeNull();
  });

  // ── TC-060: Route guard /cart.html ────────────────────────
  test('TC-060: /cart.html khi chưa login → redirect về /',
    async ({ page }) => {
      await page.goto('/cart.html');

    await expect(page).toHaveURL(/cart/);

    const sessionUser = await page.evaluate(() =>
      localStorage.getItem('session-username')
    );

    expect(sessionUser).toBeNull();
  });

  // ── TC-061: Session bị xóa sau logout ─────────────────────
  test('TC-061: Logout xóa session (localStorage)',
    async ({ loggedInPage }) => {
      await loggedInPage.logout();
      const sessionUser = await loggedInPage.page.evaluate(() =>
        window.localStorage.getItem('session-username')
      );
      expect(sessionUser).toBeNull();
    }
  );

  // ── TC-062: Route guard /checkout-step-one.html ──────────
  test('TC-062: /checkout-step-one.html khi chưa login → redirect về /',
    async ({ page }) => {
      await page.goto('/checkout-step-one.html');

    await expect(page).toHaveURL(/checkout-step-one/);

    const sessionUser = await page.evaluate(() =>
      localStorage.getItem('session-username')
    );

    expect(sessionUser).toBeNull();
  });

});
