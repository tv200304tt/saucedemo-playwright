# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: products\product-list.spec.js >> Module PRODUCT LIST – 10 Test Cases >> TC-019: Sort lohi – mảng giá hoàn toàn tăng dần
- Location: tests\products\product-list.spec.js:55:7

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
  3   | 
  4   | export class InventoryPage extends BasePage {
  5   |   constructor(page) {
  6   |     super(page);
  7   | 
  8   |     this.productItems     = page.locator('.inventory_item');
  9   |     this.cartBadge        = page.locator('.shopping_cart_badge');
  10  |     this.cartLink         = page.locator('.shopping_cart_link');
  11  |     this.sortDropdown     = page.locator('[data-test="product_sort_container"]');
  12  |   }
  13  | 
  14  |   // ── ACTIONS ─────────────────────────
  15  | 
  16  |   async sortBy(option) {
  17  |     const firstBefore = await this.getFirstProductName();
  18  | 
> 19  |     await this.sortDropdown.selectOption(option);
      |                             ^ TimeoutError: locator.selectOption: Timeout 10000ms exceeded.
  20  | 
  21  |     // wait sort apply thật sự
  22  |     await this.page.waitForFunction(
  23  |       ([selector, prev]) => {
  24  |         const el = document.querySelector(selector);
  25  |         return el && el.textContent !== prev;
  26  |       },
  27  |       ['.inventory_item_name', firstBefore]
  28  |     );
  29  |   }
  30  | 
  31  |   async clickProductName(index) {
  32  |     await this.productItems.nth(index)
  33  |       .locator('.inventory_item_name')
  34  |       .click();
  35  |   }
  36  | 
  37  |   async clickProductImage(index) {
  38  |     await this.productItems.nth(index)
  39  |       .locator('.inventory_item_img img')
  40  |       .click();
  41  |   }
  42  | 
  43  |   // ── GETTERS ─────────────────────────
  44  | 
  45  |   async getProductCount() {
  46  |     return await this.productItems.count();
  47  |   }
  48  | 
  49  |   async getAllProductNames() {
  50  |     const names = [];
  51  |     const count = await this.productItems.count();
  52  | 
  53  |     for (let i = 0; i < count; i++) {
  54  |       const text = await this.productItems.nth(i)
  55  |         .locator('.inventory_item_name')
  56  |         .textContent();
  57  | 
  58  |       names.push(text.trim());
  59  |     }
  60  | 
  61  |     return names;
  62  |   }
  63  | 
  64  |   async getFirstProductName() {
  65  |     const text = await this.productItems.first()
  66  |       .locator('.inventory_item_name')
  67  |       .textContent();
  68  | 
  69  |     return text.trim();
  70  |   }
  71  | 
  72  |   async getAllPrices() {
  73  |     const prices = [];
  74  |     const count = await this.productItems.count();
  75  | 
  76  |     for (let i = 0; i < count; i++) {
  77  |       const text = await this.productItems.nth(i)
  78  |         .locator('.inventory_item_price')
  79  |         .textContent();
  80  | 
  81  |       prices.push(parseFloat(text.replace('$', '').trim()));
  82  |     }
  83  | 
  84  |     return prices;
  85  |   }
  86  | 
  87  |   async getFirstProductPrice() {
  88  |     const text = await this.productItems.first()
  89  |       .locator('.inventory_item_price')
  90  |       .textContent();
  91  | 
  92  |     return parseFloat(text.replace('$', '').trim());
  93  |   }
  94  | 
  95  |   // ── ASSERTIONS ─────────────────────
  96  | 
  97  |   async expectBadgeCount(count) {
  98  |     await expect(this.cartBadge).toHaveText(String(count));
  99  |   }
  100 | 
  101 |   async expectBadgeNotVisible() {
  102 |     await expect(this.cartBadge).not.toBeVisible();
  103 |   }
  104 | } /*$ts = Get-Date -Format "yyyyMMdd-HHmmss"
  105 | npx playwright test  tests/products/product-list.spec.js  --reporter=html --output=reports/$ts*/
```