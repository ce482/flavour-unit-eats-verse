
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { Star, Truck, ShoppingCart } from 'lucide-react';

const EggRolls = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      id: 1,
      name: "Classic Egg Rolls",
      description: "Our signature comfort-filled egg rolls with a savory filling",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "egg-rolls"
    },
    {
      id: 2,
      name: "Buffalo Chicken Egg Rolls",
      description: "Spicy buffalo chicken wrapped in a crispy shell",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1025&q=80",
      category: "egg-rolls"
    },
    {
      id: 3,
      name: "Vegetable Egg Rolls",
      description: "Fresh vegetables in a delicious, crispy wrapper",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1602344912011-9d4313a093de?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      category: "egg-rolls"
    },
    {
      id: 4,
      name: "Pork & Shrimp Potstickers",
      description: "Traditional dumplings with savory filling",
      price: 13.99,
      image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "potstickers"
    },
    {
      id: 5,
      name: "Vegetable Potstickers",
      description: "Vegetarian-friendly dumplings",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1129&q=80",
      category: "potstickers"
    },
    {
      id: 6,
      name: "Cream Cheese Rangoon",
      description: "Crispy wontons with creamy filling",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1626501094011-bb5ec7b35d16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      category: "rangoon"
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section with Chicago Skyline */}
        <section className="relative pt-24 pb-20 bg-flavour-black">
          <div className="absolute inset-0 opacity-20 bg-cover bg-bottom" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2144&q=80')" }}></div>
          <div className="container-wide relative z-10">
            <div className="max-w-3xl text-white">
              <h1 className="text-5xl font-bold mb-6">Chicago's Favorite Comfort-Filled Egg Rolls</h1>
              <p className="text-xl mb-8">
                Authentic flavors in every bite, delivered straight to your door. Explore our selection of frozen comfort foods that bring restaurant-quality taste to your home.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#products" className="btn-secondary">
                  Shop Now
                </a>
                <div className="flex items-center text-yellow-400">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <span className="ml-2 text-white">5.0 (250+ Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-20 bg-white">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">Our Products</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="h-52 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block">
                      {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-flavour-red">${product.price.toFixed(2)}</span>
                      <button className="bg-flavour-red text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2">
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping Info */}
        <section className="py-16 bg-gray-50">
          <div className="container-wide">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <Truck size={48} className="text-flavour-red" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Nationwide Shipping</h3>
                  <p className="text-gray-600 mb-4">
                    We ship our frozen products anywhere in the continental United States. Our packaging ensures your food arrives safely and still frozen.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-flavour-red mr-2">•</span> 
                      Standard 2-day shipping: $19 flat rate for small orders
                    </li>
                    <li className="flex items-start">
                      <span className="text-flavour-red mr-2">•</span> 
                      Shipping partners: FedEx
                    </li>
                    <li className="flex items-start">
                      <span className="text-flavour-red mr-2">•</span> 
                      Subscribe & save options available
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">What Our Customers Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center text-yellow-400 mb-4">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                </div>
                <p className="text-gray-600 mb-4">
                  "These egg rolls are amazing! They taste just like the ones I get at my favorite restaurant. 
                  The shipping was fast and they arrived still frozen."
                </p>
                <div className="font-semibold">- Sarah J.</div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center text-yellow-400 mb-4">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                </div>
                <p className="text-gray-600 mb-4">
                  "The buffalo chicken egg rolls are my new favorite! They're perfect for game days or anytime 
                  I want something delicious without having to cook from scratch."
                </p>
                <div className="font-semibold">- Michael T.</div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center text-yellow-400 mb-4">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                </div>
                <p className="text-gray-600 mb-4">
                  "I ordered the variety pack for a family gathering and everyone loved them! 
                  The rangoon were especially a hit. Will definitely be ordering again."
                </p>
                <div className="font-semibold">- Lisa R.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-flavour-gold">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-bold mb-6 text-flavour-black">Ready to Try Chicago's Favorite Comfort Foods?</h2>
            <p className="text-xl mb-8 text-flavour-black/80 max-w-2xl mx-auto">
              Order today and get $5 off your first purchase with code: FLAVOR5
            </p>
            <a href="#products" className="bg-flavour-red text-white hover:bg-red-700 font-bold py-3 px-8 rounded-md transition-colors inline-block">
              Shop Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default EggRolls;
