
import React from 'react';
import NavLink from './NavLink';
import CartButton from './CartButton';
import { navItems, adminNavItems } from './NavConfig';

type DesktopNavProps = {
  isScrolled: boolean;
  shouldUseDarkText: boolean;
  openCart: () => void;
  totalItems: number;
};

const DesktopNav = ({ 
  isScrolled, 
  shouldUseDarkText, 
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
        
        <div className="pl-6 flex items-center space-x-6">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.name}
              name={item.name}
              path={item.path}
              isScrolled={isScrolled}
              shouldUseDarkText={shouldUseDarkText}
            />
          ))}
          
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
