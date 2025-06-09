
import { useState, useEffect } from "react";
import { HeroCarouselProps } from "./hero/types";
import { useHeroImages } from "./hero/useHeroImages";
import { HeroCarouselControls } from "./hero/HeroCarouselControls";
import { HeroCarouselContent } from "./hero/HeroCarouselContent";

const HeroCarousel = ({
  cars: propsCars,
  onTestDrive,
  onPriceQuote,
  onExplore
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cars, isLoading } = useHeroImages(propsCars);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (cars.length === 0) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % cars.length);
        setIsTransitioning(false);
      }, 300);
    }, 12000);
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

  if (isLoading || cars.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-3xl font-light mb-4">Đang tải...</h2>
          <p className="text-gray-300">Vui lòng đợi trong giây lát</p>
        </div>
      </section>
    );
  }

  const currentCar = cars[currentIndex];
  const currentImage = isMobile && currentCar.mobile_image ? currentCar.mobile_image : currentCar.image;

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className={`w-full h-full transition-transform duration-700 ease-in-out ${
          isTransitioning ? 'transform translate-x-[-100%]' : 'transform translate-x-0'
        }`}>
          <img 
            src={currentImage} 
            alt={currentCar.name} 
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: 'center center' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 md:from-black/60 md:via-black/30 md:to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center h-full">
            <HeroCarouselContent
              car={currentCar}
              onTestDrive={onTestDrive}
              onPriceQuote={onPriceQuote}
              onExplore={onExplore}
              isMobile={isMobile}
            />
            <div className="hidden lg:block lg:col-span-7"></div>
          </div>
        </div>
      </div>

      <HeroCarouselControls
        currentIndex={currentIndex}
        totalCars={cars.length}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onDotClick={setCurrentIndex}
        isMobile={isMobile}
      />
    </section>
  );
};

export default HeroCarousel;
