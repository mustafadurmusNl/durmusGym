import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PersonalTraining from "./components/PersonalTraining"; // Import the PersonalTraining component
import Pilates from "./components/Pilates"; // Import the Pilates component
import Diet from "./components/Diet"; // Import the Diet component
const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personal-training" element={<PersonalTraining />} />
        <Route path="/pilates" element={<Pilates />} /> {/* Use Pilates component here */}
        <Route path="/diet" element={<Diet />} /> {/* Use Diet component here */}
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/method" element={<h1>Method</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/free-trial" element={<h1>Free Trial Lesson</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
