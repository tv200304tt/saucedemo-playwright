# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout\checkout.spec.js >> Module CHECKOUT – 13 Test Cases (incl. Data-Driven) >> TC-051: Total = Item Total + Tax (chênh lệch ≤ $0.01)
- Location: tests\checkout\checkout.spec.js:98:7

# Error details

```
ReferenceError: page is not defined
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
        - generic [ref=e14]: "2"
      - generic [ref=e16]: Your Cart
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: QTY
        - generic [ref=e21]: Description
        - generic [ref=e22]:
          - generic [ref=e23]: "1"
          - generic [ref=e24]:
            - link "Sauce Labs Backpack" [ref=e25] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e26]: Sauce Labs Backpack
            - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e28]:
              - generic [ref=e29]: $29.99
              - button "Remove" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - generic [ref=e32]: "1"
          - generic [ref=e33]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e34] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e35]: Sauce Labs Bolt T-Shirt
            - generic [ref=e36]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
            - generic [ref=e37]:
              - generic [ref=e38]: $15.99
              - button "Remove" [ref=e39] [cursor=pointer]
      - generic [ref=e40]:
        - button "Go back Continue Shopping" [ref=e41] [cursor=pointer]:
          - img "Go back" [ref=e42]
          - text: Continue Shopping
        - button "Checkout" [ref=e43] [cursor=pointer]
  - contentinfo [ref=e44]:
    - list [ref=e45]:
      - listitem [ref=e46]:
        - link "Twitter" [ref=e47] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e48]:
        - link "Facebook" [ref=e49] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e50]:
        - link "LinkedIn" [ref=e51] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e52]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1   | // tests/checkout/checkout.spec.js
  2   | import { Page } from '@playwright/test';
  3   | import { test, expect } from '../../fixtures/pages.fixture';
  4   | import {
  5   |   VALID_CHECKOUT, INVALID_CHECKOUT_CASES, generateCheckoutInfo
  6   | } from '../../helpers/test-data';
  7   | import { CartPage } from '../../pages/CartPage';
  8   | import { CheckoutPage } from '../../pages/CheckoutPage';
  9   | 
  10  | test.describe('Module CHECKOUT – 13 Test Cases (incl. Data-Driven)', () => {
  11  | 
  12  |   // Helper: đưa hệ thống về trạng thái 'đang ở checkout step 1'
  13  |   async function navigateToCheckout(Page) {
> 14  |     const cartPage = new CartPage(page);
      |                                   ^ ReferenceError: page is not defined
  15  |     await cartPage.checkout();
  16  |     await page.waitForURL(/.*checkout-step-one/);
  17  |     return new CheckoutPage(page);
  18  |   }
  19  | 
  20  |   // ── TC-041: Checkout thành công ───────────────────────────
  21  |   test('TC-041: E2E – Checkout hoàn chỉnh với thông tin hợp lệ',
  22  |     async ({ cartWithItems }) => {
  23  |       const chk = await navigateToCheckout(cartWithItems.page);
  24  |       await chk.completeCheckout(VALID_CHECKOUT);
  25  |       await chk.expectOrderComplete();
  26  |     }
  27  |   );
  28  | 
  29  |   // ── TC-042–045: DATA-DRIVEN Validation ───────────────────
  30  |   // Sử dụng for..of để tạo 4 test cases từ INVALID_CHECKOUT_CASES
  31  |   for (const { desc, data, expectedError } of INVALID_CHECKOUT_CASES) {
  32  |     test(`TC Validation – ${desc}`, async ({ cartWithItems }) => {
  33  |       const chk = await navigateToCheckout(cartWithItems.page);
  34  |       await chk.fillInfo(data);
  35  |       await chk.continue();
  36  |       await chk.expectErrorMessage(expectedError);
  37  |     });
  38  |   }
  39  | 
  40  |   // ── TC-046: Đóng lỗi bằng X ──────────────────────────────
  41  |   test('TC-046: Dismiss error message bằng nút X', async ({ cartWithItems }) => {
  42  |     const chk = await navigateToCheckout(cartWithItems.page);
  43  |     await chk.fillInfo({ firstName: '', lastName: '', zipCode: '' });
  44  |     await chk.continue();
  45  |     await expect(chk.errorMessage).toBeVisible();
  46  |     await chk.dismissError();
  47  |     await expect(chk.errorMessage).not.toBeVisible();
  48  |   });
  49  | 
  50  |   // ── TC-047: Cancel step 1 → cart ──────────────────────────
  51  |   test('TC-047: Cancel step 1 → quay về cart', async ({ cartWithItems }) => {
  52  |     const chk = await navigateToCheckout(cartWithItems.page);
  53  |     await chk.cancel();
  54  |     await expect(chk.page).toHaveURL(/.*cart/);
  55  |     // Verify giỏ hàng vẫn còn
  56  |     const cart = new CartPage(chk.page);
  57  |     expect(await cart.getItemCount()).toBeGreaterThan(0);
  58  |   });
  59  | 
  60  |   // ── TC-048: Cancel step 2 → inventory ─────────────────────
  61  |   test('TC-048: Cancel step 2 (Overview) → về Inventory', async ({ cartWithItems }) => {
  62  |     const chk = await navigateToCheckout(cartWithItems.page);
  63  |     await chk.fillInfo(VALID_CHECKOUT);
  64  |     await chk.continue();
  65  |     await chk.page.waitForURL(/.*checkout-step-two/);
  66  |     await chk.cancel();
  67  |     await expect(chk.page).toHaveURL(/.*inventory/);
  68  |   });
  69  | 
  70  |   // ── TC-049: Item Total = tổng giá ─────────────────────────
  71  |   test('TC-049: Item Total = tổng giá sản phẩm (trước thuế)',
  72  |     async ({ loggedInPage }) => {
  73  |       // Add 2 sản phẩm biết trước giá
  74  |       await loggedInPage.addMultipleToCart([0, 1]); // backpack $29.99 + bike $9.99
  75  |       await loggedInPage.goToCart();
  76  |       const cart = new CartPage(loggedInPage.page);
  77  |       const prices = await cart.getAllItemPrices();
  78  |       const expectedTotal = prices.reduce((a, b) => a + b, 0);
  79  |       await cart.checkout();
  80  |       const chk = new CheckoutPage(loggedInPage.page);
  81  |       await chk.fillInfo(VALID_CHECKOUT);
  82  |       await chk.continue();
  83  |       const itemTotal = await chk.getItemTotal();
  84  |       expect(itemTotal).toBeCloseTo(expectedTotal, 2);
  85  |     }
  86  |   );
  87  | 
  88  |   // ── TC-050: Tax > 0 ───────────────────────────────────────
  89  |   test('TC-050: Tax hiển thị và có giá trị > 0', async ({ cartWithItems }) => {
  90  |     const chk = await navigateToCheckout(cartWithItems.page);
  91  |     await chk.fillInfo(VALID_CHECKOUT);
  92  |     await chk.continue();
  93  |     const tax = await chk.getTax();
  94  |     expect(tax).toBeGreaterThan(0);
  95  |   });
  96  | 
  97  |   // ── TC-051: Total = ItemTotal + Tax ───────────────────────
  98  |   test('TC-051: Total = Item Total + Tax (chênh lệch ≤ $0.01)',
  99  |     async ({ cartWithItems }) => {
  100 |       const chk = await navigateToCheckout(cartWithItems.page);
  101 |       await chk.fillInfo(VALID_CHECKOUT);
  102 |       await chk.continue();
  103 |       const { itemTotal, tax, total } = await chk.getPriceBreakdown();
  104 |       const expected = parseFloat((itemTotal + tax).toFixed(2));
  105 |       expect(Math.abs(total - expected)).toBeLessThanOrEqual(0.01);
  106 |     }
  107 |   );
  108 | 
  109 |   // ── TC-052: Back Home → inventory, cart rỗng ─────────────
  110 |   test('TC-052: Back Home sau xác nhận → Inventory và cart rỗng',
  111 |     async ({ cartWithItems }) => {
  112 |       const chk = await navigateToCheckout(cartWithItems.page);
  113 |       await chk.completeCheckout(VALID_CHECKOUT);
  114 |       await chk.backHomeButton.click();
```