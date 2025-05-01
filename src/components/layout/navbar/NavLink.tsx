
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type NavLinkProps = {
  name: string;
  path: string;
  isScrolled: boolean;
  shouldUseDarkText: boolean;
};

const NavLink = ({ name, path, isScrolled, shouldUseDarkText }: NavLinkProps) => {
  const location = useLocation();
  
  return (
    <Link
      to={path}
      className={`text-sm font-medium transition-colors hover:text-flavour-red ${
        isScrolled 
          ? location.pathname === path 
            ? 'text-flavour-red' 
            : 'text-flavour-black'
          : shouldUseDarkText
            ? 'text-flavour-black hover:text-flavour-red'
            : 'text-white hover:text-white/80'
      }`}
    >
      {name}
    </Link>
  );
};

export default NavLink;
