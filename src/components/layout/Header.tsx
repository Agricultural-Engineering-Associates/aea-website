import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/staff', label: 'Staff' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary-green text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div>
              <span className="text-xl font-heading font-bold leading-tight block">
                Agricultural Engineering
              </span>
              <span className="text-sm text-gold font-semibold">Associates</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-white bg-opacity-20 text-gold'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="tel:1-800-499-5893"
              className="hidden sm:flex items-center space-x-2 text-gold hover:text-white transition-colors"
            >
              <Phone size={18} />
              <span className="text-sm font-semibold">1-800-499-5893</span>
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-white hover:bg-opacity-10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-white border-opacity-20">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-white bg-opacity-20 text-gold'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href="tel:1-800-499-5893"
              className="flex items-center space-x-2 px-4 py-3 text-gold"
            >
              <Phone size={18} />
              <span className="font-semibold">1-800-499-5893</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
