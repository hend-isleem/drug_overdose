import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // import Router
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
    expect(checkInteractionsButton).not.toBeDisabled();
  });

  test("disables the Check Interactions button when no drugs are added", () => {
    render(
      <Router>
        <MedicationInputForm />
      </Router>
    );
    const checkInteractionsButton = screen.getByText("Check Interactions");

    // Check that the button is disabled
    expect(checkInteractionsButton).toBeDisabled();
  });
});
