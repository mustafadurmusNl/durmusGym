import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { LanguageProvider } from "./context/languageContext";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import "./i18n";
import routes from "./routes/routes"; // Import the routes array

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