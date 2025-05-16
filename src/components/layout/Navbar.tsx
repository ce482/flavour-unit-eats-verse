
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Logo from './navbar/Logo';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import { darkTextRoutes } from './navbar/NavConfig';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openCart, totalItems } = useCart();
  const { user, signOut } = useAuth();

  const shouldUseDarkText = darkTextRoutes.includes(location.pathname);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  const renderAuthButton = () => {
    if (user) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogoutClick}
          className={`ml-4 flex items-center gap-2 ${
            isScrolled || shouldUseDarkText
              ? 'text-flavour-black hover:bg-gray-100'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <LogOut size={16} /> Logout
        </Button>
      );
    }
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLoginClick}
        className={`ml-4 flex items-center gap-2 ${
          isScrolled || shouldUseDarkText
            ? 'text-flavour-black hover:bg-gray-100'
            : 'text-white hover:bg-white/10'
        }`}
      >
        <LogIn size={16} /> Login
      </Button>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-wide flex justify-between items-center">
        <Logo isScrolled={isScrolled} shouldUseDarkText={shouldUseDarkText} />

        <div className="flex items-center">
          <DesktopNav 
            isScrolled={isScrolled}
            shouldUseDarkText={shouldUseDarkText}
            openCart={openCart}
            totalItems={totalItems}
          />

          <div className="hidden lg:block">
            {renderAuthButton()}
          </div>

          <MobileNav 
            isScrolled={isScrolled}
            shouldUseDarkText={shouldUseDarkText}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            openCart={openCart}
            totalItems={totalItems}
            location={location}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
