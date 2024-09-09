import { MenuIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import logo from '../../../assets/Logo.png';

interface MenuItem {
  label: string
  href: string
}

interface HeaderProps {
  menuItems: MenuItem[]
}

const Menu = ({ menuItems }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center">
        <div className="mr-2">
        </div>
        <img src={logo} />
      </div>
      <div className="flex items-center">
        <button className="mr-4" aria-label="Search">
          <SearchIcon className="w-6 h-6 text-gray-600" />
        </button>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          <MenuIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      {isMenuOpen && (
        <nav className="absolute top-16 right-0 shadow-md p-4">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <a href={item.href} className="text-purple-800 hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};


export default Menu;

