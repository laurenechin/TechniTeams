import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LogInPage from "./components/LogIn";
import SignUpPage from "./components/SignUp";
import BuildProfileStart from "./components/ui/BuildProfileStart";
import BuildProfileSkills from "./components/ui/BuildProfileSkills";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/build-profile-start" element={<BuildProfileStart />} />
        <Route path="/build-profile-skills" element={<BuildProfileSkills />} />
      </Routes>
    </Router>
  );
}

export default App;
