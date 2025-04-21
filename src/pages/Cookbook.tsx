import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { BookOpen, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cookbook = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-flavour-cream">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="flex items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 text-flavour-black">Legacy Kitchen 1219</h1>
                  <h2 className="text-2xl md:text-3xl font-medium mb-6 text-flavour-brown">
                    "An inheritance of recipes from my family to yours"
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Paperback – March 15, 2021 by Javon McCain-Nicholas (Author)
                  </p>
                  <p className="text-lg text-gray-700 mb-8">
                    Legacy Kitchen 1219 is a culinary memoir filled with recipes and images dedicated to my family. This book is filled with a variety of traditional American and Island inspired comfort foods that were made with love and are now available for all to enjoy!
                  </p>
                  <div className="flex flex-col gap-4 mb-8">
                    <p className="text-xl font-bold">Available Formats:</p>
                    <div className="space-y-2">
                      <p className="text-lg">Paperback - $19.25</p>
                      <p className="text-lg">Kindle - $14.99</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="https://www.amazon.com/Legacy-Kitchen-inheritance-recipes-family/dp/0578869446"
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="btn-primary flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Buy Now on Amazon
                    </a>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/lovable-uploads/51f52c02-b70f-48c2-94ec-2c8486e708cd.png" 
                  alt="Legacy Kitchen 1219 Cookbook" 
                  className="w-full h-auto object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Cookbook;
