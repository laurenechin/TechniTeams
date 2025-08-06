import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LogInPage from "./components/LogIn";
import SignUpPage from "./components/SignUp";
import BuildProfileStart from "./components/ui/BuildProfileStart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/build-profile-start" element={<BuildProfileStart />} />
      </Routes>
    </Router>
  );
}

export default App;
