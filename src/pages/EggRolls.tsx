import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { Star, Truck, ShoppingCart, ExternalLink } from 'lucide-react';

const EggRolls = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      id: 1,
      name: "KINGSTON'S MAC AND CHEESE EGG ROLL",
      description: "(4 PIECES) KINGSTON'S MAC AND CHEESE EGG ROLL PAIRED WITH MARINARA",
      price: 9.99,
      image: "/lovable-uploads/7f01597f-44a4-4201-a923-6200a604d63c.png",
      category: "egg-rolls"
    },
    {
      id: 2,
      name: "PLANT-BASED PHILLY CHEESESTEAK EGG ROLL",
      description: "(4 PIECES) PLANT-BASED PHILLY CHEESE STEAK EGG ROLL WITH DIPPING SAUCE",
      price: 9.99,
      image: "/lovable-uploads/e08c1062-1174-4ea9-95e4-c6ee54929059.png",
      category: "egg-rolls"
    },
    {
      id: 3,
      name: "APPLE CHEESECAKE RANGOONS",
      description: "8 PIECES OF APPLE CHEESECAKE RANGOONS WITH CARAMEL DIPPING SAUCE",
      price: 8.99,
      image: "/lovable-uploads/a6c8a7ec-1cc1-4552-9f98-683e1f62c935.png",
      category: "rangoon"
    },
    {
      id: 4,
      name: "ITALIAN BEEF POTSTICKERS",
      description: "(12 PIECES) ITALIAN BEEF POTSTICKERS WITH DIPPING SAUCE",
      price: 10.99,
      image: "/lovable-uploads/bbe68d77-7529-4abc-b7d3-365d8ec4148e.png",
      category: "potstickers"
    },
    {
      id: 5,
      name: "AUNTIE KATHY'S PEACH COBBLER DESSERT EGG ROLLS",
      description: "(4 PIECES OF) AUNTIE KATHY'S PEACH COBBLER DESSERT EGG ROLLS",
      price: 9.99,
      image: "/lovable-uploads/2114e1c4-58a8-415a-b022-5ae6340eb35a.png",
      category: "egg-rolls"
    },
    {
      id: 6,
      name: "TACO OLE WITH GROUND CHICKEN EGG ROLL",
      description: "(4 PIECES OF ) TACO OLE WITH GROUND CHICKEN EGG ROLL PAIRED WITH OLE SAUCE",
      longDescription: "Taco Ole ™ Egg Roll - If you love Taco’s and Egg Rolls like we do then get ready for our Taco Ole™ Egg Roll! Comfort filled with Tex-Mex spiced ground chicken, Southwest veggie blend, diced tomatoes and chilis in a savory cheese sauce layered with more cheese! We have included our Ole ™ sauce to give the ultimate Egg Rolls Etc experience! Because it’s your Egg Roll please choose a method from our packaging on how to cook the outer layer",
      price: 9.99,
      image: "/lovable-uploads/taco_ole.png",
      category: "egg-rolls"
    },
    {
      id: 7,
      name: "GERT'S COLLARD GREENS WITH SMOKED TURKEY EGG ROLLS",
      description: "PRE-FRIED GERTS COLLARD GREENS WITH SMOKED TURKEY EOLS (4 PIECES) PAIRED WITH DIPPING SAUCE.",
      price: 9.99,
      longDescription: "Gert’s Collard Greens Egg Rolls ™ - Our most popular Egg Roll named after our founder’s late grandmother Gertrude, is comfort filled with freshly handpicked tender collard greens. These greens have simmered in a savory broth low and slow for hours, then lavished with decadent sweet smoked turkey meat and tucked inside of a wonton! We pair this Egg Roll with classic sweet and sour sauce and because its your Egg Roll please choose a method from our packaging on how to cook the outer layer.",
      image: "/lovable-uploads/6ffebb32-d793-48d4-b000-bd6743b9f338.png",
      category: "egg-rolls"
    },
    {
      id: 8,
      name: "MILD BUFFALO CHICKEN EGG ROLL",
      description: "(4 PIECES) MILD BUFFALO CHICKEN EGG ROLL",
      price: 9.99,
      longDescription: "Mild Buffalo Chicken Egg Rolls - Don’t like spicy but love the buffalo flavor? Then you will love our comfort filled mildly spiced buffalo chicken in a creamy buffalo flavored cheese sauce, layered with more cheese and tucked inside of a wonton! Because it’s your Egg Roll please choose a method from our packaging on how to cook the outer layer and grab your ranch or bleu cheese dressing to dip these delicious Egg Rolls in!",
      image: "/lovable-uploads/ebd23bef-adfb-49ad-a3a9-2f875e77ec92.png",
      category: "egg-rolls"
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16" style={{ backgroundColor: "#ea384c" }}>
          <div className="container-wide">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">EGG ROLLS ETC</h1>
              <p className="text-xl text-white/90 mb-8">
                The first and only Black owned frozen product line of Asian inspired cuisine that are "Comfort Filled"! Our brand unites cultures and differences all inside of a warm wonton- "Lets Chow On"!
              </p>
              <div className="flex justify-center">
                <div className="bg-white/10 text-white px-6 py-3 rounded-lg inline-block">
                  <p className="text-sm">*We are only delivering to Chicago and Close to Chicagoland suburbs for now via a third party delivery platform.</p>
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
                  <div className="h-64 overflow-hidden">
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
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    {product.longDescription && (
                      <p className="text-gray-600 mb-4 text-sm">{product.longDescription}</p>
                    )}
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

            <div className="mt-12 text-center">
              <a 
                href="https://www.redbubble.com/i/apron/Egg-Rolls-Etc-by-ChowOnEats/54574724.6ZXWR"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Shop Egg Rolls Merchandise
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default EggRolls;
