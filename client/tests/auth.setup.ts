import { test as setup, expect } from "@playwright/test";
import SignInPage from "../src/pages/SignInPage";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  console.log(process.env);
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://cs3219-c0869.web.app/sign-in");
  await page
    .getByLabel("Email address")
    .fill(process.env.REACT_APP_TEST_EMAIL!);
  await page.getByLabel("Password").fill(process.env.REACT_APP_TEST_PASSWORD!);
  await page.getByRole("button", { name: "sign-in" }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL("https://cs3219-c0869.web.app/");
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByText(process.env["test_email"]!)).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
