
import React from 'react';
import { X, Menu } from 'lucide-react';
import MobileNavLink from './MobileNavLink';
import CartButton from './CartButton';
import { Link } from 'react-router-dom';
import { navItems } from './NavConfig';

type MobileNavProps = {
  isScrolled: boolean;
  shouldUseDarkText: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  showOrdersTab: boolean;
  handleOrdersClick: (e: React.MouseEvent) => void;
  handleLogout: () => void;
  isLoggingOut: boolean;
  user: any;
  openCart: () => void;
  totalItems: number;
  location: any;
};

const MobileNav = ({
  isScrolled,
  shouldUseDarkText,
  isMenuOpen,
  toggleMenu,
  showOrdersTab,
  handleOrdersClick,
  handleLogout,
  isLoggingOut,
  user,
  openCart,
  totalItems,
  location
}: MobileNavProps) => {
  return (
    <>
      <div className="lg:hidden flex items-center space-x-4">
        <CartButton
          totalItems={totalItems}
          onClick={openCart}
          isScrolled={isScrolled}
          shouldUseDarkText={shouldUseDarkText}
        />
        
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

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 animate-fade-in shadow-lg">
          <div className="container py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <MobileNavLink
                key={item.name}
                name={item.name}
                path={item.path}
              />
            ))}
            
            {showOrdersTab && (
              <MobileNavLink
                name="Orders"
                path="/orders"
                onClick={handleOrdersClick}
              />
            )}
            
            {user ? (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 text-base font-medium text-flavour-black transition-colors hover:bg-gray-100 rounded text-left"
              >
                {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
              </button>
            ) : (
              <MobileNavLink
                name="Sign In"
                path="/auth"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
