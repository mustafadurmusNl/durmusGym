// src/routes/routes.js
import HomePage from "../pages/HomePage";
import PersonalTraining from "../components/PersonalTraining";
import Diet from "../components/Diet";
import Contact from "../components/Contact";
import Pilates from "../components/Pilates";
import Method from "../components/Method";
import About from "../components/About";
import Yoga from "../components/Yoga";

import LoginPage from "../pages/LoginPage";
import FreeTrialPage from "../pages/FreeTrialPage";
import PurchasePage from "../pages/PurchasePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import Library from "../components/Library"; // NEW
import PrivateRoute from "../components/PrivateRoute"; // NEW

const createRoute = (path, element) => ({ path, element });

const routes = [
  createRoute("/login", <LoginPage />),
  createRoute("/purchase/:option", <PurchasePage />),
  createRoute("/free-trial-page", <FreeTrialPage />),
  createRoute("/", <HomePage />),
  createRoute("/personal-training", <PersonalTraining />),
  createRoute("/pilates", <Pilates />),
  createRoute("/diet", <Diet />),
  createRoute("/contact", <Contact />),
  createRoute("/method", <Method />),
  createRoute("/about", <About />),
  createRoute("/free-trial", <Contact />),
  createRoute("/yoga", <Yoga />),
  createRoute("/change-password", <ChangePasswordPage />),

  // ✅ Protected route
  createRoute(
    "/library",
    <PrivateRoute>
      <Library />
    </PrivateRoute>
  ),
];

export default routes;
