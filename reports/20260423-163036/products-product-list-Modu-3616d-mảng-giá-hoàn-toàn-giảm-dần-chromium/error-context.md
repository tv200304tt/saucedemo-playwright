# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: products\product-list.spec.js >> Module PRODUCT LIST – 10 Test Cases >> TC-020: Sort hilo – mảng giá hoàn toàn giảm dần
- Location: tests\products\product-list.spec.js:66:7

# Error details

```
TimeoutError: locator.selectOption: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-test="product_sort_container"]')

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
      - generic [ref=e14]:
        - generic [ref=e15]: Products
        - generic [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: Name (A to Z)
          - combobox [ref=e19]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e23]:
      - generic [ref=e24]:
        - link "Sauce Labs Backpack" [ref=e26] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - link "Sauce Labs Backpack" [ref=e30] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e31]: Sauce Labs Backpack
            - generic [ref=e32]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e33]:
            - generic [ref=e34]: $29.99
            - button "Add to cart" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - link "Sauce Labs Bike Light" [ref=e38] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e39]
        - generic [ref=e40]:
          - generic [ref=e41]:
            - link "Sauce Labs Bike Light" [ref=e42] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e43]: Sauce Labs Bike Light
            - generic [ref=e44]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e45]:
            - generic [ref=e46]: $9.99
            - button "Add to cart" [ref=e47] [cursor=pointer]
      - generic [ref=e48]:
        - link "Sauce Labs Bolt T-Shirt" [ref=e50] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e54] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e55]: Sauce Labs Bolt T-Shirt
            - generic [ref=e56]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e57]:
            - generic [ref=e58]: $15.99
            - button "Add to cart" [ref=e59] [cursor=pointer]
      - generic [ref=e60]:
        - link "Sauce Labs Fleece Jacket" [ref=e62] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e63]
        - generic [ref=e64]:
          - generic [ref=e65]:
            - link "Sauce Labs Fleece Jacket" [ref=e66] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e67]: Sauce Labs Fleece Jacket
            - generic [ref=e68]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e69]:
            - generic [ref=e70]: $49.99
            - button "Add to cart" [ref=e71] [cursor=pointer]
      - generic [ref=e72]:
        - link "Sauce Labs Onesie" [ref=e74] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]:
            - link "Sauce Labs Onesie" [ref=e78] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e79]: Sauce Labs Onesie
            - generic [ref=e80]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e81]:
            - generic [ref=e82]: $7.99
            - button "Add to cart" [ref=e83] [cursor=pointer]
      - generic [ref=e84]:
        - link "Test.allTheThings() T-Shirt (Red)" [ref=e86] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e87]
        - generic [ref=e88]:
          - generic [ref=e89]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e90] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e91]: Test.allTheThings() T-Shirt (Red)
            - generic [ref=e92]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e93]:
            - generic [ref=e94]: $15.99
            - button "Add to cart" [ref=e95] [cursor=pointer]
  - contentinfo [ref=e96]:
    - list [ref=e97]:
      - listitem [ref=e98]:
        - link "Twitter" [ref=e99] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e100]:
        - link "Facebook" [ref=e101] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e102]:
        - link "LinkedIn" [ref=e103] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e104]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1   | import { expect } from '@playwright/test';
  2   | import { BasePage } from './BasePage';
  3   | import { SortOption } from '../helpers/constants';
  4   | 
  5   | export class InventoryPage extends BasePage {
  6   |   constructor(page) {
  7   |     super(page);
  8   | 
  9   |     this.productItems     = page.locator('.inventory_item');
  10  |     this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
  11  |     this.removeButtons    = page.locator('[data-test^="remove"]');
  12  |     this.cartBadge        = page.locator('.shopping_cart_badge');
  13  |     this.cartLink         = page.locator('.shopping_cart_link');
  14  |     this.sortDropdown     = page.locator('[data-test="product_sort_container"]');
  15  | 
  16  |     // ❌ không dùng trực tiếp cho assert order
  17  |     this.productNames     = page.locator('.inventory_item_name');
  18  |     this.productPrices    = page.locator('.inventory_item_price');
  19  |     this.productImages    = page.locator('.inventory_item_img img');
  20  |   }
  21  | 
  22  |   // ── Actions ───────────────────────────────────────────────
  23  | 
  24  |   async addToCart(index) {
  25  |     await this.productItems.nth(index)
  26  |       .locator('[data-test^="add-to-cart"]')
  27  |       .click();
  28  |   }
  29  | 
  30  |   async addMultipleToCart(indices) {
  31  |     for (const i of indices) {
  32  |       await this.addToCart(i);
  33  |     }
  34  |   }
  35  | 
  36  |   async addAllToCart() {
  37  |     const count = await this.productItems.count();
  38  |     for (let i = 0; i < count; i++) {
  39  |       await this.productItems.nth(i)
  40  |         .locator('[data-test^="add-to-cart"]')
  41  |         .click();
  42  |     }
  43  |   }
  44  | 
  45  |   async removeFromCart(index) {
  46  |     await this.productItems.nth(index)
  47  |       .locator('[data-test^="remove"]')
  48  |       .click();
  49  |   }
  50  | 
  51  |   async sortBy(option) {
> 52  |     await this.sortDropdown.selectOption(option);
      |                             ^ TimeoutError: locator.selectOption: Timeout 10000ms exceeded.
  53  | 
  54  |     // ✔ chờ UI update ổn định (không dùng timeout)
  55  |     await this.productItems.first().waitFor();
  56  |   }
  57  | 
  58  |   async goToCart() {
  59  |     await this.cartLink.click();
  60  |     await this.page.waitForURL(/.*cart/);
  61  |   }
  62  | 
  63  |   async clickProductName(index) {
  64  |     await this.productItems.nth(index)
  65  |       .locator('.inventory_item_name')
  66  |       .click();
  67  |   }
  68  | 
  69  |   async clickProductImage(index) {
  70  |     await this.productItems.nth(index)
  71  |       .locator('.inventory_item_img img')
  72  |       .click();
  73  |   }
  74  | 
  75  |   // ── Getters ───────────────────────────────────────────────
  76  | 
  77  |   async getProductCount() {
  78  |     return await this.productItems.count();
  79  |   }
  80  | 
  81  |   async getCartBadgeText() {
  82  |     return await this.getTextContent(this.cartBadge);
  83  |   }
  84  | 
  85  |   // ✔ lấy theo thứ tự DOM (QUAN TRỌNG)
  86  |   async getAllProductNames() {
  87  |     const names = [];
  88  |     const count = await this.productItems.count();
  89  | 
  90  |     for (let i = 0; i < count; i++) {
  91  |       const text = await this.productItems.nth(i)
  92  |         .locator('.inventory_item_name')
  93  |         .textContent();
  94  | 
  95  |       names.push(text.trim());
  96  |     }
  97  | 
  98  |     return names;
  99  |   }
  100 | 
  101 |   // ✔ parse chuẩn + đúng order
  102 |   async getAllPrices() {
  103 |     const prices = [];
  104 |     const count = await this.productItems.count();
  105 | 
  106 |     for (let i = 0; i < count; i++) {
  107 |       const text = await this.productItems.nth(i)
  108 |         .locator('.inventory_item_price')
  109 |         .textContent();
  110 | 
  111 |       prices.push(this.#parsePrice(text));
  112 |     }
  113 | 
  114 |     return prices;
  115 |   }
  116 | 
  117 |   async getFirstProductName() {
  118 |     const text = await this.productItems.first()
  119 |       .locator('.inventory_item_name')
  120 |       .textContent();
  121 | 
  122 |     return text.trim();
  123 |   }
  124 | 
  125 |   async getFirstProductPrice() {
  126 |     const text = await this.productItems.first()
  127 |       .locator('.inventory_item_price')
  128 |       .textContent();
  129 | 
  130 |     return this.#parsePrice(text);
  131 |   }
  132 | 
  133 |   // ── Private ───────────────────────────────────────────────
  134 | 
  135 |   #parsePrice(text) {
  136 |     return parseFloat(text.replace('$', '').trim());
  137 |   }
  138 | 
  139 |   // ── Assertions ────────────────────────────────────────────
  140 | 
  141 |   async expectBadgeCount(count) {
  142 |     await expect(this.cartBadge).toHaveText(String(count));
  143 |   }
  144 | 
  145 |   async expectBadgeNotVisible() {
  146 |     await expect(this.cartBadge).not.toBeVisible();
  147 |   }
  148 | }
```