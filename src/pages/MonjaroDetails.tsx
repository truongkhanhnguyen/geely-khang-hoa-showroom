import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Calculator, Fuel, Gauge, Shield, Cog, Eye, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TestDriveModal from "@/components/TestDriveModal";
import PriceQuoteModal from "@/components/PriceQuoteModal";
import LanguageToggle from "@/components/LanguageToggle";
import CarImageCarousel from "@/components/CarImageCarousel";
import FeatureSlider from "@/components/FeatureSlider";
import FloatingButtons from "@/components/FloatingButtons";
import ContactFooter from "@/components/ContactFooter";

const MonjaroDetails = () => {
  const navigate = useNavigate();
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);

  const carImages = [
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1619976215542-c8162db1a640?w=1920&h=1080&fit=crop"
  ];

  const specifications = [
    { icon: Gauge, label: "Động cơ", value: "2.0L Turbo" },
    { icon: Zap, label: "Công suất", value: "238 HP" },
    { icon: Fuel, label: "Tiêu thụ nhiên liệu", value: "7.2L/100km" },
    { icon: Shield, label: "An toàn", value: "7 túi khí" },
    { icon: Cog, label: "Hộp số", value: "8AT" },
    { icon: Eye, label: "Camera", value: "360° + DMS" }
  ];

  const detailedFeatures = [
    {
      id: "luxury",
      title: "Nội thất cao cấp",
      description: "Hệ thống giải trí 12.3 inch với GKUI Pro, ghế da cao cấp điều chỉnh điện, cửa sổ trời toàn cảnh Panorama và hệ thống âm thanh Sony 12 loa chất lượng Hi-Fi.",
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop"
    },
    {
      id: "performance",
      title: "Hiệu suất mạnh mẽ",
      description: "Động cơ 2.0L Turbo 238 HP mạnh mẽ, hộp số tự động 8 cấp mượt mà, tiêu thụ nhiên liệu chỉ 7.2L/100km. Hệ thống treo độc lập 4 bánh mang lại cảm giác lái thoải mái.",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop"
    },
    {
      id: "safety",
      title: "An toàn tối đa",
      description: "7 túi khí bảo vệ toàn diện, cruise control thích ứng ACC, camera 360° + DMS, hệ thống cảnh báo điểm mù và phanh khẩn cấp tự động để đảm bảo an toàn cho cả gia đình.",
      image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&h=600&fit=crop"
    },
    {
      id: "convenience",
      title: "Tiện nghi hiện đại",
      description: "Đèn LED Matrix thông minh, khởi động từ xa qua ứng dụng, sạc không dây cho điện thoại, hệ thống điều hòa tự động và khoang hành lý rộng rãi 1800L.",
      image: "https://images.unsplash.com/photo-1619976215542-c8162db1a640?w=800&h=600&fit=crop"
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
                  src="/lovable-uploads/fcdb7433-edf5-46e0-a645-63687828d441.png" 
                  alt="Geely Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-semibold text-gray-900">Geely Monjaro</span>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section - Removed gradient overlay */}
      <section className="relative pt-16">
        <div className="relative h-[70vh] md:h-screen">
          <CarImageCarousel images={carImages} carModel="Monjaro" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 leading-tight drop-shadow-lg">
                  Geely Monjaro
                </h1>
                <p className="text-lg md:text-2xl font-medium text-blue-300 mb-6 drop-shadow-lg">
                  Premium. Powerful. Refined.
                </p>
                <p className="text-base md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                  SUV 7 chỗ cao cấp với không gian rộng rãi và trang bị công nghệ tiên tiến, hoàn hảo cho gia đình hiện đại.
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
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm"
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
              Khám phá những thông số ấn tượng của Geely Monjaro
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {specifications.map((spec, index) => (
              <Card key={index} className="p-4 md:p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <spec.icon className="h-8 w-8 md:h-12 md:w-12 text-blue-600 mx-auto mb-3 md:mb-4" />
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
          
          <FeatureSlider features={detailedFeatures} accentColor="blue-600" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6 md:mb-8">Sẵn sàng trải nghiệm?</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 md:mb-12 leading-relaxed">
            Đặt lịch lái thử ngay hôm nay để cảm nhận sự khác biệt của Geely Monjaro
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-medium"
              onClick={() => setShowTestDrive(true)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Đặt lịch lái thử
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-medium"
              onClick={() => setShowPriceQuote(true)}
            >
              <Calculator className="mr-2 h-5 w-5" />
              Xem báo giá
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <ContactFooter />

      {/* Floating Buttons */}
      <FloatingButtons />

      {/* Modals */}
      <TestDriveModal 
        isOpen={showTestDrive} 
        onClose={() => setShowTestDrive(false)}
        selectedCar="Geely Monjaro"
      />
      <PriceQuoteModal 
        isOpen={showPriceQuote} 
        onClose={() => setShowPriceQuote(false)}
        selectedCar="Geely Monjaro"
      />
    </div>
  );
};

export default MonjaroDetails;
