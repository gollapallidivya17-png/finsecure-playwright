import { test, expect } from '../fixtures/auth.fixture';
import users from '../test-data/users.json';

test.describe('Login', () => {
  test('valid user can log in and see Accounts Overview', async ({ page, loginPage }) => {
    const { username, password, fullName } = users.validUser;

    await loginPage.login(username, password);

    await expect(page).toHaveURL(/overview\.htm/);
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
    await expect(page.locator('#leftPanel')).toContainText(`Welcome ${fullName}`);
  });

  // Data-driven: one test per row in test-data/users.json
  for (const data of users.invalidLogins) {
    test(`shows an error for ${data.case}`, async ({ page, loginPage }) => {
      await loginPage.login(data.username, data.password);

      await expect(loginPage.errorMessage).toHaveText(data.expectedError);
      await expect(page).not.toHaveURL(/overview\.htm/);
    });
  }
});
