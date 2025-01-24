import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PersonalTraining from "./components/PersonalTraining"; 
import Diet from "./components/Diet"; 
import About from "./components/About";
import Pilates from "./components/Pilates";
const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personal-training" element={<PersonalTraining />} />
        <Route path="/pilates" element={<Pilates />} /> 
        <Route path="/diet" element={<Diet />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/method" element={<h1>Method</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/free-trial" element={<h1>Free Trial Lesson</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
