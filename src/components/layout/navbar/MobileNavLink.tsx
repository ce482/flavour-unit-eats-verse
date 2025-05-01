
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type MobileNavLinkProps = {
  name: string;
  path: string;
  onClick?: (e: React.MouseEvent) => void;
};

const MobileNavLink = ({ name, path, onClick }: MobileNavLinkProps) => {
  const location = useLocation();
  
  return (
    <Link
      to={path}
      className={`px-4 py-2 text-base font-medium transition-colors hover:bg-gray-100 rounded ${
        location.pathname === path ? 'text-flavour-red' : 'text-flavour-black'
      }`}
      onClick={onClick}
    >
      {name}
    </Link>
  );
};

export default MobileNavLink;
