import { MenuIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import logo from '../../../assets/Logo.png';

interface MenuItem {
  label: string;
  href: string;
}

interface HeaderProps {
  menuItems: MenuItem[];
}

const Menu = ({ menuItems }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative flex items-center justify-between py-2 px-4 bg-white shadow-md">

      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12" />
      </div>

      <div className="flex items-center space-x-4">
        <button aria-label="Search" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
          <SearchIcon className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <MenuIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {isMenuOpen && (
        <nav className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg p-2 z-10 animate-fadeIn">
          <ul className="flex flex-col space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="text-[#f3972e] hover:text-purple-600 transition-colors duration-200"
                >
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
