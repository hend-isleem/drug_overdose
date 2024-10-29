import React from "react";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./Login";

describe("LoginForm", () => {
  test("renders Login form fields", () => {
    act(() => {
      render(
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      );
    });

    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("handles form submission with valid credentials", () => {
    // Set up localStorage with test user data
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "testuser", password: "password123" })
    );

    // Spy on the alert function
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    expect(alertMock).toHaveBeenCalledWith("Login successful!");

    alertMock.mockRestore();
  });
});
