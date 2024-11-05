// App.tsx
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/elements/Footer/Footer";
import Menu from "./components/elements/menu/Menu";
import "./index.css";
import store from "./redux/store";
import EventForm from "./screens/EventForm";
import Events from "./screens/Events";
import Home from "./screens/Home";
// Example usage
const menuItems = [
  { label: "Inventar", href: "/inventory" },
  { label: "Anmeldung", href: "/registration" }
];

// Placeholder components for the routes
const Inventory = () => <h2>Inventory Page</h2>;
const Registration = () => <h2>Registration Page</h2>;

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Menu menuItems={menuItems} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<EventForm />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
