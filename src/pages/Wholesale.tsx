
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Wholesale = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-24 pb-16 flex-grow">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h1 className="section-title text-center mb-8">Wholesale Partnership</h1>
            
            <Card className="mb-8 shadow-md">
              <CardContent className="pt-6">
                <p className="text-lg mb-6">
                  Interested in offering our delicious products at your establishment? 
                  Fill out our wholesale application form to get started with a wholesale partnership.
                </p>
                
                <div className="flex justify-center mb-6">
                  <Button 
                    className="bg-flavour-red hover:bg-red-800 text-white flex items-center gap-2"
                    size="lg"
                    onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSeSIsjSjhLzRsAkc9ZE8ko6w6_Ov9D-FWTBK1EGDO96HvevOQ/viewform?usp=sharing&ouid=112080658317793903469', '_blank')}
                  >
                    Apply for Wholesale <ExternalLink size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-8 shadow-md">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-serif font-bold mb-4">Location</h2>
                <p className="mb-6">Our location is at 5801 W Dickens Ave, Chicago, IL</p>
                <p className="text-red-600 font-medium">Please note: We do not deliver. All orders must be picked up from our location.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-serif font-bold mb-4">Wholesale Terms</h2>
                <ul className="space-y-4 list-disc pl-6">
                  <li>All wholesale orders must be placed at least 48 hours prior to pickup. Late order fees may be applied.</li>
                  <li>All flavors and product names are trademarked and cannot be altered.</li>
                  <li>We reserve the right to end or not operate a wholesale partnership at any time.</li>
                  <li>Prices are subject to change without prior or further notice.</li>
                  <li>Wholesale partnerships are intended for approved vendors only.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wholesale;
