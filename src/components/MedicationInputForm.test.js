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

    expect(screen.getByText("Aspirin")).toBeInTheDocument();
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

    expect(screen.queryByText("Aspirin")).toBeNull();
  });

  test("allows a user to reset the drug list", () => {
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

    expect(screen.queryByText("Aspirin")).toBeNull();
  });
});
