import { test, expect, Page } from "@playwright/test";
import lumxConfig from "../lumx.json";
import { MOCKED_USER_WITHOUT_NAME } from "./__mocks__/user";

const otpInteractionFactory = async (page: Page) => {
  for (let i = 0; i < 6; i++) {
    const otpInput = page.getByLabel(
      `Código de 6 dígitos. Character ${i + 1}.`
    );

    await otpInput.click();
    await otpInput.fill(i.toString());
  }
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("User", () => {
  test("should be able to create an account with email clicking on the login button and claim", async ({
    page,
  }) => {
    await expect(page).toHaveTitle(lumxConfig.pageTitle);

    //Mocking responses
    await page.route(
      `https://protocol-sandbox.lumx.io/v1/sessions`,
      async (route) => {
        await route.fulfill({
          status: 201,
        });
      }
    );

    await page.route(
      `https://protocol-sandbox.lumx.io/v1/verify-code`,
      async (route) => {
        await route.fulfill({
          status: 201,
          json: {
            token: "valid-token",
            account: MOCKED_USER_WITHOUT_NAME,
          },
        });
      }
    );

    await page.route(
      `https://protocol-sandbox.lumx.io/v1/users/me`,
      async (route) => {
        await route.fulfill({
          json: {
            ...MOCKED_USER_WITHOUT_NAME,
            name: "Nicolau Riess",
          },
          status: 200,
        });
      }
    );

    const loginButton = page.getByRole("button", {
      name: "Conecte sua carteira",
    });

    const lumxLogo = page.getByRole("img", { name: "lumx logo" });

    const claimButton = page.getByRole("button", { name: "Resgatar" });

    const textInfo = page.getByText("Resgate agora!");

    expect(loginButton).toBeVisible();
    expect(lumxLogo).toBeVisible();
    expect(claimButton).toBeVisible();
    expect(textInfo).toBeVisible();

    await loginButton.click();

    const emailInput = page.getByPlaceholder("Insira o seu e-mail ou");

    const sessionPromise = page.waitForResponse((resp) =>
      resp.url().includes("sessions")
    );

    const verifiedCodePromise = page.waitForResponse((resp) =>
      resp.url().includes("verify-code")
    );

    await emailInput.click();
    await emailInput.fill(MOCKED_USER_WITHOUT_NAME.email);
    await emailInput.press("Enter");

    const resendCodeButton = page.getByRole("button", {
      name: "Reenviar código",
    });

    await sessionPromise;

    await otpInteractionFactory(page);

    await verifiedCodePromise;

    await expect(resendCodeButton).not.toBeVisible();

    const nameInput = page.getByPlaceholder("Insira seu nome");

    await nameInput.click();
    await nameInput.fill("Nicolau Riess");
    await nameInput.press("Enter");
    const updateUsersPromise = page.waitForResponse((resp) =>
      resp.url().includes("users/me")
    );

    const documentInput = page.getByPlaceholder("Insira seu CPF");
    await documentInput.press("Enter");

    await updateUsersPromise;

    await expect(page.getByText("Sua conta foi criada com")).toBeVisible();

    const continueButton = page.getByRole("button", { name: "Continuar" });

    expect(continueButton).toBeVisible();
    await continueButton.click();

    await claimButton.click();

    await page.waitForTimeout(5000);

    const seeProfileButton = page.getByRole("link", { name: "Ver meu perfil" });
    expect(seeProfileButton).toBeVisible();

    await seeProfileButton.click();
  });
});
