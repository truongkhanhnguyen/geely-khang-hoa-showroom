
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselControlsProps {
  currentIndex: number;
  totalCars: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  isMobile?: boolean;
}

export const HeroCarouselControls = ({
  currentIndex,
  totalCars,
  onPrevious,
  onNext,
  onDotClick,
  isMobile = false
}: HeroCarouselControlsProps) => {
  if (totalCars <= 1) return null;

  return (
    <>
      {/* Navigation Arrows - Hidden on mobile */}
      {!isMobile && (
        <>
          <button 
            onClick={onPrevious} 
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          
          <button 
            onClick={onNext} 
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {Array.from({ length: totalCars }).map((_, index) => (
          <button 
            key={index} 
            onClick={() => onDotClick(index)} 
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`} 
          />
        ))}
      </div>
    </>
  );
};
