import { test, expect } from '../../fixtures/pages.fixture';
import { ProductDetailPage } from '../../pages/ProductDetailPage';

test.describe('Module PRODUCT DETAIL – 8 Test Cases', () => {

  // Helper: vào trang detail của sản phẩm đầu tiên
  async function goToFirstProductDetail(loggedInPage) {
    const name = await loggedInPage.getFirstProductName();
    const price = await loggedInPage.getFirstProductPrice();

    await loggedInPage.clickProductName(0);

    const detail = new ProductDetailPage(loggedInPage.page);

    return { detail, name, price };
  }

  // ── TC-023: UI đầy đủ ───────────────────────────────
  test('TC-023: Product detail hiển thị đầy đủ thông tin', async ({ loggedInPage }) => {
    const { detail } = await goToFirstProductDetail(loggedInPage);

    await detail.expectProductDetailVisible();
  });

  // ── TC-024: Name consistency ───────────────────────
  test('TC-024: Tên sản phẩm detail khớp với list', async ({ loggedInPage }) => {
    const { detail, name } = await goToFirstProductDetail(loggedInPage);

    await detail.expectProductName(name);
  });

  // ── TC-025: Price consistency ──────────────────────
  test('TC-025: Giá sản phẩm detail khớp với list', async ({ loggedInPage }) => {
    const { detail, price } = await goToFirstProductDetail(loggedInPage);

    const detailPrice = await detail.getProductPrice();
    expect(detailPrice).toBe(price);
  });

  // ── TC-026: Add to cart ────────────────────────────
  test('TC-026: Add to cart thành công', async ({ loggedInPage }) => {
    const { detail } = await goToFirstProductDetail(loggedInPage);

    await detail.addToCart();
    await detail.expectAddedToCart();
  });

  // ── TC-027: Remove from cart ───────────────────────
  test('TC-027: Remove from cart thành công', async ({ loggedInPage }) => {
    const { detail } = await goToFirstProductDetail(loggedInPage);

    await detail.addToCart();
    await detail.removeFromCart();

    await detail.expectRemovedFromCart();
  });

  // ── TC-028: Cart badge update ──────────────────────
  test('TC-028: Cart badge hiển thị đúng sau khi add', async ({ loggedInPage }) => {
    const { detail } = await goToFirstProductDetail(loggedInPage);

    await detail.addToCart();
    await detail.expectCartBadge(1);
  });

  // ── TC-029: Back to inventory ──────────────────────
  test('TC-029: Back to products quay về inventory', async ({ loggedInPage }) => {
    const { detail } = await goToFirstProductDetail(loggedInPage);

    await detail.goBackToProducts();
    await expect(detail.page).toHaveURL(/inventory/);
  });

  // ── TC-030: Navigate to cart ───────────────────────
  test('TC-030: Click cart icon chuyển sang cart page', async ({ loggedInPage }) => {
    const { detail } = await goToFirstProductDetail(loggedInPage);

    await detail.goToCart();
    await expect(detail.page).toHaveURL(/cart/);
  });

});