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
      <div className="app-container" style={appContainerStyle}>
        <Header />
        <div className="content" style={contentStyle}>
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

const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}

const contentStyle = {
  flex: 1,
}

export default App
