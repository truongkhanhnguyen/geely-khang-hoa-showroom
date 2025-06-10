
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
import ContactFooter from "@/components/ContactFooter";

const EX5Details = () => {
  const navigate = useNavigate();
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);

  const specifications = [{
    icon: Zap,
    label: "Động cơ",
    value: "100% Điện"
  }, {
    icon: Gauge,
    label: "Công suất",
    value: "204 HP"
  }, {
    icon: Battery,
    label: "Phạm vi",
    value: "400km"
  }, {
    icon: Shield,
    label: "An toàn",
    value: "6 túi khí"
  }, {
    icon: Cog,
    label: "Sạc nhanh",
    value: "30 phút"
  }, {
    icon: Eye,
    label: "Tự lái",
    value: "Level 2"
  }];

  const detailedFeatures = [{
    id: "electric",
    title: "Động cơ điện thân thiện",
    description: "100% động cơ điện với công suất 204 HP, hoàn toàn không phát thải, góp phần bảo vệ môi trường và mang lại trải nghiệm lái xe êm ái, không tiếng ồn.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800&h=600&fit=crop"
  }, {
    id: "battery",
    title: "Pin hiệu suất cao",
    description: "Phạm vi hoạt động lên đến 400km với một lần sạc đầy, hỗ trợ sạc nhanh 30 phút đạt 80% dung lượng pin. Công nghệ quản lý pin thông minh đảm bảo độ bền và an toàn.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
  }, {
    id: "autonomous",
    title: "Tự lái cấp độ 2",
    description: "Hệ thống hỗ trợ lái xe tự động cấp độ 2 với camera và cảm biến radar, giúp kiểm soát làn đường, tự động phanh khẩn cấp và cruise control thích ứng.",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop"
  }, {
    id: "smart",
    title: "Công nghệ thông minh",
    description: "Màn hình cảm ứng 12.3 inch, điều khiển bằng giọng nói AI, cập nhật phần mềm OTA qua mạng, hệ thống điều hòa thông minh và kết nối internet tốc độ cao.",
    image: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&h=600&fit=crop"
  }];

  return <div className="min-h-screen bg-white">
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
                <img src="/lovable-uploads/53460547-efd5-41cc-9b2d-92f168c32983.png" alt="Geely Logo" className="h-6 md:h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')} />
                <span className="text-lg md:text-xl font-semibold text-gray-900">EX5</span>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative pt-14 md:pt-16">
        <div className="relative h-[60vh] md:h-[70vh] lg:h-screen">
          <CarImageCarousel carModel="ex5" displaySection="hero" />
          
          {/* Hero Text Overlay - Mobile Optimized */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-white">
                  {/* Action Buttons - Updated Design */}
                  <div className="flex flex-col gap-3 max-w-sm">
                    <Button className="w-full h-12 bg-gray-200/90 hover:bg-gray-100 text-gray-800 font-medium text-sm rounded-lg border-0 shadow-sm transition-all" onClick={() => setShowPriceQuote(true)}>
                      BÁO GIÁ
                    </Button>
                    
                    <Button className="w-full h-12 bg-gray-800/90 hover:bg-gray-700 text-white font-medium text-sm rounded-lg border-0 shadow-sm transition-all flex items-center justify-center gap-2" onClick={() => setShowTestDrive(true)}>
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
              Khám phá những thông số ấn tượng của Geely EX5
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
            {specifications.map((spec, index) => <Card key={index} className="p-3 md:p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
                <spec.icon className="h-6 w-6 md:h-10 md:w-10 text-green-600 mx-auto mb-2 md:mb-3" />
                <h3 className="font-medium text-gray-900 mb-1 text-xs md:text-base">{spec.label}</h3>
                <p className="text-gray-600 text-xs md:text-sm font-medium">{spec.value}</p>
              </Card>)}
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
            {detailedFeatures.map((feature, index) => <Card key={index} className="p-4 border border-gray-200">
                <img src={feature.image} alt={feature.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>)}
          </div>
          
          {/* Desktop: Keep the slider */}
          <div className="hidden md:block">
            <FeatureSlider features={detailedFeatures} accentColor="green-600" />
          </div>
        </div>
      </section>

      {/* CTA Section - Updated Design */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-3xl font-light text-white mb-4 md:mb-8">Sẵn sàng trải nghiệm?</h2>
          <p className="text-sm md:text-lg text-green-100 mb-6 md:mb-12 leading-relaxed">
            Đặt lịch lái thử ngay hôm nay để cảm nhận sự khác biệt của Geely EX5
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
            <Button className="flex-1 h-12 bg-white/90 hover:bg-white text-gray-800 font-medium text-sm rounded-lg border-0 shadow-sm transition-all" onClick={() => setShowPriceQuote(true)}>
              BÁO GIÁ
            </Button>
            
            <Button className="flex-1 h-12 bg-gray-800/90 hover:bg-gray-700 text-white font-medium text-sm rounded-lg border-0 shadow-sm transition-all flex items-center justify-center gap-2" onClick={() => setShowTestDrive(true)}>
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
      <TestDriveModal isOpen={showTestDrive} onClose={() => setShowTestDrive(false)} selectedCar="Geely EX5" />
      <PriceQuoteModal isOpen={showPriceQuote} onClose={() => setShowPriceQuote(false)} selectedCar="Geely EX5" />
    </div>;
};

export default EX5Details;
