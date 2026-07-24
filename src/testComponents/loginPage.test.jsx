import { render, screen } from "@testing-library/react";
import LoginPage from "../pages/login/LoginPage";
import { describe, expect, test } from "vitest";
import { Provider } from "react-redux";
import store from "../store/CentralStore.jsx";
import userEvent from "@testing-library/user-event";
import ForgotPssword from "../pages/login/loginComponents/ForgotPassword";

describe("forgot password status", () => {
  test("render login form while isFogot is false", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );
    // checking login button is available
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    const forgotTitle = screen.queryByText(/forgot password/i);
    expect(forgotTitle).toBeInTheDocument();
  });
  test("render forgotPassword form while isForgot is true", async () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );
    const forgotPasswordButton = screen.getByText(/forgot password/i);
    await userEvent.click(forgotPasswordButton);
    const sendLink = screen.getByText(/send link/i);
    expect(sendLink).toBeInTheDocument();
    const loginButton = screen.queryByRole("button", { name: /login/i });
    expect(loginButton).toBeNull();
  });
  test("should not show confirm password while log in", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );
    const confirmPassword = screen.queryByLabelText(/Confirm Password/i);
    expect(confirmPassword).toBeNull();
  });
  test("confirm password visible while sign up", async () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );
    const signUpToggleButton = screen.getByText(
      "Dont have an account? Sign Up",
    );
    await userEvent.click(signUpToggleButton);
    const confirmPasswordInputHolder =
      screen.getByLabelText(/Confirm Password/i);
    expect(confirmPasswordInputHolder).toBeInTheDocument();
  });
  test("should type email and trigger send link action successfully on forgot password", async () => {
    render(
      <Provider store={store}>
        <ForgotPssword />
      </Provider>,
    );
    const emailInput = screen.getByLabelText(
      /Enter the email with which you have registered/i,
    );

    await userEvent.type(emailInput, "testuser@example.com");
    expect(emailInput.value).toBe("testuser@example.com");
  });
  test("checking send link and sending...", async () => {
    render(
      <Provider store={store}>
        <ForgotPssword />
      </Provider>,
    );

    const sendLinkButton = screen.getByRole("button", { name: /send link/i });

    await userEvent.click(sendLinkButton);

    const loadingText = screen.getByText(/sending link\.\.\./i);
    expect(loadingText).toBeInTheDocument();
  });
});
