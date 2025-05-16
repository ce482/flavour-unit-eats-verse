
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SquareDashboard = () => {
  return (
    <>
      <Navbar />
      <main className="container-wide pt-32 pb-16">
        <h1 className="text-3xl font-bold mb-6">Square Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Payment Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Square payment processing is now enabled. Customers will be redirected to Square's secure payment page during checkout.</p>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.open('https://squareup.com/dashboard/sales/transactions', '_blank')}
              >
                View Transactions
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Square Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Payment Redirect URL: <span className="font-mono text-sm">{window.location.origin}/payment-success</span></p>
              <p>Checkout is configured to automatically redirect customers back to the site after payment is complete.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SquareDashboard;
