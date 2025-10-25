import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownDeskRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false);
  };

 
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      // Scroll directly if section exists on current page
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
      // If not on home page, go to home and tell it which section to scroll to
      navigate('/', { state: { scrollTo: sectionId } });
    }

    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target)) &&
        (dropdownDeskRef.current && !dropdownDeskRef.current.contains(event.target))
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-stellar-gold to-aurora-green flex items-center justify-center">
              <i className="fas fa-rocket text-space-dark text-lg"></i>
            </div>
            <span className="font-orbitron text-xl font-bold text-glow">Cosmic Explorer</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="hover:text-stellar-gold font-medium">
              <i className="fas fa-home mr-2"></i>Home
            </button>
            <button onClick={() => scrollToSection('news')} className="hover:text-stellar-gold font-medium">
              <i className="fas fa-newspaper mr-2"></i>News
            </button>
            <button onClick={() => scrollToSection('blog')} className="hover:text-stellar-gold font-medium">
              <i className="fas fa-blog mr-2"></i>Blog
            </button>
            <button onClick={() => scrollToSection('explore')} className="hover:text-stellar-gold font-medium">
              <i className="fas fa-search mr-2"></i>Explore
            </button>

            {user ? (
              <div className="relative" ref={dropdownDeskRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 rounded-full border border-stellar-gold text-stellar-gold hover:bg-stellar-gold hover:text-space-dark transition-all"
                >
                  <i className="fas fa-user"></i>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-space-dark border border-white/20 rounded-lg shadow-lg glass-effect z-50">
                    <div className="p-2">
                      <span className="block px-4 py-2 text-sm text-gray-300">
                        {user.username || 'User'}
                      </span>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-stellar-gold hover:bg-stellar-gold/20 rounded"
                      >
                        <i className="fas fa-user-circle mr-2"></i>Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-stellar-gold hover:bg-stellar-gold/20 rounded"
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i>Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 border border-stellar-gold text-stellar-gold font-medium rounded-full hover:bg-stellar-gold hover:text-space-dark transition-all"
              >
                Account
              </Link>
            )}

            <button onClick={() => scrollToSection('contact')} className="hover:text-stellar-gold font-medium">
              <i className="fas fa-envelope mr-2"></i>Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-stellar-gold"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden mt-4 space-y-3 transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {['home', 'news', 'blog', 'explore', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="block hover:text-stellar-gold font-medium py-2"
            >
              <i className={`fas fa-${section === 'home'
                ? 'home'
                : section === 'news'
                ? 'newspaper'
                : section === 'blog'
                ? 'blog'
                : section === 'explore'
                ? 'search'
                : 'envelope'
              } mr-2`}></i>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="block px-4 py-2 border border-stellar-gold text-stellar-gold font-medium rounded-full hover:bg-stellar-gold hover:text-space-dark"
              >
                <i className="fas fa-user mr-2"></i>{user.username || 'User'}
              </button>
              {isDropdownOpen && (
                <div className="mt-2 w-full bg-space-dark border border-white/20 rounded-lg shadow-lg glass-effect z-50">
                  <div className="p-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-stellar-gold hover:bg-stellar-gold/20 rounded"
                    >
                      <i className="fas fa-user-circle mr-2"></i>Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-stellar-gold hover:bg-stellar-gold/20 rounded"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="block px-4 py-2 border border-stellar-gold text-stellar-gold font-medium rounded-full hover:bg-stellar-gold hover:text-space-dark"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
