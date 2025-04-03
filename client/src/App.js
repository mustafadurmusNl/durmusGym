import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { LanguageProvider } from "./context/languageContext"; // Import the LanguageProvider
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import "./i18n"; 

// Importing pages dynamically
import HomePage from "./pages/HomePage";
import PersonalTraining from "./components/PersonalTraining";
import Diet from "./components/Diet";
import Contact from "./components/Contact";
import Pilates from "./components/Pilates";
import Method from "./components/Method";
import About from "./components/About";
import Yoga from "./components/Yoga";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/personal-training", element: <PersonalTraining /> },
  { path: "/pilates", element: <Pilates /> },
  { path: "/diet", element: <Diet /> },
  { path: "/contact", element: <Contact /> },
  { path: "/method", element: <Method /> },
  { path: "/about", element: <About /> },
  { path: "/free-trial", element: <Contact /> }, // Reused Contact component
  { path: "/yoga", element: <Yoga /> },
];

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <NavBar />
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
        <Footer />
      </Router>
    </LanguageProvider>
  );
};

export default App;
