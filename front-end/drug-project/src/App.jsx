import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Contact from './pages/Contact';
import DrugInteractionChecker from './pages/DrugInteractionChecker';
import OurTeam from './pages/OurTeam';

function App() {
  return (
    <Router>
      <div className="page-container">
        <Header />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/drug-checker" element={<DrugInteractionChecker />} />
            <Route path="/our-team" element={<OurTeam />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;






