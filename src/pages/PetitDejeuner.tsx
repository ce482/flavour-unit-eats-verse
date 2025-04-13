
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Sparkles, Clock, Coffee, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const PetitDejeuner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      name: "Croissant Breakfast Sandwich",
      description: "Buttery croissant filled with scrambled eggs, cheese, and your choice of bacon or sausage",
      image: "https://images.unsplash.com/photo-1600431562968-ef337c8733ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
      tags: ["Savory", "Breakfast"]
    },
    {
      name: "French Toast Sticks",
      description: "Cinnamon-spiced french toast sticks with a side of maple syrup",
      image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80",
      tags: ["Sweet", "Breakfast"]
    },
    {
      name: "Breakfast Burrito",
      description: "Flour tortilla filled with eggs, cheese, potatoes, and choice of protein",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1176&q=80",
      tags: ["Savory", "Breakfast"]
    },
    {
      name: "Mini Quiche",
      description: "Individual quiches with various fillings, perfect for breakfast or brunch",
      image: "https://images.unsplash.com/photo-1623259838743-9f1e884fba59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      tags: ["Savory", "Brunch"]
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Coming Soon Banner */}
        <div className="bg-flavour-gold text-center py-3 font-semibold text-flavour-black">
          <div className="container-wide">
            <p className="flex items-center justify-center gap-2">
              <Sparkles size={18} />
              Coming Soon - This product line is not yet available for purchase
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-24 pb-20 bg-gray-50">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-flavour-black">Petit Déjeuner</h1>
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  Introducing our upcoming savory breakfast line, bringing international flavors to your morning routine. Convenient, delicious, and ready in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button disabled className="btn-primary opacity-75 cursor-not-allowed">
                    Coming Soon
                  </button>
                  <Link to="/contact" className="btn-outline">
                    Get Notified
                  </Link>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                  alt="Breakfast spread" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="section-title">Why Choose Petit Déjeuner?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our breakfast options are designed for busy people who want to start their day with a delicious, satisfying meal without the hassle.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="flex justify-center mb-4">
                  <Clock className="text-flavour-red" size={48} />
                </div>
                <h3 className="text-xl font-bold mb-3">Ready in Minutes</h3>
                <p className="text-gray-600">
                  From freezer to table in just minutes. Perfect for busy mornings when you need a quick but satisfying breakfast.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="flex justify-center mb-4">
                  <Coffee className="text-flavour-red" size={48} />
                </div>
                <h3 className="text-xl font-bold mb-3">Quality Ingredients</h3>
                <p className="text-gray-600">
                  Made with real, high-quality ingredients. No artificial preservatives or flavors - just delicious food.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="flex justify-center mb-4">
                  <Tag className="text-flavour-red" size={48} />
                </div>
                <h3 className="text-xl font-bold mb-3">Global Flavors</h3>
                <p className="text-gray-600">
                  Experience international breakfast flavors from around the world, all from the comfort of your home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Preview */}
        <section className="py-16 bg-flavour-cream">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="section-title">Coming Soon to Your Breakfast Table</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Here's a preview of the delicious breakfast options we're developing for the Petit Déjeuner line.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {product.tags.map((tag, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <button disabled className="text-gray-400 border border-gray-300 font-medium py-2 px-4 rounded-md cursor-not-allowed">
                      Coming Soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notification Sign-up */}
        <section className="py-16 bg-white">
          <div className="container-wide max-w-4xl">
            <div className="bg-flavour-gold p-8 rounded-lg shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-3 text-flavour-black">Be the First to Know</h2>
                <p className="text-flavour-black/80">
                  Sign up to receive updates about our Petit Déjeuner breakfast line launch, special promotions, and early access opportunities.
                </p>
              </div>
              
              <form className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-flavour-red"
                  required
                />
                <button type="submit" className="bg-flavour-red hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors">
                  Notify Me
                </button>
              </form>
              
              <p className="text-xs text-flavour-black/70 mt-4 text-center">
                By signing up, you agree to receive emails from The Flavour Unit Corp. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PetitDejeuner;
