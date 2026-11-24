import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';

// Quick smoke test: the app is up and the demo user can log in
test('Valid Login (smoke)', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('john', 'demo');

  await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
});
