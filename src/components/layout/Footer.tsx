import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-earth text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-heading font-bold text-gold mb-4">
              Agricultural Engineering Associates
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Independent, Objective, Technical Engineering Services since 1974.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Services', to: '/services' },
                { label: 'Projects', to: '/projects' },
                { label: 'Staff', to: '/staff' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gold flex-shrink-0" />
                <a
                  href="tel:620-756-1000"
                  className="text-gray-300 hover:text-gold transition-colors"
                >
                  (620) 756-1000
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <span className="text-gray-300">info@aeaengineers.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  1000 Promontory Dr
                  <br />
                  Uniontown, KS 66779
                </span>
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Agricultural Engineering Associates. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
