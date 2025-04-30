
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Mail, Phone } from 'lucide-react';

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
                      <p className="text-gray-600">
                        <a href="mailto:Javon@theflavourunitcorp.com" className="hover:text-flavour-red transition-colors">
                          Javon@theflavourunitcorp.com
                        </a>
                      </p>
                      <p className="text-gray-600">
                        <a href="mailto:shopeggrollsetc@gmail.com" className="hover:text-flavour-red transition-colors">
                          shopeggrollsetc@gmail.com
                        </a> (Egg Rolls Etc.)
                      </p>
                      <p className="text-gray-600">
                        <a href="mailto:Orderwithlepetitdejeuner@gmail.com" className="hover:text-flavour-red transition-colors">
                          Orderwithlepetitdejeuner@gmail.com
                        </a> (Le Petit Déjeuner)
                      </p>
                      <p className="text-gray-600">
                        <a href="mailto:Legacykitchensolutions@gmail.com" className="hover:text-flavour-red transition-colors">
                          Legacykitchensolutions@gmail.com
                        </a> (Legacy Kitchen Solutions)
                      </p>
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
