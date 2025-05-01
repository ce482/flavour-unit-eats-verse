
import React from 'react';
import { ShoppingCart as CartIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type CartButtonProps = {
  totalItems: number;
  onClick: () => void;
  isScrolled: boolean;
  shouldUseDarkText: boolean;
};

const CartButton = ({ totalItems, onClick, isScrolled, shouldUseDarkText }: CartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 rounded-full transition-colors ${
        isScrolled 
          ? 'text-flavour-black hover:bg-gray-100' 
          : shouldUseDarkText
            ? 'text-flavour-black hover:bg-gray-100/50'
            : 'text-white hover:bg-white/10'
      }`}
      aria-label="Open cart"
    >
      <CartIcon size={20} />
      {totalItems > 0 && (
        <Badge className="absolute -top-1 -right-1 bg-flavour-red text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full p-0">
          {totalItems}
        </Badge>
      )}
    </button>
  );
};

export default CartButton;
