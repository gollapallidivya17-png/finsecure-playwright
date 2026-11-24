import { test, expect } from '../fixtures/auth.fixture';
import users from '../test-data/users.json';

// Every test here starts already logged in, thanks to the dashboardPage fixture
test.describe('Accounts Overview', () => {
  test('greets the user by name', async ({ dashboardPage }) => {
    await expect(dashboardPage.welcomeMessage).toHaveText(`Welcome ${users.validUser.fullName}`);
  });

  test('lists at least one account with a balance', async ({ dashboardPage }) => {
    await expect(dashboardPage.accountRows.first()).toBeVisible();

    const firstAccount = dashboardPage.accountRows.first();
    await expect(firstAccount.locator('td').nth(0)).toHaveText(/^\d+$/);     // account number
    await expect(firstAccount.locator('td').nth(1)).toHaveText(/^-?\$[\d,]+\.\d{2}$/); // balance
  });

  test('user can log out', async ({ dashboardPage, page }) => {
    await dashboardPage.logout();

    await expect(page.locator('input[type="submit"][value="Log In"]')).toBeVisible();
  });
});
