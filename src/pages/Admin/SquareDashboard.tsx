
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const SquareDashboard = () => {
  return (
    <>
      <Navbar />
      <main className="container-wide pt-32 pb-16">
        <h1 className="text-3xl font-bold mb-6">Square Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-lg mb-4">Order processing is currently disabled.</p>
          <Button className="bg-red-600 hover:bg-red-700">
            Dashboard Under Maintenance
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SquareDashboard;
