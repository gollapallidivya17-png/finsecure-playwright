# FinSecure – Playwright Automation Framework 🏦

> 🚧 **Work in progress.** I'm building this framework step by step while learning Playwright. Login is automated; the other areas are being added one at a time.

A test automation framework for the **[ParaBank](https://parabank.parasoft.com/parabank/index.htm)** demo banking application (a free practice site by Parasoft), written in **Playwright + TypeScript**.

## 🎯 Goals

- **Page Object Model**: one class per page (Login, Dashboard, Fund Transfer)
- **Reusable fixtures**: a login fixture so tests start already signed in
- **Data-driven tests**: test data kept in CSV and JSON files, not hard-coded
- **UI + API coverage**: browser tests plus API tests for fund transfers

## 📁 Project Structure

```
finsecure-playwright/
├── fixtures/
│   └── auth.fixture.ts          # login fixture
├── pages/
│   ├── Loginpage.ts             # Login page object
│   ├── dashbordpage.ts          # Dashboard page object
│   └── fundtransferpage.ts      # Fund Transfer page object
├── test-data/
│   ├── users.json               # login test data
│   └── transfers.csv            # fund transfer test data
├── playwright.config.ts         # base URL, reporter, browser
├── tests/
│   ├── api/
│   │   └── transfers-api.spec.ts
│   ├── login.spec.ts
│   ├── fund-transfer.spec.ts
│   └── loan.spec.ts
└── utils/
    └── helpers.ts
```

## ✅ Progress

| Area | Status |
|---|---|
| Project structure | ✅ Done |
| Login page object + tests (5 tests, data-driven) | ✅ Done |
| Login fixture | ⏭️ Next up |
| Fund transfer tests (data-driven) | 🔜 Planned |
| Loan tests | 🔜 Planned |
| Transfers API tests | 🔜 Planned |
| HTML report + GitHub Actions CI | 🔜 Planned |

## 🧪 Login Tests

| Test | What it checks |
|---|---|
| Valid login | Lands on Accounts Overview and shows "Welcome John Smith" |
| Log out | Returns to the login form |
| Wrong password | Shows "could not be verified" error |
| Unknown username | Shows "could not be verified" error |
| Empty fields | Shows "Please enter a username and password." |

The invalid-login cases come from `test-data/users.json`, so a new case is just a new row of data.

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
