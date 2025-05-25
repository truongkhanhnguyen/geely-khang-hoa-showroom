
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Calculator, ArrowRight, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Car {
  name: string;
  tagline: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

interface HeroCarouselProps {
  cars: Car[];
  onTestDrive: (carName: string) => void;
  onPriceQuote: (carName: string) => void;
  onExplore: (carName: string) => void;
}

const HeroCarousel = ({ cars, onTestDrive, onPriceQuote, onExplore }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
        setIsTransitioning(false);
      }, 300);
    }, 10000);

    return () => clearInterval(interval);
  }, [cars.length]);

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
      setIsTransitioning(false);
    }, 300);
  };

  const currentCar = cars[currentIndex];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with transition */}
      <div className="absolute inset-0">
        <div 
          className={`w-full h-full transition-transform duration-700 ease-in-out ${
            isTransitioning ? 'transform translate-x-[-100%]' : 'transform translate-x-0'
          }`}
        >
          <img 
            src={currentCar.image} 
            alt={currentCar.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-7xl font-light mb-4 animate-fade-in">
                {currentCar.name}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-blue-300 mb-6 animate-fade-in">
                {currentCar.tagline}
              </p>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed animate-fade-in">
                {currentCar.description}
              </p>
              <p className="text-3xl font-bold text-white mb-8 animate-fade-in">
                {currentCar.price}
              </p>

              <div className="space-y-4 mb-8">
                <h4 className="text-lg font-semibold text-white">{t('features')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentCar.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-200">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full"
                  onClick={() => onExplore(currentCar.name)}
                >
                  <Eye className="mr-2 h-5 w-5" />
                  Khám phá
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full"
                  onClick={() => onTestDrive(currentCar.name)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {t('scheduleTestDrive')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full"
                  onClick={() => onPriceQuote(currentCar.name)}
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  {t('viewQuote')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {cars.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
