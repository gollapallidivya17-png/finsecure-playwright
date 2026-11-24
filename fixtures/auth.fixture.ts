import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { DashboardPage } from '../pages/dashbordpage';
import { FundTransferPage } from '../pages/fundtransferpage';
import users from '../test-data/users.json';

type Fixtures = {
  /** Login page, already opened */
  loginPage: LoginPage;
  /** Accounts Overview page, already logged in as the valid test user */
  dashboardPage: DashboardPage;
  /** Transfer Funds page, already logged in and opened */
  transferPage: FundTransferPage;
};

/**
 * Custom fixtures. Import `test` and `expect` from this file
 * instead of '@playwright/test' to use them.
 */
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);

    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.heading).toBeVisible();
    await use(dashboardPage);
  },

  // Builds on dashboardPage, so the user is already logged in
  transferPage: async ({ page, dashboardPage }, use) => {
    const transferPage = new FundTransferPage(page);
    await transferPage.goto();
    await use(transferPage);
  },
});

export { expect };
