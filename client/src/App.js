import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar"; // Import the NavBar component
import HomePage from "./pages/HomePage"; // Import the HomePage component

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Use HomePage here */}
        <Route path="/personal-training" element={<h1>Personal Training</h1>} />
        <Route path="/pilates" element={<h1>Pilates</h1>} />
        <Route path="/diet" element={<h1>Diet</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/method" element={<h1>Method</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/free-trial" element={<h1>Free Trial Lesson</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
