
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Calculator, Battery, Gauge, Shield, Cog, Eye, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TestDriveModal from "@/components/TestDriveModal";
import PriceQuoteModal from "@/components/PriceQuoteModal";
import LanguageToggle from "@/components/LanguageToggle";

const EX5Details = () => {
  const navigate = useNavigate();
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showPriceQuote, setShowPriceQuote] = useState(false);

  const specifications = [
    { icon: Zap, label: "Động cơ", value: "100% Điện" },
    { icon: Gauge, label: "Công suất", value: "204 HP" },
    { icon: Battery, label: "Phạm vi", value: "400km" },
    { icon: Shield, label: "An toàn", value: "6 túi khí" },
    { icon: Cog, label: "Sạc nhanh", value: "30 phút" },
    { icon: Eye, label: "Tự lái", value: "Level 2" }
  ];

  const features = [
    "100% động cơ điện thân thiện môi trường",
    "Phạm vi hoạt động lên đến 400km",
    "Sạc nhanh 30 phút đạt 80% pin",
    "Hệ thống tự lái cấp độ 2",
    "Màn hình cảm ứng 12.3 inch",
    "Hệ thống điều hòa thông minh",
    "Điều khiển bằng giọng nói AI",
    "Cập nhật phần mềm OTA"
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">Geely EX5</span>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=1920&h=1080&fit=crop" 
            alt="Geely EX5"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white">
              <h1 className="text-6xl md:text-8xl font-light mb-6">Geely EX5</h1>
              <p className="text-2xl md:text-3xl font-medium text-green-300 mb-8">Electric. Efficient. Future.</p>
              <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
                SUV điện thông minh với công nghệ pin tiên tiến và khả năng vận hành êm ái, dẫn đầu xu hướng xanh.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-full"
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
                <spec.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
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
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop" 
                alt="Interior"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-white mb-8">Sẵn sàng trải nghiệm?</h2>
          <p className="text-xl text-green-100 mb-12">
            Đặt lịch lái thử ngay hôm nay để cảm nhận sự khác biệt của Geely EX5
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-full"
              onClick={() => setShowTestDrive(true)}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Đặt lịch lái thử
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-full"
              onClick={() => setShowPriceQuote(true)}
            >
              <Calculator className="mr-2 h-5 w-5" />
              Xem báo giá
            </Button>
          </div>
        </div>
      </section>

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
