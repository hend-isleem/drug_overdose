import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MedicationInputForm from "./components/MedicationInputForm";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="app-container" style={appContainerStyle}>
        <Header />
        <div className="content" style={contentStyle}>
          <Routes>
            <Route path="/input-medication" element={<MedicationInputForm />} />
            <Route
              path="/"
              element={<h2>Welcome to the Drug Interaction Checker</h2>}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

const appContainerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

const contentStyle = {
  flex: 1, // This makes sure the content takes up the available space
};

export default App;
