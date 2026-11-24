# FinSecure – Playwright Automation Framework 🏦

> 🚧 **Work in progress.** I'm building this framework step by step while learning Playwright. The folder structure is set up; tests and page objects are being added one at a time.

A test automation framework for a sample banking application, written in **Playwright + TypeScript**.

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
| Login page object + tests | ⏭️ Next up |
| Login fixture | 🔜 Planned |
| Fund transfer tests (data-driven) | 🔜 Planned |
| Loan tests | 🔜 Planned |
| Transfers API tests | 🔜 Planned |
| HTML report + GitHub Actions CI | 🔜 Planned |

## ▶️ How to Run

```bash
npm install -D @playwright/test
npx playwright install
npx playwright test
npx playwright show-report
```

## 🛠️ Tech

Playwright · TypeScript · Node.js

---

👩‍💻 **Author:** [Divya Gollapalli](https://github.com/gollapallidivya17-png), Software Test Engineer learning automation
