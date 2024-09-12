import Menu from './components/elements/menu/Menu';
import './index.css';


// Example usage
const menuItems = [
  { label: 'Inventar', href: '/' },
  { label: 'Anmeldung', href: '/about' },
];
const App = () => {
  return (
    <div>
      <Menu menuItems={menuItems} />
    </div>
  );
};

export default App;
