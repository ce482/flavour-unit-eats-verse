
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ImageLoader } from '../../utils/imageLoader';

const BrandShowcase = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const brands = [
    {
      name: "Egg Rolls Etc.",
      description: "Chicago's favorite comfort-filled egg rolls, potstickers, and rangoon. Available at grocery stores, online retailers, and through catering services.",
      imageSrc: "/lovable-uploads/283ac46a-c5ba-456c-929d-ca75f501b055.png", // Updated philly_cheese_steak image
      path: "/egg-rolls",
      isActive: true
    },
    {
      name: "Legacy Kitchen Solutions",
      description: "Coaching and consulting for small food businesses. Learn how to scale your food business from concept to market.",
      imageSrc: "/lovable-uploads/920bba3d-0652-47e5-8919-d837b56ee917.png",
      path: "/legacy-kitchen",
      isActive: true
    },
    {
      name: "Petit Déjeuner",
      description: "Savory breakfast options that bring international flavors to your morning routine. (Coming Soon)",
      imageSrc: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      path: "/petit-dejeuner",
      isActive: false
    }
  ];

  useEffect(() => {
    // Preload brand images
    const imageUrls = brands.map(brand => brand.imageSrc);
    ImageLoader.preloadImages(imageUrls).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  return (
    <section className="py-20 bg-flavour-cream">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Brands</h2>
          <p className="text-lg text-flavour-gray max-w-2xl mx-auto">
            The Flavour Unit Corp is the parent company of these innovative food brands and services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <div 
              key={brand.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="h-56 overflow-hidden relative">
                {!imagesLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}
                <img 
                  src={brand.imageSrc} 
                  alt={brand.name}
                  className={`w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transition: "opacity 0.3s ease-in-out" }}
                  loading="eager"
                  onLoad={(e) => {
                    // Ensure image is visible when loaded individually
                    e.currentTarget.classList.remove('opacity-0');
                    e.currentTarget.classList.add('opacity-100');
                  }}
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-flavour-black">{brand.name}</h3>
                <p className="text-flavour-gray mb-4">{brand.description}</p>
                
                {brand.isActive ? (
                  <Link to={brand.path} className="text-flavour-red font-medium hover:underline inline-flex items-center">
                    Learn More 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                ) : (
                  <span className="text-gray-400 font-medium cursor-not-allowed inline-flex items-center">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
