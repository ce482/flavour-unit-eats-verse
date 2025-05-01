
import React from 'react';
import { Link } from 'react-router-dom';

type LogoProps = {
  isScrolled: boolean;
  shouldUseDarkText: boolean;
};

const Logo = ({ isScrolled, shouldUseDarkText }: LogoProps) => {
  return (
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
  );
};

export default Logo;
