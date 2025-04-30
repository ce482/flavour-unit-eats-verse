
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gray-50">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg text-gray-600">
                Have questions about our products or services? We're here to help! Reach out to us through any of our contact channels.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-flavour-red p-3 rounded-full text-white mr-4">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Phone</h3>
                      <p className="text-gray-600">844-434-4-EGGROL (for Egg Rolls Etc.)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-flavour-red p-3 rounded-full text-white mr-4">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <p className="text-gray-600">Javon@theflavourunitcorp.com</p>
                      <p className="text-gray-600">shopeggrollsetc@gmail.com (Egg Rolls Etc.)</p>
                      <p className="text-gray-600">Orderwithlepetitdejeuner@gmail.com (Le Petit Déjeuner)</p>
                      <p className="text-gray-600">Legacykitchensolutions@gmail.com (Legacy Kitchen Solutions)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-flavour-red p-3 rounded-full text-white mr-4">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Location</h3>
                      <p className="text-gray-600">Chicago, IL</p>
                      <p className="text-gray-600">Corporate Headquarters</p>
                    </div>
                  </div>
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

export default Contact;
