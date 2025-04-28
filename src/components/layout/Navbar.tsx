
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart as CartIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAdmin } from '@/hooks/useAdmin';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Egg Rolls', path: '/egg-rolls' },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Cookbook', path: '/cookbook' },
  { name: 'Legacy Kitchen', path: '/legacy-kitchen' },
  { name: 'Contact', path: '/contact' },
  { name: 'Petit Dejeuner', path: '/petit-dejeuner' },
  // Removed duplicate Orders item from here - it's conditionally rendered below
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const { openCart, totalItems } = useCart();

  const darkTextRoutes = ['/about', '/faq', '/cookbook', '/legacy-kitchen', '/contact'];
  const shouldUseDarkText = darkTextRoutes.includes(location.pathname);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-wide flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className={`text-xl md:text-2xl font-bold font-serif ${
            isScrolled 
              ? 'text-flavour-red' 
              : shouldUseDarkText 
                ? 'text-flavour-black' 
                : 'text-white'
          }`}>
            The Flavour Unit Corp
          </span>
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-flavour-red ${
                isScrolled 
                  ? location.pathname === item.path 
                    ? 'text-flavour-red' 
                    : 'text-flavour-black'
                  : shouldUseDarkText
                    ? 'text-flavour-black hover:text-flavour-red'
                    : 'text-white hover:text-white/80'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Only show Orders tab if user is admin */}
          {user && isAdmin && (
            <Link
              to="/orders"
              className={`text-sm font-medium transition-colors hover:text-flavour-red ${
                isScrolled 
                  ? location.pathname === '/orders'
                    ? 'text-flavour-red' 
                    : 'text-flavour-black'
                  : shouldUseDarkText
                    ? 'text-flavour-black hover:text-flavour-red'
                    : 'text-white hover:text-white/80'
              }`}
            >
              Orders
            </Link>
          )}
          
          {user ? (
            <button
              onClick={handleLogout}
              className={`text-sm font-medium transition-colors hover:text-flavour-red ${
                isScrolled 
                  ? 'text-flavour-black' 
                  : shouldUseDarkText
                    ? 'text-flavour-black'
                    : 'text-white'
              }`}
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/auth"
              className={`text-sm font-medium transition-colors hover:text-flavour-red ${
                isScrolled 
                  ? location.pathname === '/auth'
                    ? 'text-flavour-red' 
                    : 'text-flavour-black'
                  : shouldUseDarkText
                    ? 'text-flavour-black hover:text-flavour-red'
                    : 'text-white hover:text-white/80'
              }`}
            >
              Sign In
            </Link>
          )}
          
          {/* Cart Button */}
          <button
            onClick={openCart}
            className={`relative p-2 rounded-full transition-colors ${
              isScrolled 
                ? 'text-flavour-black hover:bg-gray-100' 
                : shouldUseDarkText
                  ? 'text-flavour-black hover:bg-gray-100/50'
                  : 'text-white hover:bg-white/10'
            }`}
            aria-label="Open cart"
          >
            <CartIcon size={20} />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-flavour-red text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full p-0">
                {totalItems}
              </Badge>
            )}
          </button>
        </div>

        <div className="lg:hidden flex items-center space-x-4">
          {/* Cart Button for Mobile */}
          <button
            onClick={openCart}
            className={`relative p-2 rounded-full transition-colors ${
              isScrolled 
                ? 'text-flavour-black hover:bg-gray-100' 
                : shouldUseDarkText
                  ? 'text-flavour-black hover:bg-gray-100/50'
                  : 'text-white hover:bg-white/10'
            }`}
            aria-label="Open cart"
          >
            <CartIcon size={20} />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-flavour-red text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full p-0">
                {totalItems}
              </Badge>
            )}
          </button>
          
          <button
            className={`${
              isScrolled 
                ? 'text-flavour-black' 
                : shouldUseDarkText 
                  ? 'text-flavour-black' 
                  : 'text-white'
            } focus:outline-none`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 animate-fade-in shadow-lg">
          <div className="container py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 rounded ${
                  location.pathname === item.path ? 'text-flavour-red' : 'text-flavour-black'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Only show Orders tab if user is admin */}
            {user && isAdmin && (
              <Link
                to="/orders"
                className={`px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 rounded ${
                  location.pathname === '/orders' ? 'text-flavour-red' : 'text-flavour-black'
                }`}
              >
                Orders
              </Link>
            )}
            
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-base font-medium text-flavour-black transition-colors hover:bg-gray-100 rounded text-left"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/auth"
                className={`px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 rounded ${
                  location.pathname === '/auth' ? 'text-flavour-red' : 'text-flavour-black'
                }`}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
