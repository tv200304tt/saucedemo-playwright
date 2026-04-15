import { expect } from '@playwright/test';

// Mở rộng expect với matcher tùy chỉnh
export function extendExpect() {
  expect.extend({
    // Kiểm tra mảng giá tăng dần
    async toBeAscendingSorted(received) {
      const pass = received.every((val, i) =>
        i === 0 || received[i - 1] <= val
      );

      return {
        pass,
        message: () =>
          pass
            ? `Expected array NOT to be ascending sorted`
            : `Expected [${received}] to be ascending sorted`,
      };
    },

    // Kiểm tra mảng giá giảm dần
    async toBeDescendingSorted(received) {
      const pass = received.every((val, i) =>
        i === 0 || received[i - 1] >= val
      );

      return {
        pass,
        message: () =>
          pass
            ? `Expected array NOT to be descending sorted`
            : `Expected [${received}] to be descending sorted`,
      };
    },

    // Kiểm tra số gần đúng (tolerance)
    toBeWithinTolerance(received, expected, tolerance = 0.01) {
      const pass = Math.abs(received - expected) <= tolerance;

      return {
        pass,
        message: () =>
          `Expected ${received} to be within ${tolerance} of ${expected}`,
      };
    },
  });
}