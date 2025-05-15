
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Wholesale = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeSIsjSjhLzRsAkc9ZE8ko6w6_Ov9D-FWTBK1EGDO96HvevOQ/viewform?usp=dialog";
  
  // Function to open Google Form in new tab
  const openGoogleForm = () => {
    window.open(googleFormUrl, '_blank');
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gray-50">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Wholesale Partnership</h1>
              <p className="text-lg text-gray-600">
                Interested in carrying our products in your business? Fill out our wholesale inquiry form 
                to receive wholesale pricing and partnership information.
              </p>
            </div>
          </div>
        </section>

        {/* Google Form Section */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-8 shadow-sm text-center">
                <h2 className="text-2xl font-bold mb-6">Wholesale Inquiry Form</h2>
                <p className="text-lg mb-8">
                  Please click the button below to access our wholesale inquiry form. 
                  The form will open in a new tab.
                </p>
                <div className="flex justify-center space-y-0">
                  <Button 
                    onClick={openGoogleForm}
                    className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6 flex items-center gap-2"
                  >
                    Open Wholesale Form <ExternalLink className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="mt-12 bg-gray-100 p-4 rounded-md text-sm text-gray-700 space-y-2">
                  <p className="font-medium text-center">Important Wholesale Information:</p>
                  <p>* All wholesale orders must be placed at least 48 hours prior to pickup, late order fees could be applied.</p>
                  <p>* All flavors/product names are trademarked and cannot be altered.</p>
                  <p>* We reserve the right to end or not operate a wholesale partnership at any time.</p>
                  <p>* Prices are subject to change without prior or further notice.</p>
                  <p>* Wholesale partnerships are intended for approved vendors only.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Wholesale;
