
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Car } from './types';
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface HeroCarouselContentProps {
  car: Car;
  onTestDrive: (carName: string) => void;
  onPriceQuote: (carName: string) => void;
  onExplore: (carName: string) => void;
  isMobile?: boolean;
}

export const HeroCarouselContent = ({
  car,
  onTestDrive,
  onPriceQuote,
  onExplore,
  isMobile = false
}: HeroCarouselContentProps) => {
  const { t } = useLanguage();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchCarLogo();
  }, [car.name]);

  const fetchCarLogo = async () => {
    try {
      // Extract car model key from car name
      let carModelKey = '';
      if (car.name.toLowerCase().includes('coolray')) {
        carModelKey = 'coolray';
      } else if (car.name.toLowerCase().includes('monjaro')) {
        carModelKey = 'monjaro';
      } else if (car.name.toLowerCase().includes('ex5')) {
        carModelKey = 'ex5';
      }

      if (carModelKey) {
        const { data, error } = await supabase
          .from('website_images')
          .select('url')
          .eq('category', 'hero-logo')
          .eq('description', carModelKey)
          .single();

        if (!error && data) {
          setLogoUrl(data.url);
        }
      }
    } catch (error) {
      console.error('Error fetching car logo:', error);
    }
  };

  return (
    <div className="lg:col-span-5 text-white">
      {/* Car Logo or Name - Smaller on mobile */}
      {logoUrl ? (
        <div className="mb-2 md:mb-4 animate-fade-in">
          <img 
            src={logoUrl} 
            alt={car.name}
            className={`w-auto object-contain ${
              isMobile 
                ? 'h-12 sm:h-14' // Much smaller on mobile
                : 'h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32' // Original desktop sizes
            }`}
            onError={(e) => {
              // Fallback to text if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <h1 className={`hidden ${
            isMobile 
              ? 'text-2xl sm:text-3xl' 
              : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
          } font-light leading-tight`}>
            {car.name}
          </h1>
        </div>
      ) : (
        <h1 className={`font-light mb-2 md:mb-4 animate-fade-in leading-tight ${
          isMobile 
            ? 'text-2xl sm:text-3xl' 
            : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
        }`}>
          {car.name}
        </h1>
      )}
      
      <p className={`font-medium text-blue-300 mb-4 md:mb-6 animate-fade-in ${
        isMobile ? 'text-sm sm:text-base' : 'text-lg sm:text-xl md:text-2xl'
      }`}>
        {car.tagline}
      </p>
      <p className={`text-gray-200 mb-4 md:mb-6 leading-relaxed animate-fade-in max-w-lg ${
        isMobile ? 'text-xs sm:text-sm' : 'text-sm sm:text-base md:text-lg'
      }`}>
        {car.description}
      </p>
      
      {/* Price section with availability check */}
      {car.price_available ? (
        <p className={`font-bold text-white mb-4 md:mb-6 animate-fade-in ${
          isMobile ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl md:text-3xl'
        }`}>
          {car.price}
        </p>
      ) : (
        <div className="mb-4 md:mb-6 animate-fade-in">
          <p className={`font-bold text-orange-400 mb-2 ${
            isMobile ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl md:text-3xl'
          }`}>
            Coming Soon
          </p>
          <p className={`text-gray-300 ${
            isMobile ? 'text-xs sm:text-sm' : 'text-sm md:text-base'
          }`}>
            Giá sẽ được cập nhật sớm
          </p>
        </div>
      )}

      {/* Features section - Hidden on mobile */}
      {!isMobile && (
        <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
          <h4 className="text-sm md:text-lg font-semibold text-white">{t('features')}</h4>
          <div className="grid grid-cols-1 gap-1 md:gap-2">
            {car.features.slice(0, 4).map((feature, idx) => (
              <div key={idx} className="flex items-center text-gray-200 text-xs md:text-sm">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full mr-2 md:mr-3 flex-shrink-0"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA Buttons - Smaller on mobile */}
      <div className={`flex flex-col animate-fade-in ${
        isMobile 
          ? 'gap-2 max-w-xs' // Smaller gap and container on mobile
          : 'sm:flex-row gap-3 md:gap-4'
      }`}>
        <Button 
          size={isMobile ? "sm" : "lg"}
          variant="outline"
          className={`bg-white/90 hover:bg-white border-2 border-gray-300 text-gray-800 hover:text-gray-900 rounded-lg font-medium uppercase tracking-wide ${
            isMobile 
              ? 'px-3 py-2 text-xs' // Much smaller on mobile
              : 'px-4 md:px-6 py-2 md:py-3 text-sm md:text-base'
          }`}
          onClick={() => onExplore(car.name)}
        >
          KHÁM PHÁ
        </Button>

        <Button 
          size={isMobile ? "sm" : "lg"}
          variant="outline"
          className={`bg-white/90 hover:bg-white border-2 border-gray-300 text-gray-800 hover:text-gray-900 rounded-lg font-medium uppercase tracking-wide ${
            isMobile 
              ? 'px-3 py-2 text-xs' // Much smaller on mobile
              : 'px-4 md:px-6 py-2 md:py-3 text-sm md:text-base'
          }`}
          onClick={() => onPriceQuote(car.name)}
        >
          {car.price_available ? "BÁO GIÁ" : "ĐĂNG KÝ NHẬN GIÁ"}
        </Button>

        <Button 
          size={isMobile ? "sm" : "lg"}
          className={`bg-gray-900 hover:bg-black text-white rounded-lg font-medium uppercase tracking-wide ${
            isMobile 
              ? 'px-3 py-2 text-xs' // Much smaller on mobile
              : 'px-4 md:px-6 py-2 md:py-3 text-sm md:text-base'
          }`}
          onClick={() => onTestDrive(car.name)}
        >
          ĐĂNG KÝ LÁI THỬ
          <ArrowRight className={`ml-2 ${
            isMobile ? 'h-3 w-3' : 'h-4 w-4 md:h-5 md:w-5'
          }`} />
        </Button>
      </div>
    </div>
  );
};
