import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { DashboardPage } from '../pages/dashbordpage';
import users from '../test-data/users.json';

type Fixtures = {
  /** Login page, already opened */
  loginPage: LoginPage;
  /** Accounts Overview page, already logged in as the valid test user */
  dashboardPage: DashboardPage;
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
});

export { expect };
