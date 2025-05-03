
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  // Get reference ID from URL - works with both Square (link_id) and other payment processors
  const referenceId = searchParams.get('link_id') || searchParams.get('session_id') || 'unknown';

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Clear the cart
    clearCart();
    
    // Show success message
    toast.success('Payment completed successfully!', {
      description: 'Your order has been confirmed.'
    });
  }, [clearCart]);

  // Get saved checkout details if available
  const checkoutDetails = sessionStorage.getItem('checkout_details') ? 
    JSON.parse(sessionStorage.getItem('checkout_details')!) : null;

  // Clear checkout details after retrieving them
  useEffect(() => {
    if (sessionStorage.getItem('checkout_details')) {
      setTimeout(() => {
        sessionStorage.removeItem('checkout_details');
      }, 1000);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-20">
        <div className="container-wide">
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              
              <h1 className="text-3xl font-bold mb-4 text-green-700">Payment Successful!</h1>
              
              <p className="text-gray-700 text-lg mb-6">
                Thank you for your order! Your payment has been processed successfully and your order is confirmed.
                {checkoutDetails?.customerName && ` We'll send a confirmation to ${checkoutDetails.customerEmail}.`}
              </p>
              
              {referenceId && referenceId !== 'unknown' && (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <p className="text-sm text-gray-600">Order Reference:</p>
                  <p className="font-mono text-sm break-all">{referenceId}</p>
                </div>
              )}

              {checkoutDetails && (
                <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium flex items-center">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Order Summary
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    {checkoutDetails.items && checkoutDetails.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm py-1">
                        <span>{item.name} × {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    
                    <div className="border-t border-gray-200 pt-2 mt-2 font-medium">
                      <div className="flex justify-between py-1">
                        <span>Total</span>
                        <span>${checkoutDetails.orderTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button 
                  onClick={() => navigate('/')} 
                  variant="outline"
                  className="flex-1 sm:flex-initial"
                >
                  Return Home
                </Button>
                <Button 
                  onClick={() => navigate('/egg-rolls')} 
                  className="bg-flavour-red hover:bg-red-700 flex-1 sm:flex-initial"
                >
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
