# Playwright with TypeScript

This repository contains end-to-end tests for the Restful Booker Platform demo, written with Playwright and TypeScript.

## Prerequisites

- Node.js 18 (the version used by the GitHub Actions workflow) and npm
- Access to a test instance and valid admin credentials

## First-time setup

Clone the repository and install the exact dependencies recorded in the lockfile:

```powershell
git clone https://github.com/ramonaZmole/PlawrightWithTypeScript.git
cd PlawrightWithTypeScript
npm ci
```

Install the Chromium browser used by the tests:

```powershell
npx playwright install chromium
```

On Linux, install the browser's system dependencies as well:

```sh
npx playwright install --with-deps chromium
```

## Configure the test environment

The Playwright configuration loads `.env` by default. Make sure it has values for:

```dotenv
URL=https://your-test-instance
ADMIN_URL=https://your-test-instance
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-password
```

`URL` and `ADMIN_URL` should point to the intended test instance. The tests use the admin page at `/admin`. The repository also supports `.env.qa` and `.env.staging`; select one in PowerShell before running tests:

```powershell
$env:test_env = "qa"
npm run all
Remove-Item Env:test_env
```

Use `"staging"` to load `.env.staging`. With no `test_env` set, Playwright loads `.env`.

Use a dedicated test instance and account: the tests submit invalid contact-form data and create and delete rooms. Keep private credentials out of source control.

## Run the tests

Run the complete suite:

```powershell
npm run all
```

The script runs the Playwright specs in `tests/` using Chromium. To run Playwright directly instead:

```powershell
npx playwright test
```

Playwright saves an HTML report to `playwright-report/` after a test run. Start the report viewer with:

```powershell
npm run report
```

The viewer runs a local web server at `http://localhost:9324`; stop it with `Ctrl+C` when finished. If that port is in use, choose another with `npm run report -- --port 9325`. Run the tests without overriding the configured reporter to generate the HTML report.

If Playwright reports that its browser executable is missing, install Chromium with `npx playwright install chromium`.
