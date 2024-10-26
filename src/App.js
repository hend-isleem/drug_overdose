import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MedicationInputForm from "./components/MedicationInputForm";
import InteractionResults from "./components/InteractionResults";
import Footer from "./components/Footer";
import RegisterForm from "./components/Register";

function App() {
  return (
    <Router>
      <div className="app-container" style={appContainerStyle}>
        <Header />
        <div className="content" style={contentStyle}>
          <Routes>
            <Route
              path="/"
              element={<h2>Welcome to the Drug Interaction Checker</h2>}
            />
            <Route path="/input-medication" element={<MedicationInputForm />} />
            <Route
              path="/interaction-results"
              element={<InteractionResults />}
            />
            <Route path="/register" element={<RegisterForm />} />{" "}
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
  flex: 1,
};

export default App;
