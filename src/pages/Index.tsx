
import { useEffect, useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import BrandShowcase from '../components/home/BrandShowcase';
import OrderPopup from '../components/ui/OrderPopup';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { ImageLoader } from '../utils/imageLoader';

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
