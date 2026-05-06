// tests/cart/cart.spec.js
// Module CART – 11 Test Cases (TC-030 đến TC-040)
// Áp dụng kỹ thuật: Boundary Value Analysis (0-6 items), State Transition, Persistence

const { test, expect } = require('../../fixtures/pages.fixture');
const { InventoryPage } = require('../../pages/InventoryPage');
const { CartPage }      = require('../../pages/CartPage');

// ─────────────────────────────────────────────────────────────────────────────
// Helper: lấy số trên cart badge (trả về 0 nếu badge không hiển thị)
// ─────────────────────────────────────────────────────────────────────────────
async function getCartBadgeCount(page) {
  const badge = page.locator('.shopping_cart_badge');
  const visible = await badge.isVisible();
  if (!visible) return 0;
  const text = await badge.textContent();
  return parseInt(text.trim(), 10);
}

// ─────────────────────────────────────────────────────────────────────────────
test.describe('Module CART – 11 Test Cases', () => {

  // ── TC-030: Giỏ hàng rỗng khi chưa thêm gì ────────────────────────────────
  test('TC-030: Giỏ hàng rỗng khi chưa add sản phẩm nào', async ({ loggedInPage }) => {
    // Badge không hiển thị khi chưa add sp nào
    await expect(loggedInPage.cartBadge).not.toBeVisible();

    // Vào cart và kiểm tra rỗng
    await loggedInPage.goToCart();
    const cart = new CartPage(loggedInPage.page);
    const count = await cart.getItemCount();
    expect(count).toBe(0);
  });

  // ── TC-031: Badge = 1 khi thêm 1 sản phẩm ─────────────────────────────────
  test('TC-031: Thêm 1 sản phẩm → badge hiển thị "1"', async ({ loggedInPage }) => {
    await loggedInPage.addToCart(0);

    await expect(loggedInPage.cartBadge).toBeVisible();
    await expect(loggedInPage.cartBadge).toHaveText('1');
  });

  // ── TC-032: Badge = 3 khi thêm 3 sản phẩm khác nhau ──────────────────────
  test('TC-032: Thêm 3 sản phẩm khác nhau → badge = "3"', async ({ loggedInPage }) => {
    await loggedInPage.addMultipleToCart([0, 1, 2]);

    await expect(loggedInPage.cartBadge).toHaveText('3');
  });

  // ── TC-033: BVA – Badge = 6 khi thêm tất cả sản phẩm (biên trên) ──────────
    test('TC-033: Thêm tất cả 6 sản phẩm → badge = "6" (biên trên)', async ({ loggedInPage }) => {
    // KHÔNG dùng addMultipleToCart([0,1,2,3,4,5]) vì sau khi add sp[0],
    // nút đó đổi thành "Remove" → các nút "add-to-cart" còn lại re-index.
    // Dùng addAllToCart() luôn click nút đầu tiên còn lại cho đến hết.
    await loggedInPage.addAllToCart();
 
    await expect(loggedInPage.cartBadge).toHaveText('6');
 
    // Xác nhận đúng 6 items trong cart
    await loggedInPage.goToCart();
    const cart = new CartPage(loggedInPage.page);
    const count = await cart.getItemCount();
    expect(count).toBe(6);
  });

  // ── TC-034: Xóa 1 trong 3 sản phẩm → badge giảm xuống 2 ──────────────────
  test('TC-034: Xóa 1 trong 3 sản phẩm → badge giảm xuống "2"', async ({ loggedInPage }) => {
    await loggedInPage.addMultipleToCart([0, 1, 2]);
    await expect(loggedInPage.cartBadge).toHaveText('3');

    // Xóa sản phẩm đầu tiên ngay trên trang inventory
    await loggedInPage.removeFromCart(0);

    await expect(loggedInPage.cartBadge).toHaveText('2');
  });

  // ── TC-035: Xóa sản phẩm duy nhất → badge biến mất hoàn toàn ─────────────
  test('TC-035: Xóa sản phẩm duy nhất → badge biến mất', async ({ loggedInPage }) => {
    await loggedInPage.addToCart(0);
    await expect(loggedInPage.cartBadge).toHaveText('1');

    // Xóa sản phẩm → nút đổi lại "Add to cart"
    await loggedInPage.removeFromCart(0);

    await expect(loggedInPage.cartBadge).not.toBeVisible();

    // Xác nhận nút đã đổi lại thành "Add to cart"
    const addBtn = loggedInPage.page.locator('[data-test^="add-to-cart"]').first();
    await expect(addBtn).toBeVisible();
  });

  // ── TC-036: Tên và giá sản phẩm trong cart hiển thị đúng ──────────────────
  test('TC-036: Tên & giá sản phẩm trong cart khớp với trang inventory', async ({ loggedInPage }) => {
    // Lấy tên và giá từ trang inventory TRƯỚC KHI add
    const expectedName  = await loggedInPage.getFirstProductName();
    const expectedPrice = await loggedInPage.getFirstProductPrice();

    await loggedInPage.addToCart(0);
    await loggedInPage.goToCart();

    const cart = new CartPage(loggedInPage.page);

    // Kiểm tra tên trong cart
    const cartName = await cart.page.locator('.inventory_item_name').first().textContent();
    expect(cartName.trim()).toBe(expectedName);

    // Kiểm tra giá trong cart
    const cartPriceText = await cart.page.locator('.inventory_item_price').first().textContent();
    const cartPrice = parseFloat(cartPriceText.replace('$', ''));
    expect(cartPrice).toBe(expectedPrice);
  });

  // ── TC-037: Số lượng (Qty) mỗi item trong cart = 1 ────────────────────────
  test('TC-037: Qty của mỗi sản phẩm trong cart = 1', async ({ loggedInPage }) => {
    // SauceDemo không hỗ trợ qty > 1 cho cùng một sản phẩm
    await loggedInPage.addMultipleToCart([0, 1]);
    await loggedInPage.goToCart();

    const qtyLabels = loggedInPage.page.locator('.cart_quantity');
    const count = await qtyLabels.count();

    // Kiểm tra tất cả qty đều = 1
    for (let i = 0; i < count; i++) {
      const qtyText = await qtyLabels.nth(i).textContent();
      expect(parseInt(qtyText.trim(), 10)).toBe(1);
    }
  });

  // ── TC-038: Giỏ hàng giữ nguyên sau khi reload trang (localStorage) ────────
  test('TC-038: Giỏ hàng giữ nguyên sau khi F5 reload trang', async ({ loggedInPage }) => {
    await loggedInPage.addMultipleToCart([0, 1]);
    const badgeBefore = await getCartBadgeCount(loggedInPage.page);
    expect(badgeBefore).toBe(2);

    // Reload trang
   await loggedInPage.page.reload();
   await expect(loggedInPage.cartBadge).toHaveText('2');
    // Badge vẫn phải = 2 (nhờ localStorage)
    const badgeAfter = await getCartBadgeCount(loggedInPage.page);
    expect(badgeAfter).toBe(2);
  });

  // ── TC-039: Continue Shopping → về inventory, badge giữ nguyên ────────────
  test('TC-039: Continue Shopping → về /inventory.html, badge không thay đổi', async ({ loggedInPage }) => {
    await loggedInPage.addMultipleToCart([0, 1]);
    await loggedInPage.goToCart();
 
    const cart = new CartPage(loggedInPage.page);
    await cart.continueShopping();
 
    // Phải về lại trang inventory
    await expect(loggedInPage.page).toHaveURL(/.*inventory/);
 
    // Badge vẫn = 2 (giỏ hàng không thay đổi)
    await expect(loggedInPage.cartBadge).toHaveText('2');
  });
 

  // ── TC-040: Nút "Add to cart" đổi thành "Remove" sau khi thêm ─────────────
  test('TC-040: Nút "Add to cart" đổi thành "Remove" sau khi click', async ({ loggedInPage }) => {
    // Trước khi add: nút phải là "Add to cart"
    const firstProduct = loggedInPage.page.locator('.inventory_item').first();
    const btnBefore = firstProduct.locator('button');
    await expect(btnBefore).toHaveText('Add to cart');

    // Click Add to cart
    await loggedInPage.addToCart(0);

    // Sau khi add: nút phải đổi thành "Remove"
    const btnAfter = firstProduct.locator('button');
    await expect(btnAfter).toHaveText('Remove');

    // Click Remove → nút đổi lại "Add to cart"
    await loggedInPage.removeFromCart(0);
    await expect(btnBefore).toHaveText('Add to cart');
  });

});