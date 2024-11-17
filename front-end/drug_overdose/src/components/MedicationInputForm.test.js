import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MedicationInputForm from "./MedicationInputForm";

describe("MedicationInputForm", () => {
  test("allows a user to add a drug to the list", () => {
    render(
      <Router>
        <MedicationInputForm />
      </Router>
    );

    const input = screen.getByPlaceholderText("Enter a drug name");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Aspirin" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Aspirin")).toBeInTheDocument(); // This test will pass
  });

  test("allows a user to remove a drug from the list", () => {
    render(
      <Router>
        <MedicationInputForm />
      </Router>
    );

    const input = screen.getByPlaceholderText("Enter a drug name");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Aspirin" } });
    fireEvent.click(addButton);

    const removeButton = screen.getByText("✖");
    fireEvent.click(removeButton);

    expect(screen.queryByText("Aspirin")).toBeNull(); // This test will pass
  });

  test("fails to reset the drug list when reset button is clicked", () => {
    render(
      <Router>
        <MedicationInputForm />
      </Router>
    );

    const input = screen.getByPlaceholderText("Enter a drug name");
    const addButton = screen.getByText("Add");
    const resetButton = screen.getByText("Start over");

    fireEvent.change(input, { target: { value: "Aspirin" } });
    fireEvent.click(addButton);
    fireEvent.click(resetButton);

    // Intentionally expect "Aspirin" to remain in the document, simulating a failure to reset
    expect(screen.queryByText("Aspirin")).not.toBeNull(); // This test will fail
  });
});

