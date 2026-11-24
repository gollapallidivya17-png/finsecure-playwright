import { Page, Locator } from '@playwright/test';

/**
 * Page Object for ParaBank's "Transfer Funds" page.
 */
export class FundTransferPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly amountInput: Locator;
  readonly fromAccount: Locator;
  readonly toAccount: Locator;
  readonly transferButton: Locator;

  // Shown after a successful transfer
  readonly resultPanel: Locator;
  readonly resultTitle: Locator;
  readonly amountResult: Locator;
  readonly fromAccountResult: Locator;
  readonly toAccountResult: Locator;

  // Shown when the transfer fails
  readonly errorPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Transfer Funds' });
    this.amountInput = page.locator('#amount');
    this.fromAccount = page.locator('#fromAccountId');
    this.toAccount = page.locator('#toAccountId');
    this.transferButton = page.locator('input[type="submit"][value="Transfer"]');

    this.resultPanel = page.locator('#showResult');
    this.resultTitle = this.resultPanel.getByRole('heading');
    this.amountResult = page.locator('#amountResult');
    this.fromAccountResult = page.locator('#fromAccountIdResult');
    this.toAccountResult = page.locator('#toAccountIdResult');

    this.errorPanel = page.locator('#showError');
  }

  async goto() {
    await this.page.goto('transfer.htm');
    // Account lists are loaded after the page opens, so wait for them
    await this.fromAccount.locator('option').first().waitFor({ state: 'attached' });
  }

  /**
   * Fills in and submits the transfer form.
   * Returns the account numbers that were picked, so tests can check the confirmation.
   */
  async transfer(amount: string, fromIndex = 0, toIndex = 1) {
    await this.amountInput.fill(amount);
    await this.fromAccount.selectOption({ index: fromIndex });
    await this.toAccount.selectOption({ index: toIndex });

    const from = await this.fromAccount.inputValue();
    const to = await this.toAccount.inputValue();

    await this.transferButton.click();
    return { from, to };
  }
}
