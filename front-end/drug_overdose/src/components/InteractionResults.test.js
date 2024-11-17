import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MedicationInputForm from "./MedicationInputForm";

describe("MedicationInputForm", () => {
  test("enables the Check Interactions button when a drug is added", () => {
    render(
      <Router>
        <MedicationInputForm />
      </Router>
    );
    const input = screen.getByPlaceholderText("Enter a drug name");
    const addButton = screen.getByText("Add");
    const checkInteractionsButton = screen.getByText("Check Interactions");

    fireEvent.change(input, { target: { value: "Aspirin" } });
    fireEvent.click(addButton);

    // Check that the button is now enabled
    expect(checkInteractionsButton).not.toBeDisabled(); // This test will pass
  });

  test("disables the Check Interactions button when no drugs are added", () => {
    render(
      <Router>
        <MedicationInputForm />
      </Router>
    );
    const checkInteractionsButton = screen.getByText("Check Interactions");

    // Check that the button is disabled initially
    expect(checkInteractionsButton).toBeDisabled(); // This test will also pass
  });

  test("expecting Check Interactions button to remain disabled after adding a drug, but it becomes enabled", () => {
    render(
      <Router>
        <MedicationInputForm />
      </Router>
    );
    const input = screen.getByPlaceholderText("Enter a drug name");
    const addButton = screen.getByText("Add");
    const checkInteractionsButton = screen.getByText("Check Interactions");

    fireEvent.change(input, { target: { value: "Aspirin" } });
    fireEvent.click(addButton);

    // Intentionally set expectation for the button to remain disabled, it will fail because the button becomes enabled
    expect(checkInteractionsButton).toBeDisabled(); // This test will fail
  });
});

