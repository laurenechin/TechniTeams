import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./components/pages/HomePage"
import LogInPage from "./components/pages/LogIn"
import SignUpPage from "./components/pages/SignUp"
import ForgotPassPage from "./components/pages/ForgotPass"
import DashboardPage from "./components/pages/Dashboard"
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPassPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  ) 
}

export default App;