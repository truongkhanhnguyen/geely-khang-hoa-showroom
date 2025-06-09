
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Calculator, Battery, Gauge, Shield, Cog, Eye, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TestDriveModal from "@/components/TestDriveModal";
import PriceQuoteModal from "@/components/PriceQuoteModal";
import LanguageToggle from "@/components/LanguageToggle";
import CarImageCarousel from "@/components/CarImageCarousel";
import FeatureSlider from "@/components/FeatureSlider";
import FloatingButtons from "@/components/FloatingButtons";

const EX5Details = () => {
  const navigate = useNavigate();
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);

  const carImages = [
    "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=1920&h=1080&fit=crop"
  ];

  const specifications = [
    { icon: Zap, label: "Động cơ", value: "100% Điện" },
    { icon: Gauge, label: "Công suất", value: "204 HP" },
    { icon: Battery, label: "Phạm vi", value: "400km" },
    { icon: Shield, label: "An toàn", value: "6 túi khí" },
    { icon: Cog, label: "Sạc nhanh", value: "30 phút" },
    { icon: Eye, label: "Tự lái", value: "Level 2" }
  ];

  const detailedFeatures = [
    {
      id: "electric",
      title: "Động cơ điện thân thiện",
      description: "100% động cơ điện với công suất 204 HP, hoàn toàn không phát thải, góp phần bảo vệ môi trường và mang lại trải nghiệm lái xe êm ái, không tiếng ồn.",
      image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop"
    },
    {
      id: "battery",
      title: "Pin hiệu suất cao",
      description: "Phạm vi hoạt động lên đến 400km với một lần sạc đầy, hỗ trợ sạc nhanh 30 phút đạt 80% dung lượng pin. Công nghệ quản lý pin thông minh đảm bảo độ bền và an toàn.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    },
    {
      id: "autonomous",
      title: "Tự lái cấp độ 2",
      description: "Hệ thống hỗ trợ lái xe tự động cấp độ 2 với camera và cảm biến radar, giúp kiểm soát làn đường, tự động phanh khẩn cấp và cruise control thích ứng.",
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop"
    },
    {
      id: "smart",
      title: "Công nghệ thông minh",
      description: "Màn hình cảm ứng 12.3 inch, điều khiển bằng giọng nói AI, cập nhật phần mềm OTA qua mạng, hệ thống điều hòa thông minh và kết nối internet tốc độ cao.",
      image: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&h=600&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Quay lại</span>
              </Button>
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/53460547-efd5-41cc-9b2d-92f168c32983.png" 
                  alt="Geely Logo" 
                  className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => navigate('/')}
                />
                <span className="text-xl font-semibold text-gray-900">Geely EX5</span>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16">
        <div className="relative h-[70vh] md:h-screen">
          <CarImageCarousel images={carImages} carModel="EX5" />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 leading-tight">
                  Geely EX5
                </h1>
                <p className="text-lg md:text-2xl font-medium text-green-300 mb-6">
                  Electric. Efficient. Future.
                </p>
                <p className="text-base md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                  SUV điện thông minh với công nghệ pin tiên tiến và khả năng vận hành êm ái, dẫn đầu xu hướng xanh.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Positioned at bottom right of gallery */}
        <div className="absolute bottom-6 right-6 z-10">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm"
              onClick={() => setShowTestDrive(true)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Đặt lịch lái thử
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-full shadow-lg"
              onClick={() => setShowPriceQuote(true)}
            >
              <Calculator className="mr-2 h-5 w-5" />
              Xem báo giá
            </Button>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">Thông số kỹ thuật</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá những thông số ấn tượng của Geely EX5
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {specifications.map((spec, index) => (
              <Card key={index} className="p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <spec.icon className="h-8 w-8 md:h-12 md:w-12 text-green-600 mx-auto mb-3 md:mb-4" />
                <h3 className="font-semibold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{spec.label}</h3>
                <p className="text-gray-600 text-xs md:text-base font-medium">{spec.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">Tính năng nổi bật</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trải nghiệm những công nghệ tiên tiến nhất trong phân khúc
            </p>
          </div>
          
          <FeatureSlider features={detailedFeatures} accentColor="green-600" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6 md:mb-8">Sẵn sàng trải nghiệm?</h2>
          <p className="text-lg md:text-xl text-green-100 mb-8 md:mb-12 leading-relaxed">
            Đặt lịch lái thử ngay hôm nay để cảm nhận sự khác biệt của Geely EX5
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-full font-medium"
              onClick={() => setShowTestDrive(true)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Đặt lịch lái thử
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-full font-medium"
              onClick={() => setShowPriceQuote(true)}
            >
              <Calculator className="mr-2 h-5 w-5" />
              Xem báo giá
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Buttons */}
      <FloatingButtons />

      {/* Modals */}
      <TestDriveModal 
        isOpen={showTestDrive} 
        onClose={() => setShowTestDrive(false)}
        selectedCar="Geely EX5"
      />
      <PriceQuoteModal 
        isOpen={showPriceQuote} 
        onClose={() => setShowPriceQuote(false)}
        selectedCar="Geely EX5"
      />
    </div>
  );
};

export default EX5Details;
