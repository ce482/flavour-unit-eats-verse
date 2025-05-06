
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { ImageLoader } from '@/utils/imageLoader';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | string[];
  category: string;
  longDescription?: string;
};

type ProductDetailProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

const ProductDetail = ({ product, isOpen, onClose }: ProductDetailProps) => {
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: Array.isArray(product.image) ? product.image[0] : product.image,
    });
    onClose();
  };

  const isImageArray = ImageLoader.isImageArray(product.image);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{product.name}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-square overflow-hidden rounded-lg">
            {isImageArray ? (
              <Carousel className="w-full h-full">
                <CarouselContent className="h-full">
                  {product.image.map((img, index) => (
                    <CarouselItem key={index} className="h-full">
                      <img
                        src={img}
                        alt={`${product.name} - view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/80 hover:bg-white" />
                <CarouselNext className="right-2 bg-white/80 hover:bg-white" />
              </Carousel>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-gray-600 mb-4">{product.description}</p>
            {product.longDescription && (
              <p className="text-gray-600 mb-4">{product.longDescription}</p>
            )}
            <div className="mt-auto">
              <p className="text-xl font-bold text-flavour-red mb-4">${product.price.toFixed(2)}</p>
              <Button 
                className="w-full bg-flavour-red hover:bg-red-700 flex items-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
