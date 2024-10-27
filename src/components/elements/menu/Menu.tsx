import { MenuIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import logo from "../../../assets/Logo.png";

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
    <header
      className="relative flex items-center justify-between py-2 px-4
     bg-white"
    >
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12" />
      </div>

      <div className="flex items-center space-x-4">
        <button
          aria-label="Search"
          className="p-2 rounded-full
         hover:bg-gray-100 focus:outline-none"
        >
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
        <nav
          className="absolute top-full right-0 mt-[3px] mr-[2px] pr-8 pl-8
         bg-white shadow-lg rounded-lg py-2 z-10 animate-fadeIn border border-gray-300"
        >
          <ul className="flex flex-col space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="relative text-sm text-[#f3972e] hover:text-purple-600 
                  transition-colors duration-200 before:absolute before:bottom-[-2px] 
                  before:left-0 before:w-0 before:h-[2px] before:bg-purple-600  
                  before:transition-width before:duration-300 hover:before:w-full"
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
