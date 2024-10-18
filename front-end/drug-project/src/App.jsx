import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Contact from './pages/Contact';
import DrugInteractionChecker from './pages/DrugInteractionChecker';

function App() {
  return (
    <div className="full-page-background"> {/* b.jpg */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/drug-checker" element={<DrugInteractionChecker />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;



