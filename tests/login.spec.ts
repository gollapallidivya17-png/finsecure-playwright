import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import users from '../test-data/users.json';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid user can log in and see Accounts Overview', async ({ page }) => {
    const { username, password, fullName } = users.validUser;

    await loginPage.login(username, password);

    await expect(page).toHaveURL(/overview\.htm/);
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
    await expect(page.locator('#leftPanel')).toContainText(`Welcome ${fullName}`);
  });

  test('logged-in user can log out', async ({ page }) => {
    const { username, password } = users.validUser;

    await loginPage.login(username, password);
    await page.getByRole('link', { name: 'Log Out' }).click();

    await expect(loginPage.loginButton).toBeVisible();
  });

  // Data-driven: one test per row in test-data/users.json
  for (const data of users.invalidLogins) {
    test(`shows an error for ${data.case}`, async ({ page }) => {
      await loginPage.login(data.username, data.password);

      await expect(loginPage.errorMessage).toHaveText(data.expectedError);
      await expect(page).not.toHaveURL(/overview\.htm/);
    });
  }
});
