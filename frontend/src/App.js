import axios from 'axios'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import InteractionResults from './components/InteractionResults'
import LoginForm from './components/Login'
import Logs from './components/Logs'
import MedicationInputForm from './components/MedicationInputForm'
import RegisterForm from './components/RegisterForm'

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_URL

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/medication-input" element={<MedicationInputForm />} />
            <Route
              path="/interaction-results"
              element={<InteractionResults />}
            />
            <Route path="/logs" element={<Logs />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
