
import React from 'react';
import NavLink from './NavLink';
import CartButton from './CartButton';
import { Link } from 'react-router-dom';
import { navItems } from './NavConfig';

type DesktopNavProps = {
  isScrolled: boolean;
  shouldUseDarkText: boolean;
  showOrdersTab: boolean;
  handleOrdersClick: (e: React.MouseEvent) => void;
  handleLogout: () => void;
  isLoggingOut: boolean;
  user: any;
  openCart: () => void;
  totalItems: number;
};

const DesktopNav = ({ 
  isScrolled, 
  shouldUseDarkText, 
  showOrdersTab,
  handleOrdersClick,
  handleLogout,
  isLoggingOut,
  user,
  openCart,
  totalItems
}: DesktopNavProps) => {
  return (
    <div className="hidden lg:flex items-center">
      <div className="flex items-center space-x-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            name={item.name}
            path={item.path}
            isScrolled={isScrolled}
            shouldUseDarkText={shouldUseDarkText}
          />
        ))}
        
        {showOrdersTab && (
          <Link
            to="/orders"
            className={`text-sm font-medium transition-colors hover:text-flavour-red ${
              isScrolled 
                ? 'text-flavour-black' 
                : shouldUseDarkText
                  ? 'text-flavour-black hover:text-flavour-red'
                  : 'text-white hover:text-white/80'
            }`}
            onClick={handleOrdersClick}
          >
            Orders
          </Link>
        )}
        
        <div className="pl-6 flex items-center space-x-6">
          {user ? (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`text-sm font-medium transition-colors hover:text-flavour-red ${
                isScrolled 
                  ? 'text-flavour-black' 
                  : shouldUseDarkText
                    ? 'text-flavour-black'
                    : 'text-white'
              }`}
            >
              {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          ) : (
            <NavLink
              name="Sign In"
              path="/auth"
              isScrolled={isScrolled}
              shouldUseDarkText={shouldUseDarkText}
            />
          )}
          
          <CartButton
            totalItems={totalItems}
            onClick={openCart}
            isScrolled={isScrolled}
            shouldUseDarkText={shouldUseDarkText}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
