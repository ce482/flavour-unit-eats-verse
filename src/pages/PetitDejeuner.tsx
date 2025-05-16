
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const PetitDejeuner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // All products with updated names
  const allProducts = [
    {
      name: "Chicken Breakfast Sandwich",
      image: "/lovable-uploads/d8d73a25-60ae-456a-818a-fe271e5229a5.png"
    },
    {
      name: "Sandwich Roll Up",
      image: "/lovable-uploads/092c5bb4-3f74-4db3-ae57-e372f3de4e07.png"
    },
    {
      name: "Breakfast Sandwich",
      image: "/lovable-uploads/e1e3404b-7e39-4fbd-ab1a-f135b174ee05.png"
    },
    {
      name: "Waffle Sandwich",
      image: "/lovable-uploads/312ae81f-ef1a-45ee-a584-bfca048de129.png"
    },
    {
      name: "Chicken Waffle Sandwich",
      image: "/lovable-uploads/26b9dd30-8fc7-4cca-b7c2-8eb30a3266f4.png"
    },
    {
      name: "Breakfast Egg Cups",
      image: "/lovable-uploads/1848c6ad-3e50-46cd-8801-08425785b8b5.png"
    },
    {
      name: "Savory Breakfast Muffins",
      image: "/lovable-uploads/c2ac54af-e364-41e7-b95a-955d7966bd2c.png"
    },
    {
      name: "Breakfast Hash Brown Cups",
      image: "/lovable-uploads/bad6ee96-6b68-433d-855b-ccb563d8c077.png"
    },
    {
      name: "Savory Breakfast Sandwich",
      image: "/lovable-uploads/bec72a7d-4a82-4272-ade5-17e3af0476df.png"
    },
    {
      name: "Cinnamon Roll Breakfast Sandwich",
      image: "/lovable-uploads/88a4199b-59ab-4e95-bdf9-94c010e89fb9.png"
    },
    {
      name: "Korean Fried Chicken Bao",
    },
    {
      name: "Plant based or Beef Bacon and Egg Biscuit",
    },
    {
      name: "Scallion Pancake sandwich - Plant-based Turkey OR Turkey Ham and Egg Sandwich",
    },
    {
      name: "Spinach Stuffed Pastry",
    },
    {
      name: "Spicy Jalepeno Popper Egg Roll",
    },
    {
      name: "Turkey Sausage Breakfast Roll",
    },
    {
      name: "Southwest Veggie Croissant Sandwich",
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
                Le Petit Déjeuner is a breakfast experience that celebrates quality ingredients, cultural identity, 
                and the art of savoring the moment. We are currently seeking foodservice partnerships. The products 
                are savory and offered in a variety of options including Plant based. Please note that these products 
                will exclusively be offered to cafes, coffee shops, hospitals, vending machine owners, food truck operators, 
                and catering companies. They are only sold by the case, so please inquire about a wholesale partnership 
                with Le Petit Déjeuner today!
              </p>
              <p className="font-bold text-flavour-red text-xl">*Note: We are a NO Pork company</p>
            </div>
          </div>
        </section>

        {/* All Products Section */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="section-title">Coming Soon</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Preview our upcoming product lineup for wholesale partners
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProducts.map((product, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
                >
                  {product.image && (
                    <div className="h-56 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-flavour-black">{product.name}</h3>
                  </div>
                </div>
              ))}
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
