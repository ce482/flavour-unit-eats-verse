
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/lovable-uploads/5fe3c549-7c1e-4e4d-a76f-3cb60386a6b8.png')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="container-wide relative z-10 pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Comfort Food, <br />Reimagined
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            The Flavour Unit Corp is the parent company of innovative food brands creating delicious comfort foods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/egg-rolls" className="btn-primary">
              Explore Egg Rolls Etc.
            </Link>
            <Link to="/legacy-kitchen" className="btn-secondary">
              Legacy Kitchen Solutions
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center animate-bounce">
        <span className="text-sm mb-2">Scroll Down</span>
        <ArrowRight size={20} className="transform rotate-90" />
      </div>
    </div>
  );
};

export default HeroBanner;
