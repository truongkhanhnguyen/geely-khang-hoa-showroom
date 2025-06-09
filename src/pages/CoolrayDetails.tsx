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

const CoolrayDetails = () => {
  const navigate = useNavigate();
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);

  const carImages = ["https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop", "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&h=1080&fit=crop", "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1920&h=1080&fit=crop", "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&h=1080&fit=crop"];
  
  const specifications = [{
    icon: Gauge,
    label: "Động cơ",
    value: "1.5L Turbo"
  }, {
    icon: Zap,
    label: "Công suất",
    value: "177 HP"
  }, {
    icon: Fuel,
    label: "Tiêu thụ nhiên liệu",
    value: "6.8L/100km"
  }, {
    icon: Shield,
    label: "An toàn",
    value: "6 túi khí"
  }, {
    icon: Cog,
    label: "Hộp số",
    value: "CVT"
  }, {
    icon: Eye,
    label: "Camera",
    value: "360°"
  }];

  const detailedFeatures = [{
    id: "interior",
    title: "Nội thất thông minh",
    description: "Hệ thống GKUI 19 với màn hình cảm ứng 10.25 inch, điều khiển bằng giọng nói thông minh, kết nối smartphone không dây và hệ thống điều hòa tự động 2 vùng độc lập.",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop"
  }, {
    id: "safety",
    title: "An toàn cao cấp",
    description: "Trang bị đầy đủ 6 túi khí, hệ thống phanh ABS + EBD + ESC, kiểm soát lực kéo và hệ thống cảnh báo điểm mù để bảo vệ an toàn cho mọi hành khách.",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop"
  }, {
    id: "technology",
    title: "Công nghệ hiện đại",
    description: "Cruise Control thông minh, camera 360°, cảm biến lùi, khởi động bằng nút bấm và hệ thống đèn LED full toàn xe với thiết kế hiện đại và tiết kiệm năng lượng.",
    image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800&h=600&fit=crop"
  }, {
    id: "performance",
    title: "Hiệu suất vượt trội",
    description: "Động cơ 1.5L Turbo mạnh mẽ 177 HP, hộp số CVT mượt mà, tiêu thụ nhiên liệu chỉ 6.8L/100km, mang lại trải nghiệm lái xe năng động và tiết kiệm.",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=600&fit=crop"
  }];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Mobile Optimized */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="flex items-center space-x-1 md:space-x-2 p-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Quay lại</span>
              </Button>
              <div className="flex items-center space-x-2 md:space-x-3">
                <img src="/lovable-uploads/fcdb7433-edf5-46e0-a645-63687828d441.png" alt="Geely Logo" className="h-6 md:h-8 w-auto" />
                <span className="text-lg md:text-xl font-semibold text-gray-900">Coolray</span>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative pt-14 md:pt-16">
        <div className="relative h-[60vh] md:h-[70vh] lg:h-screen">
          <CarImageCarousel images={carImages} carModel="Coolray" />
          
          {/* Hero Text Overlay - Mobile Optimized */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-white">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-2 md:mb-4 leading-tight">
                    Geely Coolray
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg font-medium text-blue-300 mb-2 md:mb-4">
                    Urban. Dynamic. Smart.
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 md:mb-6 leading-relaxed">
                    SUV compact thông minh với công nghệ hiện đại và thiết kế trẻ trung, phù hợp cho cuộc sống đô thị năng động.
                  </p>
                  
                  {/* Action Buttons - Updated Design */}
                  <div className="flex flex-col gap-3 max-w-sm">
                    <Button 
                      className="w-full h-12 bg-gray-200/90 hover:bg-gray-100 text-gray-800 font-medium text-sm rounded-lg border-0 shadow-sm transition-all"
                      onClick={() => setShowPriceQuote(true)}
                    >
                      BÁO GIÁ
                    </Button>
                    
                    <Button 
                      className="w-full h-12 bg-gray-800/90 hover:bg-gray-700 text-white font-medium text-sm rounded-lg border-0 shadow-sm transition-all flex items-center justify-center gap-2"
                      onClick={() => setShowTestDrive(true)}
                    >
                      ĐĂNG KÝ LÁI THỬ
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
              Khám phá những thông số ấn tượng của Geely Coolray
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

      {/* CTA Section - Updated Design */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-3xl font-light text-white mb-4 md:mb-8">Sẵn sàng trải nghiệm?</h2>
          <p className="text-sm md:text-lg text-blue-100 mb-6 md:mb-12 leading-relaxed">
            Đặt lịch lái thử ngay hôm nay để cảm nhận sự khác biệt của Geely Coolray
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
            <Button 
              className="flex-1 h-12 bg-white/90 hover:bg-white text-gray-800 font-medium text-sm rounded-lg border-0 shadow-sm transition-all"
              onClick={() => setShowPriceQuote(true)}
            >
              BÁO GIÁ
            </Button>
            
            <Button 
              className="flex-1 h-12 bg-gray-800/90 hover:bg-gray-700 text-white font-medium text-sm rounded-lg border-0 shadow-sm transition-all flex items-center justify-center gap-2"
              onClick={() => setShowTestDrive(true)}
            >
              ĐĂNG KÝ LÁI THỬ
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <ContactFooter />

      {/* Floating Buttons */}
      <FloatingButtons />

      {/* Modals */}
      <TestDriveModal isOpen={showTestDrive} onClose={() => setShowTestDrive(false)} selectedCar="Geely Coolray" />
      <PriceQuoteModal isOpen={showPriceQuote} onClose={() => setShowPriceQuote(false)} selectedCar="Geely Coolray" />
    </div>
  );
};

export default CoolrayDetails;
