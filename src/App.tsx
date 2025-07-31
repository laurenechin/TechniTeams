import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./components/HomePage"
import LogInPage from "./components/LogIn"
import SignUpPage from "./components/SignUp"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  ) 
}

export default App;