
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Calculator, ArrowRight } from "lucide-react";

interface Car {
  name: string;
  tagline: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

interface CarCardProps {
  car: Car;
  index: number;
  onTestDrive: (carName: string) => void;
  onPriceQuote: (carName: string) => void;
}

const CarCard = ({ car, index, onTestDrive, onPriceQuote }: CarCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/80 backdrop-blur-sm">
      <div className="relative overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">{car.name}</h3>
          <p className="text-sm font-medium text-blue-600 mb-3">{car.tagline}</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{car.description}</p>
          <p className="text-xl font-bold text-gray-900">{car.price}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Tính năng nổi bật:</h4>
          <ul className="space-y-1">
            {car.features.map((feature, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full group"
            onClick={() => onTestDrive(car.name)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Đặt lịch lái thử
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-full group"
            onClick={() => onPriceQuote(car.name)}
          >
            <Calculator className="mr-2 h-4 w-4" />
            Xem báo giá
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CarCard;
