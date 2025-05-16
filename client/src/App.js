import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { LanguageProvider } from "./context/languageContext";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import "./i18n";
import routes from "./routes/routes"; // Import the routes array
import NotFound from "./components/NotFound";
const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <NavBar />
        <Routes>
          {routes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </LanguageProvider>
  );
};

export default App;