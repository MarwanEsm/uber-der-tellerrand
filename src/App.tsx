// eslint-disable-next-line import/no-extraneous-dependencies
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/elements/menu/Footer";
import Menu from "./components/elements/menu/Menu";
import "./index.css";

// Example usage
const menuItems = [
  { label: "Inventar", href: "/inventory" },
  { label: "Anmeldung", href: "/registration" },
];

// Placeholder components for the routes
const Inventory = () => <h2>Inventory Page</h2>;
const Registration = () => <h2>Registration Page</h2>;

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Menu menuItems={menuItems} />
        <main className="flex-grow">
          <Routes>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
