import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./components/HomePage"
import LogInPage from "./components/LogIn"
import SignUpPage from "./components/SignUp"

// ✅ Import the two profile pages
import BuildProfileStart from "./components/ui/BuildProfileStart"
import BuildProfileSkills from "./components/ui/BuildProfileSkills"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* ✅ Routes for your specific pages */}
        <Route path="/build/start" element={<BuildProfileStart />} />
        <Route path="/build/skills" element={<BuildProfileSkills />} />
      </Routes>
    </Router>
  ) 
}

export default App
