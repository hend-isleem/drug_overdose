import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "./Register";

describe("RegisterForm", () => {
  test("renders Register form fields", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const registerButton = screen.getByRole("button", { name: /Register/i });

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test("handles form submission with valid inputs", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const registerButton = screen.getByRole("button", { name: /Register/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(registerButton);

    // Assuming form submission stores user data in localStorage
    expect(localStorage.getItem("user")).toContain("testuser");
  });

  // Test case: Fails to register when email is missing
  test("fails registration when email is missing and detects error", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const registerButton = screen.getByRole("button", { name: /Register/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(registerButton);

    // Expect an alert for missing email
    expect(alertMock).toHaveBeenCalledWith("Please enter all required fields.");
    alertMock.mockRestore();
  });

  // Test case: Fails to register when password is missing
  test("fails registration when password is missing and detects error", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const registerButton = screen.getByRole("button", { name: /Register/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(registerButton);

    // Expect an alert for missing password
    expect(alertMock).toHaveBeenCalledWith("Please enter all required fields.");
    alertMock.mockRestore();
  });

  // Test case: Detects invalid email format
  test("fails registration with invalid email format", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const registerButton = screen.getByRole("button", { name: /Register/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(registerButton);

    // Expect an alert for invalid email format
    expect(alertMock).toHaveBeenCalledWith(
      "Please enter a valid email address."
    );
    alertMock.mockRestore();
  });

  // Test case: Detects registration attempt with duplicate username
  test("fails registration when username is already taken", () => {
    // Mock behavior for duplicate username check
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const registerButton = screen.getByRole("button", { name: /Register/i });

    fireEvent.change(usernameInput, { target: { value: "existingUser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(registerButton);

    // Expect an alert for duplicate username
    expect(alertMock).toHaveBeenCalledWith("Username is already taken.");
    alertMock.mockRestore();
  });
});
