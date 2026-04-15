import { test, expect } from '../../fixtures/pages.fixture';
import { USERS, UserType, PASSWORD } from '../../helpers/constants';

test.describe('Module LOGIN – 12 Test Cases', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // ── TC-001 ─────────────────────────────
  test('TC-001: Đăng nhập standard_user thành công', async ({ loginPage }) => {
    await loginPage.login(USERS[UserType.Standard].username, PASSWORD);
    await loginPage.expectLoginSuccess();
  });

  // ── TC-002 ─────────────────────────────
  test('TC-002: performance_glitch_user đăng nhập được', async ({ loginPage }) => {
    await loginPage.loginWithCredentials(USERS[UserType.PerformanceGlitch]);
    await loginPage.expectLoginSuccess();
  });

  // ── TC-003 ─────────────────────────────
  test('TC-003: problem_user đăng nhập được', async ({ loginPage }) => {
    await loginPage.loginWithCredentials(USERS[UserType.Problem]);
    await loginPage.expectLoginSuccess();
  });

  // ── TC-004 ─────────────────────────────
  test('TC-004: locked_out_user bị từ chối', async ({ loginPage }) => {
    await loginPage.loginWithCredentials(USERS[UserType.LockedOut]);
    await loginPage.expectLoginError(
      'Sorry, this user has been locked out'
    );
  });

  // ── TC-005 ─────────────────────────────
  test('TC-005: Sai password', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'wrong_password_xyz');
    await loginPage.expectLoginError(
      'Username and password do not match any user'
    );
  });

  // ── TC-006 ─────────────────────────────
  test('TC-006: Sai username', async ({ loginPage }) => {
    await loginPage.login('no_user', PASSWORD);
    await loginPage.expectLoginError(
      'Username and password do not match any user'
    );
  });

  // ── TC-007 ─────────────────────────────
  test('TC-007: Username trống', async ({ loginPage }) => {
    await loginPage.login('', PASSWORD);
    await loginPage.expectLoginError('Username is required');
  });

  // ── TC-008 ─────────────────────────────
  test('TC-008: Password trống', async ({ loginPage }) => {
    await loginPage.login('standard_user', '');
    await loginPage.expectLoginError('Password is required');
  });

  // ── TC-009 ─────────────────────────────
  test('TC-009: Cả hai trống', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.expectLoginError('Username is required');
  });

  // ── TC-010 ─────────────────────────────
  test('TC-010: Đóng error', async ({ loginPage }) => {
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();

    await loginPage.dismissError();

    await expect(loginPage.errorMessage).not.toBeVisible();
  });

  // ── TC-011 ─────────────────────────────
  test('TC-011: Password input type', async ({ loginPage }) => {
    const type = await loginPage.getPasswordInputType();
    expect(type).toBe('password');
  });

  // ── TC-012 ─────────────────────────────
  test('TC-012: Enter submit', async ({ loginPage }) => {
    await loginPage.loginWithEnter('standard_user', PASSWORD);
    await loginPage.expectLoginSuccess();
  });

});