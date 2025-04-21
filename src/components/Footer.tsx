import { Link } from 'react-router-dom';
import { Droplet, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Droplet size={24} className="text-blue-300" />
              <span className="text-xl font-bold">SplashWash</span>
            </div>
            <p className="text-blue-100 mb-4">
              Premium car wash and detailing services that come to you. Professional cleaning, anywhere, anytime.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-blue-100 hover:text-white transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/booking" className="text-blue-100 hover:text-white transition-colors">Book a Wash</Link>
              </li>
              <li>
                <Link to="/apply" className="text-blue-100 hover:text-white transition-colors">Become a Technician</Link>
              </li>
              <li>
                <Link to="/login" className="text-blue-100 hover:text-white transition-colors">Customer Login</Link>
              </li>
              <li>
                <Link to="#" className="text-blue-100 hover:text-white transition-colors">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="mt-1 mr-3 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mt-1 mr-3 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100">contact@splashwash.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100">123 Main Street, Suite 200<br />San Francisco, CA 94105</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-blue-100 mb-4">Subscribe to our newsletter for updates, special offers and more.</p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-md bg-blue-800 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm">&copy; {currentYear} SplashWash. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-blue-200 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="#" className="text-blue-200 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-blue-200 hover:text-white text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;