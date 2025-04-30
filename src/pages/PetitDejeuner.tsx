
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';

const PetitDejeuner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      name: "Korean Fried Chicken Bao",
      description: "Savory Korean style fried chicken in a soft bao bun.",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Plant based or Beef Bacon and Egg Biscuit",
      description: "Choice of plant-based or beef bacon with egg on a fresh biscuit.",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Scallion Pancake sandwich - Plant-based Turkey OR Turkey Ham and Egg Sandwich",
      description: "Savory scallion pancake with your choice of protein and egg.",
      image: "https://images.unsplash.com/photo-1565299543923-37dd37887442?ixlib=rb-4.0.3&auto=format&fit=crop&w=828&q=80"
    },
    {
      name: "Spinach Stuffed Pastry",
      description: "Flaky pastry filled with savory spinach and seasonings.",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80"
    },
    {
      name: "Spicy Jalepeno Popper Egg Roll",
      description: "Crispy egg roll filled with spicy jalapeño popper filling.",
      image: "https://images.unsplash.com/photo-1603903631663-bc41ff9237a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80"
    },
    {
      name: "Turkey Sausage Breakfast Roll",
      description: "Savory turkey sausage wrapped in a flaky breakfast roll.",
      image: "https://images.unsplash.com/photo-1600336153113-d66c79de3e91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Southwest Veggie Croissant Sandwich",
      description: "Buttery croissant filled with southwest style vegetables.",
      image: "https://images.unsplash.com/photo-1496042399014-dc73c4f2bde1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gray-50">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Le Petit Déjeuner</h1>
              <p className="text-lg text-gray-600 mb-8">
                Savory breakfast sandwiches for wholesale are typically protein-packed, easy-to-serve, and come in convenient packaging. 
                They often feature breakfast meats, eggs, and cheese on a variety of breads or pastries, offering a quick and satisfying 
                breakfast option for various food service businesses.
              </p>
              <p className="font-bold text-flavour-red text-xl">*Note: We are a NO Pork company</p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="section-title">Our Products</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We offer these products in a 12 count frozen case - Just thaw, heat and serve. 
                Heat via an air fryer, toaster or turbo pizza oven.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-flavour-black">{product.name}</h3>
                    <p className="text-flavour-gray mb-4">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-6">Coming Soon!</h3>
              <p className="text-lg mb-8">
                Our products will be available for wholesale orders soon. Contact us for more information.
              </p>
              <Link to="/contact" className="btn-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Wholesale Info */}
        <section className="py-16 bg-flavour-cream">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="section-title mb-8">Wholesale Information</h2>
              <p className="text-lg mb-6">
                Our savory breakfast options are perfect for:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-3">Cafés</h3>
                  <p>Offer our delicious breakfast items to your morning customers.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-3">Food Service</h3>
                  <p>Quick and easy breakfast options for any food service operation.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-3">Retailers</h3>
                  <p>Stock our frozen breakfast items for your customers to enjoy at home.</p>
                </div>
              </div>
              <Link to="/contact" className="btn-primary">
                Request Wholesale Information
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PetitDejeuner;
