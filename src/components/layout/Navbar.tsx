
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import Logo from './navbar/Logo';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import { darkTextRoutes } from './navbar/NavConfig';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openCart, totalItems } = useCart();

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-wide flex justify-between items-center">
        <Logo isScrolled={isScrolled} shouldUseDarkText={shouldUseDarkText} />

        <DesktopNav 
          isScrolled={isScrolled}
          shouldUseDarkText={shouldUseDarkText}
          openCart={openCart}
          totalItems={totalItems}
        />

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
    </nav>
  );
};

export default Navbar;
