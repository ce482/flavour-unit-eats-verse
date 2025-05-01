
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAdmin } from '@/hooks/useAdmin';
import { useCart } from '@/contexts/CartContext';
import Logo from './navbar/Logo';
import DesktopNav from './navbar/DesktopNav';
import MobileNav from './navbar/MobileNav';
import { darkTextRoutes } from './navbar/NavConfig';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isLoading: isAdminLoading } = useAdmin();
  const { openCart, totalItems } = useCart();

  const shouldUseDarkText = darkTextRoutes.includes(location.pathname);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        toast.error('Error signing out');
        
        localStorage.removeItem('supabase.auth.token');
        window.location.reload();
      } else {
        toast.success('Signed out successfully');
      }
    } catch (err) {
      console.error('Exception signing out:', err);
      toast.error('Error signing out');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleOrdersClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error('Please sign in to access orders');
      navigate('/auth');
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

  const showOrdersTab = user && isAdmin && !isAdminLoading;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container-wide flex justify-between items-center">
        <Logo isScrolled={isScrolled} shouldUseDarkText={shouldUseDarkText} />

        <DesktopNav 
          isScrolled={isScrolled}
          shouldUseDarkText={shouldUseDarkText}
          showOrdersTab={showOrdersTab}
          handleOrdersClick={handleOrdersClick}
          handleLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          user={user}
          openCart={openCart}
          totalItems={totalItems}
        />

        <MobileNav 
          isScrolled={isScrolled}
          shouldUseDarkText={shouldUseDarkText}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          showOrdersTab={showOrdersTab}
          handleOrdersClick={handleOrdersClick}
          handleLogout={handleLogout}
          isLoggingOut={isLoggingOut}
          user={user}
          openCart={openCart}
          totalItems={totalItems}
          location={location}
        />
      </div>
    </nav>
  );
};

export default Navbar;
