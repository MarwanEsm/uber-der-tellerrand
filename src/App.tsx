import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
      <div>
        <Menu menuItems={menuItems} />
        <Routes>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
