
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageLoader } from '@/utils/imageLoader';

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
  onClick?: () => void;
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ 
  images, 
  productName,
  onClick 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (images.length > 0) {
      ImageLoader.preloadImages(images)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }, [images]);

  if (images.length === 0) {
    return <div className="h-64 bg-gray-200 flex items-center justify-center">No image</div>;
  }

  return (
    <div 
      className={`h-64 overflow-hidden cursor-pointer ${isLoading ? 'bg-gray-200' : ''}`}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      ) : (
        <Carousel className="w-full h-full">
          <CarouselContent className="h-full">
            {images.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <img 
                  src={image} 
                  alt={`${productName} - image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
          <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
        </Carousel>
      )}
    </div>
  );
};

export default ProductImageCarousel;
