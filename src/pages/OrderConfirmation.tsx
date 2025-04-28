
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20">
        <div className="container-wide max-w-2xl mx-auto text-center">
          <div className="bg-white p-8 rounded-lg border">
            <div className="mb-6">
              <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                <CheckIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We've received your order and will begin processing it right away.
              You will receive an email confirmation shortly.
            </p>
            
            <div className="my-8 border-t border-b py-6">
              <h3 className="font-semibold text-lg mb-2">What happens next?</h3>
              <p className="text-gray-600">
                Your order is being prepared and will be shipped soon. 
                We'll send you an update when your order ships.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-flavour-red hover:bg-red-700"
                onClick={() => navigate('/')}
              >
                Return to Home
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/egg-rolls')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
