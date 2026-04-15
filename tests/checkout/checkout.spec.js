import { test, expect } from '../../fixtures/pages.fixture';
import { VALID_CHECKOUT, INVALID_CHECKOUT_CASES } from '../../helpers/test-data';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('CHECKOUT', () => {

  async function navigateToCheckout(page) {
    const cart = new CartPage(page);
    await cart.checkout();
    await page.waitForURL(/checkout-step-one/);
    return new CheckoutPage(page);
  }

  test('TC-041: Checkout success', async ({ cartWithItems }) => {
    const chk = await navigateToCheckout(cartWithItems.page);
    await chk.completeCheckout(VALID_CHECKOUT);
    await chk.expectOrderComplete();
  });

  for (const { desc, data, expectedError } of INVALID_CHECKOUT_CASES) {
    test(`Validation - ${desc}`, async ({ cartWithItems }) => {
      const chk = await navigateToCheckout(cartWithItems.page);
      await chk.fillInfo(data);
      await chk.continue();
      await chk.expectErrorMessage(expectedError);
    });
  }

});