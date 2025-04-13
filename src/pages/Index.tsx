
import { useEffect } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import BrandShowcase from '../components/home/BrandShowcase';
import OrderPopup from '../components/ui/OrderPopup';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroBanner />
        <BrandShowcase />
        
        {/* About Section */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-title mb-6">About The Flavour Unit Corp</h2>
                <p className="text-lg text-flavour-gray mb-6">
                  The Flavour Unit Corporation is more than just food—it's a culinary journey that celebrates comfort, culture, and community. As the parent company of our innovative food brands, we're dedicated to bringing exceptional flavors to your table.
                </p>
                <p className="text-lg text-flavour-gray mb-6">
                  Our mission is to create delicious, high-quality comfort foods while supporting food entrepreneurs through education and resources. We believe food is about bringing people together and preserving cultural traditions.
                </p>
                <Link to="/about" className="btn-outline inline-block">
                  Learn Our Story
                </Link>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1561339429-d5da4e6e9105?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                  alt="Cooking experience" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-flavour-gold p-4 rounded-lg shadow-lg">
                  <p className="text-xl font-bold text-flavour-black">
                    Passion for Flavor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-20 bg-gray-50">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="section-title">Featured Products</h2>
              <p className="text-lg text-flavour-gray max-w-2xl mx-auto">
                Discover our most popular comfort-filled creations
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Product 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                    alt="Classic Egg Rolls" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Classic Egg Rolls</h3>
                  <p className="text-flavour-gray mb-4">
                    Our signature comfort-filled egg rolls made with premium ingredients and authentic flavors.
                  </p>
                  <Link to="/egg-rolls" className="text-flavour-red font-medium hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
              
              {/* Product 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                    alt="Potstickers" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Potstickers</h3>
                  <p className="text-flavour-gray mb-4">
                    Delicious dumplings filled with savory ingredients, perfect for any occasion.
                  </p>
                  <Link to="/egg-rolls" className="text-flavour-red font-medium hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
              
              {/* Product 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1626501094011-bb5ec7b35d16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                    alt="Cream Cheese Rangoon" 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Cream Cheese Rangoon</h3>
                  <p className="text-flavour-gray mb-4">
                    Crispy wontons filled with creamy cheese filling. An irresistible appetizer or snack.
                  </p>
                  <Link to="/egg-rolls" className="text-flavour-red font-medium hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/egg-rolls" className="btn-primary inline-block">
                Shop All Products
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-flavour-red text-white">
          <div className="container-wide text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Our Flavors?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Order online today and get our delicious comfort foods delivered straight to your door
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/egg-rolls" className="bg-white text-flavour-red hover:bg-gray-100 font-bold py-3 px-8 rounded-md transition-colors">
                Order Now
              </Link>
              <Link to="/cookbook" className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-md transition-colors">
                Get the Cookbook
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <OrderPopup delayInSeconds={5} />
    </>
  );
};

export default Index;
