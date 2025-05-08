
import { useEffect, useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import BrandShowcase from '../components/home/BrandShowcase';
import OrderPopup from '../components/ui/OrderPopup';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { ImageLoader } from '../utils/imageLoader';

const featuredProducts = [
  {
    id: 1,
    name: "PLANT-BASED PHILLY CHEESESTEAK EGG ROLL",
    description: "(4 PIECES) PLANT-BASED PHILLY CHEESE STEAK EGG ROLL WITH DIPPING SAUCE",
    image: "",
    link: "/egg-rolls"
  },
  {
    id: 2,
    name: "Le Petit Déjeuner",
    description: "Delicious French-inspired pastries with savory filling and herb garnish.",
    image: "",
    link: "/petit-dejeuner"
  },
  {
    id: 3,
    name: "GERT'S COLLARD GREENS WITH SMOKED TURKEY EGG ROLLS",
    description: "PRE-FRIED GERTS COLLARD GREENS WITH SMOKED TURKEY EGG ROLLS (4 PIECES) PAIRED WITH DIPPING SAUCE.",
    image: "",
    link: "/egg-rolls"
  }
];

const Index = () => {
  const [imagesLoaded, setImagesLoaded] = useState(true); // Set to true since we don't need to load images
  
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
            <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
              <h2 className="section-title mb-6">About The Flavour Unit Corp</h2>
              <p className="text-lg text-flavour-gray mb-6">
                The Flavour Unit Corporation is more than just food—it's a culinary journey that celebrates comfort, culture, and community. As the parent company of our innovative food brands, we're dedicated to bringing exceptional flavors to your table.
              </p>
              <p className="text-lg text-flavour-gray mb-6">
                Our mission is to create delicious, high-quality comfort foods while supporting food entrepreneurs through education and resources. We believe food is about bringing people together and preserving cultural traditions.
              </p>
              <div className="flex justify-center">
                <Link to="/about" className="btn-outline inline-block">
                  Learn Our Story
                </Link>
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
              {featuredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-flavour-gray mb-4">
                      {product.description}
                    </p>
                    <Link to={product.link} className="text-flavour-red font-medium hover:underline">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
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
