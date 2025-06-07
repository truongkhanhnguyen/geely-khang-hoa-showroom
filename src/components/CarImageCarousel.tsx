
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface CarImageCarouselProps {
  carModel: string;
  images?: string[];
}

const CarImageCarousel = ({ carModel, images: propImages }: CarImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (propImages && propImages.length > 0) {
      setImages(propImages);
      setLoading(false);
    } else {
      fetchCarImages();
    }
  }, [carModel, propImages]);

  const fetchCarImages = async () => {
    try {
      console.log(`🚗 Fetching images for car model: ${carModel}`);
      
      const { data, error } = await supabase
        .from('website_images')
        .select('*')
        .eq('category', 'car_detail')
        .ilike('name', `%${carModel.toLowerCase()}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching car images:', error);
        throw error;
      }

      console.log(`✅ Found ${data?.length || 0} images for ${carModel}`);
      
      if (data && data.length > 0) {
        const imageUrls = data.map(img => img.url);
        setImages(imageUrls);
        console.log('🖼️ Car images loaded:', imageUrls);
      } else {
        // Fallback images nếu không có trong database
        const fallbackImages = [
          "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop",
          "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1920&h=1080&fit=crop",
          "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=1920&h=1080&fit=crop"
        ];
        setImages(fallbackImages);
        console.log('⚠️ No car images found, using fallback images');
      }
    } catch (error) {
      console.error('💥 Error in fetchCarImages:', error);
      // Fallback trong trường hợp lỗi
      const fallbackImages = [
        "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop"
      ];
      setImages(fallbackImages);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="relative w-full h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Đang tải hình ảnh...</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="relative w-full h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Không có hình ảnh</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden group">
      <img
        src={images[currentImageIndex]}
        alt={`${carModel} - Hình ${currentImageIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {images.length > 1 && (
        <>
          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={prevImage}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={nextImage}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </>
      )}

      {/* Image counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
        {currentImageIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default CarImageCarousel;
