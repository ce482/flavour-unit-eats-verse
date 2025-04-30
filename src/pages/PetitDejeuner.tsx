
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PetitDejeuner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      name: "Korean Fried Chicken Bao",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Plant-based or Beef Bacon and Egg Biscuit",
      image: "https://images.unsplash.com/photo-1600164829824-d391e3bb09cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Scallion Pancake sandwich - Plant-based Turkey OR Turkey Ham and Egg Sandwich",
      image: "https://images.unsplash.com/photo-1607753991193-c50172f5257a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Spinach Stuffed Pastry",
      image: "https://images.unsplash.com/photo-1619221882220-947b3d3c8861?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Spicy Jalapeño Popper Egg Roll",
      image: "https://images.unsplash.com/photo-1606066889831-35895d6de225?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Turkey Sausage Breakfast Roll",
      image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Southwest Veggie Croissant Sandwich",
      image: "https://images.unsplash.com/photo-1605166035212-55aef2b82e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        <div className="pt-16 md:pt-20">
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
          <section className="py-20 bg-gray-50">
            <div className="container-wide">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-flavour-black">Le Petit Déjeuner</h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Savory breakfast sandwiches for wholesale, protein-packed, easy-to-serve, and in convenient packaging. 
                  Featuring breakfast meats, eggs, and cheese on a variety of breads or pastries, we offer quick and satisfying 
                  breakfast options for various food service businesses. 
                  <span className="font-semibold block mt-2">*Note: We are a NO Pork company</span>
                </p>
                <div className="flex justify-center">
                  <Link to="/contact">
                    <Button variant="destructive" className="bg-flavour-red hover:bg-flavour-red/90">
                      Contact for Wholesale Inquiries
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Product Offerings */}
          <section className="py-16 bg-white">
            <div className="container-wide">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Offerings</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  We offer these products in a 12-count frozen case - Just thaw, heat and serve. 
                  Heat via an air fryer, toaster, or turbo pizza oven for perfect results every time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Wholesale Info Section */}
          <section className="py-16 bg-gray-50">
            <div className="container-wide">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Wholesale Information</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Our Le Petit Déjeuner line is designed specifically for food service businesses 
                    looking to offer convenient, high-quality breakfast options to their customers.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="text-flavour-red mr-2 mt-1 flex-shrink-0" size={20} />
                      <span>12-count frozen cases for convenient inventory management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-flavour-red mr-2 mt-1 flex-shrink-0" size={20} />
                      <span>Simple preparation - thaw, heat, and serve</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-flavour-red mr-2 mt-1 flex-shrink-0" size={20} />
                      <span>Multiple heating options - air fryer, toaster, or turbo pizza oven</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-flavour-red mr-2 mt-1 flex-shrink-0" size={20} />
                      <span>High-quality, no-pork ingredients</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-flavour-red mr-2 mt-1 flex-shrink-0" size={20} />
                      <span>International flavors to diversify your breakfast menu</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Link to="/contact">
                      <Button variant="destructive" className="bg-flavour-red hover:bg-flavour-red/90">
                        Request Wholesale Information
                      </Button>
                    </Link>
                  </div>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                    alt="Wholesale breakfast products" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="py-16 bg-flavour-red text-white">
            <div className="container-wide text-center">
              <h2 className="text-3xl font-bold mb-4">Interested in our wholesale breakfast options?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Contact us today to learn more about our Le Petit Déjeuner product line and how it can enhance your food service business.
              </p>
              <div className="flex justify-center">
                <Link to="/contact">
                  <Button variant="outline" className="bg-white text-flavour-red hover:bg-gray-100 border-white">
                    Contact Us
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-white/80">
                Email: Orderwithlepetitdejeuner@gmail.com
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PetitDejeuner;
