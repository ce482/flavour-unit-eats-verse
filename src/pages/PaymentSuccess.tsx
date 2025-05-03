
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id') || searchParams.get('link_id'); // Handle both Stripe and Square parameters
  const { clearCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Clear the cart after successful payment
    clearCart();
  }, [clearCart]);

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
              
              <p className="text-gray-700 text-lg mb-8">
                Thank you for your order! Your payment has been processed successfully and your order is confirmed.
              </p>
              
              {sessionId && (
                <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
                  <p className="text-sm text-gray-600">Order Reference:</p>
                  <p className="font-mono text-sm break-all">{sessionId}</p>
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
