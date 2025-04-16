
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
      description: "4 pieces paired with marinara sauce",
      price: 9.99,
      image: "/lovable-uploads/7f01597f-44a4-4201-a923-6200a604d63c.png", // Mac and cheese image
      category: "egg-rolls"
    },
    {
      id: 2,
      name: "PLANT-BASED PHILLY CHEESESTEAK EGG ROLL",
      description: "4 pieces with dipping sauce",
      price: 9.99,
      image: "/lovable-uploads/e08c1062-1174-4ea9-95e4-c6ee54929059.png", // Philly image
      category: "egg-rolls"
    },
    {
      id: 3,
      name: "APPLE CHEESECAKE RANGOONS",
      description: "8 pieces with caramel dipping sauce",
      price: 8.99,
      image: "/lovable-uploads/a6c8a7ec-1cc1-4552-9f98-683e1f62c935.png", // Rangoon image
      category: "rangoon"
    },
    {
      id: 4,
      name: "ITALIAN BEEF POTSTICKERS",
      description: "12 pieces with dipping sauce",
      price: 10.99,
      image: "/lovable-uploads/bbe68d77-7529-4abc-b7d3-365d8ec4148e.png", // Potstickers image
      category: "potstickers"
    },
    {
      id: 5,
      name: "AUNTIE KATHY'S PEACH COBBLER DESSERT EGG ROLLS",
      description: "4 pieces",
      price: 9.99,
      image: "/lovable-uploads/2114e1c4-58a8-415a-b022-5ae6340eb35a.png", // Peach cobbler image
      category: "egg-rolls"
    },
    {
      id: 6,
      name: "TACO OLE WITH GROUND CHICKEN EGG ROLL",
      description: "4 pieces paired with Ole sauce",
      price: 9.99,
      longDescription: "If you love Taco's and Egg Rolls like we do then get ready for our Taco Ole™ Egg Roll! Comfort filled with Tex-Mex spiced ground chicken, Southwest veggie blend, diced tomatoes and chilis in a savory cheese sauce layered with more cheese!",
      image: "/lovable-uploads/c023a75c-eb39-467c-ad0c-f8de582a9fd3.png", // Taco Ole image
      category: "egg-rolls"
    },
    {
      id: 7,
      name: "GERT'S COLLARD GREENS WITH SMOKED TURKEY EGG ROLLS",
      description: "4 pieces paired with dipping sauce",
      price: 9.99,
      longDescription: "Our most popular Egg Roll named after our founder's late grandmother Gertrude, is comfort filled with freshly handpicked tender collard greens. These greens have simmered in a savory broth low and slow for hours, then lavished with decadent sweet smoked turkey meat and tucked inside of a wonton!",
      image: "/lovable-uploads/6ffebb32-d793-48d4-b000-bd6743b9f338.png", // Gert's image
      category: "egg-rolls"
    },
    {
      id: 8,
      name: "MILD BUFFALO CHICKEN EGG ROLL",
      description: "4 pieces with ranch or bleu cheese dressing",
      price: 9.99,
      longDescription: "Don't like spicy but love the buffalo flavor? Then you will love our comfort filled mildly spiced buffalo chicken in a creamy buffalo flavored cheese sauce, layered with more cheese and tucked inside of a wonton!",
      image: "/lovable-uploads/ebd23bef-adfb-49ad-a3a9-2f875e77ec92.png", // Buffalo chicken image
      category: "egg-rolls"
    }
  ];

  const faqs = [
    {
      question: "HOW DO I COOK THESE?",
      answer: `Our products are free of preservatives and artificial colors. We do not recommend grilling. Cooking instructions are on the packaging. Thaw products in the microwave from frozen for 2 minutes or in the refrigerator overnight.
      
      Air fry - Pre heat air fryer on 400 degrees, poke Egg Roll or Rangoon with a tooth pick in multiple areas, spray or coat with oil of choice and place Egg roll in the air fryer. Cook for 5 minutes and rotate. Apply more oil if needed until golden brown.
      
      Deep fryer- Cook in pre- heated oil at 375 degrees F until Egg Roll or Rangoon floats to the top.
      
      Oven - Pre heat oven to 375 degrees F. Coat or spray baking sheet with oil of choice and thinly layer product on baking sheet. Cook product on each side, turning in between to ensure an eternal temperature of 165 degrees F or higher and golden brown on the outside.
      
      Skillet and Air fry combo - Pre heat air fryer to 400 degrees. Lightly coat oil in a skillet on the stove and turn on the heat. sauté product on each side until lightly golden brown. Transfer product to the Air fryer and cook for 6 to 8 minutes to ensure the eternal temperature reaches 165 degrees F or higher and is golden brown on the outside.`
    },
    {
      question: "IS THERE PORK IN THE EGG ROLLS?",
      answer: "We are a NO PORK company."
    },
    {
      question: "ARE THESE PRODUCTS MADE OVERSEAS?",
      answer: "No, these products are made right here in Illinois, United States."
    },
    {
      question: "HOW LONG WILL THE PRODUCTS LAST FROZEN?",
      answer: "Our products have a 1-year shelf life frozen. and 7 days refrigerated."
    },
    {
      question: "CAN I ORDER EGG ROLLS ETC WHOLESALE FOR MY RESTAURANT, CAFE, CATERING BUSINESS, ETC.?",
      answer: "Possibly, please fill our online wholesale partner application and let's see if we will be a good match!"
    },
    {
      question: "WHEN I OPENED MY RETAIL PACK FROM THE GROCERY STORE. THE EGG ROLLS WERE STUCK TOGETHER. WHAT SHOULD I DO?",
      answer: "Because we do not add any artificial waxes or coatings the products can sometimes stick together. Please gently peel apart and continue the cooking process as mentioned on the packaging or above."
    },
    {
      question: "WHAT ARE THE SILVER PACKETS IN THE BAGS WITH THE EGG ROLLS ETC?",
      answer: "We want everyone to have the ultimate EGG ROLLS ETC experience, so we included a seasoning and sauce pack in each bag. Thaw the sauce in its closed packet in a cup of warm water and use as a dipping sauce if desired."
    }
  ];

  const videos = [
    {
      title: "Egg Rolls Etc on ABC Windy City Live 2018",
      url: "https://youtu.be/-GNzE8iIdco"
    },
    {
      title: "Egg Rolls Etc Chicago, IL",
      url: "https://www.youtube.com/watch?v=5xFOyaJ1qE4"
    },
    {
      title: "How to make 'comfort-filled' egg rolls",
      url: "https://www.youtube.com/watch?v=r4fPaVk-s9s"
    },
    {
      title: "[Podcast] Influential Women in Food: Javon Nicholas, Egg Rolls Etc.",
      url: "https://www.youtube.com/watch?v=13zpYEcxwHQ"
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-flavour-black">
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

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">{faq.answer}</p>
                </div>
              ))}
              <p className="text-center text-gray-600 mt-8">
                If there are any more questions, please feel free to contact us via our website. 
                We appreciate your business and support! Prices are subject to change without further notice. 
                No Cash refunds. Do not sell or duplicate our imagery or content.
              </p>
            </div>
          </div>
        </section>

        {/* Media Section */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">Media Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((video, index) => (
                <div key={index} className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${video.url.split('=')[1] || video.url.split('/').pop()}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default EggRolls;
