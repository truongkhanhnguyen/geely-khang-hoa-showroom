
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Calculator, Fuel, Gauge, Shield, Cog, Eye, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TestDriveModal from "@/components/TestDriveModal";
import PriceQuoteModal from "@/components/PriceQuoteModal";
import LanguageToggle from "@/components/LanguageToggle";
import CarImageCarousel from "@/components/CarImageCarousel";
import FloatingButtons from "@/components/FloatingButtons";
import FeatureSlider from "@/components/FeatureSlider";

const CoolrayDetails = () => {
  const navigate = useNavigate();
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);

  const carImages = [
    "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&h=1080&fit=crop"
  ];

  const specifications = [
    { icon: Gauge, label: "Động cơ", value: "1.5L Turbo" },
    { icon: Zap, label: "Công suất", value: "177 HP" },
    { icon: Fuel, label: "Tiêu thụ nhiên liệu", value: "6.8L/100km" },
    { icon: Shield, label: "An toàn", value: "6 túi khí" },
    { icon: Cog, label: "Hộp số", value: "CVT" },
    { icon: Eye, label: "Camera", value: "360°" }
  ];

  const detailedFeatures = [
    {
      id: "interior",
      title: "Nội thất thông minh",
      description: "Hệ thống GKUI 19 với màn hình cảm ứng 10.25 inch, điều khiển bằng giọng nói thông minh, kết nối smartphone không dây và hệ thống điều hòa tự động 2 vùng độc lập.",
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop"
    },
    {
      id: "safety",
      title: "An toàn cao cấp",
      description: "Trang bị đầy đủ 6 túi khí, hệ thống phanh ABS + EBD + ESC, kiểm soát lực kéo và hệ thống cảnh báo điểm mù để bảo vệ an toàn cho mọi hành khách.",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop"
    },
    {
      id: "technology",
      title: "Công nghệ hiện đại",
      description: "Cruise Control thông minh, camera 360°, cảm biến lùi, khởi động bằng nút bấm và hệ thống đèn LED full toàn xe với thiết kế hiện đại và tiết kiệm năng lượng.",
      image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=800&h=600&fit=crop"
    },
    {
      id: "performance",
      title: "Hiệu suất vượt trội",
      description: "Động cơ 1.5L Turbo mạnh mẽ 177 HP, hộp số CVT mượt mà, tiêu thụ nhiên liệu chỉ 6.8L/100km, mang lại trải nghiệm lái xe năng động và tiết kiệm.",
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=600&fit=crop"
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
                <span className="text-xl font-semibold text-gray-900">Geely Coolray</span>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Carousel Section */}
      <section className="pt-16">
        <CarImageCarousel images={carImages} carName="Geely Coolray" />
        
        {/* Overlay Content */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 text-center">
          <p className="text-2xl md:text-3xl font-medium text-blue-300 mb-8">Urban. Dynamic. Smart.</p>
          <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
            SUV compact thông minh với công nghệ hiện đại và thiết kế trẻ trung, phù hợp cho cuộc sống đô thị năng động.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full"
              onClick={() => setShowTestDrive(true)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Đặt lịch lái thử
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full"
              onClick={() => setShowPriceQuote(true)}
            >
              <Calculator className="mr-2 h-5 w-5" />
              Xem báo giá
            </Button>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">Thông số kỹ thuật</h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specifications.map((spec, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <spec.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{spec.label}</h3>
                <p className="text-gray-600">{spec.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-light text-center text-gray-900 mb-16">Tính năng nổi bật</h2>
          
          <FeatureSlider features={detailedFeatures} accentColor="blue-600" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-white mb-8">Sẵn sàng trải nghiệm?</h2>
          <p className="text-xl text-blue-100 mb-12">
            Đặt lịch lái thử ngay hôm nay để cảm nhận sự khác biệt của Geely Coolray
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full"
              onClick={() => setShowTestDrive(true)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Đặt lịch lái thử
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full"
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
        selectedCar="Geely Coolray"
      />
      <PriceQuoteModal 
        isOpen={showPriceQuote} 
        onClose={() => setShowPriceQuote(false)}
        selectedCar="Geely Coolray"
      />
    </div>
  );
};

export default CoolrayDetails;
