
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface CarImageCarouselProps {
  images?: string[];
  carName: string;
}

const CarImageCarousel = ({ images: propImages, carName }: CarImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (propImages && propImages.length > 0) {
      setImages(propImages);
    } else {
      fetchCarImages();
    }
  }, [propImages, carName]);

  const fetchCarImages = async () => {
    try {
      // Extract car model from carName
      let carModel = '';
      const nameLower = carName.toLowerCase();
      
      if (nameLower.includes('coolray')) {
        carModel = 'coolray';
      } else if (nameLower.includes('monjaro')) {
        carModel = 'monjaro';  
      } else if (nameLower.includes('ex5')) {
        carModel = 'ex5';
      }

      console.log('Fetching images for car model:', carModel);

      const { data, error } = await supabase
        .from('website_images')
        .select('*')
        .eq('category', 'car')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Filter images for specific car model
      const carImages = data?.filter((image: any) => {
        const imageName = image.name.toLowerCase();
        const imageDesc = (image.description || '').toLowerCase();
        
        return imageName.includes(carModel) || imageDesc.includes(carModel);
      }).map((image: any) => image.url) || [];

      console.log('Found car images:', carImages);

      if (carImages.length > 0) {
        setImages(carImages);
      } else {
        // Fallback to default images if no specific images found
        const defaultImages = [
          "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop",
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&h=1080&fit=crop",
          "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1920&h=1080&fit=crop",
          "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&h=1080&fit=crop"
        ];
        setImages(defaultImages);
      }
    } catch (error) {
      console.error('Error fetching car images:', error);
      // Fallback to default images on error
      const defaultImages = [
        "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1920&h=1080&fit=crop",
        "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&h=1080&fit=crop"
      ];
      setImages(defaultImages);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-3xl font-light mb-4">Đang tải hình ảnh...</h2>
          <p className="text-gray-300">Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={images[currentIndex]} 
          alt={`${carName} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border-0 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border-0 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Car Name Overlay */}
      <div className="absolute bottom-20 left-8 z-10 text-white">
        <h1 className="text-4xl md:text-6xl font-light">{carName}</h1>
      </div>
    </div>
  );
};

export default CarImageCarousel;
