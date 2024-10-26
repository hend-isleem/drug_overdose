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
    // Modify to get the button more precisely
    const registerButton = screen.getByRole("button", { name: /Register/i });

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test("handles form submission", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    // Again, target the register button by its role
    const registerButton = screen.getByRole("button", { name: /Register/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(registerButton);

    // Assert that the localStorage contains the registered user data
    expect(localStorage.getItem("user")).toContain("testuser");
  });
});
