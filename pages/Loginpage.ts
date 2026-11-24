import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the ParaBank login form.
 * Keeps all login locators and actions in one place,
 * so tests only describe *what* to check, not *how* to click.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[type="submit"][value="Log In"]');
    this.errorMessage = page.locator('#rightPanel .error');
  }

  async goto() {
    await this.page.goto('index.htm');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
