import * as path from 'path';
import { test, expect } from '../fixtures/auth.fixture';
import { readCsv } from '../utils/helpers';

type TransferCase = {
  case: string;
  amount: string;
  expected: 'success' | 'rejected';
  knownBug: string;
};

// Data-driven: every row in transfers.csv becomes a test
const cases = readCsv<TransferCase>(path.join(__dirname, '../test-data/transfers.csv'));

test.describe('Fund Transfer', () => {
  for (const data of cases.filter((c) => c.expected === 'success')) {
    test(`transfers a ${data.case} ($${data.amount})`, async ({ transferPage }) => {
      const { from, to } = await transferPage.transfer(data.amount);

      await expect(transferPage.resultTitle).toHaveText('Transfer Complete!');
      await expect(transferPage.amountResult).toHaveText(`$${Number(data.amount).toFixed(2)}`);
      await expect(transferPage.fromAccountResult).toHaveText(from);
      await expect(transferPage.toAccountResult).toHaveText(to);
    });
  }

  for (const data of cases.filter((c) => c.expected === 'rejected')) {
    test(`rejects ${data.case} ("${data.amount}")`, async ({ transferPage }) => {
      // Known app bugs are kept as tests: they show as "expected to fail"
      // in the report, and will flag it when ParaBank fixes the bug.
      test.fail(data.knownBug !== '', data.knownBug);

      await transferPage.transfer(data.amount);

      // Wait for the app to respond, then check the transfer did NOT go through
      await expect(
        transferPage.resultPanel.or(transferPage.errorPanel).filter({ visible: true }),
      ).toBeVisible();
      await expect(transferPage.resultPanel).toBeHidden();
    });
  }
});
