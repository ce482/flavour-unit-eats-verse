
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, isCartOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={closeCart}
      />
      
      {/* Cart panel */}
      <div className="absolute top-0 right-0 w-full max-w-md bg-white shadow-xl h-full overflow-y-auto animate-in slide-in-from-right">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <ShoppingCart className="mr-2" size={20} />
              Your Cart
              {totalItems > 0 && (
                <span className="ml-2 bg-flavour-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => closeCart()}
              className="rounded-full h-8 w-8 p-0"
            >
              <X size={20} />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
            <ShoppingCart size={64} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm text-gray-500 mt-1">Add some delicious items to get started!</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => closeCart()}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.id} className="flex p-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="px-2 h-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="px-2 h-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        <X size={16} className="text-red-500" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t p-4">
              <div className="flex justify-between text-base font-medium">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-4">
                <Button 
                  className="w-full bg-flavour-red hover:bg-red-700"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
              <div className="mt-2 flex justify-center">
                <Button 
                  variant="link" 
                  className="text-sm"
                  onClick={() => closeCart()}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
