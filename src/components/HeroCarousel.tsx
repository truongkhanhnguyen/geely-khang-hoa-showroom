import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Calculator, ArrowRight, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface Car {
  name: string;
  tagline: string;
  description: string;
  price: string;
  image: string;
  mobile_image?: string;
  features: string[];
}

interface HeroCarouselProps {
  cars?: Car[];
  onTestDrive: (carName: string) => void;
  onPriceQuote: (carName: string) => void;
  onExplore: (carName: string) => void;
}

const HeroCarousel = ({
  cars: propsCars,
  onTestDrive,
  onPriceQuote,
  onExplore
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  // Car models mapping to database description patterns
  const carModelsMapping = {
    "coolray": {
      name: "Geely Coolray",
      tagline: "Urban. Dynamic. Smart.",
      description: "SUV compact thông minh với công nghệ hiện đại và thiết kế trẻ trung, phù hợp cho cuộc sống đô thị năng động.",
      price: "Từ 538 triệu VNĐ",
      features: ["Động cơ 1.5L Turbo", "Hệ thống GKUI 19", "6 túi khí an toàn", "Phanh ABS + EBD"]
    },
    "monjaro": {
      name: "Geely Monjaro", 
      tagline: "Premium. Powerful. Refined.",
      description: "SUV 7 chỗ cao cấp với không gian rộng rãi và trang bị công nghệ tiên tiến, hoàn hảo cho gia đình hiện đại.",
      price: "Từ 1.469 triệu VNĐ",
      features: ["Động cơ 2.0L Turbo", "Hệ thống giải trí 12.3''", "Cruise Control thích ứng", "Cửa sổ trời toàn cảnh"]
    },
    "ex5": {
      name: "Geely EX5",
      tagline: "Electric. Efficient. Future.", 
      description: "SUV điện thông minh với công nghệ pin tiên tiến và khả năng vận hành êm ái, dẫn đầu xu hướng xanh.",
      price: "Từ 769 triệu VNĐ",
      features: ["100% động cơ điện", "Phạm vi 400km", "Sạc nhanh 30 phút", "Hệ thống tự lái L2"]
    }
  };

  useEffect(() => {
    // Detect if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (propsCars) {
      setCars(propsCars);
    } else {
      fetchHeroImages();
    }
  }, [propsCars]);

  const fetchHeroImages = async () => {
    try {
      const { data, error } = await supabase
        .from('website_images')
        .select('*')
        .eq('category', 'hero')
        .order('created_at', { ascending: false });

      if (error) throw error;

      console.log('Fetched hero images:', data);

      // Convert hero images to car format by matching with car models
      const heroImages = data?.map((image: any) => {
        // Try to detect car model from description or name
        const imageName = image.name.toLowerCase();
        const imageDesc = (image.description || '').toLowerCase();
        
        let carModel = 'general';
        let carInfo = null;

        // Check for specific car models in name or description
        if (imageName.includes('coolray') || imageDesc.includes('coolray')) {
          carModel = 'coolray';
          carInfo = carModelsMapping.coolray;
        } else if (imageName.includes('monjaro') || imageDesc.includes('monjaro')) {
          carModel = 'monjaro';
          carInfo = carModelsMapping.monjaro;
        } else if (imageName.includes('ex5') || imageDesc.includes('ex5')) {
          carModel = 'ex5';
          carInfo = carModelsMapping.ex5;
        }

        // Use car-specific info if found, otherwise use generic
        if (carInfo) {
          return {
            name: carInfo.name,
            tagline: carInfo.tagline,
            description: carInfo.description,
            price: carInfo.price,
            image: image.url,
            mobile_image: image.mobile_url,
            features: carInfo.features
          };
        } else {
          // Generic car for images not matching specific models
          return {
            name: image.name,
            tagline: "Geely Ninh Thuận",
            description: image.description || `Khám phá ${image.name} - Xe hơi hiện đại với công nghệ tiên tiến`,
            price: "Liên hệ để biết giá",
            image: image.url,
            mobile_image: image.mobile_url,
            features: ["Công nghệ hiện đại", "Thiết kế sang trọng", "An toàn cao cấp", "Tiết kiệm nhiên liệu"]
          };
        }
      }) || [];

      console.log('Processed hero cars:', heroImages);

      // If no hero images found, use default cars
      if (heroImages.length === 0) {
        const defaultCars = [
          carModelsMapping.coolray,
          carModelsMapping.monjaro, 
          carModelsMapping.ex5
        ].map(car => ({
          ...car,
          image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop"
        }));
        
        console.log('Using default cars:', defaultCars);
        setCars(defaultCars);
      } else {
        setCars(heroImages);
      }
    } catch (error) {
      console.error('Error fetching hero images:', error);
      // Fallback to default if error
      const defaultCars = [
        carModelsMapping.coolray,
        carModelsMapping.monjaro,
        carModelsMapping.ex5
      ].map(car => ({
        ...car,
        image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop"
      }));
      setCars(defaultCars);
    }
  };

  useEffect(() => {
    if (cars.length === 0) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % cars.length);
        setIsTransitioning(false);
      }, 300);
    }, 10000);
    return () => clearInterval(interval);
  }, [cars.length]);

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex - 1 + cars.length) % cars.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % cars.length);
      setIsTransitioning(false);
    }, 300);
  };

  if (cars.length === 0) {
    return <section className="relative h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-3xl font-light mb-4">Đang tải...</h2>
          <p className="text-gray-300">Vui lòng đợi trong giây lát</p>
        </div>
      </section>;
  }

  const currentCar = cars[currentIndex];
  const currentImage = isMobile && currentCar.mobile_image ? currentCar.mobile_image : currentCar.image;

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with transition */}
      <div className="absolute inset-0">
        <div className={`w-full h-full transition-transform duration-700 ease-in-out ${isTransitioning ? 'transform translate-x-[-100%]' : 'transform translate-x-0'}`}>
          <img src={currentImage} alt={currentCar.name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light mb-2 md:mb-4 animate-fade-in">
                {currentCar.name}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-blue-300 mb-4 md:mb-6 animate-fade-in">
                {currentCar.tagline}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 md:mb-8 leading-relaxed animate-fade-in">
                {currentCar.description}
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 animate-fade-in">
                {currentCar.price}
              </p>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-8">
                <h4 className="text-sm md:text-lg font-semibold text-white">{t('features')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
                  {currentCar.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-200 text-xs md:text-base">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full mr-2 md:mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base" onClick={() => onExplore(currentCar.name)}>
                  <Eye className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Khám phá
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>

                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base" onClick={() => onTestDrive(currentCar.name)}>
                  <Calendar className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  {t('scheduleTestDrive')}
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
                
                <Button variant="outline" size="lg" onClick={() => onPriceQuote(currentCar.name)} className="border-white hover:bg-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base text-gray-950">
                  <Calculator className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  {t('viewQuote')}
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {cars.length > 1 && (
        <>
          <button onClick={goToPrevious} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all">
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          
          <button onClick={goToNext} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all">
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {cars.length > 1 && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {cars.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)} 
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`} 
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;
