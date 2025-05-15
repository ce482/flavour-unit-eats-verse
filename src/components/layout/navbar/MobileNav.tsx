
import React from 'react';
import { X, Menu } from 'lucide-react';
import MobileNavLink from './MobileNavLink';
import CartButton from './CartButton';
import { navItems, adminNavItems } from './NavConfig';

type MobileNavProps = {
  isScrolled: boolean;
  shouldUseDarkText: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  openCart: () => void;
  totalItems: number;
  location: any;
};

const MobileNav = ({
  isScrolled,
  shouldUseDarkText,
  isMenuOpen,
  toggleMenu,
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
            
            <div className="pt-2 border-t border-gray-200">
              <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">Admin</h3>
              {adminNavItems.map((item) => (
                <MobileNavLink
                  key={item.name}
                  name={item.name}
                  path={item.path}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
