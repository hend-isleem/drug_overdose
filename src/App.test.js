import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Drug Interaction Checker header", () => {
  render(<App />);
  const headerElement = screen.getByRole("heading", {
    level: 1,
    name: /Drug Interaction Checker/i,
  });

  expect(headerElement).toBeInTheDocument();
});
