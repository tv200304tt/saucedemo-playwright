import { test, expect } from '../../fixtures/pages.fixture';

test.describe('NAVIGATION', () => {

  test('TC-054: Sidebar hiển thị', async ({ loggedInPage }) => {
    await loggedInPage.openSidebar();
    await expect(loggedInPage.page.locator('.bm-menu')).toBeVisible();
  });

  test('TC-057: Logout', async ({ loggedInPage }) => {
    await loggedInPage.logout();
    await expect(loggedInPage.page).toHaveURL('/');
  });

  test('TC-059: Route guard inventory', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL('/');
  });

});