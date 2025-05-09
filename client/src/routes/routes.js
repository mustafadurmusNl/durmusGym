import HomePage from "../pages/HomePage";
import PersonalTraining from "../components/PersonalTraining";
import Diet from "../components/Diet";
import Contact from "../components/Contact";
import Pilates from "../components/Pilates";
import Method from "../components/Method";
import About from "../components/About";
import Yoga from "../components/Yoga";

// Helper function to create routes
const createRoute = (path, element) => ({ path, element });

const routes = [
  createRoute("/", <HomePage />),
  createRoute("/personal-training", <PersonalTraining />),
  createRoute("/pilates", <Pilates />),
  createRoute("/diet", <Diet />),
  createRoute("/contact", <Contact />),
  createRoute("/method", <Method />),
  createRoute("/about", <About />),
  createRoute("/free-trial", <Contact />), // Reused Contact component
  createRoute("/yoga", <Yoga />),
];

export default routes;