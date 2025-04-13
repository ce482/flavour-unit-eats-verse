
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

type OrderPopupProps = {
  delayInSeconds?: number;
};

const OrderPopup = ({ delayInSeconds = 3 }: OrderPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  useEffect(() => {
    // Check if the popup has been closed before
    const popupClosed = localStorage.getItem('orderPopupClosed');
    
    if (popupClosed === 'true') {
      setHasBeenClosed(true);
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayInSeconds * 1000);

    return () => clearTimeout(timer);
  }, [delayInSeconds]);

  const closePopup = () => {
    setIsVisible(false);
    setHasBeenClosed(true);
    // Set local storage to remember the popup was closed
    localStorage.setItem('orderPopupClosed', 'true');
  };

  // Don't render if it's been closed before
  if (hasBeenClosed) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isVisible 
          ? 'opacity-100 pointer-events-auto' 
          : 'opacity-0 pointer-events-none'
      } transition-opacity duration-300`}
    >
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={closePopup}
      ></div>
      
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-scale-in">
        <button 
          onClick={closePopup} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold text-flavour-red mb-2">Looking to Chow On?</h3>
          <p className="text-gray-600 mb-6">
            Ready to experience Chicago's favorite comfort-filled egg rolls? Order now and get them delivered right to your door!
          </p>
          
          <div className="space-y-3">
            <Link to="/egg-rolls" className="btn-primary w-full block">
              Shop Egg Rolls Etc.
            </Link>
            <button 
              onClick={closePopup} 
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
