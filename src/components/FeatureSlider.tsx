
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface FeaturesliderProps {
  features: Feature[];
  accentColor?: string;
}

const FeatureSlider = ({ features, accentColor = "blue-600" }: FeaturesliderProps) => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      {/* Feature Image */}
      <div className="relative">
        <img 
          src={features[currentFeature].image} 
          alt={features[currentFeature].title}
          className="w-full h-80 object-cover rounded-lg"
        />
        
        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-0 backdrop-blur-sm"
          onClick={prevFeature}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-0 backdrop-blur-sm"
          onClick={nextFeature}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFeature(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentFeature ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Feature Content */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {features[currentFeature].title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            {features[currentFeature].description}
          </p>
        </div>

        {/* Feature Navigation */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {currentFeature + 1} / {features.length}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevFeature}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextFeature}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSlider;
