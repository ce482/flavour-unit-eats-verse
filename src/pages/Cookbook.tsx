
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { BookOpen, ShoppingCart, Star, Award, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cookbook = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // External links for ordering the cookbook
  const orderLinks = [
    {
      name: "Amazon",
      url: "https://www.amazon.com/Legacy-Kitchen-1219-inheritance-Nicholas/dp/B0BV78XC2Y",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
    },
    {
      name: "Barnes & Noble",
      url: "https://www.barnesandnoble.com/w/legacy-kitchen-1219-javon-mccain-nicholas/1143051018",
      icon: "https://logos-world.net/wp-content/uploads/2022/11/Barnes-Noble-Logo.png"
    },
    {
      name: "Walmart",
      url: "https://www.walmart.com/ip/Legacy-Kitchen-1219-an-inheritance-of-recipes-from-my-family-to-yours-Paperback-9798218235253/2316407316",
      icon: "https://1000logos.net/wp-content/uploads/2017/05/Walmart-Logo.png"
    }
  ];

  const reviews = [
    {
      text: "This cookbook is filled with delicious recipes that remind me of home. The stories behind each recipe make it even more special.",
      author: "Maria L.",
      rating: 5
    },
    {
      text: "I've tried several recipes from this book and they've all been hits with my family. The instructions are clear and easy to follow.",
      author: "James T.",
      rating: 5
    },
    {
      text: "More than just recipes - it's a journey through family traditions and food heritage. A beautiful addition to any kitchen.",
      author: "Sandra K.",
      rating: 5
    }
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-flavour-cream">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="flex items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 text-flavour-black">Legacy Kitchen 1219</h1>
                  <h2 className="text-2xl md:text-3xl font-medium mb-6 text-flavour-brown">
                    An inheritance of recipes from my family to yours
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    By Javon McCain Nicholas
                  </p>
                  <div className="flex flex-wrap gap-4 items-center mb-8">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-yellow-500" fill="currentColor" size={24} />
                      ))}
                    </div>
                    <span className="text-gray-700">5.0 (25+ Reviews)</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#buy-now" className="btn-primary flex items-center justify-center gap-2">
                      <ShoppingCart size={18} />
                      Buy Now
                    </a>
                    <a href="#preview" className="btn-outline flex items-center justify-center gap-2">
                      <BookOpen size={18} />
                      Preview
                    </a>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" 
                  alt="Legacy Kitchen 1219 Cookbook" 
                  className="w-full h-auto object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-full shadow-lg">
                  <Award className="text-flavour-gold" size={48} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the Cookbook */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" 
                  alt="Cookbook recipes" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="section-title">About the Cookbook</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "Legacy Kitchen 1219" is more than just a cookbook—it's a journey through family traditions, cultural heritage, and the love that goes into every recipe.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  This collection features cherished recipes passed down through generations, each with a story that connects to family, community, and the joy of sharing good food.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  From comfort food classics to innovative twists on traditional dishes, these recipes are perfect for family gatherings, special occasions, or whenever you want to create something delicious and meaningful.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                    <BookOpen className="text-flavour-red mr-3" size={24} />
                    <div>
                      <h3 className="font-bold">50+ Recipes</h3>
                      <p className="text-sm text-gray-600">Family favorites</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                    <FileText className="text-flavour-red mr-3" size={24} />
                    <div>
                      <h3 className="font-bold">150 Pages</h3>
                      <p className="text-sm text-gray-600">Stories & instructions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section id="preview" className="py-16 bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">What's Inside</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Preview Card 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" 
                    alt="Family recipes" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Family Recipes</h3>
                  <p className="text-gray-600">
                    Discover cherished recipes that have been passed down through generations, each with its own unique story and connection to family heritage.
                  </p>
                </div>
              </div>
              
              {/* Preview Card 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1514986888952-8cd320577b68?ixlib=rb-4.0.3&auto=format&fit=crop&w=1176&q=80" 
                    alt="Cooking tips" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Cooking Tips & Techniques</h3>
                  <p className="text-gray-600">
                    Learn essential cooking techniques, ingredient substitutions, and helpful tips that will elevate your culinary skills and make cooking more enjoyable.
                  </p>
                </div>
              </div>
              
              {/* Preview Card 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1611068120813-eca5a8cbf793?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" 
                    alt="Family stories" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Family Stories</h3>
                  <p className="text-gray-600">
                    Immerse yourself in heartwarming family stories and traditions that accompany each recipe, providing context and meaning to the food we share.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">What Readers Are Saying</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} fill="currentColor" size={20} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                  <p className="font-medium">- {review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Buy Now Section */}
        <section id="buy-now" className="py-16 bg-flavour-gold">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-bold mb-8 text-flavour-black">Get Your Copy Today</h2>
            <p className="text-xl mb-12 text-flavour-black/80 max-w-2xl mx-auto">
              "Legacy Kitchen 1219" is available from these retailers:
            </p>
            
            <div className="flex flex-wrap justify-center gap-8">
              {orderLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-lg shadow-md transition-transform hover:-translate-y-1 flex flex-col items-center"
                >
                  <div className="h-16 flex items-center justify-center mb-4">
                    <img 
                      src={link.icon} 
                      alt={link.name} 
                      className="h-full object-contain"
                    />
                  </div>
                  <span className="text-lg font-bold text-flavour-black">Buy on {link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Author Section */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80" 
                  alt="Chef cooking" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="section-title">About the Author</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Javon McCain Nicholas is a passionate cook, entrepreneur, and the founder of The Flavour Unit Corporation. With a love for creating comfort foods that bring people together, Javon has dedicated his career to sharing traditional recipes with innovative twists.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Through Egg Rolls Etc. and Legacy Kitchen Solutions, Javon has been able to share his culinary expertise with home cooks and aspiring food entrepreneurs alike. "Legacy Kitchen 1219" is a culmination of his family recipes, cooking philosophy, and the stories that make food meaningful.
                </p>
                <Link to="/about" className="btn-outline inline-block">
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Cookbook;
