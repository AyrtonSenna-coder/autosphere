import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X, User, Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/cars', label: 'Buy Cars' },
    { path: '/sell', label: 'Sell Your Car' },
    { path: '/virtual-showroom', label: 'Virtual Showroom' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // Show loading state or simple header while auth loads
  if (loading) {
    return (
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
              <Car className="w-8 h-8" />
              <span>AutoSphere</span>
            </Link>
            <div className="text-gray-500">Loading...</div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
            <Car className="w-8 h-8" />
            <span>AutoSphere</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isActive(link.path) ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <User className="w-5 h-5" />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 transition-all duration-300 ease-in-out">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors hover:text-blue-600 ${
                    isActive(link.path) ? 'text-blue-600' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="text-left text-gray-700 hover:text-blue-600">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;