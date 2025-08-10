// src/App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import BuildProfileStart from "./components/ui/BuildProfileStart";
import BuildProfileSkills from "./components/ui/BuildProfileSkills";
import BuildProfileRoles from "./components/ui/BuildProfileRoles";
import BuildProfilePersonality from "./components/ui/BuildProfilePersonality";
import BuildProfileStatus from "./components/ui/BuildProfileStatus";
import BuildProfileCongrats from "./components/ui/BuildProfileCongrats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/build/start" element={<BuildProfileStart />} />
      <Route path="/build/skills" element={<BuildProfileSkills />} />
      <Route path="/build/roles" element={<BuildProfileRoles />} />
      <Route path="/build/personality" element={<BuildProfilePersonality />} />
      <Route path="/build/status" element={<BuildProfileStatus />} />
      <Route path="/build/congrats" element={<BuildProfileCongrats />} />
    </Routes>
  );
}

export default App;
