import Menu from './components/elements/menu/Menu';
import './index.css';


// Example usage
const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];
const App = () => {
  return (
    <div>
      <Menu menuItems={menuItems} />
    </div>
  );
};

export default App;
