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
      {/* Header - Mobile Optimized */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-1 md:space-x-2 p-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Quay lại</span>
              </Button>
              <div className="flex items-center space-x-2 md:space-x-3">
                <img 
                  src="/lovable-uploads/fcdb7433-edf5-46e0-a645-63687828d441.png" 
                  alt="Geely Logo" 
                  className="h-6 md:h-8 w-auto"
                />
                <span className="text-lg md:text-xl font-semibold text-gray-900">Monjaro</span>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative pt-14 md:pt-16">
        <div className="relative h-[60vh] md:h-[70vh] lg:h-screen">
          <CarImageCarousel images={carImages} carModel="Monjaro" />
          
          {/* Hero Text Overlay - Mobile Optimized */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-white">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-2 md:mb-4 leading-tight">
                    Geely Monjaro
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg font-medium text-blue-300 mb-2 md:mb-4">
                    Premium. Powerful. Refined.
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 md:mb-6 leading-relaxed">
                    SUV 7 chỗ cao cấp với không gian rộng rãi và trang bị công nghệ tiên tiến, hoàn hảo cho gia đình hiện đại.
                  </p>
                  
                  {/* Action Buttons - Mobile Optimized */}
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg text-sm md:text-base"
                      onClick={() => setShowTestDrive(true)}
                    >
                      <Calendar className="mr-1 md:mr-2 h-4 w-4" />
                      Đặt lịch lái thử
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg text-sm md:text-base"
                      onClick={() => setShowPriceQuote(true)}
                    >
                      <Calculator className="mr-1 md:mr-2 h-4 w-4" />
                      Xem báo giá
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section - Mobile Optimized */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl md:text-3xl font-light text-gray-900 mb-2 md:mb-4">Thông số kỹ thuật</h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá những thông số ấn tượng của Geely Monjaro
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
            {specifications.map((spec, index) => (
              <Card key={index} className="p-3 md:p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
                <spec.icon className="h-6 w-6 md:h-10 md:w-10 text-blue-600 mx-auto mb-2 md:mb-3" />
                <h3 className="font-medium text-gray-900 mb-1 text-xs md:text-base">{spec.label}</h3>
                <p className="text-gray-600 text-xs md:text-sm font-medium">{spec.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl md:text-3xl font-light text-gray-900 mb-2 md:mb-4">Tính năng nổi bật</h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
              Trải nghiệm những công nghệ tiên tiến nhất trong phân khúc
            </p>
          </div>
          
          {/* Mobile: Simple card layout instead of slider */}
          <div className="block md:hidden space-y-4">
            {detailedFeatures.map((feature, index) => (
              <Card key={index} className="p-4 border border-gray-200">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
          
          {/* Desktop: Keep the slider */}
          <div className="hidden md:block">
            <FeatureSlider features={detailedFeatures} accentColor="blue-600" />
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-3xl font-light text-white mb-4 md:mb-8">Sẵn sàng trải nghiệm?</h2>
          <p className="text-sm md:text-lg text-blue-100 mb-6 md:mb-12 leading-relaxed">
            Đặt lịch lái thử ngay hôm nay để cảm nhận sự khác biệt của Geely Monjaro
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button 
              size="sm"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 md:px-8 md:py-3 rounded-full font-medium text-sm md:text-base"
              onClick={() => setShowTestDrive(true)}
            >
              <Calendar className="mr-1 md:mr-2 h-4 w-4" />
              Đặt lịch lái thử
            </Button>
            
            <Button 
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-6 py-2 md:px-8 md:py-3 rounded-full font-medium text-sm md:text-base"
              onClick={() => setShowPriceQuote(true)}
            >
              <Calculator className="mr-1 md:mr-2 h-4 w-4" />
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
