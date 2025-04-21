import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplet, Menu, X, User, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from './ui/Button';

interface NavbarProps {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
}

const Navbar = ({ showMobileMenu, setShowMobileMenu }: NavbarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<'en' | 'th'>('en');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'th' : 'en');
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin':
        return '/dashboard/admin';
      case 'technician':
        return '/dashboard/technician';
      default:
        return '/dashboard/customer';
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
          <Droplet size={28} className="text-blue-700" />
          <span className="text-xl font-bold text-blue-900">WashUp</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`font-medium transition-colors hover:text-blue-700 ${
              location.pathname === '/' ? 'text-blue-700' : 'text-gray-700'
            }`}
          >
            {language === 'en' ? 'Home' : 'หน้าแรก'}
          </Link>
          <Link 
            to="/services" 
            className={`font-medium transition-colors hover:text-blue-700 ${
              location.pathname === '/services' ? 'text-blue-700' : 'text-gray-700'
            }`}
          >
            {language === 'en' ? 'Services' : 'บริการ'}
          </Link>
          <Link 
            to="/booking" 
            className={`font-medium transition-colors hover:text-blue-700 ${
              location.pathname === '/booking' ? 'text-blue-700' : 'text-gray-700'
            }`}
          >
            {language === 'en' ? 'Book Now' : 'จองตอนนี้'}
          </Link>
          <Link 
            to="/apply" 
            className={`font-medium transition-colors hover:text-blue-700 ${
              location.pathname === '/apply' ? 'text-blue-700' : 'text-gray-700'
            }`}
          >
            {language === 'en' ? 'Join as Technician' : 'ร่วมงานกับเรา'}
          </Link>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            {language === 'en' ? 'TH' : 'EN'}
          </button>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link to={getDashboardLink()}>
                <Button variant="outline" className="flex items-center">
                  <User size={18} className="mr-2" />
                  {language === 'en' ? 'Dashboard' : 'แดชบอร์ด'}
                </Button>
              </Link>
              <Button variant="text" onClick={handleLogout}>
                {language === 'en' ? 'Logout' : 'ออกจากระบบ'}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="flex items-center">
                  <LogIn size={18} className="mr-2" />
                  {language === 'en' ? 'Login' : 'เข้าสู่ระบบ'}
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">
                  {language === 'en' ? 'Register' : 'สมัครสมาชิก'}
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-blue-700 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-16">
          <div className="container mx-auto px-4 py-4 flex flex-col">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-lg font-medium py-2 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                {language === 'en' ? 'Home' : 'หน้าแรก'}
              </Link>
              <Link 
                to="/services" 
                className="text-lg font-medium py-2 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                {language === 'en' ? 'Services' : 'บริการ'}
              </Link>
              <Link 
                to="/booking" 
                className="text-lg font-medium py-2 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                {language === 'en' ? 'Book Now' : 'จองตอนนี้'}
              </Link>
              <Link 
                to="/apply" 
                className="text-lg font-medium py-2 border-b border-gray-100"
                onClick={closeMobileMenu}
              >
                {language === 'en' ? 'Join as Technician' : 'ร่วมงานกับเรา'}
              </Link>
              <button
                onClick={toggleLanguage}
                className="text-lg font-medium py-2 border-b border-gray-100 text-left"
              >
                {language === 'en' ? 'ภาษาไทย' : 'English'}
              </button>
            </div>
            
            <div className="mt-8 flex flex-col space-y-4">
              {user ? (
                <>
                  <Link 
                    to={getDashboardLink()} 
                    className="bg-blue-50 text-blue-700 py-3 px-4 rounded-md text-center font-medium"
                    onClick={closeMobileMenu}
                  >
                    {language === 'en' ? 'Dashboard' : 'แดชบอร์ด'}
                  </Link>
                  <button 
                    className="text-gray-700 py-2 font-medium"
                    onClick={handleLogout}
                  >
                    {language === 'en' ? 'Logout' : 'ออกจากระบบ'}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="bg-blue-50 text-blue-700 py-3 px-4 rounded-md text-center font-medium"
                    onClick={closeMobileMenu}
                  >
                    {language === 'en' ? 'Login' : 'เข้าสู่ระบบ'}
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-blue-700 text-white py-3 px-4 rounded-md text-center font-medium"
                    onClick={closeMobileMenu}
                  >
                    {language === 'en' ? 'Register' : 'สมัครสมาชิก'}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;