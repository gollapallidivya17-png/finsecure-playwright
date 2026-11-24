# FinSecure – Playwright Automation Framework 🏦

[![Playwright Tests](https://github.com/gollapallidivya17-png/finsecure-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/gollapallidivya17-png/finsecure-playwright/actions/workflows/playwright.yml)

> 🚧 **Work in progress.** I'm building this framework step by step while learning Playwright. Login, Accounts Overview and Fund Transfer are automated; the other areas are being added one at a time.

A test automation framework for the **[ParaBank](https://parabank.parasoft.com/parabank/index.htm)** demo banking application (a free practice site by Parasoft), written in **Playwright + TypeScript**.

## 🎯 Goals

- **Page Object Model**: one class per page (Login, Dashboard, Fund Transfer)
- **Reusable fixtures**: a login fixture so tests start already signed in
- **Data-driven tests**: test data kept in CSV and JSON files, not hard-coded
- **UI + API coverage**: browser tests plus API tests for fund transfers

## 📁 Project Structure

```
finsecure-playwright/
├── .github/workflows/
│   └── playwright.yml           # CI: runs tests on every push
├── fixtures/
│   └── auth.fixture.ts          # loginPage, dashboardPage, transferPage fixtures
├── pages/
│   ├── Loginpage.ts             # Login page object
│   ├── dashbordpage.ts          # Accounts Overview page object
│   └── fundtransferpage.ts      # Fund Transfer page object
├── test-data/
│   ├── users.json               # login test data
│   └── transfers.csv            # fund transfer test cases
├── playwright.config.ts         # base URL, reporter, browser
├── tests/
│   ├── api/
│   │   └── transfers-api.spec.ts
│   ├── dashboard.spec.ts
│   ├── login.spec.ts
│   ├── fund-transfer.spec.ts
│   └── loan.spec.ts
└── utils/
    └── helpers.ts               # readCsv() for CSV test data
```

## ✅ Progress

| Area | Status |
|---|---|
| Project structure | ✅ Done |
| Login page object + tests (data-driven) | ✅ Done |
| Login fixture (tests start already signed in) | ✅ Done |
| Accounts Overview page object + tests | ✅ Done |
| Fund transfer page object + tests (data-driven from CSV) | ✅ Done |
| Loan tests | ⏭️ Next up |
| Transfers API tests | 🔜 Planned |
| HTML report + GitHub Actions CI (runs on every push) | ✅ Done |

## 🧪 Tests

**Login** (`tests/login.spec.ts`)

| Test | What it checks |
|---|---|
| Valid login | Lands on Accounts Overview and shows "Welcome John Smith" |
| Wrong password | Shows "could not be verified" error |
| Unknown username | Shows "could not be verified" error |
| Empty fields | Shows "Please enter a username and password." |

The invalid-login cases come from `test-data/users.json`, so a new case is just a new row of data.

**Accounts Overview** (`tests/dashboard.spec.ts`), each test starts already logged in via the `dashboardPage` fixture:

| Test | What it checks |
|---|---|
| Greeting | Shows "Welcome John Smith" |
| Accounts list | At least one account, with a valid account number and balance |
| Log out | Returns to the login form |

**Fund Transfer** (`tests/fund-transfer.spec.ts`), driven by `test-data/transfers.csv` and starting on the Transfer Funds page via the `transferPage` fixture:

| Test | Amount | Expected |
|---|---|---|
| Whole dollar amount | 100 | "Transfer Complete!" with $100.00 and the right accounts |
| Decimal amount | 25.50 | "Transfer Complete!" with $25.50 |
| Small amount | 1 | "Transfer Complete!" with $1.00 |
| Empty amount | *(blank)* | Transfer is rejected |
| Text instead of a number | abc | Transfer is rejected |
| Negative amount | -5 | Transfer is rejected 🐞 *known bug* |
| Zero amount | 0 | Transfer is rejected 🐞 *known bug* |

## 🐞 Bugs Found

Testing ParaBank turned up real defects. Bugs 1 and 2 are kept as tests marked with `test.fail()`, so it shows as **"expected to fail"** in the report and the suite stays green. If ParaBank ever fixes a bug, that test will flag it.

| # | Bug | Steps | Expected | Actual |
|---|---|---|---|---|
| 1 | Negative transfer accepted | Transfer Funds → amount `-5` → Transfer | Rejected with a validation error | "Transfer Complete! -$5.00 has been transferred" |
| 2 | Zero transfer accepted | Transfer Funds → amount `0` → Transfer | Rejected with a validation error | "Transfer Complete! $0.00 has been transferred" |
| 3 | No friendly message for empty or text amount | Transfer Funds → leave amount blank (or type `abc`) → Transfer | "The amount cannot be empty." / "Please enter a valid amount." | "An internal error has occurred and has been logged." |

## 🔐 Using the Fixtures

Import `test` from the fixture file instead of `@playwright/test`, then ask for the fixture by name:

```ts
import { test, expect } from '../fixtures/auth.fixture';

test('my test', async ({ dashboardPage }) => {
  // already logged in and on Accounts Overview
  await expect(dashboardPage.accountRows.first()).toBeVisible();
});
```

## ▶️ How to Run

```bash
npm install
npx playwright install chromium
npm test                # run all tests
npm run test:headed     # watch the browser
npm run report          # open the HTML report
```

> ParaBank is a shared public demo, so it can occasionally be slow or reset its data.

## 🛠️ Tech

Playwright · TypeScript · Node.js

---

👩‍💻 **Author:** [Divya Gollapalli](https://github.com/gollapallidivya17-png), Software Test Engineer learning automation
