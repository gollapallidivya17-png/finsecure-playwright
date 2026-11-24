import { Page, Locator } from '@playwright/test';

/**
 * Page Object for ParaBank's "Accounts Overview" page,
 * the page a user lands on after logging in.
 */
export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly welcomeMessage: Locator;
  readonly accountRows: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Accounts Overview' });
    this.welcomeMessage = page.locator('#leftPanel .smallText');
    // Every account row links to that account; the "Total" row has no link
    this.accountRows = page.locator('#accountTable tbody tr').filter({ has: page.locator('a') });
    this.logoutLink = page.getByRole('link', { name: 'Log Out' });
  }

  async logout() {
    await this.logoutLink.click();
  }
}
