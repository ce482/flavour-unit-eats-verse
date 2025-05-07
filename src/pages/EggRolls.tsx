
import { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import ProductDetail, { Product } from '@/components/product/ProductDetail';
import { toast } from 'sonner';
import ProductImageCarousel from '@/components/product/ProductImageCarousel';

const EggRolls = () => {
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products: Product[] = [
    {
      id: 1,
      name: "KINGSTON'S MAC AND CHEESE EGG ROLL",
      description: "(4 PIECES) KINGSTON'S MAC AND CHEESE EGG ROLL PAIRED WITH MARINARA",
      price: 12.99,
      image: "/lovable-uploads/5051ed22-9390-4151-ab42-452c1ec1d116.png",
      category: "egg-rolls",
      longDescription: "Kingston's Mac and Cheese Egg Rolls - Our signature mac and cheese egg rolls are filled with creamy mac and cheese, perfectly fried and served with marinara sauce for dipping. A perfect combination of comfort foods!"
    },
    {
      id: 2,
      name: "PLANT-BASED PHILLY CHEESESTEAK EGG ROLL",
      description: "(4 PIECES) PLANT-BASED PHILLY CHEESE STEAK EGG ROLL WITH DIPPING SAUCE",
      price: 12.99,
      image: [
        "/lovable-uploads/747d6253-a20c-4596-98e4-daa838676a71.png",
        "/lovable-uploads/c0bf92d3-5f82-4b14-9022-da738b873037.png"
      ],
      category: "egg-rolls",
      longDescription: "Plant-Based Philly Cheesesteak Egg Rolls - A delicious vegan alternative to our classic Philly Cheesesteak Egg Rolls. Made with plant-based protein that mimics the taste and texture of beef, along with vegan cheese and sautéed peppers and onions."
    },
    {
      id: 3,
      name: "APPLE CHEESECAKE RANGOONS",
      description: "8 PIECES OF APPLE CHEESECAKE RANGOONS WITH CARAMEL DIPPING SAUCE",
      price: 12.99,
      image: "/lovable-uploads/8df0379b-2e11-43ad-9b44-a2806b380c98.png",
      category: "rangoon",
      longDescription: "Apple Cheesecake Rangoons - These delightful little pastries combine the creaminess of cheesecake with the sweetness of apple filling, all wrapped up in a crispy wonton wrapper. Served with caramel dipping sauce for an extra touch of indulgence."
    },
    {
      id: 4,
      name: "ITALIAN BEEF POTSTICKERS",
      description: "(12 PIECES) ITALIAN BEEF POTSTICKERS WITH DIPPING SAUCE",
      price: 13.99,
      image: [
        "/lovable-uploads/96caeb4a-1a9d-4a4c-af4c-703258afe08b.png",
        "/lovable-uploads/8b4dc6df-c9b8-408a-ad08-438ce26079c4.png"
      ],
      category: "potstickers",
      longDescription: "Italian Beef Potstickers - Our unique fusion of Italian and Asian cuisine. Tender Italian beef with all the classic seasonings and giardiniera, wrapped in a delicate dumpling wrapper and pan-fried to perfection. Served with a complementary dipping sauce."
    },
    {
      id: 5,
      name: "AUNTIE KATHY'S PEACH COBBLER DESSERT EGG ROLLS",
      description: "(4 PIECES OF) AUNTIE KATHY'S PEACH COBBLER DESSERT EGG ROLLS",
      price: 12.99,
      image: [
        "/lovable-uploads/c22b050e-f196-49e6-a865-e2d1b489e2e9.png",
        "/lovable-uploads/2f82422a-e001-4e40-a50f-963fb94a5e66.png"
      ],
      category: "egg-rolls",
      longDescription: "Auntie Kathy's Peach Cobbler Dessert Egg Rolls - A delightful dessert twist on egg rolls! Sweet peaches, cinnamon, and a touch of vanilla are wrapped in a crispy wonton wrapper and fried to golden perfection. A family recipe passed down from our Auntie Kathy."
    },
    {
      id: 6,
      name: "TACO OLE WITH GROUND CHICKEN EGG ROLL",
      description: "(4 PIECES OF) TACO OLE WITH GROUND CHICKEN EGG ROLL PAIRED WITH OLE SAUCE",
      price: 12.99,
      image: [
        "/lovable-uploads/2a56dd1a-9033-4a49-b0b3-3fcf40b363e8.png",
        "/lovable-uploads/aeb40c51-fb87-45e1-8782-f20d7bf54d6e.png"
      ],
      category: "egg-rolls",
      longDescription: "Taco Ole ™ Egg Roll - If you love Taco's and Egg Rolls like we do then get ready for our Taco Ole™ Egg Roll! Comfort filled with Tex-Mex spiced ground chicken, Southwest veggie blend, diced tomatoes and chilis in a savory cheese sauce layered with more cheese! We have included our Ole ™ sauce to give the ultimate Egg Rolls Etc experience! Because it's your Egg Roll please choose a method from our packaging on how to cook the outer layer"
    },
    {
      id: 7,
      name: "GERT'S COLLARD GREENS WITH SMOKED TURKEY EGG ROLLS",
      description: "PRE-FRIED GERTS COLLARD GREENS WITH SMOKED TURKEY EGG ROLS (4 PIECES) PAIRED WITH DIPPING SAUCE.",
      price: 12.99,
      image: "/lovable-uploads/f282ef43-695b-4630-8821-bbe7f460ce05.png",
      category: "egg-rolls",
      longDescription: "Gert's Collard Greens Egg Rolls ™ - Our most popular Egg Roll named after our founder's late grandmother Gertrude, is comfort filled with freshly handpicked tender collard greens. These greens have simmered in a savory broth low and slow for hours, then lavished with decadent sweet smoked turkey meat and tucked inside of a wonton! We pair this Egg Roll with classic sweet and sour sauce and because its your Egg Roll please choose a method from our packaging on how to cook the outer layer."
    },
    {
      id: 8,
      name: "MILD BUFFALO CHICKEN EGG ROLL",
      description: "(4 PIECES) MILD BUFFALO CHICKEN EGG ROLL",
      price: 12.99,
      image: "/lovable-uploads/afb163ec-21c7-468c-8883-c116ad1acc7e.png",
      category: "egg-rolls",
      longDescription: "Mild Buffalo Chicken Egg Rolls - Don't like spicy but love the buffalo flavor? Then you will love our comfort filled mildly spiced buffalo chicken in a creamy buffalo flavored cheese sauce, layered with more cheese and tucked inside of a wonton! Because it's your Egg Roll please choose a method from our packaging on how to cook the outer layer and grab your ranch or bleu cheese dressing to dip these delicious Egg Rolls in!"
    },
    {
      id: 9,
      name: "LASAGNA POTSTICKERS",
      description: "(12 PIECES) LASAGNA POTSTICKERS",
      price: 13.99,
      image: "/lovable-uploads/db490621-6526-495d-a6f2-2b574f0f165d.png",
      category: "potstickers",
      longDescription: "Lasagna Potstickers - All the flavors of classic Italian lasagna in a convenient potsticker form! Filled with seasoned ground beef, ricotta cheese, mozzarella, and our special blend of Italian herbs and spices. Pan-fried to perfection and served with marinara sauce."
    },
    {
      id: 10,
      name: "SALMON RANGOON",
      description: "8 PIECES SALMON RANGOON",
      price: 12.99,
      image: "/lovable-uploads/71af7367-8ff9-437f-a2b6-7c69b4088ed5.png",
      category: "rangoon",
      longDescription: "Salmon Rangoon - Our gourmet twist on the classic crab rangoon, featuring premium salmon mixed with a creamy cheese filling and wrapped in a crispy wonton wrapper. Perfect for seafood lovers looking for something a bit different!"
    },
    {
      id: 11,
      name: "JERK CABBAGE EGG ROLLS",
      description: "4 PIECES JERK CABBAGE EGG ROLLS",
      price: 12.99,
      image: "",
      category: "egg-rolls",
      longDescription: "Jerk Cabbage Egg Rolls - A Caribbean-inspired creation featuring cabbage seasoned with our authentic jerk spice blend, creating a perfect balance of heat and flavor. Each bite offers a unique taste experience that combines Jamaican culinary traditions with our signature egg roll style."
    }
  ];

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: typeof product.image === 'string' ? product.image : Array.isArray(product.image) ? product.image[0] : "",
    });
    toast.success(`Added ${product.name} to cart`);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16" style={{ backgroundColor: "#B71C1C" }}>
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
                  {product.image && (
                    Array.isArray(product.image) ? (
                      <ProductImageCarousel 
                        images={product.image} 
                        productName={product.name} 
                        onClick={() => handleProductClick(product)}
                      />
                    ) : (
                      <div 
                        className="h-48 bg-center bg-cover cursor-pointer"
                        style={{ backgroundImage: `url(${product.image})` }}
                        onClick={() => handleProductClick(product)}
                      />
                    )
                  )}
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block">
                      {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                    <h3 
                      className="text-xl font-bold mb-2 cursor-pointer hover:text-flavour-red"
                      onClick={() => handleProductClick(product)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-flavour-red">${product.price.toFixed(2)}</span>
                      <button 
                        className="bg-flavour-red text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                        onClick={() => handleAddToCart(product)}
                      >
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
      
      <ProductDetail 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default EggRolls;
