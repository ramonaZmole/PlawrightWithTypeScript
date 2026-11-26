import test, { expect } from '../../helpers/fixtures/test-fixture'
import { requireEnv } from '../../helpers/env'

const testCases = [
  { username: requireEnv('ADMIN_USERNAME'), password: requireEnv('ADMIN_PASSWORD'), isLoggedIn: true },
  { username: 'invalidUser', password: 'invalidPassword', isLoggedIn: false }
]

for (const { username, password, isLoggedIn } of testCases) {
  test(`Login as user ${username}`, async ({ page, loginPage }) => {
    await page.goto(requireEnv('ADMIN_URL'))
    await loginPage.login(username, password)
    if (isLoggedIn) {
      await expect(page).toHaveURL(/\/admin\/rooms/)
    } else {
      await expect(page.getByText('Invalid credentials')).toBeVisible()
    }
  })
}
