import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Valid Login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('admin', 'password');
});